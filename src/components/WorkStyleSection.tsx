import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Crosshair, Shield, MessageSquare, RefreshCw } from 'lucide-react';

const icons = [Crosshair, Shield, MessageSquare, RefreshCw];

const WorkStyleSection = () => {
  const { t } = useTranslation();

  const items = t('workStyle.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16"
        >
          {t('workStyle.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-background p-8 group"
              >
                <Icon
                  size={20}
                  className="text-muted-foreground group-hover:text-accent transition-colors duration-200 mb-4"
                />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default WorkStyleSection;
