// src/components/MethodologySection.tsx — Sección de metodología bilingüe (ES / EN) para The Big Chair
import { METHODOLOGY_HEADER, METHODOLOGY_STEPS } from '../data/content';

export type MethodologyLanguage = 'es' | 'en';

interface MethodologySectionProps {
  language?: MethodologyLanguage;
}

// Textos fijos de interfaz de la sección (ampliable a más idiomas)
const METHODOLOGY_UI_TEXT: Record<
  MethodologyLanguage,
  {
    kicker: string;
  }
> = {
  es: {
    kicker: 'Metodología',
  },
  en: {
    kicker: 'Methodology',
  },
};

// Resuelve textos si vienen como string o { es, en }
function resolveField(
  field: unknown,
  lang: MethodologyLanguage
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

// Lee arrays readonly o diccionarios { es, en } de forma segura para TypeScript
function resolveSteps(
  collection: unknown,
  lang: MethodologyLanguage
): any[] {
  if (Array.isArray(collection)) {
    return collection;
  }
  if (collection && typeof collection === 'object') {
    const dict = collection as Record<string, unknown>;
    if (Array.isArray(dict[lang])) return dict[lang] as any[];
    if (Array.isArray(dict.es)) return dict.es as any[];
    if (Array.isArray(dict.en)) return dict.en as any[];
  }
  return [];
}

export function MethodologySection({
  language = 'es',
}: MethodologySectionProps) {
  const ui = METHODOLOGY_UI_TEXT[language] ?? METHODOLOGY_UI_TEXT.es;

  const headerSource =
    METHODOLOGY_HEADER &&
    typeof METHODOLOGY_HEADER === 'object' &&
    language in (METHODOLOGY_HEADER as Record<string, unknown>)
      ? ((METHODOLOGY_HEADER as Record<string, unknown>)[language] as Record<string, unknown>) ??
        ((METHODOLOGY_HEADER as Record<string, unknown>).es as Record<string, unknown>) ??
        (METHODOLOGY_HEADER as Record<string, unknown>)
      : (METHODOLOGY_HEADER as Record<string, unknown>);

  const title = resolveField(headerSource.title, language);
  const lead = resolveField(headerSource.lead, language);
  const steps = resolveSteps(METHODOLOGY_STEPS, language);

  return (
    // Inicio: sección de metodología (mobile-first)
    <section
      id="como-trabajamos"
      className="bg-[#7F2C23] text-[#F5F2EC] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium text-[#F5F2EC]/80 mb-3">
            {ui.kicker}
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F5F2EC] leading-[1.15] mb-3"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h2>
          <p className="text-base sm:text-xl text-[#F5F2EC]/90">
            {lead}
          </p>
        </div>

        {/* Pasos de la metodología */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-8 border-t border-[#F5F2EC]/20 pt-10">
          {steps.map((step, index) => {
            const stepNumber = resolveField(step.number, language) || `0${index + 1}`;
            const stepTitle = resolveField(step.title, language);
            const stepDescription = resolveField(step.description, language);

            return (
              <div key={`${stepNumber}-${index}`} className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F2EC]/95 tabular-nums mb-3">
                  {stepNumber}
                </span>
                <h3 className="font-display text-base sm:text-lg font-semibold text-[#F5F2EC] mb-2.5 leading-snug">
                  {stepTitle}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#F5F2EC]/85 leading-relaxed">
                  {stepDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    // Fin: sección de metodología
  );
}