import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
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
    tags: ['React', 'TypeScript', 'ShadCN UI', 'cPanel', 'Frontend'],
    website: 'https://vipadm.com.br',
    image: vipHero,
  },
  {
    key: 'frilic',
    tags: ['Node.js', 'TypeScript', 'whatsapp-web.js', 'Backend', 'Automation'],
  },
  {
    key: 'pompeia',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Monorepo', 'WhatsApp Bot', 'NTFY'],
    website: 'https://pompeia-studio.vercel.app',
    image: pompeiaHero,
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
              className="border-t border-border py-10 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <div className="flex items-start gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 no-select">
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
                  <p className="font-body text-sm text-muted-foreground mt-1 no-select">
                    {t('experience.role_dev')}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider no-select">
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
                        className="font-body text-xs px-2 py-1 border border-border text-muted-foreground rounded-sm no-select"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project screenshot */}
                  {exp.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mt-6 rounded-lg overflow-hidden border border-border group/img relative"
                    >
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10" />
                      <img
                        src={exp.image}
                        alt={t(`experience.${exp.key}.company`)}
                        className="w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.02]"
                      />
                    </motion.div>
                  )}

                  {exp.hasTestimonial && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="mt-6 border-l-2 border-accent pl-4 bg-accent-soft rounded-r-md py-3 pr-3"
                    >
                      <Quote size={14} className="text-accent mb-2" />
                      <p className="font-body text-sm italic text-foreground/70 leading-relaxed">
                        {t(`experience.${exp.key}.testimonial`)}
                      </p>
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
