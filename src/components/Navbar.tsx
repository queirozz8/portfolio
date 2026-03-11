import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
          className="font-display text-xl font-bold tracking-tight text-foreground"
        >
          queirozz
        </button>

        <div className="hidden md:flex items-center gap-8">
          {['about', 'stack', 'experience', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-widest"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-display text-xs uppercase tracking-widest px-3 py-1 border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-200"
          >
            {i18n.language === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-200"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
