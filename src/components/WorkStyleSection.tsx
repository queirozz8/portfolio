import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Crosshair, Shield, MessageSquare, RefreshCw } from 'lucide-react';

const icons = [Crosshair, Shield, MessageSquare, RefreshCw];
const iconColors = ['text-accent', 'text-glow', 'text-accent', 'text-glow'];

const WorkStyleSection = () => {
  const { t } = useTranslation();

  const items = t('workStyle.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-glow/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16 no-select"
        >
          {t('workStyle.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass-card p-8 rounded-lg group cursor-default transition-all duration-300 hover:border-accent/30"
              >
                <div className={`w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300`}>
                  <Icon
                    size={20}
                    className={`${iconColors[idx]} transition-colors duration-200`}
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 no-select">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed no-select">
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
