// src/components/SolutionsSection.tsx — Sección de soluciones bilingüe (ES / EN) para The Big Chair
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { InterestOption, SERVICE_LINES, SOLUTIONS_HEADER } from '../data/content';

export type SolutionsLanguage = 'es' | 'en';

interface SolutionsSectionProps {
  language?: SolutionsLanguage;
  onSelectInterest: (interest: InterestOption) => void;
}

// Textos fijos de interfaz de la sección (ampliable a más idiomas)
const SOLUTIONS_UI_TEXT: Record<
  SolutionsLanguage,
  {
    kicker: string;
    exploreScopeBtn: string;
    scopeTitle: string;
    consultPrefix: string;
  }
> = {
  es: {
    kicker: 'Soluciones',
    exploreScopeBtn: 'Explorar el alcance',
    scopeTitle: 'Alcance de trabajo',
    consultPrefix: 'Consultar por',
  },
  en: {
    kicker: 'Solutions',
    exploreScopeBtn: 'Explore scope',
    scopeTitle: 'Scope of work',
    consultPrefix: 'Inquire about',
  },
};

// Resuelve campos de texto si vienen como string o { es, en }
function resolveField(
  field: unknown,
  lang: SolutionsLanguage
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
function resolveServices(
  collection: unknown,
  lang: SolutionsLanguage
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

export function SolutionsSection({
  language = 'es',
  onSelectInterest,
}: SolutionsSectionProps) {
  const ui = SOLUTIONS_UI_TEXT[language] ?? SOLUTIONS_UI_TEXT.es;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const headerSource =
    SOLUTIONS_HEADER &&
    typeof SOLUTIONS_HEADER === 'object' &&
    language in (SOLUTIONS_HEADER as Record<string, unknown>)
      ? ((SOLUTIONS_HEADER as Record<string, unknown>)[language] as Record<string, unknown>) ??
        ((SOLUTIONS_HEADER as Record<string, unknown>).es as Record<string, unknown>) ??
        (SOLUTIONS_HEADER as Record<string, unknown>)
      : (SOLUTIONS_HEADER as Record<string, unknown>);

  const headerTitle = resolveField(headerSource.title, language);
  const headerSupport = resolveField(headerSource.support, language);
  const services = resolveServices(SERVICE_LINES, language);

  return (
    // Inicio: sección de soluciones (mobile-first)
    <section
      id="soluciones"
      className="bg-white text-[#020202] py-16 sm:py-24 border-b border-[#3B3937]/12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado de soluciones */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm font-medium text-[#A46E28] mb-3">
            {ui.kicker}
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#020202] leading-[1.15] mb-4"
            style={{ textWrap: 'balance' }}
          >
            {headerTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#3B3937]">
            {headerSupport}
          </p>
        </div>

        {/* Listado de líneas de servicio */}
        <div className="border-t border-[#3B3937]/20 divide-y divide-[#3B3937]/15">
          {services.map((service, index) => {
            const serviceId = String(service.id ?? index);
            const isOpen = openId === serviceId;
            const serviceNumber = resolveField(service.number, language);
            const serviceTitle = resolveField(service.title, language);
            const serviceBrief = resolveField(service.brief, language);
            const serviceTarget = resolveField(service.target, language);
            const serviceScope = resolveField(service.scope, language);
            const interestVal = (service.interestValue ?? serviceTitle) as InterestOption;

            return (
              <article key={serviceId} className="py-7 sm:py-9">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
                  <div className="lg:col-span-4 flex items-baseline gap-4">
                    <span className="font-display text-xl sm:text-2xl font-semibold text-[#A46E28] tabular-nums shrink-0">
                      {serviceNumber}
                    </span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#020202]">
                        {serviceTitle}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#7F2C23]">
                        {serviceBrief}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-sm sm:text-base text-[#3B3937] leading-relaxed">
                      {serviceTarget}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex lg:justify-end">
                    <button
                      type="button"
                      onClick={() => toggleService(serviceId)}
                      aria-expanded={isOpen}
                      aria-controls={`scope-${serviceId}`}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium text-[#020202] border border-[#3B3937]/25 hover:border-[#020202] hover:bg-[#F5F2EC] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46E28]"
                    >
                      <span>{ui.exploreScopeBtn}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#A46E28] transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                {/* Inicio: panel desplegable de alcance */}
                {isOpen && (
                  <div
                    id={`scope-${serviceId}`}
                    className="mt-6 lg:ml-[calc(33.333%+0.75rem)] bg-[#F5F2EC] border border-[#3B3937]/15 p-5 sm:p-6"
                  >
                    <p className="text-xs font-medium text-[#A46E28] mb-2">
                      {ui.scopeTitle}
                    </p>
                    <p className="text-sm sm:text-base text-[#3B3937] leading-relaxed mb-5">
                      {serviceScope}
                    </p>
                    <a
                      href="#contacto"
                      onClick={() => onSelectInterest(interestVal)}
                      className="inline-flex items-center gap-2 min-h-[40px] text-sm font-semibold text-[#020202] hover:text-[#7F2C23] transition-colors underline underline-offset-4 decoration-[#A46E28]"
                    >
                      <span>
                        {ui.consultPrefix} {serviceTitle}
                      </span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                )}
                {/* Fin: panel desplegable de alcance */}
              </article>
            );
          })}
        </div>
      </div>
    </section>
    // Fin: sección de soluciones
  );
}