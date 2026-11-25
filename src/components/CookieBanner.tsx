// src/components/CookieBanner.tsx — Banner de consentimiento de cookies bilingüe (ES / EN)
import React, { useEffect, useState } from 'react';
import { Cookie, X, SlidersHorizontal } from 'lucide-react';

export type CookieBannerLanguage = 'es' | 'en';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'thebigchair_cookie_consent_v1';

// Diccionario de textos de interfaz del banner (ampliable a más idiomas)
const COOKIE_UI_TEXT: Record<
  CookieBannerLanguage,
  {
    regionAriaLabel: string;
    title: string;
    descBeforeLink: string;
    policyLinkText: string;
    descAfterLink: string;
    closeAriaLabel: string;
    necessaryTitle: string;
    necessaryDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    marketingTitle: string;
    marketingDesc: string;
    rejectBtn: string;
    configureBtn: string;
    savePrefsBtn: string;
    acceptBtn: string;
  }
> = {
  es: {
    regionAriaLabel: 'Banner de consentimiento de cookies',
    title: 'Preferencias de Cookies y Privacidad',
    descBeforeLink:
      'Utilizamos cookies técnicas estrictamente necesarias para el funcionamiento del sitio. Las cookies de análisis o marketing no se cargan ni activan sin tu consentimiento previo. Consulta nuestra ',
    policyLinkText: 'Política de Cookies',
    descAfterLink: '.',
    closeAriaLabel: 'Cerrar configuración de cookies',
    necessaryTitle: 'Técnicas necesarias',
    necessaryDesc:
      'Siempre activas para el funcionamiento básico y tu elección de privacidad.',
    analyticsTitle: 'Analítica',
    analyticsDesc: 'Estadísticas anónimas de uso del sitio.',
    marketingTitle: 'Marketing',
    marketingDesc: 'Seguimiento de campañas o servicios externos.',
    rejectBtn: 'Rechazar',
    configureBtn: 'Configurar',
    savePrefsBtn: 'Guardar preferencias',
    acceptBtn: 'Aceptar',
  },
  en: {
    regionAriaLabel: 'Cookie consent banner',
    title: 'Cookie & Privacy Preferences',
    descBeforeLink:
      'We use strictly necessary technical cookies for site functionality. Analytics or marketing cookies are not loaded or activated without your prior consent. See our ',
    policyLinkText: 'Cookie Policy',
    descAfterLink: '.',
    closeAriaLabel: 'Close cookie settings',
    necessaryTitle: 'Strictly necessary',
    necessaryDesc:
      'Always active for basic functionality and saving your privacy choice.',
    analyticsTitle: 'Analytics',
    analyticsDesc: 'Anonymous site usage statistics.',
    marketingTitle: 'Marketing',
    marketingDesc: 'Campaign or external service tracking.',
    rejectBtn: 'Reject',
    configureBtn: 'Settings',
    savePrefsBtn: 'Save preferences',
    acceptBtn: 'Accept',
  },
};

export function getSavedCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: String(parsed.updatedAt || ''),
    };
  } catch {
    return null;
  }
}

interface CookieBannerProps {
  language?: CookieBannerLanguage;
  isOpenForce?: boolean;
  onCloseForce?: () => void;
  onOpenCookiePolicy: () => void;
  onPreferencesChange?: (prefs: CookiePreferences) => void;
}

