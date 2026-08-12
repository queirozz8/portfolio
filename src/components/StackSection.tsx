import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const stackData = {
  languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python (básico)'],
  frontend: ['Next.js', 'React.js', 'ShadCN UI', 'Tailwind CSS'],
  backend: ['Express.js', 'Node.js', 'SQL & NoSQL', 'Supabase', 'n8n', 'Docker', 'cPanel'],
  tools: ['AI Tools', 'AI Agents', 'HeyGen', 'Linux', 'Git', 'Inglês (nível B2)'],
};

const allKey = 'all';

type CategoryKey = keyof typeof stackData;

const StackSection = () => {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>(allKey);
  const atlasRef = useRef<HTMLDivElement>(null);

  const categories: { key: CategoryKey; items: string[] }[] = [
    { key: 'languages', items: stackData.languages },
    { key: 'frontend', items: stackData.frontend },
    { key: 'backend', items: stackData.backend },
    { key: 'tools', items: stackData.tools },
  ];

  const filters = [allKey, ...categories.map((c) => c.key)];
  const filteredCategories =
    activeFilter === allKey
      ? categories
      : categories.filter((c) => c.key === activeFilter);

  const techCount = filteredCategories.reduce((sum, c) => sum + c.items.length, 0);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const atlas = atlasRef.current;
    if (!atlas) return;

    let frameId = 0;
    let x = 50;
    let y = 50;

    const render = () => {
      atlas.style.setProperty('--stack-x', `${x}%`);
      atlas.style.setProperty('--stack-y', `${y}%`);
      frameId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = atlas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      x = ((event.clientX - rect.left) / rect.width) * 100;
      y = ((event.clientY - rect.top) / rect.height) * 100;

      if (!frameId) frameId = requestAnimationFrame(render);
    };

    const handlePointerLeave = () => {
      x = 50;
      y = 40;
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    atlas.addEventListener('pointermove', handlePointerMove, { passive: true });
    atlas.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      atlas.removeEventListener('pointermove', handlePointerMove);
      atlas.removeEventListener('pointerleave', handlePointerLeave);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  const panelTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

  const tileTransition = (i: number) =>
    reducedMotion
      ? { duration: 0 }
      : { delay: 0.04 + i * 0.035, duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section id="stack" className="py-24 relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 no-select"
        >
          {t('stack.title')}
        </motion.h2>

        <motion.div
          role="tablist"
          aria-label={t('stack.title')}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 0.15, duration: reducedMotion ? 0 : 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`font-body text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-md border transition-colors duration-300 no-select focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
                }`}
              >
                {filter === allKey ? t('stack.all') : t(`stack.${filter}`)}
              </button>
            );
          })}
        </motion.div>

        <div
          ref={atlasRef}
          className="stack-atlas relative"
          style={{ '--stack-x': '50%', '--stack-y': '40%' } as CSSProperties}
        >
          {!reducedMotion && (
            <div className="stack-spotlight" aria-hidden="true" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              role="tabpanel"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={panelTransition}
              className="relative z-[1] space-y-5"
            >
              {filteredCategories.map((cat, catIndex) => (
                <motion.article
                  key={cat.key}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          delay: catIndex * 0.08,
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className="stack-panel glass-card rounded-lg p-5 sm:p-6"
                >
                  <header className="stack-panel-header mb-4 flex items-center gap-3">
                    <span
                      className="h-px w-6 shrink-0 bg-accent/60"
                      aria-hidden="true"
                    />
                    <h3 className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground no-select">
                      {t(`stack.${cat.key}`)}
                    </h3>
                    <span
                      className="h-px flex-1 bg-border/60"
                      aria-hidden="true"
                    />
                    <span className="font-body text-[10px] tabular-nums tracking-wider text-muted-foreground/80 no-select">
                      {String(cat.items.length).padStart(2, '0')}
                    </span>
                  </header>

                  <ul className="stack-tile-grid list-none m-0 p-0">
                    {cat.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={tileTransition(i)}
                      >
                        <div
                          tabIndex={0}
                          className="stack-tile interactive-surface no-select"
                        >
                          <span className="relative z-[1]">{item}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2 }}
          className="mt-8 font-body text-xs text-muted-foreground no-select"
          aria-live="polite"
        >
          {techCount} {t('stack.technologies')}
        </motion.p>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default StackSection;
