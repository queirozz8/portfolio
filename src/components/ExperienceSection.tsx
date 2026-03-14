import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import vipHero from '@/assets/vip-hero.png';
import pompeiaHero from '@/assets/pompeia-hero.png';

interface ExperienceItem {
  key: string;
  tags: string[];
  website?: string;
  hasTestimonial?: boolean;
  image?: string;
}

const experiences: ExperienceItem[] = [
  {
    key: 'vip',
    tags: ['Frontend', 'React', 'TypeScript', 'ShadCN UI', 'cPanel'],
    website: 'https://vipadm.com.br',
    image: vipHero,
  },
  {
    key: 'frilic',
    tags: ['Backend', 'Node.js', 'TypeScript', 'whatsapp-web.js', 'Automation'],
  },
  {
    key: 'pompeia',
    tags: ['Frontend & WhatsApp Bot', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Monorepo', 'NTFY'],
    website: 'https://pompeia-studio.vercel.app',
    image: pompeiaHero,
  },
  {
    key: 'vem',
    tags: ['Automation', 'Node.js', 'JavaScript', 'WhatsApp Bot'],
    hasTestimonial: true,
  },
];

const TiltImage: React.FC<{
  src: string;
  alt: string;
  link?: string;
  intensity?: number;
}> = ({ src, alt, link, intensity = 7 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const applyTransforms = () => {
    const el = containerRef.current;
    const img = imgRef.current;
    if (!el) return;

    const ease = 0.14;

    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, ease);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, ease);

    const rotX = currentRef.current.x;
    const rotY = currentRef.current.y;

    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isHover ? 1.015 : 1})`;

    if (img) {
      const imgTranslateX = rotY * 0.16;
      const imgTranslateY = rotX * -0.16;
      img.style.transform = `translate3d(${imgTranslateX}px, ${imgTranslateY}px, 0) scale(${isHover ? 1.008 : 1})`;
    }

    rafRef.current = requestAnimationFrame(() => applyTransforms());
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const nx = px - 0.5;
    const ny = py - 0.5;

    // DESINVERTIDO: comport. intuitivo
    targetRef.current.y = nx * intensity;
    targetRef.current.x = -ny * intensity;

    if (!rafRef.current) rafRef.current = requestAnimationFrame(() => applyTransforms());
  };

  const handleEnter = () => {
    setIsHover(true);
    targetRef.current.x = currentRef.current.x;
    targetRef.current.y = currentRef.current.y;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(() => applyTransforms());
  };

  const handleLeave = () => {
    setIsHover(false);
    targetRef.current.x = 0;
    targetRef.current.y = 0;
  };

  const content = (
    <div
      className="relative rounded-lg overflow-hidden"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={containerRef}
      style={{
        transition: 'box-shadow 300ms',
        willChange: 'transform',
      }}
    >
      <div className="absolute inset-0 z-10 pointer-events-none bg-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="relative z-20 w-full h-auto block transition-transform duration-300 will-change-transform"
        loading="lazy"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded-lg"
      >
        {content}
      </a>
    );
  }
  return content;
};

const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16 no-select"
        >
          {t('experience.title')}
        </motion.h2>

        <div className="space-y-0">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`border-t border-border py-10 group transition-colors duration-200 ${exp.website ? 'hover:bg-card/30 rounded-lg -mx-2 px-4 lg:px-6 -mt-px' : ''}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <div className="flex items-start gap-2">
                    {exp.website ? (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 no-select rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer hover:underline decoration-accent/60 underline-offset-2"
                      >
                        <span>{t(`experience.${exp.key}.company`)}</span>
                        <ExternalLink size={14} className="flex-shrink-0 opacity-70 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <h3 className="font-display text-lg font-semibold text-foreground no-select">
                        {t(`experience.${exp.key}.company`)}
                      </h3>
                    )}
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-1 no-select">
                    {t('experience.role_dev')}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider no-select">
                    {t(`experience.${exp.key}.period`)} · {t('experience.remote')}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="mt-4 border border-border bg-card/40 rounded-md p-3"
                  >
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground no-select mb-2">
                      {t('stack.title')}
                    </p>
                    <ul className="space-y-1">
                      {exp.tags.map((line) => (
                        <li key={line} className="flex gap-2 text-xs text-muted-foreground font-body">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="lg:col-span-8">
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    {t(`experience.${exp.key}.description`)}
                  </p>

                  {exp.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mt-6 rounded-lg overflow-hidden border border-border group/img relative"
                    >
                      <TiltImage src={exp.image} alt={t(`experience.${exp.key}.company`)} link={exp.website} />
                    </motion.div>
                  )}

                  {exp.hasTestimonial && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="mt-6 border-l-2 border-accent pl-4 bg-accent-soft/50 rounded-r-lg py-3 pr-3 relative"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Quote size={14} className="text-accent" />
                        <span className="font-body text-xs font-medium text-foreground/80 no-select">Contratante</span>
                      </div>
                      <p className="font-body text-sm italic text-foreground/70 leading-relaxed">
                        {t(`experience.${exp.key}.testimonial`)}
                      </p>
                      <Quote size={14} className="text-accent/60 absolute bottom-2 right-2 rotate-180" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mt-12" />
      </div>
    </section>
  );
};

export default ExperienceSection;
