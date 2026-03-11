import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import euImg from '@/assets/eu.png';

const Hero = () => {
  const { t } = useTranslation();
  const imgRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleHoverStart = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1500);
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-glow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="section-divider mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          {/* Left: Text */}
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
              className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-foreground cursor-default no-select"
              onMouseEnter={handleHoverStart}
            >
              queiro
              <span className="accent-gradient-text">zz</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-display text-lg text-muted-foreground no-select"
            >
              {t('hero.subtitle')}
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
              <a
                href="mailto:henriquejorge1365@gmail.com"
                className="font-body text-sm uppercase tracking-widest px-6 py-3 border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2 rounded-md no-select"
              >
                {t('hero.cta_contact')}
                <Mail size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-5 flex justify-end"
          >
            <div
              ref={imgRef}
              className="relative overflow-hidden w-full max-w-[380px] aspect-[3/4] rounded-lg group"
              onMouseEnter={handleHoverStart}
            >
              {/* Accent border glow */}
              <div className="absolute -inset-[1px] accent-gradient rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[2px] bg-background rounded-lg overflow-hidden">
                <img
                  src={euImg}
                  alt="Henrique Jorge de Queiroz"
                  className="w-full h-full object-cover portrait-grayscale"
                />
                {isScanning && (
                  <div className="absolute top-0 bottom-0 w-px bg-accent animate-scan-line pointer-events-none" />
                )}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="section-divider mt-12" />
      </div>
    </section>
  );
};

export default Hero;
