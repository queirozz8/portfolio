import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Sparkles } from 'lucide-react';
import euImg from '@/assets/eu.png';

// ─────────────────────────────────────────────
// Dados dos chips flutuantes ao redor da imagem.
// Cada chip tem: texto, posição (top/left em %),
// e um delay de animação individual.
// ─────────────────────────────────────────────
const floatingChips = [
  { label: 'TypeScript',  top: '2%',   left: '-18%', delay: 0.0 },
  { label: 'React',       top: '22%',  left: '-22%', delay: 0.05 },
  { label: 'Node.js',     top: '72%',  left: '-20%', delay: 0.1 },
  { label: 'Full-Stack',  top: '88%',  left: '-10%', delay: 0.15 },
  { label: 'Next.js',     top: '5%',   left: '82%',  delay: 0.05 },
  { label: 'SaaS',        top: '25%',  left: '90%',  delay: 0.1 },
  { label: 'Tailwind',    top: '75%',  left: '85%',  delay: 0.0 },
];

// ─────────────────────────────────────────────
// Dados dos dots decorativos.
// São pequenos pontos posicionados ao redor da
// imagem que pulsam/escalam no hover.
// ─────────────────────────────────────────────
const decorativeDots = [
  { top: '-5%',  left: '50%',  size: 6,  delay: 0.0 },
  { top: '50%',  left: '-5%',  size: 8,  delay: 0.1 },
  { top: '50%',  left: '105%', size: 6,  delay: 0.05 },
  { top: '105%', left: '50%',  size: 8,  delay: 0.15 },
  { top: '15%',  left: '-8%',  size: 4,  delay: 0.2 },
  { top: '85%',  left: '108%', size: 4,  delay: 0.2 },
];

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background decorative blur blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-glow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="section-divider mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* ── Left: Text ───────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 no-select"
            >
              <Sparkles size={14} className="text-accent" />
              <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
                {t('hero.role')}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-foreground no-select"
            >
              queiro
              <span className="accent-gradient-text">zz.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-display text-lg text-muted-foreground no-select space-y-1"
            >
              <span className="block">{t('hero.subtitle')}</span>
              <span className="block text-sm text-muted-foreground/80">Santos, São Paulo</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-body text-base text-muted-foreground max-w-lg leading-relaxed"
            >
              {t('hero.bio')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex gap-4 pt-4"
            >
              <button
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-body text-sm uppercase tracking-widest px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 flex items-center gap-2 rounded-md no-select"
              >
                {t('hero.cta_work')}
                <ArrowDown size={14} />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-body text-sm uppercase tracking-widest px-6 py-3 border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2 rounded-md no-select"
              >
                {t('hero.cta_contact')}
                <Mail size={14} />
              </button>
            </motion.div>
          </div>

          {/* ── Right: Portrait + Decorative Elements ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-5 flex justify-end lg:items-start"
          >
            {/*
              Wrapper relativo com padding generoso para
              dar espaço aos elementos que ficam "fora"
              dos limites da imagem circular.
            */}
            <div className="relative w-full max-w-[320px] aspect-square group" style={{ padding: '2rem' }}>

              {/* ── Anel externo girante ──────────────────
                  Um SVG de círculo tracejado que gira
                  continuamente e acelera no hover.
                  "animate-spin" usa a animação padrão do
                  Tailwind (1 volta por segundo, linear).
                  No hover, trocamos para uma duração menor
                  via classe condicional com um spin custom.
              ────────────────────────────────────────── */}
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                // Framer Motion: gira infinitamente de 0° a 360°
                animate={{ rotate: 360 }}
                // No estado normal: 12 segundos por volta
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                // No hover do grupo pai, aceleramos para 3s
                whileHover={{ transition: { duration: 3, repeat: Infinity, ease: 'linear' } }}
              >
                <circle
                  cx="50" cy="50" r="48"
                  fill="none"
                  // "stroke" usa a cor de accent com transparência
                  stroke="hsl(var(--accent) / 0.3)"
                  strokeWidth="0.5"
                  // Tracejado: traço de 4 unidades, espaço de 3
                  strokeDasharray="4 3"
                  // Arrredonda as pontas dos traços
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* ── Anel interno contra-girante ───────────
                  Gira no sentido contrário (-360°) para
                  criar um efeito de profundidade/tensão
                  visual entre os dois anéis.
              ────────────────────────────────────────── */}
              <motion.svg
                className="absolute pointer-events-none"
                // Ligeiramente menor e deslocado para dentro
                style={{ inset: '1.2rem' }}
                viewBox="0 0 100 100"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="50" cy="50" r="47"
                  fill="none"
                  stroke="hsl(var(--accent) / 0.12)"
                  strokeWidth="0.4"
                  strokeDasharray="1 6"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* ── Chips flutuantes de tecnologia ────────
                  Cada chip é absolutamente posicionado.
                  No hover do grupo pai (classe "group"),
                  eles saem da opacidade 0 e deslocamento
                  para opacidade 1 e posição original.
                  Cada um tem um delay diferente para
                  criar um efeito de "stagger" (cascata).
              ────────────────────────────────────────── */}
              {floatingChips.map((chip) => (
                <motion.div
                  key={chip.label}
                  className="absolute pointer-events-none"
                  style={{ top: chip.top, left: chip.left }}
                  // Estado inicial: invisível e levemente deslocado
                  initial={{ opacity: 0, scale: 0.8 }}
                  // "whileHover" em Framer Motion não funciona em pai,
                  // então usamos variants + a prop "whileHover" no grupo.
                  // A solução mais simples é animar via CSS group-hover.
                  // Aqui usamos animate condicional via variants:
                  variants={{
                    idle:  { opacity: 0, scale: 0.8, y: 4 },
                    hover: { opacity: 1, scale: 1,   y: 0 },
                  }}
                  // O estado "hover" é ativado pelo motion.div pai
                  // via propagação de variant — ver "whileHover" no wrapper
                  transition={{ delay: chip.delay, duration: 0.25, ease: 'easeOut' }}
                >
                  <span className="
                    font-mono text-[10px] tracking-wider
                    px-2 py-1 rounded-full
                    bg-background/90 backdrop-blur-sm
                    border border-accent/30
                    text-accent/80
                    whitespace-nowrap
                    shadow-sm
                  ">
                    {chip.label}
                  </span>
                </motion.div>
              ))}

              {/* ── Dots decorativos ──────────────────────
                  Pequenos círculos ao redor da imagem.
                  No hover, escalam e ganham opacidade.
              ────────────────────────────────────────── */}
              {decorativeDots.map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-accent pointer-events-none"
                  style={{
                    top:    dot.top,
                    left:   dot.left,
                    width:  dot.size,
                    height: dot.size,
                    // Centraliza o dot no ponto exato
                    transform: 'translate(-50%, -50%)',
                  }}
                  variants={{
                    idle:  { opacity: 0.15, scale: 0.6 },
                    hover: { opacity: 0.8,  scale: 1.4 },
                  }}
                  transition={{ delay: dot.delay, duration: 0.3, ease: 'easeOut' }}
                />
              ))}

              {/* ── Badge "Available" ─────────────────────
                  Um badge de status no canto inferior
                  esquerdo que aparece no hover com um
                  pulsing green dot.
              ────────────────────────────────────────── */}
              <motion.div
                className="absolute bottom-[1.5rem] left-[-0.5rem] pointer-events-none"
                variants={{
                  idle:  { opacity: 0, x: -8 },
                  hover: { opacity: 1, x: 0  },
                }}
                transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
              >
                <div className="
                  flex items-center gap-1.5
                  font-mono text-[10px] tracking-wider
                  px-2.5 py-1.5 rounded-full
                  bg-background/95 backdrop-blur-sm
                  border border-border
                  text-muted-foreground
                  shadow-md
                  whitespace-nowrap
                ">
                  {/* Dot verde pulsante — usa animate para o ping */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  available
                </div>
              </motion.div>

              {/* ── Imagem circular ───────────────────────
                  O wrapper "whileHover" aqui propaga o
                  variant "hover" para todos os filhos
                  que declaram a prop "variants" com idle/hover.
                  É o mecanismo central de tudo acima.
              ────────────────────────────────────────── */}
              <motion.div
                // "initial" define o variant padrão
                initial="idle"
                // Quando o mouse entra, todos os filhos
                // que têm variants recebem o estado "hover"
                whileHover="hover"
                className="relative overflow-hidden w-full h-full rounded-full"
              >
                {/* Borda glow accent */}
                <div className="absolute -inset-[1px] accent-gradient rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[2px] bg-background rounded-full overflow-hidden">
                  <img
                    src={euImg}
                    alt="Henrique Queiroz"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay sutil que aparece no hover */}
                  <div className="
                    absolute inset-0 rounded-full
                    bg-accent/5
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  " />
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
        <div className="section-divider mt-12" />
      </div>
    </section>
  );
};

export default Hero;