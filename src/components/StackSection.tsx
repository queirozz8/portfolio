import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const stackData = {
  languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python (básico)'],
  frontend: ['Next.js', 'React.js', 'ShadCN UI', 'Tailwind CSS'],
  backend: ['Express.js', 'Node.js', 'SQL & NoSQL', 'Supabase', 'n8n', 'Docker', 'cPanel'],
  tools: ['AI Tools', 'Linux', 'Git', 'Inglês (nível B2)'],
};

const categoryColors: Record<string, string> = {
  languages: 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 hover:border-accent',
  frontend: 'bg-glow/10 border-glow/30 text-glow hover:bg-glow/20 hover:border-glow',
  backend: 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 hover:border-accent',
  tools: 'bg-glow/10 border-glow/30 text-glow hover:bg-glow/20 hover:border-glow',
};

const allKey = 'all';

const StackSection = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>(allKey);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const categories = [
    { key: 'languages', items: stackData.languages },
    { key: 'frontend', items: stackData.frontend },
    { key: 'backend', items: stackData.backend },
    { key: 'tools', items: stackData.tools },
  ];

  const filters = [allKey, ...categories.map(c => c.key)];
  const filteredCategories = activeFilter === allKey
    ? categories
    : categories.filter(c => c.key === activeFilter);

  return (
    <section id="stack" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 no-select"
        >
          {t('stack.title')}
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-body text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-md border transition-all duration-300 no-select ${
                activeFilter === filter
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {filter === allKey ? (t('stack.all') || 'All') : t(`stack.${filter}`)}
            </button>
          ))}
        </motion.div>

        {/* Tags cloud */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {filteredCategories.map((cat) => (
              <div key={cat.key}>
                {activeFilter === allKey && (
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 no-select">
                    {t(`stack.${cat.key}`)}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredItem(item)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className={`relative text-sm px-4 py-2 border rounded-md cursor-default font-body transition-all duration-300 no-select ${categoryColors[cat.key]}`}
                    >
                      {item}
                      {hoveredItem === item && (
                        <motion.div
                          layoutId="stack-glow"
                          className="absolute inset-0 rounded-md border-2 border-accent pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Item count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 font-body text-xs text-muted-foreground no-select"
        >
          {filteredCategories.reduce((sum, c) => sum + c.items.length, 0)} {t('stack.technologies') || 'technologies'}
        </motion.div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default StackSection;
