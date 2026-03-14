import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import notoriumImg from '@/assets/notorium.webp';
import queirozzfmImg from '@/assets/queirozzfm.webp';

interface ProjectItem {
  key: string;
  tags: string[];
  website?: string;
  image?: string;
}

const projects: ProjectItem[] = [
  {
    key: 'notorium',
    tags: [
      'Full-Stack',
      'Core: n8n',
      'Frontend: Next.js + TypeScript + ShadCN UI',
      'Backend: Express.js + TypeScript + whatsapp-web.js',
      'WhatsApp Bot',
      'AI',
    ],
    website: 'https://notorium-ai.vercel.app',
    image: notoriumImg,
  },
  {
    key: 'queirozzfm',
    tags: ['Frontend', 'React', 'TypeScript', 'Tailwind CSS'],
    website: 'https://queirozz-fm.vercel.app',
    image: queirozzfmImg,
  },
];

const TiltImage: React.FC<{
  src: string;
  alt: string;
  link?: string;
  intensity?: number;
}> = ({ src, alt, link, intensity = 8 }) => {
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

    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isHover ? 1.02 : 1})`;

    if (img) {
      const imgTranslateX = rotY * 0.18;
      const imgTranslateY = rotX * -0.18;
      img.style.transform = `translate3d(${imgTranslateX}px, ${imgTranslateY}px, 0) scale(${isHover ? 1.01 : 1})`;
    }

    rafRef.current = requestAnimationFrame(() => applyTransforms());
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    const nx = px - 0.5;
    const ny = py - 0.5;

    // <-- DESINVERTIDO: agora nx direto, ny invertido (intuitivo)
    targetRef.current.y = nx * intensity; // rotateY (move pra direita => inclina pra direita)
    targetRef.current.x = -ny * intensity; // rotateX (move pra baixo => inclina pra frente)

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => applyTransforms());
    }
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
      {/* overlay sutil */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="relative z-20 w-full h-auto block transition-transform duration-300 will-change-transform"
        loading="lazy"
        style={{
          transform: 'translate3d(0,0,0)',
        }}
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

const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16 no-select"
        >
          {t('projects.title')}
        </motion.h2>

        <div className="space-y-0">
          {projects.map((project, idx) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`border-t border-border py-10 group transition-colors duration-200 ${
                project.website ? 'hover:bg-card/30 rounded-lg -mx-2 px-4 lg:px-6 -mt-px' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <div className="flex items-start gap-2">
                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 no-select rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer hover:underline decoration-accent/60 underline-offset-2"
                      >
                        <span>{t(`projects.${project.key}.name`)}</span>
                        <ExternalLink size={14} className="flex-shrink-0 opacity-70 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <h3 className="font-display text-lg font-semibold text-foreground no-select">
                        {t(`projects.${project.key}.name`)}
                      </h3>
                    )}
                  </div>

                  <p className="font-body text-sm text-muted-foreground mt-1 no-select">
                    {t(`projects.${project.key}.type`)}
                  </p>

                  <div className="mt-4 border border-border bg-card/40 rounded-md p-3">
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground no-select mb-2">
                      {t('stack.title')}
                    </p>

                    <ul className="space-y-1">
                      {project.tags.map((line) => (
                        <li key={line} className="flex gap-2 text-xs text-muted-foreground font-body">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <p className="font-display text-base text-muted-foreground no-select">
                    {t(`projects.${project.key}.headline`)}
                  </p>

                  <p className="font-body text-sm text-foreground/80 leading-relaxed mt-4">
                    {t(`projects.${project.key}.description`)}
                  </p>

                  {project.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mt-6 rounded-lg overflow-hidden border border-border group/img relative"
                    >
                      <TiltImage src={project.image} alt={t(`projects.${project.key}.name`)} link={project.website} />
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

export default ProjectsSection;
