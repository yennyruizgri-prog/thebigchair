// src/components/TeamSection.tsx — Sección de equipo bilingüe (ES / EN) para The Big Chair
import { TEAM_COPY } from '../data/content';

export type TeamLanguage = 'es' | 'en';

interface TeamSectionProps {
  language?: TeamLanguage;
}

// Resuelve textos si vienen como string o { es, en }
function resolveField(
  field: unknown,
  lang: TeamLanguage
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
function resolveMembers(
  collection: unknown,
  lang: TeamLanguage
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

export function TeamSection({ language = 'es' }: TeamSectionProps) {
  const copySource =
    TEAM_COPY &&
    typeof TEAM_COPY === 'object' &&
    language in (TEAM_COPY as Record<string, unknown>)
      ? ((TEAM_COPY as Record<string, unknown>)[language] as Record<string, unknown>) ??
        ((TEAM_COPY as Record<string, unknown>).es as Record<string, unknown>) ??
        (TEAM_COPY as Record<string, unknown>)
      : (TEAM_COPY as Record<string, unknown>);

  const title = resolveField(copySource.title, language);
  const subtitle = resolveField(copySource.subtitle, language);
  const origin = resolveField(copySource.origin, language);
  const members = resolveMembers(copySource.members, language);

  return (
    // Inicio: sección de equipo (mobile-first)
    <section
      id="nosotros"
      className="bg-white text-[#020202] py-16 sm:py-24 border-b border-[#3B3937]/12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado de sección */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-14 items-end">
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm font-medium text-[#A46E28] mb-3">
              {title}
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#020202] leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {subtitle}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <p className="text-sm sm:text-base text-[#3B3937]">
              {origin}
            </p>
          </div>
        </div>

        {/* Tarjetas del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {members.map((member, index) => {
            const memberInitials = resolveField(member.initials, language);
            const memberName = resolveField(member.name, language);
            const memberRole = resolveField(member.role, language);
            const memberBio = resolveField(member.bio, language);

            return (
              <article
                key={`${memberName}-${index}`}
                className="border border-[#3B3937]/15 bg-[#FAF8F5] p-7 sm:p-9 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      aria-hidden="true"
                      className="w-14 h-14 bg-[#020202] text-[#A46E28] font-display text-lg font-semibold flex items-center justify-center shrink-0"
                    >
                      {memberInitials}
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#020202]">
                        {memberName}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#7F2C23] mt-0.5">
                        {memberRole}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#3B3937] leading-relaxed">
                    {memberBio}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
    // Fin: sección de equipo
  );
}