// src/components/LegalModal.tsx — Modal legal bilingüe (ES / EN) para The Big Chair
import { useEffect, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalTabId } from '../data/content';

export type SupportedLanguage = 'es' | 'en';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTabId;
  language?: SupportedLanguage;
  onSelectTab: (tab: LegalTabId) => void;
  onClose: () => void;
}

// Diccionario de textos fijos de interfaz del modal (fácil de ampliar con un tercer idioma)
const MODAL_UI_TEXT: Record<
  SupportedLanguage,
  {
    headerTitle: string;
    closeAriaLabel: string;
    tablistAriaLabel: string;
    updatedPrefix: string;
    confirmButton: string;
  }
> = {
  es: {
    headerTitle: 'Marco Legal, Privacidad y Seguridad de Sesión',
    closeAriaLabel: 'Cerrar ventana legal',
    tablistAriaLabel: 'Documentos legales',
    updatedPrefix: 'Actualización',
    confirmButton: 'Entendido',
  },
  en: {
    headerTitle: 'Legal Framework, Privacy & Session Security',
    closeAriaLabel: 'Close legal window',
    tablistAriaLabel: 'Legal documents',
    updatedPrefix: 'Updated',
    confirmButton: 'Got it',
  },
};

// Resuelve texto bilingüe si content.ts usa { es, en }, o string plano si aún es un solo idioma
function resolveLocalizedText(
  value: string | Record<string, string> | undefined,
  language: SupportedLanguage,
  fallback = ''
): string {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  return value[language] ?? value.es ?? value.en ?? fallback;
}

function resolveLocalizedParagraphs(
  value: string[] | Record<string, string[]> | undefined,
  language: SupportedLanguage
): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[language] ?? value.es ?? value.en ?? [];
}

export function LegalModal({
  isOpen,
  activeTab,
  language = 'es',
  onSelectTab,
  onClose,
}: LegalModalProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Guarda el foco previo, bloquea el scroll del fondo y habilita cierre con Escape
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ui = MODAL_UI_TEXT[language] ?? MODAL_UI_TEXT.es;

  // Soporta tanto LEGAL_DOCUMENTS como array como un diccionario { es: [...], en: [...] }
  const docsList: any[] = Array.isArray(LEGAL_DOCUMENTS)
    ? LEGAL_DOCUMENTS
    : (LEGAL_DOCUMENTS as Record<string, any[]>)[language] ??
      (LEGAL_DOCUMENTS as Record<string, any[]>).es ??
      [];

  const activeDoc =
    docsList.find((doc) => doc.id === activeTab) ?? docsList[0] ?? {};

  const docTitle = resolveLocalizedText(activeDoc.title, language, '');
  const docLabelFallback = resolveLocalizedText(activeDoc.label, language, 'Doc');
  const docUpdatedAt = resolveLocalizedText(activeDoc.updatedAt, language, '');
  const docParagraphs = resolveLocalizedParagraphs(activeDoc.paragraphs, language);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Contenedor principal del diálogo */}
      <div
        className="w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#F5F2EC] text-[#020202] border border-[#3B3937]/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera superior */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-[#020202] text-[#F5F2EC]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              {ui.headerTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.closeAriaLabel}
            className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] text-[#F5F2EC]/80 hover:text-[#F5F2EC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selector de pestañas legales */}
        <div
          role="tablist"
          aria-label={ui.tablistAriaLabel}
          className="flex flex-wrap gap-1 px-5 sm:px-7 pt-4 pb-3 border-b border-[#3B3937]/15 bg-white"
        >
          {docsList.map((doc) => {
            const isSelected = doc.id === activeDoc.id;
            const tabLabel = resolveLocalizedText(doc.label, language, 'Document');
            return (
              <button
                key={doc.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => onSelectTab(doc.id)}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#020202] text-[#F5F2EC]'
                    : 'text-[#3B3937] hover:bg-[#F5F2EC] hover:text-[#020202]'
                }`}
              >
                {tabLabel}
              </button>
            );
          })}
        </div>

        {/* Cuerpo desplazable del documento activo */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-[#3B3937]/12">
            <h2
              id="legal-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#020202]"
            >
              {docTitle || docLabelFallback}
            </h2>
            {docUpdatedAt && (
              <span className="text-xs text-[#3B3937]">
                {ui.updatedPrefix} · {docUpdatedAt}
              </span>
            )}
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#3B3937] leading-relaxed">
            {docParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Pie del modal */}
        <div className="px-5 sm:px-7 py-4 border-t border-[#3B3937]/15 bg-white flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-5 py-2 bg-[#020202] hover:bg-[#3B3937] text-[#F5F2EC] text-sm font-medium rounded-sm transition-colors cursor-pointer"
          >
            {ui.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
}