export default function CookieBanner({
  language = 'es',
  isOpenForce = false,
  onCloseForce,
  onOpenCookiePolicy,
  onPreferencesChange,
}: CookieBannerProps) {
  const ui = COOKIE_UI_TEXT[language] ?? COOKIE_UI_TEXT.es;

  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Carga preferencias previas si existen; nunca activa analítica/marketing sin consentimiento
  useEffect(() => {
    const saved = getSavedCookiePreferences();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      setVisible(false);
      if (onPreferencesChange) onPreferencesChange(saved);
    } else {
      setAnalytics(false);
      setMarketing(false);
      setVisible(true);
    }
  }, []);

  // Permite reabrir el panel de configuración desde el footer
  useEffect(() => {
    if (isOpenForce) {
      const saved = getSavedCookiePreferences();
      setAnalytics(saved ? saved.analytics : false);
      setMarketing(saved ? saved.marketing : false);
      setShowSettings(true);
      setVisible(true);
    }
  }, [isOpenForce]);

  const saveConsent = (allowAnalytics: boolean, allowMarketing: boolean) => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: allowAnalytics,
      marketing: allowMarketing,
      updatedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Mantiene el estado en memoria si el almacenamiento está bloqueado
    }

    setAnalytics(allowAnalytics);
    setMarketing(allowMarketing);
    setShowSettings(false);
    setVisible(false);
    if (onCloseForce) onCloseForce();
    if (onPreferencesChange) onPreferencesChange(prefs);
  };

  if (!visible) return null;

  return (
    // Inicio: banner inferior de cookies (mobile-first)
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl bg-[#F5F2EC]/95 border border-[#A46E28]/35 text-[#020202] p-5 sm:p-6 rounded-sm shadow-2xl backdrop-blur-md"
      role="region"
      aria-label={ui.regionAriaLabel}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-[#A46E28] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1.5 text-xs leading-relaxed">
            <h4 className="font-serif font-semibold text-sm sm:text-base text-[#020202]">
              {ui.title}
            </h4>
            <p className="text-[#020202]/80">
              {ui.descBeforeLink}
              <button
                type="button"
                onClick={onOpenCookiePolicy}
                className="text-[#A46E28] hover:text-[#020202] underline decoration-dotted cursor-pointer font-semibold"
              >
                {ui.policyLinkText}
              </button>
              {ui.descAfterLink}
            </p>
          </div>
        </div>

        {isOpenForce && (
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              setShowSettings(false);
              if (onCloseForce) onCloseForce();
            }}
            className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center text-[#020202]/60 hover:text-[#020202] cursor-pointer p-1"
            aria-label={ui.closeAriaLabel}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Inicio: panel granular de categorías de cookies */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-[#020202]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-sm bg-white/80 border border-[#020202]/15">
            <div className="font-semibold text-[#020202]">{ui.necessaryTitle}</div>
            <p className="text-[11px] text-[#020202]/70 mt-1">
              {ui.necessaryDesc}
            </p>
          </div>

          <label className="p-3 rounded-sm bg-white/80 border border-[#020202]/15 flex items-start justify-between gap-2 cursor-pointer">
            <div>
              <div className="font-semibold text-[#020202]">{ui.analyticsTitle}</div>
              <p className="text-[11px] text-[#020202]/70 mt-1">
                {ui.analyticsDesc}
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#A46E28] cursor-pointer shrink-0"
            />
          </label>

          <label className="p-3 rounded-sm bg-white/80 border border-[#020202]/15 flex items-start justify-between gap-2 cursor-pointer">
            <div>
              <div className="font-semibold text-[#020202]">{ui.marketingTitle}</div>
              <p className="text-[11px] text-[#020202]/70 mt-1">
                {ui.marketingDesc}
              </p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#A46E28] cursor-pointer shrink-0"
            />
          </label>
        </div>
      )}
      {/* Fin: panel granular de categorías de cookies */}

      {/* Acciones de consentimiento */}
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5 text-xs">
        <button
          type="button"
          onClick={() => saveConsent(false, false)}
          className="min-h-[40px] px-4 py-2 rounded-sm border border-[#020202]/30 hover:border-[#020202] text-[#020202] transition-colors cursor-pointer"
        >
          {ui.rejectBtn}
        </button>

        {!showSettings ? (
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="min-h-[40px] px-4 py-2 rounded-sm border border-[#A46E28]/50 text-[#A46E28] hover:bg-[#A46E28]/10 transition-colors cursor-pointer inline-flex items-center gap-1.5 font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{ui.configureBtn}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => saveConsent(analytics, marketing)}
            className="min-h-[40px] px-4 py-2 rounded-sm border border-[#A46E28] text-[#A46E28] hover:bg-[#A46E28]/10 font-semibold transition-colors cursor-pointer"
          >
            {ui.savePrefsBtn}
          </button>
        )}

        <button
          type="button"
          onClick={() => saveConsent(true, true)}
          className="min-h-[40px] px-5 py-2 rounded-sm bg-[#A46E28] hover:bg-[#8d5e21] text-white font-semibold transition-colors cursor-pointer"
        >
          {ui.acceptBtn}
        </button>
      </div>
    </div>
    // Fin: banner inferior de cookies
  );
}