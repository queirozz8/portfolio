// src/components/ui/TerminalModal.tsx
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ─── Types ────────────────────────────────────────────────────────────────────

type LineType = 'command' | 'output' | 'error' | 'system' | 'blank';

interface TerminalLine {
  id: number;
  type: LineType;
  content: string;
}

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Respostas bilíngues ──────────────────────────────────────────────────────

// RESPONSES separa todas as strings do terminal por idioma.
// Cada valor pode ser:
//   - string[]         → array de linhas estático
//   - (x: string) => string[]  → função que recebe um argumento e retorna linhas
//
// Manter as strings FORA do componente evita que elas sejam recriadas
// a cada render — só a seleção pelo idioma acontece dentro (via useMemo).
const RESPONSES: Record<string, Record<string, string[] | ((...args: string[]) => string[])>> = {
  en: {
    help: [
      'available commands:',
      '',
      'Main:',
      '  whoami      →   who is queirozz',
      '  skills      →   tech stack',
      '  projects    →   featured projects',
      '  contact     →   get in touch',
      '  github      →   open GitHub (new tab)',
      '  linkedin    →   open LinkedIn (new tab)',
      '  lang        →   switch language  (pt | en)',
      '  clear       →   clear terminal',
      '  exit        →   close terminal',
      '',
      'Easter Eggs:',
      '  sudo · ls · pwd · date · uname',
    ],
    whoami: [
      'Henrique Queiroz — Full-Stack Developer & AI Builder',
      'Age · 16   |   Santos, São Paulo, BR',
      '',
      'Building SaaS products and automation tools.',
      'TypeScript · Node.js · React are my core weapons.',
      'Currently: targeting the first R$1000 MRR.',
    ],
    skills: [
      'Languages   →  TypeScript, JavaScript, Python',
      'Frontend    →  React, Next.js, Tailwind CSS, ShadCN UI',
      'Backend     →  Node.js, Express.js, SQL (PosgreSQL, Supabase) & MongoDB',
      'Automation  →  n8n',
      'Infra       →  Linux, Docker, Git, cPanel',
    ],
    projects: [
      'Notorium (SaaS) — discontinued',
      '  AI-powered Instagram content automation.',
      '  Stack: Next.js · n8n · Express.js · TypeScript',
      '',
      'queirozz.fm',
      '  Spotify-inspired UI, built from scratch.',
      '  Stack: React · TypeScript · Tailwind CSS',
      '',
      'WhatsApp Chatbots — 4 clients delivered',
      '  Travel agency · beauty salon · medical clinic.',
    ],
    contact: [
      'email    →  henriquequeiroz1365@gmail.com',
      'github   →  github.com/queirozz8',
      'linkedin →  linkedin.com/in/queirozz8',
      '',
      "type 'github' or 'linkedin' to open in a new tab.",
    ],
    github:       ['opening GitHub... →'],
    linkedin:     ['opening LinkedIn... →'],
    lang_usage:   ["usage: lang <pt|en>   (e.g. 'lang pt')"],
    lang_already: (l: string) => [`language is already set to '${l}'.`],
    lang_set:     (l: string) => [`language changed to '${l}'. 🌐`],
    sudo:         (cmd: string) => [`sudo: ${cmd}: permission denied`, 'nice try 😏'],
    ls: [
      'projects/    skills/    experience/    contact/',
      '',
      "hint: not real directories — try whoami, skills or projects.",
    ],
    pwd:   ['/home/guest/queirozz_portfolio'],
    uname: ['queirozz-os 1.0.0 #1 SMP TypeScript/Node.js'],
  },

  pt: {
    help: [
      'comandos disponíveis:',
      '',
      'Principal:',
      '  whoami      →   quem é o queirozz',
      '  skills      →   stack de tecnologias',
      '  projects    →   projetos em destaque',
      '  contact     →   entre em contato',
      '  github      →   abrir GitHub (nova aba)',
      '  linkedin    →   abrir LinkedIn (nova aba)',
      '  lang        →   mudar idioma  (pt | en)',
      '  clear       →   limpar terminal',
      '  exit        →   fechar terminal',
      '',
      'Easter Eggs:',
      '  sudo · ls · pwd · date · uname',
    ],
    whoami: [
      'Henrique Queiroz — Desenvolvedor Full-Stack & AI Builder',
      'Idade · 16   |   Santos, São Paulo, BR',
      '',
      'Construindo produtos SaaS e ferramentas de automação.',
      'TypeScript · Node.js · React são minhas armas principais.',
      'Atualmente: buscando o primeiro MRR de R$1000.',
    ],
    skills: [
      'Linguagens   →  TypeScript, JavaScript, Python',
      'Frontend     →  React, Next.js, Tailwind CSS, ShadCN UI',
      'Backend      →  Node.js, Express.js, SQL (PosgreSQL, Supabase) & MongoDB',
      'Automação    →  n8n',
      'Infra        →  Linux, Docker, Git, cPanel',
    ],
    projects: [
      'Notorium (SaaS) — descontinuado',
      '  Automação de conteúdo para Instagram com IA.',
      '  Stack: Next.js · n8n · Express.js · TypeScript',
      '',
      'queirozz.fm',
      '  UI inspirada no Spotify, criada do zero.',
      '  Stack: React · TypeScript · Tailwind CSS',
      '',
      'Chatbots WhatsApp — 4 clientes entregues',
      '  Agência de viagens · salão de beleza · clínica médica.',
    ],
    contact: [
      'email    →  henriquequeiroz1365@gmail.com',
      'github   →  github.com/queirozz8',
      'linkedin →  linkedin.com/in/queirozz8',
      '',
      "digite 'github' ou 'linkedin' para abrir em nova aba.",
    ],
    github:       ['abrindo GitHub... →'],
    linkedin:     ['abrindo LinkedIn... →'],
    lang_usage:   ["uso: lang <pt|en>   (ex: 'lang pt')"],
    lang_already: (l: string) => [`o idioma já está definido como '${l}'.`],
    lang_set:     (l: string) => [`idioma alterado para '${l}'. 🌐`],
    sudo:         (cmd: string) => [`sudo: ${cmd}: permissão negada`, 'boa tentativa 😏'],
    ls: [
      'projetos/    skills/    experiência/    contato/',
      '',
      "dica: não são diretórios reais — tente whoami, skills ou projects.",
    ],
    pwd:   ['/home/visitante/portfolio_queirozz'],
    uname: ['queirozz-os 1.0.0 #1 SMP TypeScript/Node.js'],
  },
};

