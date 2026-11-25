// src/components/Footer.tsx — Pie de página bilingüe (ES / EN) para The Big Chair
import { useState } from 'react';
import { Check, Copy, Instagram, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { ALL_SECTIONS, BRAND, LEGAL_DOCUMENTS, LegalTabId } from '../data/content';

export type FooterLanguage = 'es' | 'en';

interface FooterProps {
  language?: FooterLanguage;
  onOpenLegal: (tab: LegalTabId) => void;
  onOpenCookieSettings?: () => void;
}

// Diccionario de textos fijos del Footer (ampliable a más idiomas)
const FOOTER_UI_TEXT: Record<
  FooterLanguage,
  {
    homeAriaLabel: string;
    geoLabel: string;
    sectionsTitle: string;
    contactTitle: string;
    copiedEmailBtn: string;
    copyEmailBtn: string;
    linkedinPrefix: string;
    legalTitle: string;
    cookieSettingsBtn: string;
    rightsText: string;
    privacyBottomNote: string;
  }
> = {
  es: {
    homeAriaLabel: 'Volver al inicio de The Big Chair',
    geoLabel: 'Vocación de conexión internacional',
    sectionsTitle: 'Secciones',
    contactTitle: 'Redes y contacto',
    copiedEmailBtn: 'Correo copiado',
    copyEmailBtn: 'Copiar correo',
    linkedinPrefix: 'LinkedIn',
    legalTitle: 'Legal y privacidad',
    cookieSettingsBtn: 'Configurar cookies',
    rightsText: 'Todos los derechos reservados.',
    privacyBottomNote: 'Gestión de preferencias de privacidad y consentimiento en formularios.',
  },
  en: {
    homeAriaLabel: 'Back to The Big Chair home',
    geoLabel: 'International connection focus',
    sectionsTitle: 'Sections',
    contactTitle: 'Channels & contact',
    copiedEmailBtn: 'Email copied',
    copyEmailBtn: 'Copy email',
    linkedinPrefix: 'LinkedIn',
    legalTitle: 'Legal & privacy',
    cookieSettingsBtn: 'Cookie settings',
    rightsText: 'All rights reserved.',
    privacyBottomNote: 'Privacy preference management and form consent controls.',
  },
};

// Resuelve campos de BRAND o ítems si vienen como string o { es, en }
function resolveText(
  value: string | Record<string, string> | undefined,
  lang: FooterLanguage
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value.es ?? value.en ?? '';
}

// Lee arrays readonly o diccionarios { es, en } de forma segura para TypeScript
function resolveCollection(
  collection: unknown,
  lang: FooterLanguage
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

export function Footer({
  language = 'es',
  onOpenLegal,
  onOpenCookieSettings,
}: FooterProps) {
  const ui = FOOTER_UI_TEXT[language] ?? FOOTER_UI_TEXT.es;
  const brandAny = BRAND as Record<string, any>;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  const descriptorText = resolveText(brandAny.descriptor, language);
  const supportLineText = resolveText(brandAny.supportLine, language);
  const linkedinLabelText = resolveText(brandAny.linkedinLabel, language);

  const sectionsList = resolveCollection(ALL_SECTIONS, language);
  const legalDocsList = resolveCollection(LEGAL_DOCUMENTS, language);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    // Inicio: pie de página (mobile-first)
    <footer className="bg-[#020202] text-[#F5F2EC] pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3B3937]/50">
          {/* Columna 1: marca y alcance */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#inicio"
              aria-label={ui.homeAriaLabel}
              className="inline-block"
            >
              {!logoError ? (
                <img
                  src={BRAND.logoPath}
                  alt={BRAND.fullName}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="h-11 w-auto object-contain invert hue-rotate-180 mix-blend-screen brightness-110"
                />
              ) : (
                <span className="font-display text-xl font-semibold text-[#A46E28]">
                  {BRAND.fullName}
                </span>
              )}
            </a>

            <p className="text-xs sm:text-sm font-medium text-[#A46E28]">
              {descriptorText}
            </p>

            <p className="text-sm text-[#F5F2EC]/80 leading-relaxed max-w-xs">
              {supportLineText}
            </p>

            <p className="inline-flex items-center gap-2 text-xs text-[#F5F2EC]/65">
              <MapPin className="w-3.5 h-3.5 text-[#A46E28] shrink-0" aria-hidden="true" />
              <span>{ui.geoLabel}</span>
            </p>
          </div>

          {/* Columna 2: secciones */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#A46E28] mb-4">
              {ui.sectionsTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F2EC]/80">
              {sectionsList.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-[#F5F2EC] transition-colors">
                    {resolveText(item.label, language)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: redes y contacto */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-wide text-[#A46E28]">
              {ui.contactTitle}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex flex-col items-start gap-1.5">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 text-[#F5F2EC]/85 hover:text-[#A46E28] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
                  <span>{BRAND.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 min-h-[36px] text-xs text-[#F5F2EC]/65 hover:text-[#F5F2EC] transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-[#A46E28]" aria-hidden="true" />
                      <span>{ui.copiedEmailBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" aria-hidden="true" />
                      <span>{ui.copyEmailBtn}</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F5F2EC]/85 hover:text-[#A46E28] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
                <span>Instagram · {BRAND.instagramHandle}</span>
              </a>

              <a
                href={BRAND.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F5F2EC]/85 hover:text-[#A46E28] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
                <span>
                  {ui.linkedinPrefix} · {linkedinLabelText}
                </span>
              </a>
            </div>
          </div>

          {/* Columna 4: legal y privacidad */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-wide text-[#A46E28] mb-4">
              {ui.legalTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F2EC]/80">
              {legalDocsList.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    onClick={() => onOpenLegal(doc.id)}
                    className="min-h-[36px] text-left hover:text-[#F5F2EC] transition-colors underline-offset-4 hover:underline cursor-pointer"
                  >
                    {resolveText(doc.label, language)}
                  </button>
                </li>
              ))}
              {onOpenCookieSettings && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenCookieSettings}
                    className="min-h-[36px] text-left hover:text-[#F5F2EC] transition-colors underline-offset-4 hover:underline cursor-pointer"
                  >
                    {ui.cookieSettingsBtn}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F5F2EC]/65">
          <p className="tabular-nums">
            © {currentYear} {BRAND.fullName}. {ui.rightsText}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A46E28] shrink-0" aria-hidden="true" />
            <span>{ui.privacyBottomNote}</span>
          </p>
        </div>
      </div>
    </footer>
    // Fin: pie de página
  );
}