import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';

interface ExperienceItem {
  key: string;
  tags: string[];
  website?: string;
  hasTestimonial?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    key: 'vip',
    tags: ['React', 'TypeScript', 'ShadCN UI', 'cPanel', 'Frontend'],
    website: 'https://vipadm.com.br',
  },
  {
    key: 'frilic',
    tags: ['Node.js', 'TypeScript', 'whatsapp-web.js', 'Backend', 'Automation'],
  },
  {
    key: 'pompeia',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Monorepo', 'WhatsApp Bot', 'NTFY'],
  },
  {
    key: 'vem',
    tags: ['Node.js', 'JavaScript', 'WhatsApp Bot', 'Automation'],
    hasTestimonial: true,
  },
];

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
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16"
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
              className="border-t border-border py-10 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <div className="flex items-start gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                      {t(`experience.${exp.key}.company`)}
                    </h3>
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors mt-1"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {t('experience.role_dev')}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {t(`experience.${exp.key}.period`)} · {t('experience.remote')}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    {t(`experience.${exp.key}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs px-2 py-1 border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.hasTestimonial && (
                    <div className="mt-6 border-l-2 border-accent pl-4">
                      <Quote size={14} className="text-accent mb-2" />
                      <p className="font-body text-sm italic text-foreground/70 leading-relaxed">
                        {t(`experience.${exp.key}.testimonial`)}
                      </p>
                    </div>
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
