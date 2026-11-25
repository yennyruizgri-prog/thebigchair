// src/components/Navbar.tsx — Barra de navegación bilingüe (ES / EN) para The Big Chair
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ALL_SECTIONS, BRAND, LegalTabId, NAV_ITEMS } from '../data/content';

export type NavbarLanguage = 'es' | 'en';

interface NavbarProps {
  language?: NavbarLanguage;
  onChangeLanguage?: (lang: NavbarLanguage) => void;
  onOpenLegal: (tab: LegalTabId) => void;
}

// Diccionario de textos fijos de interfaz del Navbar (ampliable a más idiomas)
const NAVBAR_UI_TEXT: Record<
  NavbarLanguage,
  {
    homeAriaLabel: string;
    mainNavAriaLabel: string;
    ctaLabel: string;
    openMenuAriaLabel: string;
    closeMenuAriaLabel: string;
    mobileNavAriaLabel: string;
    privacyButton: string;
    legalNoticeButton: string;
    switchLangAriaLabel: string;
  }
> = {
  es: {
    homeAriaLabel: 'Ir al inicio de The Big Chair Consultora',
    mainNavAriaLabel: 'Navegación principal',
    ctaLabel: 'Conversemos',
    openMenuAriaLabel: 'Abrir menú de navegación',
    closeMenuAriaLabel: 'Cerrar menú de navegación',
    mobileNavAriaLabel: 'Navegación móvil completa',
    privacyButton: 'Privacidad y Seguridad',
    legalNoticeButton: 'Aviso Legal',
    switchLangAriaLabel: 'Cambiar idioma a inglés',
  },
  en: {
    homeAriaLabel: 'Go to The Big Chair Consultora home',
    mainNavAriaLabel: 'Main navigation',
    ctaLabel: "Let's Talk",
    openMenuAriaLabel: 'Open navigation menu',
    closeMenuAriaLabel: 'Close navigation menu',
    mobileNavAriaLabel: 'Full mobile navigation',
    privacyButton: 'Privacy & Security',
    legalNoticeButton: 'Legal Notice',
    switchLangAriaLabel: 'Switch language to Spanish',
  },
};

// Permite que los ítems de content.ts sean string o { es, en }
function resolveLabel(
  label: string | Record<string, string> | undefined,
  lang: NavbarLanguage
): string {
  if (!label) return '';
  if (typeof label === 'string') return label;
  return label[lang] ?? label.es ?? label.en ?? '';
}

export function Navbar({
  language,
  onChangeLanguage,
  onOpenLegal,
}: NavbarProps) {
  // Estado local si el padre aún no controla el idioma globalmente
  const [internalLang, setInternalLang] = useState<NavbarLanguage>('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const activeLang: NavbarLanguage = language ?? internalLang;

  const handleToggleLanguage = () => {
    const nextLang: NavbarLanguage = activeLang === 'es' ? 'en' : 'es';
    if (onChangeLanguage) {
      onChangeLanguage(nextLang);
    } else {
      setInternalLang(nextLang);
    }
  };

  // Sincroniza el atributo lang del documento y permite cerrar el menú con Escape
  useEffect(() => {
    document.documentElement.lang = activeLang;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLang]);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  const ui = NAVBAR_UI_TEXT[activeLang] ?? NAVBAR_UI_TEXT.es;

  return (
    // Inicio: cabecera superior pegajosa (mobile-first)
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#3B3937]/12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Marca / Logotipo principal */}
        <a
          href="#inicio"
          aria-label={ui.homeAriaLabel}
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A46E28] rounded"
        >
          {!logoError ? (
            <img
              src={BRAND.logoPath}
              alt={BRAND.fullName}
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-9 sm:h-10 w-auto object-contain mix-blend-multiply"
            />
          ) : (
            <span className="font-display text-lg font-semibold tracking-tight text-[#020202] whitespace-nowrap">
              {BRAND.name}
            </span>
          )}
        </a>

        {/* Navegación principal en escritorio */}
        <nav
          aria-label={ui.mainNavAriaLabel}
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#3B3937]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 hover:text-[#020202] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-1 after:w-full after:h-px after:bg-[#A46E28] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-150 after:origin-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A46E28]"
            >
              {resolveLabel(item.label, activeLang)}
            </a>
          ))}
        </nav>

        {/* Acciones: selector ES/EN, botón CTA y menú móvil */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleLanguage}
            aria-label={ui.switchLangAriaLabel}
            className="inline-flex items-center justify-center min-w-[44px] min-h-[40px] sm:min-h-[42px] px-2.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#020202] border border-[#3B3937]/25 hover:border-[#A46E28] hover:bg-[#F5F2EC] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46E28]"
          >
            {activeLang === 'es' ? 'EN' : 'ES'}
          </button>

          <a
            href="#contacto"
            className="inline-flex items-center justify-center min-h-[40px] sm:min-h-[42px] px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium text-[#F5F2EC] bg-[#020202] hover:bg-[#3B3937] rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46E28]"
          >
            {ui.ctaLabel}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? ui.closeMenuAriaLabel : ui.openMenuAriaLabel}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-[#020202] hover:bg-[#F5F2EC] rounded-sm transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46E28]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Inicio: menú desplegable móvil */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label={ui.mobileNavAriaLabel}
          className="md:hidden bg-[#F5F2EC] border-t border-[#3B3937]/15 px-4 py-5"
        >
          <ul className="flex flex-col divide-y divide-[#3B3937]/10">
            {ALL_SECTIONS.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between min-h-[44px] py-2.5 text-base font-medium text-[#020202] hover:text-[#7F2C23] transition-colors"
                >
                  <span>{resolveLabel(section.label, activeLang)}</span>
                  <span className="text-xs text-[#A46E28]" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Accesos legales en menú móvil */}
          <div className="mt-4 pt-4 border-t border-[#3B3937]/15 flex flex-wrap items-center gap-4 text-xs text-[#3B3937]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('privacidad');
              }}
              className="min-h-[44px] px-1 font-medium underline underline-offset-4 hover:text-[#020202] cursor-pointer"
            >
              {ui.privacyButton}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('aviso');
              }}
              className="min-h-[44px] px-1 font-medium underline underline-offset-4 hover:text-[#020202] cursor-pointer"
            >
              {ui.legalNoticeButton}
            </button>
          </div>
        </nav>
      )}
      {/* Fin: menú desplegable móvil */}
    </header>
    // Fin: cabecera superior
  );
}