// ─── Boot lines factory ───────────────────────────────────────────────────────

// Recebe o idioma atual para que a mensagem de boot já apareça no idioma correto.
function createBootLines(nextId: () => number, lang: string): TerminalLine[] {
  const msg = lang === 'pt'
    ? "digite 'help' para ver os comandos."
    : "type 'help' to see available commands.";

  return [
    { id: nextId(), type: 'system', content: 'queirozz terminal  v1.0.0' },
    { id: nextId(), type: 'system', content: msg },
    { id: nextId(), type: 'blank',  content: '' },
  ];
}

// ─── Helper: converte string[] em TerminalLine[] ──────────────────────────────

// Pequena função utilitária que evita repetir o mesmo map() em vários lugares.
// Strings vazias '' viram 'blank'; o resto vira 'output'.
function toLines(strings: string[], nextId: () => number): TerminalLine[] {
  return strings.map(text => ({
    id:      nextId(),
    type:    (text === '' ? 'blank' : 'output') as LineType,
    content: text,
  }));
}

// ─── Componente principal ─────────────────────────────────────────────────────

const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {

  // i18n: instância do react-i18next para ler e alterar o idioma do site.
  // Usamos só i18n aqui (sem t), pois os textos do terminal vêm do RESPONSES.
  const { i18n } = useTranslation();

  // lang: idioma ativo normalizado para 'pt' ou 'en'.
  // i18n.language pode retornar 'pt-BR', então pegamos só os 2 primeiros chars.
  const lang = i18n.language.slice(0, 2) as 'pt' | 'en';

  // res: atalho para as respostas do idioma atual.
  // useMemo garante que só recalcula quando lang muda — não a cada render.
  const res = useMemo(() => RESPONSES[lang] ?? RESPONSES['en'], [lang]);

  const lineIdRef = useRef(0);
  const nextId = useCallback(() => ++lineIdRef.current, []);

  // Estado inicial criado de forma lazy (função) — chama createBootLines
  // UMA vez só, na montagem. A função já recebe o lang correto.
  const [lines, setLines] = useState<TerminalLine[]>(() => createBootLines(nextId, lang));

  const [input, setInput]           = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // ── Scroll lock ────────────────────────────────────────────────────────────
  // Adiciona overflow:hidden no body enquanto o terminal estiver aberto,
  // impedindo que a página role por baixo do overlay.
  // O return (cleanup) remove o estilo quando:
  //   - isOpen muda de true → false (fechamento normal)
  //   - o componente desmonta (ex: navegação de rota)
  // Usar style inline (em vez de classe CSS) é mais seguro porque não depende
  // de especificidade ou ordem de carregamento das folhas de estilo.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // ── Abertura / fechamento ──────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    } else {
      // Reseta o terminal com as boot lines no idioma ATUAL.
      // Se o usuário trocou de idioma durante a sessão, a próxima abertura
      // já abre no idioma correto.
      setLines(createBootLines(nextId, lang));
      setInput('');
      setCmdHistory([]);
      setHistoryIdx(-1);
    }
  }, [isOpen, nextId, lang]);

  // ── run ────────────────────────────────────────────────────────────────────
  const run = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);

    const cmdLine: TerminalLine = {
      id:      nextId(),
      type:    'command',
      content: trimmed,
    };

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);

    // ── clear ────────────────────────────────────────────────────────────────
    if (cmd === 'clear') {
      setLines(createBootLines(nextId, lang));
      return;
    }

    // ── exit ─────────────────────────────────────────────────────────────────
    if (cmd === 'exit') {
      const bye = lang === 'pt' ? 'até mais 👋' : 'goodbye 👋';
      setLines(prev => [
        ...prev,
        cmdLine,
        { id: nextId(), type: 'output', content: bye },
        { id: nextId(), type: 'blank',  content: '' },
      ]);
      setTimeout(onClose, 350);
      return;
    }

    // ── lang ──────────────────────────────────────────────────────────────────
    // Troca o idioma do site inteiro usando i18n.changeLanguage —
    // idêntico ao que o botão PT/EN do Navbar faz internamente.
    //
    // Fluxo detalhado:
    //  "lang pt"  →  target = 'pt'
    //  Se lang já é 'pt' → exibe lang_already (sem chamar changeLanguage)
    //  Caso contrário    → i18n.changeLanguage('pt')
    //                       → react-i18next dispara re-render em todo o site
    //                       → o useMemo de res atualiza para as strings em PT
    //                       → a boot message do próximo reset já sai em PT
    if (cmd === 'lang') {
      const target = args[0];

      if (!target || !['pt', 'en'].includes(target)) {
        // Argumento inválido ou ausente → mostra a sintaxe correta
        const usageLines = toLines(res['lang_usage'] as string[], nextId);
        setLines(prev => [
          ...prev,
          cmdLine,
          ...usageLines,
          { id: nextId(), type: 'blank', content: '' },
        ]);
        return;
      }

      if (target === lang) {
        // Idioma já ativo → feedback sem efeito colateral
        const fn = res['lang_already'] as (l: string) => string[];
        setLines(prev => [
          ...prev,
          cmdLine,
          ...toLines(fn(target), nextId),
          { id: nextId(), type: 'blank', content: '' },
        ]);
        return;
      }

      // Muda o idioma do site inteiro.
      // A confirmação usa RESPONSES[target] (novo idioma) para que a resposta
      // já apareça na língua recém-ativada — coerência visual.
      i18n.changeLanguage(target);
      const newRes = RESPONSES[target] ?? RESPONSES['en'];
      const fn     = newRes['lang_set'] as (l: string) => string[];
      setLines(prev => [
        ...prev,
        cmdLine,
        ...toLines(fn(target), nextId),
        { id: nextId(), type: 'blank', content: '' },
      ]);
      return;
    }

    // ── Comandos com efeito colateral (window.open) ───────────────────────────
    if (cmd === 'github') {
      window.open('https://github.com/queirozz8', '_blank');
      setLines(prev => [
        ...prev,
        cmdLine,
        ...toLines(res['github'] as string[], nextId),
        { id: nextId(), type: 'blank', content: '' },
      ]);
      return;
    }

    if (cmd === 'linkedin') {
      window.open('https://linkedin.com/in/queirozz8', '_blank');
      setLines(prev => [
        ...prev,
        cmdLine,
        ...toLines(res['linkedin'] as string[], nextId),
        { id: nextId(), type: 'blank', content: '' },
      ]);
      return;
    }

    // ── sudo (recebe argumento) ───────────────────────────────────────────────
    if (cmd === 'sudo') {
      const fn = res['sudo'] as (...a: string[]) => string[];
      // Primeira linha é o erro (vermelho), segunda é o easter egg (output normal)
      const raw = fn(args[0] ?? 'command');
      const sudoLines: TerminalLine[] = raw.map((text, i) => ({
        id:      nextId(),
        type:    (i === 0 ? 'error' : 'output') as LineType,
        content: text,
      }));
      setLines(prev => [
        ...prev,
        cmdLine,
        ...sudoLines,
        { id: nextId(), type: 'blank', content: '' },
      ]);
      return;
    }

    // ── date (gerado em runtime) ──────────────────────────────────────────────
    if (cmd === 'date') {
      const dateStr = new Date().toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
      setLines(prev => [
        ...prev,
        cmdLine,
        { id: nextId(), type: 'output', content: dateStr },
        { id: nextId(), type: 'blank',  content: '' },
      ]);
      return;
    }

    // ── Comandos estáticos normais ────────────────────────────────────────────
    if (res[cmd]) {
      setLines(prev => [
        ...prev,
        cmdLine,
        ...toLines(res[cmd] as string[], nextId),
        { id: nextId(), type: 'blank', content: '' },
      ]);
      return;
    }

    // ── Comando desconhecido ──────────────────────────────────────────────────
    const notFound = lang === 'pt'
      ? `comando não encontrado: ${cmd}  (digite 'help')`
      : `command not found: ${cmd}  (type 'help')`;

    setLines(prev => [
      ...prev,
      cmdLine,
      { id: nextId(), type: 'error', content: notFound },
      { id: nextId(), type: 'blank', content: '' },
    ]);

  }, [nextId, onClose, res, lang, i18n]);

  // ── handleKeyDown ──────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        run(input);
        setInput('');
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHistoryIdx(prev => {
          const next = Math.min(prev + 1, cmdHistory.length - 1);
          setInput(cmdHistory[next] ?? input);
          return next;
        });
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHistoryIdx(prev => {
          const next = Math.max(prev - 1, -1);
          setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
          return next;
        });
        break;
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="term-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Janela */}
          <motion.div
            key="term-window"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
          >
            {/*
             * max-w-3xl → mais largo que antes (era max-w-2xl).
             * w-[95vw]  → usa quase toda a largura em telas pequenas.
             */}
            <div
              className="w-[95vw] max-w-3xl pointer-events-auto rounded-xl overflow-hidden border border-border shadow-2xl bg-background"
              onClick={e => e.stopPropagation()}
            >

              {/* Title bar */}
              <div className="relative flex items-center px-4 py-3 border-b border-border bg-background/40">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    aria-label="Close terminal"
                    className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125 transition-all"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>

                <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-muted-foreground select-none">
                  guest@queirozz: ~
                </span>

                <button
                  onClick={onClose}
                  aria-label="Close terminal"
                  className="ml-auto text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Output area — h-[32rem] para terminal mais alto */}
              <div
                ref={scrollRef}
                className="h-[32rem] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-[1.65] cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map(line => {
                  if (line.type === 'blank') {
                    return <div key={line.id} className="h-2" />;
                  }
                  if (line.type === 'command') {
                    return (
                      <div key={line.id} className="flex gap-2">
                        <span className="text-accent shrink-0 select-none">guest@queirozz:~$</span>
                        <span className="text-foreground">{line.content}</span>
                      </div>
                    );
                  }
                  if (line.type === 'system') {
                    return <p key={line.id} className="text-accent/80">{line.content}</p>;
                  }
                  if (line.type === 'error') {
                    return <p key={line.id} className="text-red-400/90">{line.content}</p>;
                  }
                  return <p key={line.id} className="text-muted-foreground">{line.content}</p>;
                })}
              </div>

              {/* Input row */}
              <div
                className="flex items-center gap-2 px-5 py-3 border-t border-border"
                onClick={() => inputRef.current?.focus()}
              >
                <span className="font-mono text-[13px] text-accent shrink-0 select-none">
                  guest@queirozz:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent font-mono text-[13px] text-foreground outline-none caret-accent"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;