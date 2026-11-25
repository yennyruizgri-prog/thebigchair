// src/components/HeroSection.tsx — Sección hero bilingüe (ES / EN) para The Big Chair
import { ArrowRight } from 'lucide-react';
import { HERO_COPY } from '../data/content';

export type HeroLanguage = 'es' | 'en';

interface HeroSectionProps {
  language?: HeroLanguage;
}

// Textos fijos de accesibilidad del Hero (ampliable a más idiomas)
const HERO_UI_TEXT: Record<
  HeroLanguage,
  {
    svgAriaLabel: string;
  }
> = {
  es: {
    svgAriaLabel:
      'Ilustración conceptual de una silla dorada vista desde una perspectiva amplia',
  },
  en: {
    svgAriaLabel:
      'Conceptual illustration of a golden chair seen from a wide perspective',
  },
};

// Resuelve campos de HERO_COPY si vienen como string o { es, en }
function resolveHeroField(
  field: unknown,
  lang: HeroLanguage
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    const dict = field as Record<string, unknown>;
    if (typeof dict[lang] === 'string') return dict[lang] as string;
    if (typeof dict.es === 'string') return dict.es as string;
    if (typeof dict.en === 'string') return dict.en as string;
  }
  return '';
}

export function HeroSection({ language = 'es' }: HeroSectionProps) {
  const ui = HERO_UI_TEXT[language] ?? HERO_UI_TEXT.es;

  // Soporta HERO_COPY como { descriptor, title, ... } o { es: { ... }, en: { ... } }
  const copySource =
    HERO_COPY && typeof HERO_COPY === 'object' && language in (HERO_COPY as Record<string, unknown>)
      ? ((HERO_COPY as Record<string, unknown>)[language] as Record<string, unknown>) ??
        ((HERO_COPY as Record<string, unknown>).es as Record<string, unknown>) ??
        (HERO_COPY as Record<string, unknown>)
      : (HERO_COPY as Record<string, unknown>);

  const descriptor = resolveHeroField(copySource.descriptor, language);
  const title = resolveHeroField(copySource.title, language);
  const description = resolveHeroField(copySource.description, language);
  const ctaLabel = resolveHeroField(copySource.ctaLabel, language);
  const englishClaim = resolveHeroField(copySource.englishClaim, language);
  const supportText = resolveHeroField(copySource.supportText, language);
  const illustrationCaption = resolveHeroField(copySource.illustrationCaption, language);

  return (
    // Inicio: sección hero (mobile-first)
    <section
      id="inicio"
      className="bg-[#020202] text-[#F5F2EC] py-16 sm:py-24 lg:py-28 border-b border-[#3B3937]/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Columna principal de mensaje y CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#A46E28] mb-5">
              {descriptor}
            </p>

            <h1
              className="font-display font-semibold tracking-tight text-[#F5F2EC] leading-[1.1] mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                textWrap: 'balance',
              }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-[#F5F2EC]/85 leading-relaxed max-w-xl mb-9">
              {description}
            </p>

            <a
              href="#soluciones"
              className="inline-flex items-center gap-3 min-h-[48px] px-7 py-3.5 bg-[#A46E28] hover:bg-[#b87e33] text-[#020202] font-semibold text-sm sm:text-base rounded-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F2EC]"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <div className="mt-12 pt-8 border-t border-[#3B3937]/50 w-full max-w-xl space-y-2">
              <p className="text-sm sm:text-base italic text-[#F5F2EC]/75 font-display">
                {englishClaim}
              </p>
              <p className="text-sm font-medium text-[#A46E28]">
                {supportText}
              </p>
            </div>
          </div>

          {/* Columna derecha: ilustración conceptual */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <figure className="w-full max-w-md border border-[#3B3937]/60 bg-[#080808] p-8 sm:p-10">
              <div className="aspect-[4/3] w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 360 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label={ui.svgAriaLabel}
                  className="w-full h-full max-w-[300px]"
                >
                  <line x1="20" y1="220" x2="340" y2="220" stroke="#3B3937" strokeWidth="1" />
                  <line x1="50" y1="220" x2="180" y2="46" stroke="#3B3937" strokeWidth="0.75" strokeDasharray="4 4" />
                  <line x1="310" y1="220" x2="180" y2="46" stroke="#3B3937" strokeWidth="0.75" strokeDasharray="4 4" />
                  <circle cx="180" cy="132" r="86" stroke="#A46E28" strokeOpacity="0.22" strokeWidth="1" />
                  <path d="M132 54H228V154H132V54Z" stroke="#A46E28" strokeWidth="2.2" />
                  <line x1="154" y1="54" x2="154" y2="154" stroke="#A46E28" strokeOpacity="0.45" strokeWidth="1.2" />
                  <line x1="206" y1="54" x2="206" y2="154" stroke="#A46E28" strokeOpacity="0.45" strokeWidth="1.2" />
                  <line x1="132" y1="92" x2="228" y2="92" stroke="#A46E28" strokeOpacity="0.45" strokeWidth="1.2" />
                  <path
                    d="M132 154H228L252 184H108L132 154Z"
                    fill="#A46E28"
                    fillOpacity="0.12"
                    stroke="#A46E28"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path d="M132 126H114L108 158" stroke="#A46E28" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M228 126H246L252 158" stroke="#A46E28" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="108" y1="184" x2="108" y2="232" stroke="#A46E28" strokeWidth="2.2" />
                  <line x1="252" y1="184" x2="252" y2="232" stroke="#A46E28" strokeWidth="2.2" />
                  <line x1="138" y1="184" x2="138" y2="218" stroke="#A46E28" strokeOpacity="0.7" strokeWidth="1.8" />
                  <line x1="222" y1="184" x2="222" y2="218" stroke="#A46E28" strokeOpacity="0.7" strokeWidth="1.8" />
                  <circle cx="180" cy="46" r="3" fill="#A46E28" />
                </svg>
              </div>
              <figcaption className="mt-6 pt-5 border-t border-[#3B3937]/60 text-center text-xs sm:text-sm tracking-wide text-[#A46E28] font-medium">
                {illustrationCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
    // Fin: sección hero
  );
}