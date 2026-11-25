// src/components/PerspectiveSection.tsx — Sección de perspectiva bilingüe (ES / EN) para The Big Chair
import { PERSPECTIVE_COPY } from '../data/content';

export type PerspectiveLanguage = 'es' | 'en';

interface PerspectiveSectionProps {
  language?: PerspectiveLanguage;
}

interface PerspectivePillar {
  label: string;
  description: string;
}

// Textos fijos de los tres ejes inferiores (ampliable a más idiomas)
const PERSPECTIVE_UI_TEXT: Record<
  PerspectiveLanguage,
  {
    pillars: PerspectivePillar[];
  }
> = {
  es: {
    pillars: [
      {
        label: '01 · Estrategia',
        description:
          'Prioridades claras conectadas con las capacidades reales del negocio.',
      },
      {
        label: '02 · Personas',
        description:
          'Roles, liderazgo y cultura alineados para sostener las decisiones.',
      },
      {
        label: '03 · Proyectos',
        description:
          'Coordinación, seguimiento y ejecución coherente en la práctica.',
      },
    ],
  },
  en: {
    pillars: [
      {
        label: '01 · Strategy',
        description:
          'Clear priorities connected to the real capabilities of the business.',
      },
      {
        label: '02 · People',
        description:
          'Roles, leadership, and culture aligned to sustain decisions.',
      },
      {
        label: '03 · Projects',
        description:
          'Coordination, follow-through, and coherent execution in practice.',
      },
    ],
  },
};

// Resuelve textos si vienen como string o { es, en }
function resolveField(
  field: unknown,
  lang: PerspectiveLanguage
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

// Resuelve arrays de texto si vienen como array o { es: [...], en: [...] }
function resolveArrayField(
  field: unknown,
  lang: PerspectiveLanguage
): string[] {
  if (!field) return [];
  if (Array.isArray(field)) {
    return field.map((item) => resolveField(item, lang));
  }
  if (typeof field === 'object') {
    const dict = field as Record<string, unknown>;
    const candidate = dict[lang] ?? dict.es ?? dict.en;
    if (Array.isArray(candidate)) {
      return candidate.map((item) => resolveField(item, lang));
    }
  }
  return [];
}

export function PerspectiveSection({
  language = 'es',
}: PerspectiveSectionProps) {
  const ui = PERSPECTIVE_UI_TEXT[language] ?? PERSPECTIVE_UI_TEXT.es;

  const copySource =
    PERSPECTIVE_COPY &&
    typeof PERSPECTIVE_COPY === 'object' &&
    language in (PERSPECTIVE_COPY as Record<string, unknown>)
      ? ((PERSPECTIVE_COPY as Record<string, unknown>)[language] as Record<string, unknown>) ??
        ((PERSPECTIVE_COPY as Record<string, unknown>).es as Record<string, unknown>) ??
        (PERSPECTIVE_COPY as Record<string, unknown>)
      : (PERSPECTIVE_COPY as Record<string, unknown>);

  const kicker = resolveField(copySource.kicker, language);
  const title = resolveField(copySource.title, language);
  const paragraphs = resolveArrayField(copySource.paragraphs, language);

  return (
    // Inicio: sección de perspectiva (mobile-first)
    <section
      id="perspectiva"
      className="bg-[#F5F2EC] text-[#020202] py-16 sm:py-24 border-b border-[#3B3937]/12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Columna izquierda: antetítulo y título */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-medium text-[#A46E28] mb-3">
              {kicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-tight text-[#020202] leading-[1.18]"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h2>
          </div>

          {/* Columna derecha: párrafos y tres ejes */}
          <div className="lg:col-span-7 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base sm:text-lg text-[#3B3937] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {/* Inicio: tres ejes de perspectiva */}
            <div className="pt-8 mt-8 border-t border-[#3B3937]/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ui.pillars.map((pillar) => (
                <div key={pillar.label}>
                  <p className="text-xs font-medium text-[#A46E28] tabular-nums mb-1">
                    {pillar.label}
                  </p>
                  <p className="text-sm text-[#3B3937]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Fin: tres ejes de perspectiva */}
          </div>
        </div>
      </div>
    </section>
    // Fin: sección de perspectiva
  );
}