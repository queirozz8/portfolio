import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const stackData = {
  languages: ['TypeScript', 'JavaScript', 'Node.js', 'HTML', 'CSS'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'ShadCN UI'],
  backend: ['Node.js', 'REST APIs', 'cPanel', 'Domain Management'],
  tools: ['Git', 'GitHub', 'WhatsApp Automation', 'NTFY', 'Monorepos', 'AI Tools'],
};

const StackSection = () => {
  const { t } = useTranslation();

  const categories = [
    { key: 'languages', items: stackData.languages },
    { key: 'frontend', items: stackData.frontend },
    { key: 'backend', items: stackData.backend },
    { key: 'tools', items: stackData.tools },
  ];

  return (
    <section id="stack" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16"
        >
          {t('stack.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
            >
              <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                {t(`stack.${cat.key}`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <Badge key={item} variant="tech" className="text-sm px-3 py-1.5">
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default StackSection;
