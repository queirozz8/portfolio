import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Instagram, MessageCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const SITE_URL = 'https://queirozz-systems.vercel.app';
const WHATSAPP_URL = {
  pt: 'https://wa.me/5513991191309?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20or%C3%A7amento%20para%20um%20projeto.',
  en: 'https://wa.me/5513991191309?text=Hello!%20I%27d%20like%20to%20discuss%20a%20project.',
} as const;
const INSTAGRAM_URL = 'https://www.instagram.com/queirozzsystems/';

const OFFERS = ['automation', 'systems', 'websites'] as const;
const STEPS = ['understand', 'define', 'build'] as const;
const FLOWS = ['booking', 'crm', 'documents'] as const;

const DELIVERIES: Array<{ key: string; href?: string }> = [
  { key: 'pompeia', href: 'https://pompeia-studio.vercel.app' },
  { key: 'styllus', href: 'https://styllusbarbershop.vercel.app' },
  { key: 'jorge', href: 'https://jorge-barbershop-landing.vercel.app' },
  { key: 'diego', href: 'https://diegospizzaria.vercel.app' },
  { key: 'dentalsc', href: 'https://dentalsc.com.br' },
  { key: 'dentalis', href: 'https://dentalisclinical.com.br' },
  { key: 'vip', href: 'https://vipadm.com.br' },
  { key: 'vem' },
];

const linkClass =
  'inline-flex items-center gap-2 rounded-md font-body text-sm uppercase tracking-widest transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const SystemsSection = () => {
  const { t, i18n } = useTranslation();
  const reducedMotion = useReducedMotion();
  const lang = i18n.language.slice(0, 2) === 'en' ? 'en' : 'pt';
  const siteUrl = `${SITE_URL}/${lang === 'en' ? 'en' : 'pt-BR'}`;
  const whatsappUrl = WHATSAPP_URL[lang];

  return (
    <section id="systems" className="py-24 relative" aria-labelledby="systems-title">
      <div className="absolute top-24 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="brand-mark flex h-8 w-9 items-center justify-center rounded-sm border border-accent/30 bg-accent/5">
              <img
                src="/images/queirozz_logo.svg"
                alt=""
                aria-hidden="true"
                className="h-5 w-7 object-contain"
              />
            </span>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent no-select">
              {t('systems.eyebrow')}
            </p>
          </div>

          <h2
            id="systems-title"
            className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 no-select"
          >
            {t('systems.title')}
          </h2>

          <p className="font-display text-2xl md:text-4xl font-bold leading-tight text-foreground max-w-3xl no-select">
            {t('systems.taglineLead')}{' '}
            <span className="accent-gradient-text">{t('systems.taglineRest')}</span>
          </p>

          <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl mt-6">
            {t('systems.summary')}
          </p>

          <p className="font-body text-sm text-muted-foreground mt-3 no-select">
            {t('systems.founder')}
            <span className="mx-2 text-border">/</span>
            {t('systems.languages')}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90`}
            >
              {t('systems.siteCta')}
              <ExternalLink size={14} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} px-6 py-3 border border-border text-muted-foreground hover:border-accent hover:text-accent`}
            >
              <MessageCircle size={14} />
              {t('systems.whatsappCta')}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} px-6 py-3 border border-border text-muted-foreground hover:border-accent hover:text-accent`}
            >
              <Instagram size={14} />
              {t('systems.instagramCta')}
            </a>
          </div>
        </motion.div>

        <div className="mt-16">
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 no-select">
            {t('systems.offersLabel')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OFFERS.map((key, idx) => (
              <motion.article
                key={key}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="glass-card interactive-surface p-6 rounded-lg"
              >
                <h4 className="font-display text-lg font-semibold text-foreground mb-2 no-select">
                  {t(`systems.offers.${key}.title`)}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {t(`systems.offers.${key}.description`)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2 no-select">
            {t('systems.deliveriesLabel')}
          </h3>
          <ul className="border-t border-border">
            {DELIVERIES.map((item) => {
              const name = t(`systems.deliveries.${item.key}.name`);
              return (
                <li key={item.key} className="border-b border-border">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 md:items-baseline">
                    <div className="md:col-span-4">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground hover:text-accent transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          {name}
                          <ExternalLink size={14} className="opacity-70" />
                        </a>
                      ) : (
                        <p className="font-display text-lg font-semibold text-foreground">{name}</p>
                      )}
                    </div>
                    <p className="md:col-span-3 font-body text-xs uppercase tracking-widest text-accent no-select">
                      {t(`systems.deliveries.${item.key}.meta`)}
                    </p>
                    <p className="md:col-span-5 font-body text-sm text-muted-foreground leading-relaxed">
                      {t(`systems.deliveries.${item.key}.detail`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h3 className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 no-select">
              {t('systems.processLabel')}
            </h3>
            <ol className="space-y-4">
              {STEPS.map((key, idx) => (
                <li key={key} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-display text-sm text-accent pt-0.5 no-select">0{idx + 1}</span>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground no-select">
                      {t(`systems.steps.${key}.title`)}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1">
                      {t(`systems.steps.${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 no-select">
              {t('systems.flowsLabel')}
            </h3>
            <div className="glass-card rounded-lg p-6">
              <ul className="space-y-3">
                {FLOWS.map((key) => (
                  <li key={key} className="font-display text-base text-foreground">
                    {t(`systems.flows.${key}`)}
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mt-4">
                {t('systems.flowsNote')}
              </p>
              <a
                href={`${siteUrl}#automacoes`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} mt-5 text-accent hover:text-foreground`}
              >
                {t('systems.flowsCta')}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default SystemsSection;
