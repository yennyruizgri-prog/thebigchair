// src/components/ContactSection.tsx — Sección de contacto bilingüe (ES / EN) para The Big Chair
import { FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Instagram,
  Linkedin,
  Mail,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  BRAND,
  CONTACT_COPY,
  INTEREST_OPTIONS,
  InterestOption,
  LegalTabId,
} from '../data/content';

export type ContactLanguage = 'es' | 'en';

interface ContactSectionProps {
  language?: ContactLanguage;
  selectedInterest: InterestOption;
  onInterestChange: (interest: InterestOption) => void;
  onOpenLegal: (tab: LegalTabId) => void;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  interest: InterestOption;
  challenge: string;
  acceptedPrivacy: boolean;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  challenge?: string;
  acceptedPrivacy?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_INTEREST: InterestOption = 'Inmersión 360°';

// Diccionario de textos fijos de interfaz (ampliable a más idiomas)
const CONTACT_UI_TEXT: Record<
  ContactLanguage,
  {
    kicker: string;
    channelsTitle: string;
    copyBtn: string;
    copiedBtn: string;
    linkedinPrefix: string;
    securityTitle: string;
    securityLink: string;
    nameLabel: string;
    namePlaceholder: string;
    nameRequired: string;
    companyLabel: string;
    companyPlaceholder: string;
    companyRequired: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailRequired: string;
    emailInvalid: string;
    interestLabel: string;
    challengeLabel: string;
    challengePlaceholder: string;
    challengeMin: string;
    privacyBeforeLink: string;
    privacyLinkText: string;
    privacyAfterLink: string;
    privacyRequired: string;
    clearBtn: string;
    summaryKicker: string;
    summaryTitle: string;
    summaryNoteBeforeEmail: string;
    summaryNoteAfterEmail: string;
    summaryHeader: string;
    summaryName: string;
    summaryCompany: string;
    summaryEmail: string;
    summaryInterest: string;
    summaryChallenge: string;
    copySummaryBtn: string;
    copiedSummaryBtn: string;
    openMailBtn: string;
    editBtn: string;
    clearSessionBtn: string;
    mailSubjectPrefix: string;
  }
> = {
  es: {
    kicker: 'Contacto',
    channelsTitle: 'Canales oficiales de contacto',
    copyBtn: 'Copiar',
    copiedBtn: 'Copiado',
    linkedinPrefix: 'LinkedIn',
    securityTitle: 'Seguridad de sesión y privacidad',
    securityLink: 'Ver política de privacidad y seguridad de sesión',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre completo',
    nameRequired: 'Ingresa tu nombre.',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Nombre de tu organización',
    companyRequired: 'Ingresa el nombre de tu empresa u organización.',
    emailLabel: 'Correo de contacto',
    emailPlaceholder: 'nombre@empresa.com',
    emailRequired: 'Ingresa un correo de contacto.',
    emailInvalid: 'Ingresa un formato de correo válido (ejemplo@empresa.com).',
    interestLabel: 'Línea de interés',
    challengeLabel: 'Descripción del desafío',
    challengePlaceholder: 'Cuéntanos brevemente qué situación, decisión o proyecto deseas abordar.',
    challengeMin: 'Describe brevemente el desafío o situación (mínimo 10 caracteres).',
    privacyBeforeLink:
      'Comprendo que este formulario procesa los datos únicamente en esta sesión del navegador para generar un resumen copiable, sin almacenarlos en servidores ni enviarlos automáticamente, conforme a la ',
    privacyLinkText: 'Política de Privacidad',
    privacyAfterLink: '.',
    privacyRequired: 'Confirma que comprendes el procesamiento local de esta sesión.',
    clearBtn: 'Limpiar datos',
    summaryKicker: 'Resumen listo en pantalla',
    summaryTitle: 'Tu consulta preparada',
    summaryNoteBeforeEmail:
      'Este resumen se ha generado localmente en tu navegador y no ha sido enviado ni almacenado en ningún servidor. Cópialo o ábrelo en tu cliente de correo para remitirlo a ',
    summaryNoteAfterEmail: '.',
    summaryHeader: 'CONSULTA PARA THE BIG CHAIR',
    summaryName: 'Nombre',
    summaryCompany: 'Empresa',
    summaryEmail: 'Correo de contacto',
    summaryInterest: 'Línea de interés',
    summaryChallenge: 'Descripción del desafío:',
    copySummaryBtn: 'Copiar resumen',
    copiedSummaryBtn: 'Resumen copiado',
    openMailBtn: 'Abrir en mi correo',
    editBtn: 'Editar consulta',
    clearSessionBtn: 'Limpiar sesión',
    mailSubjectPrefix: 'Consulta',
  },
  en: {
    kicker: 'Contact',
    channelsTitle: 'Official contact channels',
    copyBtn: 'Copy',
    copiedBtn: 'Copied',
    linkedinPrefix: 'LinkedIn',
    securityTitle: 'Session security & privacy',
    securityLink: 'View privacy & session security policy',
    nameLabel: 'Name',
    namePlaceholder: 'Your full name',
    nameRequired: 'Please enter your name.',
    companyLabel: 'Company',
    companyPlaceholder: 'Your organization name',
    companyRequired: 'Please enter your company or organization name.',
    emailLabel: 'Contact email',
    emailPlaceholder: 'name@company.com',
    emailRequired: 'Please enter a contact email.',
    emailInvalid: 'Please enter a valid email format (name@company.com).',
    interestLabel: 'Area of interest',
    challengeLabel: 'Challenge overview',
    challengePlaceholder:
      'Briefly share the situation, decision, or project you want to address.',
    challengeMin: 'Briefly describe the challenge or situation (at least 10 characters).',
    privacyBeforeLink:
      'I understand this form processes data solely in this browser session to generate a copyable summary, without storing it on servers or sending it automatically, in accordance with the ',
    privacyLinkText: 'Privacy Policy',
    privacyAfterLink: '.',
    privacyRequired: 'Please confirm that you understand local processing for this session.',
    clearBtn: 'Clear data',
    summaryKicker: 'Summary ready on screen',
    summaryTitle: 'Your prepared inquiry',
    summaryNoteBeforeEmail:
      'This summary was generated locally in your browser and has not been sent to or stored on any server. Copy it or open it in your email client to send to ',
    summaryNoteAfterEmail: '.',
    summaryHeader: 'INQUIRY FOR THE BIG CHAIR',
    summaryName: 'Name',
    summaryCompany: 'Company',
    summaryEmail: 'Contact email',
    summaryInterest: 'Area of interest',
    summaryChallenge: 'Challenge overview:',
    copySummaryBtn: 'Copy summary',
    copiedSummaryBtn: 'Summary copied',
    openMailBtn: 'Open in my email',
    editBtn: 'Edit inquiry',
    clearSessionBtn: 'Clear session',
    mailSubjectPrefix: 'Inquiry',
  },
};

// Resuelve campos de CONTACT_COPY si son string o { es, en }
function resolveCopyField(
  field: string | Record<string, string> | undefined,
  lang: ContactLanguage
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] ?? field.es ?? field.en ?? '';
}

