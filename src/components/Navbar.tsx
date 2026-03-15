// src/components/ui/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react'; // ← Terminal adicionado
import { motion, AnimatePresence } from 'framer-motion';
import TerminalModal from '@/components/ui/terminal-modal'; // ← import do novo componente

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // terminalOpen: controla se a janela do terminal está aberta ou fechada.
  // Começa como false (fechado). Quando o usuário clica no botão Terminal,
  // setTerminalOpen(true) abre o modal; o onClose do TerminalModal chama
  // setTerminalOpen(false) para fechar.
  const [terminalOpen, setTerminalOpen] = useState(false);

  const pendingScrollId = useRef<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt');
  };

  const scrollTo = (id: string) => {
    if (mobileOpen) {
      pendingScrollId.current = id;
      setMobileOpen(false);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExitComplete = () => {
    if (pendingScrollId.current) {
      document.getElementById(pendingScrollId.current)?.scrollIntoView({ behavior: 'smooth' });
      pendingScrollId.current = null;
    }
  };

  return (
    // Fragment (<>) para retornar dois elementos raiz: o TerminalModal e o <nav>.
    // O TerminalModal precisa estar fora do <nav> para não ter seu z-index
    // restringido pelo stacking context do nav.
    <>
      {/*
       * TerminalModal fica renderizado aqui o tempo todo — mesmo quando fechado.
       * Quem controla sua visibilidade é o prop isOpen.
       * AnimatePresence (dentro do TerminalModal) cuida da animação de saída.
       * onClose: arrow function que seta terminalOpen para false.
       */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl font-bold tracking-tight text-foreground no-select"
          >
            queiro<span className="accent-gradient-text">zz</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {['about', 'stack', 'experience', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="font-body text-sm text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-widest no-select"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Botão de língua — igual ao original */}
            <button
              onClick={toggleLang}
              className="font-display text-xs uppercase tracking-widest px-3 py-1.5 border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-200 rounded-md no-select"
            >
              {i18n.language === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* ── Botão do Terminal ──────────────────────────────────────────────
             * Mesmo estilo visual dos outros botões de ação (border + hover accent).
             * onClick: abre o terminal setando terminalOpen para true.
             * aria-label: acessibilidade — descreve o botão para screen readers.
             * title: tooltip nativo do browser ao passar o mouse.
             */}
            <button
              onClick={() => setTerminalOpen(true)}
              aria-label="Open terminal"
              title="Terminal"
              className="p-2 border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-200 rounded-md hidden md:block"
            >
              {/* Ícone Terminal do lucide-react. size=16 mantém consistência
                  com o ícone Sun/Moon que também usa size={16}. */}
              <Terminal size={16} />
            </button>

            {/* Botão de tema — igual ao original */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-200 rounded-md"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Botão do menu mobile — igual ao original */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 border border-border text-foreground hover:border-accent transition-all duration-200 rounded-md"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence onExitComplete={handleExitComplete}>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {['about', 'stack', 'experience', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="font-body text-sm text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-widest text-left no-select"
                  >
                    {t(`nav.${item}`)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;