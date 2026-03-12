import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import notoriumImg from '@/assets/notorium.png';
import queirozzfmImg from '@/assets/queirozzfm.png';

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
      'n8n',
      'Next.js',
      'ShadCN UI',
      'TypeScript',
      'Express.js',
      'WhatsApp Server',
      'IA',
    ],
    website: 'https://notorium-ai.vercel.app',
    image: notoriumImg,
  },
  {
    key: 'queirozzfm',
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Lucide-React',
      'HTML',
    ],
    website: 'https://queirozz-fm.vercel.app',
    image: queirozzfmImg,
  },
];

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
                      {(t(`projects.${project.key}.stack`, { returnObjects: true }) as string[]).map((line) => (
                        <li key={line} className="flex gap-2 text-xs text-muted-foreground font-body">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {t(`projects.${project.key}.status`, { defaultValue: '' }) ? (
                    <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider no-select">
                      {t(`projects.${project.key}.status`)}
                    </p>
                  ) : null}
                </div>

                <div className="lg:col-span-8">
                  <p className="font-display text-base text-muted-foreground no-select">
                    {t(`projects.${project.key}.headline`)}
                  </p>

                  <p className="font-body text-sm text-foreground/80 leading-relaxed mt-4">
                    {t(`projects.${project.key}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs px-2.5 py-1 border border-border bg-card/50 text-muted-foreground rounded-md no-select"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mt-6 rounded-lg overflow-hidden border border-border group/img relative"
                    >
                      {project.website ? (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded-lg"
                        >
                          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10" />
                          <img
                            src={project.image}
                            alt={t(`projects.${project.key}.name`)}
                            className="w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.02]"
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10" />
                          <img
                            src={project.image}
                            alt={t(`projects.${project.key}.name`)}
                            className="w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.02]"
                            loading="lazy"
                          />
                        </>
                      )}
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

