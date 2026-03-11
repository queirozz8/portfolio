import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground mb-12 no-select"
        >
          {t('footer.cta')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex gap-4 mb-16"
        >
          <a
            href="https://github.com/queirozz8"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-md"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/queirozz8"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-md"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:henriquejorge1365@gmail.com"
            className="p-3 border border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-200 rounded-md"
          >
            <Mail size={20} />
          </a>
        </motion.div>

        <div className="section-divider mb-6" />
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest no-select">
          {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