// Resuelve opciones de interés si son string o { es, en }
function resolveInterestLabel(
  option: InterestOption | Record<string, string>,
  lang: ContactLanguage
): string {
  if (typeof option === 'string') return option;
  return option[lang] ?? option.es ?? option.en ?? '';
}

export function ContactSection({
  language = 'es',
  selectedInterest,
  onInterestChange,
  onOpenLegal,
}: ContactSectionProps) {
  const ui = CONTACT_UI_TEXT[language] ?? CONTACT_UI_TEXT.es;
  const copy = CONTACT_COPY as Record<string, any>;

  const titleText = resolveCopyField(copy.title, language);
  const descriptionText = resolveCopyField(copy.description, language);
  const sessionNoticeText = resolveCopyField(copy.sessionNotice, language);
  const buttonLabelText = resolveCopyField(copy.buttonLabel, language);

  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    interest: selectedInterest,
    challenge: '',
    acceptedPrivacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [summaryText, setSummaryText] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sincroniza el interés seleccionado desde otras secciones
  useEffect(() => {
    setForm((prev) => ({ ...prev, interest: selectedInterest }));
  }, [selectedInterest]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = ui.nameRequired;
    }
    if (!form.company.trim()) {
      nextErrors.company = ui.companyRequired;
    }
    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      nextErrors.email = ui.emailRequired;
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = ui.emailInvalid;
    }
    if (!form.challenge.trim() || form.challenge.trim().length < 10) {
      nextErrors.challenge = ui.challengeMin;
    }
    if (!form.acceptedPrivacy) {
      nextErrors.acceptedPrivacy = ui.privacyRequired;
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const cleanName = form.name.trim();
    const cleanCompany = form.company.trim();
    const cleanEmail = form.email.trim();
    const cleanChallenge = form.challenge.trim();

    // Genera el resumen local en el navegador sin enviar datos a ningún servidor
    const formatted = [
      ui.summaryHeader,
      `${ui.summaryName}: ${cleanName}`,
      `${ui.summaryCompany}: ${cleanCompany}`,
      `${ui.summaryEmail}: ${cleanEmail}`,
      `${ui.summaryInterest}: ${form.interest}`,
      '',
      ui.summaryChallenge,
      cleanChallenge,
    ].join('\n');

    setSummaryText(formatted);
    setCopiedSummary(false);
  };

  const handleCopySummary = async () => {
    if (!summaryText) return;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 3000);
    } catch {
      setCopiedSummary(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleClearSession = () => {
    setForm({
      name: '',
      company: '',
      email: '',
      interest: DEFAULT_INTEREST,
      challenge: '',
      acceptedPrivacy: false,
    });
    onInterestChange(DEFAULT_INTEREST);
    setErrors({});
    setSummaryText(null);
    setCopiedSummary(false);
  };

  const mailtoHref = summaryText
    ? `mailto:${BRAND.email}?subject=${encodeURIComponent(
        `${ui.mailSubjectPrefix} ${form.interest} — ${form.company.trim()}`
      )}&body=${encodeURIComponent(summaryText)}`
    : `mailto:${BRAND.email}`;

  return (
    // Inicio: sección de contacto (mobile-first)
    <section
      id="contacto"
      className="bg-[#020202] text-[#F5F2EC] py-16 sm:py-24 border-b border-[#3B3937]/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna izquierda: información institucional y aviso de privacidad */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#A46E28] mb-3">
                {ui.kicker}
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F5F2EC] leading-[1.15] mb-5"
                style={{ textWrap: 'balance' }}
              >
                {titleText}
              </h2>
              <p className="text-base sm:text-lg text-[#F5F2EC]/80 leading-relaxed">
                {descriptionText}
              </p>
            </div>

            {/* Canales oficiales */}
            <div className="pt-6 border-t border-[#3B3937]/50 space-y-4">
              <p className="text-xs font-medium text-[#A46E28]">
                {ui.channelsTitle}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2.5 text-sm sm:text-base text-[#F5F2EC] hover:text-[#A46E28] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
                  <span>{BRAND.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 text-xs text-[#F5F2EC]/80 hover:text-[#F5F2EC] border border-[#3B3937]/70 rounded-sm transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#A46E28]" aria-hidden="true" />
                      <span>{ui.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{ui.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#F5F2EC]/85 hover:text-[#A46E28] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
                  <span>{BRAND.instagramHandle}</span>
                </a>

                <a
                  href={BRAND.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#F5F2EC]/85 hover:text-[#A46E28] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#A46E28] shrink-0" aria-hidden="true" />
                  <span>
                    {ui.linkedinPrefix} · {BRAND.name}
                  </span>
                </a>
              </div>
            </div>

            {/* Nota de seguridad de sesión */}
            <div className="border border-[#3B3937]/70 bg-[#0B0B0B] p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A46E28]">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{ui.securityTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F5F2EC]/75 leading-relaxed">
                {sessionNoticeText}
              </p>
              <button
                type="button"
                onClick={() => onOpenLegal('privacidad')}
                className="text-xs font-medium text-[#F5F2EC] underline underline-offset-4 decoration-[#A46E28] hover:text-[#A46E28] transition-colors cursor-pointer"
              >
                {ui.securityLink}
              </button>
            </div>
          </div>

          {/* Columna derecha: formulario o resumen copiable */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5F2EC] text-[#020202] p-6 sm:p-8 lg:p-10 border border-[#3B3937]/20">
              {!summaryText ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#020202] mb-1.5">
                        {ui.nameLabel} <span className="text-[#7F2C23]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        placeholder={ui.namePlaceholder}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#3B3937]/30 text-[#020202] text-sm sm:text-base placeholder:text-[#3B3937]/50 focus:outline-none focus:border-[#020202] focus:ring-1 focus:ring-[#020202]"
                      />
                      {errors.name && (
                        <p id="error-name" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#7F2C23]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-medium text-[#020202] mb-1.5">
                        {ui.companyLabel} <span className="text-[#7F2C23]">*</span>
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        required
                        value={form.company}
                        onChange={(e) => {
                          setForm({ ...form, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: undefined });
                        }}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? 'error-company' : undefined}
                        placeholder={ui.companyPlaceholder}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#3B3937]/30 text-[#020202] text-sm sm:text-base placeholder:text-[#3B3937]/50 focus:outline-none focus:border-[#020202] focus:ring-1 focus:ring-[#020202]"
                      />
                      {errors.company && (
                        <p id="error-company" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#7F2C23]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#020202] mb-1.5">
                        {ui.emailLabel} <span className="text-[#7F2C23]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        placeholder={ui.emailPlaceholder}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#3B3937]/30 text-[#020202] text-sm sm:text-base placeholder:text-[#3B3937]/50 focus:outline-none focus:border-[#020202] focus:ring-1 focus:ring-[#020202]"
                      />
                      {errors.email && (
                        <p id="error-email" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#7F2C23]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-interest" className="block text-sm font-medium text-[#020202] mb-1.5">
                        {ui.interestLabel}
                      </label>
                      <select
                        id="contact-interest"
                        name="interest"
                        value={form.interest}
                        onChange={(e) => {
                          const val = e.target.value as InterestOption;
                          setForm({ ...form, interest: val });
                          onInterestChange(val);
                        }}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#3B3937]/30 text-[#020202] text-sm sm:text-base focus:outline-none focus:border-[#020202] focus:ring-1 focus:ring-[#020202]"
                      >
                        {INTEREST_OPTIONS.map((option) => (
                          <option key={String(option)} value={String(option)}>
                            {resolveInterestLabel(option, language)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-challenge" className="block text-sm font-medium text-[#020202] mb-1.5">
                      {ui.challengeLabel} <span className="text-[#7F2C23]">*</span>
                    </label>
                    <textarea
                      id="contact-challenge"
                      name="challenge"
                      rows={4}
                      required
                      value={form.challenge}
                      onChange={(e) => {
                        setForm({ ...form, challenge: e.target.value });
                        if (errors.challenge) setErrors({ ...errors, challenge: undefined });
                      }}
                      aria-invalid={Boolean(errors.challenge)}
                      aria-describedby={errors.challenge ? 'error-challenge' : undefined}
                      placeholder={ui.challengePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#3B3937]/30 text-[#020202] text-sm sm:text-base placeholder:text-[#3B3937]/50 focus:outline-none focus:border-[#020202] focus:ring-1 focus:ring-[#020202] resize-y"
                    />
                    {errors.challenge && (
                      <p id="error-challenge" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#7F2C23]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.challenge}</span>
                      </p>
                    )}
                  </div>

                  {/* Casilla obligatoria de consentimiento local */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.acceptedPrivacy}
                        onChange={(e) => {
                          setForm({ ...form, acceptedPrivacy: e.target.checked });
                          if (errors.acceptedPrivacy)
                            setErrors({ ...errors, acceptedPrivacy: undefined });
                        }}
                        className="mt-1 w-4 h-4 accent-[#020202] shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-[#3B3937] leading-relaxed">
                        {ui.privacyBeforeLink}
                        <button
                          type="button"
                          onClick={() => onOpenLegal('privacidad')}
                          className="font-medium text-[#020202] underline underline-offset-4 decoration-[#A46E28] cursor-pointer"
                        >
                          {ui.privacyLinkText}
                        </button>
                        {ui.privacyAfterLink}
                      </span>
                    </label>
                    {errors.acceptedPrivacy && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#7F2C23]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.acceptedPrivacy}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 bg-[#020202] hover:bg-[#3B3937] text-[#F5F2EC] text-sm sm:text-base font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46E28]"
                    >
                      {buttonLabelText}
                    </button>

                    <button
                      type="button"
                      onClick={handleClearSession}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-2 text-xs font-medium text-[#3B3937] hover:text-[#020202] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{ui.clearBtn}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6" aria-live="polite">
                  <div className="flex items-start justify-between gap-4 border-b border-[#3B3937]/15 pb-4">
                    <div>
                      <p className="text-xs font-medium text-[#A46E28] mb-1">
                        {ui.summaryKicker}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#020202]">
                        {ui.summaryTitle}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#3B3937] leading-relaxed">
                    {ui.summaryNoteBeforeEmail}
                    <span className="font-medium text-[#020202]">{BRAND.email}</span>
                    {ui.summaryNoteAfterEmail}
                  </p>

                  <pre className="bg-white border border-[#3B3937]/20 p-4 sm:p-5 text-xs sm:text-sm text-[#020202] font-sans whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {summaryText}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#020202] hover:bg-[#3B3937] text-[#F5F2EC] text-sm font-semibold rounded-sm transition-colors duration-150 cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-4 h-4 text-[#A46E28]" aria-hidden="true" />
                          <span>{ui.copiedSummaryBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#A46E28]" aria-hidden="true" />
                          <span>{ui.copySummaryBtn}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-[#020202] text-[#020202] hover:bg-[#020202] hover:text-[#F5F2EC] text-sm font-medium rounded-sm transition-colors duration-150"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>{ui.openMailBtn}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSummaryText(null)}
                      className="min-h-[44px] px-3 text-sm font-medium text-[#3B3937] hover:text-[#020202] underline underline-offset-4 cursor-pointer"
                    >
                      {ui.editBtn}
                    </button>

                    <button
                      type="button"
                      onClick={handleClearSession}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm font-medium text-[#7F2C23] hover:text-[#020202] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{ui.clearSessionBtn}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    // Fin: sección de contacto
  );
}