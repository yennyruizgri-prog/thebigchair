// src/data/content.ts — Contenidos estructurados y textos legales bilingües (ES / EN) para The Big Chair

export type LanguageCode = 'es' | 'en';

export type InterestOption =
  | 'Inmersión 360°'
  | 'Ecosistema de Talento'
  | 'Liderazgo y equipos'
  | 'Owner Engineering & Projects'
  | 'Método ELLA'
  | 'Necesito orientación';

export type LegalTabId = 'aviso' | 'privacidad' | 'cookies' | 'terminos';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface ServiceLine {
  number: string;
  id: string;
  title: LocalizedText;
  interestValue: InterestOption;
  brief: LocalizedText;
  target: LocalizedText;
  scope: LocalizedText;
}

export interface MethodologyStep {
  number: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
}

export interface LegalSectionContent {
  id: LegalTabId;
  label: LocalizedText;
  title: LocalizedText;
  updatedAt: LocalizedText;
  paragraphs: {
    es: string[];
    en: string[];
  };
}

export const BRAND = {
  name: 'The Big Chair',
  fullName: 'The Big Chair Consultora',
  logoPath: '/assets/aistudio/image_817a5350.png',
  descriptor: {
    es: 'Estrategia · Personas · Proyectos',
    en: 'Strategy · People · Projects',
  },
  origin: {
    es: 'The Big Chair nace en Chile en 2023. Con vocación de conexión internacional.',
    en: 'The Big Chair was founded in Chile in 2023. With a vocation for international connection.',
  },
  englishClaim: 'What would you do if you could see the whole picture?',
  supportLine: {
    es: 'Activamos líderes. Humanizamos la gestión.',
    en: 'We activate leaders. We humanize management.',
  },
  illustrationCaption: 'A different seat. A broader perspective.',
  email: 'contacto@consultorathebigchair.com',
  instagramHandle: '@consultorathebigchair',
  instagramUrl: 'https://www.instagram.com/consultorathebigchair/',
  linkedinLabel: 'The Big Chair Consultora',
  linkedinUrl: 'https://www.linkedin.com/company/consultorathebigchair/?viewAsMember=true',
} as const;

export const NAV_ITEMS = [
  { label: { es: 'Soluciones', en: 'Solutions' }, href: '#soluciones' },
  { label: { es: 'Cómo trabajamos', en: 'How We Work' }, href: '#como-trabajamos' },
  { label: { es: 'Nosotros', en: 'About Us' }, href: '#nosotros' },
] as const;

export const ALL_SECTIONS = [
  { label: { es: 'Inicio', en: 'Home' }, href: '#inicio' },
  { label: { es: 'Perspectiva TBCH', en: 'TBCH Perspective' }, href: '#perspectiva' },
  { label: { es: 'Soluciones', en: 'Solutions' }, href: '#soluciones' },
  { label: { es: 'Cómo trabajamos', en: 'How We Work' }, href: '#como-trabajamos' },
  { label: { es: 'Método ELLA', en: 'ELLA Method' }, href: '#metodo-ella' },
  { label: { es: 'Quiénes somos', en: 'Who We Are' }, href: '#nosotros' },
  { label: { es: 'Contacto', en: 'Contact' }, href: '#contacto' },
] as const;

export const HERO_COPY = {
  descriptor: {
    es: 'Estrategia · Personas · Proyectos',
    en: 'Strategy · People · Projects',
  },
  title: {
    es: 'Ver el panorama completo cambia tus decisiones.',
    en: 'Seeing the whole picture changes your decisions.',
  },
  description: {
    es: 'Conectamos lo que ocurre en tu organización con lo que necesitas lograr. Transformamos esa comprensión en estrategia, capacidades y ejecución.',
    en: 'We connect what is happening inside your organization with what you need to achieve. We turn that understanding into strategy, capabilities, and execution.',
  },
  ctaLabel: {
    es: 'Encuentra tu punto de partida',
    en: 'Find your starting point',
  },
  englishClaim: 'What would you do if you could see the whole picture?',
  supportText: {
    es: 'Activamos líderes. Humanizamos la gestión.',
    en: 'We activate leaders. We humanize management.',
  },
  illustrationCaption: 'A different seat. A broader perspective.',
} as const;

export const PERSPECTIVE_COPY = {
  kicker: {
    es: 'La perspectiva The Big Chair',
    en: 'The Big Chair Perspective',
  },
  title: {
    es: 'Las decisiones se conectan. Tu consultoría también debería hacerlo.',
    en: 'Decisions are connected. Your consultancy should be too.',
  },
  paragraphs: {
    es: [
      'Una estrategia puede exigir nuevas capacidades. Un proyecto puede revelar problemas de coordinación. Una vacante puede estar mostrando una necesidad de rediseño.',
      'Ayudamos a socios, gerencias generales y equipos directivos a comprender esas conexiones, definir prioridades y llevarlas a la práctica, integrando la dimensión humana con las exigencias del negocio.',
    ],
    en: [
      'A strategy may require new capabilities. A project may reveal coordination bottlenecks. An open role may point to a deeper need for organizational redesign.',
      'We help partners, general managers, and executive teams understand these connections, define priorities, and put them into practice—integrating the human dimension with business demands.',
    ],
  },
} as const;

export const SOLUTIONS_HEADER = {
  title: {
    es: '¿Qué necesita avanzar en tu organización?',
    en: 'What needs to move forward in your organization?',
  },
  support: {
    es: 'Un punto de entrada concreto. Una mirada que conecta el conjunto.',
    en: 'A concrete entry point. A perspective that connects the whole.',
  },
} as const;

export const SERVICE_LINES: ServiceLine[] = [
  {
    number: '01',
    id: 'inmersion-360',
    title: {
      es: 'Inmersión 360°',
      en: '360° Immersion',
    },
    interestValue: 'Inmersión 360°',
    brief: {
      es: 'Comprender antes de intervenir.',
      en: 'Understand before intervening.',
    },
    target: {
      es: 'Para empresas en crecimiento, reorganización, integración o transformación que necesitan identificar qué está frenando sus resultados.',
      en: 'For companies undergoing growth, reorganization, integration, or transformation that need to identify what is holding back their results.',
    },
    scope: {
      es: 'Integramos entrevistas ejecutivas, lectura sistémica y análisis de cultura, liderazgo, procesos y estructura. El resultado es un diagnóstico con prioridades y una hoja de ruta. A partir de ella, podemos diseñar el acompañamiento para implementar los cambios.',
      en: 'We integrate executive interviews, systemic reading, and analysis of culture, leadership, processes, and structure. The outcome is a prioritized diagnosis and a clear roadmap. From there, we can design tailored support to implement the changes.',
    },
  },
  {
    number: '02',
    id: 'ecosistema-talento',
    title: {
      es: 'Ecosistema de Talento',
      en: 'Talent Ecosystem',
    },
    interestValue: 'Ecosistema de Talento',
    brief: {
      es: 'Personas y roles que se potencian.',
      en: 'People and roles that empower each other.',
    },
    target: {
      es: 'Para decisiones de selección, desarrollo y organización que requieren comprender capacidades, responsabilidades y necesidades del negocio.',
      en: 'For hiring, development, and organizational decisions that require a clear understanding of capabilities, responsibilities, and business needs.',
    },
    scope: {
      es: 'Acompañamos la definición de perfiles, la evaluación y el desarrollo del talento. Incorporamos herramientas de 4Beyond Performance según el alcance de cada proceso, conectando sus resultados con entrevistas y contexto organizacional.',
      en: 'We support role definition, talent assessment, and capability development. We incorporate 4Beyond Performance tools according to the scope of each process, connecting their insights with interviews and organizational context.',
    },
  },
  {
    number: '03',
    id: 'liderazgo-equipos',
    title: {
      es: 'Liderazgo y equipos',
      en: 'Leadership & Teams',
    },
    interestValue: 'Liderazgo y equipos',
    brief: {
      es: 'La cultura se construye en la práctica.',
      en: 'Culture is built in practice.',
    },
    target: {
      es: 'Para equipos que necesitan conversar mejor, coordinarse, asumir responsabilidades y convertir sus diferencias en capacidad de trabajo conjunto.',
      en: 'For teams that need to communicate more effectively, coordinate, take ownership, and turn their differences into collective working capacity.',
    },
    scope: {
      es: 'Diseñamos experiencias de desarrollo de liderazgo y team building, incluida Alquimia de Equipos, a partir de los desafíos del grupo. Trabajamos acuerdos, confianza y colaboración vinculados a su realidad cotidiana.',
      en: 'We design leadership development and team-building experiences—including Team Alchemy (Alquimia de Equipos)—tailored to the group’s real challenges. We work on agreements, trust, and collaboration anchored in their day-to-day reality.',
    },
  },
  {
    number: '04',
    id: 'owner-engineering',
    title: {
      es: 'Owner Engineering & Projects',
      en: 'Owner Engineering & Projects',
    },
    interestValue: 'Owner Engineering & Projects',
    brief: {
      es: 'La perspectiva del propietario, presente.',
      en: 'The owner’s perspective, actively present.',
    },
    target: {
      es: 'Para organizaciones que necesitan acompañamiento en la gestión de sus proyectos y una mejor conexión entre decisiones, actores y ejecución.',
      en: 'For organizations seeking guidance in managing their projects and a stronger link between strategic decisions, stakeholders, and execution.',
    },
    scope: {
      es: 'Definimos el alcance de acompañamiento según la etapa y las necesidades del proyecto. La gestión de proyectos en Chile forma parte de esta línea de trabajo. Cada propuesta establece responsabilidades, entregables y mecanismos de seguimiento.',
      en: 'We define the scope of support according to the stage and needs of each project. Project management in Chile is an integral part of this practice. Every proposal establishes clear responsibilities, deliverables, and tracking mechanisms.',
    },
  },
];

export const METHODOLOGY_HEADER = {
  title: {
    es: 'Cómo trabajamos',
    en: 'How We Work',
  },
  lead: {
    es: 'No empezamos por la solución. Empezamos por entender.',
    en: 'We don’t start with the solution. We start by understanding.',
  },
} as const;

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: '01',
    title: {
      es: 'Entender el contexto',
      en: 'Understand the context',
    },
    description: {
      es: 'Exploramos el desafío, las expectativas y las perspectivas de quienes toman decisiones y las llevan a la práctica.',
      en: 'We explore the challenge, expectations, and perspectives of both decision-makers and those who carry them out.',
    },
  },
  {
    number: '02',
    title: {
      es: 'Ver el sistema',
      en: 'See the system',
    },
    description: {
      es: 'Relacionamos personas, estructura, cultura y operación para distinguir síntomas de problemas de fondo.',
      en: 'We connect people, structure, culture, and operations to distinguish surface symptoms from root causes.',
    },
  },
  {
    number: '03',
    title: {
      es: 'Diseñar la ruta',
      en: 'Design the roadmap',
    },
    description: {
      es: 'Acordamos qué cambiar, para qué, con qué responsables y cómo observar los avances.',
      en: 'We agree on what to change, why, who owns each step, and how progress will be measured.',
    },
  },
  {
    number: '04',
    title: {
      es: 'Acompañar la acción',
      en: 'Support execution',
    },
    description: {
      es: 'Según el alcance acordado, apoyamos la implementación y revisamos los aprendizajes para ajustar el camino.',
      en: 'According to the agreed scope, we support implementation and review learnings to refine the path forward.',
    },
  },
];

export const METHOD_ELLA_COPY = {
  identification: {
    es: 'Un método de The Big Chair',
    en: 'A method by The Big Chair',
  },
  brandTitle: {
    es: 'Método ELLA',
    en: 'ELLA Method',
  },
  descriptor: {
    es: 'Liderazgo con desarrollo humano',
    en: 'Leadership with human development',
  },
  pillars: {
    es: ['Estrategia', 'Liderazgo', 'Libertad', 'Abundancia'],
    en: ['Strategy', 'Leadership', 'Freedom', 'Abundance'],
  },
  title: {
    es: 'El éxito también debe incluirte.',
    en: 'Success should include you too.',
  },
  paragraphs: {
    es: [
      'Método ELLA integra Estrategia, Liderazgo, Libertad y Abundancia para el desarrollo de mujeres y la construcción de entornos donde puedan ejercer su liderazgo.',
      'Conecta investigación, desarrollo humano y ejecución estratégica a través de procesos de formación, mentoría y experiencias grupales. Su aplicación se adapta al contexto de las personas y las organizaciones.',
    ],
    en: [
      'The ELLA Method integrates Strategy, Leadership, Freedom, and Abundance to foster women’s development and build environments where they can exercise their leadership.',
      'It connects research, human development, and strategic execution through training programs, mentorship, and group experiences—adapting its application to the context of individuals and organizations.',
    ],
  },
  ctaLabel: {
    es: 'Conversemos sobre Método ELLA',
    en: "Let's talk about the ELLA Method",
  },
} as const;

export const TEAM_COPY = {
  title: {
    es: 'Quiénes somos',
    en: 'Who We Are',
  },
  subtitle: {
    es: 'Dos perspectivas. Una visión compartida.',
    en: 'Two perspectives. One shared vision.',
  },
  origin: {
    es: 'The Big Chair nace en Chile en 2023. Con vocación de conexión internacional.',
    en: 'The Big Chair was founded in Chile in 2023. With a vocation for international connection.',
  },
  members: [
    {
      initials: 'VR',
      name: 'Virginia Rangel',
      role: {
        es: 'CEO · Cofundadora · Creadora de Método ELLA',
        en: 'CEO · Co-Founder · Creator of the ELLA Method',
      },
      bio: {
        es: 'Su trabajo conecta desarrollo humano, liderazgo y estrategia de negocio. Aporta una perspectiva que integra la experiencia de emprender, acompañar personas y comprender las dinámicas de las organizaciones.',
        en: 'Her work bridges human development, leadership, and business strategy. She brings a perspective that integrates entrepreneurial experience, guiding people, and understanding organizational dynamics.',
      },
    },
    {
      initials: 'LE',
      name: 'Luis Espinosa',
      role: {
        es: 'Cofundador · Project Management Professional (PMP)',
        en: 'Co-Founder · Project Management Professional (PMP)',
      },
      bio: {
        es: 'Aporta la perspectiva de la gestión de proyectos y la ejecución. Su trabajo conecta los objetivos del negocio con la planificación, la coordinación y el seguimiento necesarios para llevarlos a la práctica.',
        en: 'He brings expertise in project management and execution. His work aligns business goals with the planning, coordination, and follow-through needed to turn strategy into tangible results.',
      },
    },
  ] as TeamMember[],
};

export const INTEREST_OPTIONS: InterestOption[] = [
  'Inmersión 360°',
  'Ecosistema de Talento',
  'Liderazgo y equipos',
  'Owner Engineering & Projects',
  'Método ELLA',
  'Necesito orientación',
];

export const INTEREST_OPTION_LABELS: Record<InterestOption, LocalizedText> = {
  'Inmersión 360°': {
    es: 'Inmersión 360°',
    en: '360° Immersion',
  },
  'Ecosistema de Talento': {
    es: 'Ecosistema de Talento',
    en: 'Talent Ecosystem',
  },
  'Liderazgo y equipos': {
    es: 'Liderazgo y equipos',
    en: 'Leadership & Teams',
  },
  'Owner Engineering & Projects': {
    es: 'Owner Engineering & Projects',
    en: 'Owner Engineering & Projects',
  },
  'Método ELLA': {
    es: 'Método ELLA',
    en: 'ELLA Method',
  },
  'Necesito orientación': {
    es: 'Necesito orientación',
    en: 'I need guidance',
  },
};

export const CONTACT_COPY = {
  title: {
    es: 'Cuéntanos qué necesitas ver con más claridad.',
    en: 'Tell us what you need to see more clearly.',
  },
  description: {
    es: 'Una transformación, una decisión sobre talento, un equipo o un proyecto. Empecemos por poner el desafío en palabras.',
    en: 'A transformation, a talent decision, a team, or a project. Let’s start by putting the challenge into words.',
  },
  buttonLabel: {
    es: 'Preparar mi consulta',
    en: 'Prepare my inquiry',
  },
  sessionNotice: {
    es: 'El formulario abre un resumen en pantalla que puedes copiar. No envía correos automáticamente, no agenda reuniones y no guarda datos en un servidor ni requiere cuentas de usuario.',
    en: 'The form generates an on-screen summary that you can copy. It does not send emails automatically, schedule meetings, store data on a server, or require user accounts.',
  },
} as const;

export const LEGAL_DOCUMENTS: LegalSectionContent[] = [
  {
    id: 'aviso',
    label: {
      es: 'Aviso Legal',
      en: 'Legal Notice',
    },
    title: {
      es: 'Aviso Legal e Identificación de la Consultora',
      en: 'Legal Notice & Consultancy Identification',
    },
    updatedAt: {
      es: 'Noviembre 2026',
      en: 'November 2026',
    },
    paragraphs: {
      es: [
        'Este sitio web corresponde a la plataforma informativa de The Big Chair Consultora (TBCH), firma de consultoría en estrategia, personas y gestión de proyectos fundada en Chile en 2023 con vocación de conexión internacional.',
        'Canal oficial de contacto: contacto@consultorathebigchair.com. Canales digitales verificados: Instagram (@consultorathebigchair) y LinkedIn (company/consultorathebigchair).',
        'Propiedad intelectual: Los textos, estructura editorial, signos distintivos de The Big Chair, Método ELLA, así como las denominaciones de nuestras líneas de acompañamiento (Inmersión 360°, Ecosistema de Talento, Liderazgo y equipos, y Owner Engineering & Projects) son de titularidad exclusiva de The Big Chair Consultora o utilizados bajo licencia autorizada (incluyendo referencias metodológicas a 4Beyond Performance y Alquimia de Equipos).',
        'Alcance informativo: La descripción de servicios y metodologías presentada en este sitio tiene carácter orientativo y no constituye una oferta contractual vinculante. Todo servicio se formaliza mediante propuesta técnica y comercial específica acordada con el cliente.',
      ],
      en: [
        'This website serves as the informational platform of The Big Chair Consultora (TBCH), a strategy, people, and project management consultancy founded in Chile in 2023 with a vocation for international connection.',
        'Official contact channel: contacto@consultorathebigchair.com. Verified digital channels: Instagram (@consultorathebigchair) and LinkedIn (company/consultorathebigchair).',
        'Intellectual property: The texts, editorial structure, distinctive trademarks of The Big Chair, the ELLA Method, as well as the names of our practice lines (360° Immersion, Talent Ecosystem, Leadership & Teams, and Owner Engineering & Projects) are the exclusive property of The Big Chair Consultora or used under authorized license (including methodological references to 4Beyond Performance and Team Alchemy / Alquimia de Equipos).',
        'Informational scope: The description of services and methodologies presented on this website is for guidance only and does not constitute a binding contractual offer. All services are formalized through a specific technical and commercial proposal agreed upon with the client.',
      ],
    },
  },
  {
    id: 'privacidad',
    label: {
      es: 'Privacidad y Datos',
      en: 'Privacy & Data',
    },
    title: {
      es: 'Política de Privacidad y Tratamiento de Datos',
      en: 'Privacy & Data Processing Policy',
    },
    updatedAt: {
      es: 'Noviembre 2026',
      en: 'November 2026',
    },
    paragraphs: {
      es: [
        'En cumplimiento de la normativa aplicable sobre protección de la vida privada y datos personales (incluyendo la Ley N° 19.628 y sus actualizaciones en la República de Chile, así como estándares internacionales de protección de datos), informamos con total transparencia el funcionamiento real de este sitio web.',
        'Procesamiento exclusivamente local: Los datos ingresados en el formulario de contacto (Nombre, Empresa, Correo de contacto, Línea de interés y Descripción del desafío) se procesan únicamente en la memoria activa de tu navegador para generar un resumen estructurado en pantalla que tú puedes copiar o abrir en tu propio cliente de correo.',
        'Cero almacenamiento en servidor: Este sitio no requiere creación de cuentas de usuario, no almacena información en bases de datos remotas, no realiza envíos automáticos en segundo plano ni transfiere datos personales a terceros.',
        'Comunicaciones voluntarias: Cuando decidas enviarnos tu consulta al correo contacto@consultorathebigchair.com, tus datos serán tratados únicamente para responder tu requerimiento comercial o profesional. Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo en cualquier momento a contacto@consultorathebigchair.com.',
      ],
      en: [
        'In compliance with applicable privacy and personal data protection regulations (including Law No. 19.628 and its updates in the Republic of Chile, as well as international data protection standards), we transparently disclose how this website actually operates.',
        'Exclusively local processing: Information entered in the contact form (Name, Company, Contact Email, Area of Interest, and Challenge Description) is processed solely in your browser’s active memory to generate a structured on-screen summary that you can copy or open in your own email client.',
        'Zero server storage: This website does not require user account creation, does not store personal information in remote databases, does not send automated background emails, and does not transfer personal data to third parties.',
        'Voluntary communications: When you choose to send your inquiry to contacto@consultorathebigchair.com, your data will be processed solely to respond to your business or professional request. You may exercise your rights of access, rectification, cancellation, and opposition at any time by writing to contacto@consultorathebigchair.com.',
      ],
    },
  },
  {
    id: 'cookies',
    label: {
      es: 'Cookies y Sesión',
      en: 'Cookies & Session',
    },
    title: {
      es: 'Política de Cookies, Analítica y Seguridad de Sesión',
      en: 'Cookies, Analytics & Session Security Policy',
    },
    updatedAt: {
      es: 'Noviembre 2026',
      en: 'November 2026',
    },
   paragraphs: {
      es: [
        'Este sitio web ha sido diseñado bajo el principio de minimización de datos y privacidad desde el diseño.',
        'Sin cookies de rastreo ni analítica sin consentimiento: No activamos cookies publicitarias, píxeles de seguimiento, perfiles de comportamiento ni herramientas de analítica comercial de terceros sin tu consentimiento previo y expreso.',
        'Almacenamiento técnico y preferencias: Utilizamos almacenamiento local técnico estrictamente necesario en tu navegador para recordar tu elección en el banner de cookies (aceptar, rechazar o configurar categorías) y mantener el estado temporal de la sesión activa mientras completas el formulario. Al pulsar «Limpiar sesión», los datos ingresados en el formulario se eliminan de inmediato.',
        'Gestión y retirada del consentimiento: Puedes modificar o retirar tus preferencias en cualquier momento desde el enlace «Configurar cookies» ubicado en el pie de página o borrando los datos de navegación desde la configuración de tu navegador.',
        'Seguridad de enlaces externos: Los enlaces hacia canales oficiales externos (LinkedIn e Instagram) se abren de forma segura protegiendo la integridad de la navegación (rel="noopener noreferrer" y política strict-origin-when-cross-origin).',
      ],
      en: [
        'This website has been designed under the principles of data minimization and privacy by design.',
        'No tracking cookies or analytics without consent: We do not activate advertising cookies, tracking pixels, behavioral profiling, or third-party commercial analytics tools without your prior, explicit consent.',
        'Technical storage and preferences: We use strictly necessary local technical storage in your browser to remember your cookie banner choice (accept, reject, or configure categories) and maintain temporary active session state while you complete the form. Clicking “Clear session” immediately erases all form data.',
        'Managing and withdrawing consent: You can modify or withdraw your preferences at any time via the “Cookie Settings” link in the footer or by clearing browsing data in your browser settings.',
        'External link security: Links to official external channels (LinkedIn and Instagram) open securely to protect browsing integrity (rel="noopener noreferrer" and strict-origin-when-cross-origin policy).',
      ],
    },
  },
  {
    id: 'terminos',
    label: {
      es: 'Términos de Uso',
      en: 'Terms of Use',
    },
    title: {
      es: 'Términos y Condiciones de Uso del Sitio',
      en: 'Website Terms and Conditions of Use',
    },
    updatedAt: {
      es: 'Noviembre 2026',
      en: 'November 2026',
    },
    paragraphs: {
      es: [
        'El acceso y navegación por este sitio web atribuye la condición de visitante e implica la aceptación de las presentes condiciones de uso.',
        'Uso lícito: El visitante se compromete a utilizar los contenidos y el generador local de resumen de consulta de forma diligente, veraz y conforme a la ley, absteniéndose de realizar acciones que afecten la disponibilidad o seguridad del sitio.',
        'Alianzas y servicios independientes: Toda referencia a programas, herramientas especializadas o eventuales alianzas estratégicas de ejecución se rige por acuerdos independientes y claramente delimitados en cada propuesta formal.',
        'Legislación aplicable: Para cualquier interpretación o controversia derivada del uso informativo de este sitio web, regirán las leyes de la República de Chile.',
      ],
      en: [
        'Accessing and browsing this website grants the status of visitor and implies acceptance of these terms of use.',
        'Lawful use: Visitors agree to use the content and the local inquiry summary generator diligently, truthfully, and in compliance with the law, refraining from actions that impair the availability or security of the website.',
        'Independent alliances and services: Any reference to programs, specialized tools, or potential strategic execution alliances is governed by independent agreements clearly defined in each formal proposal.',
        'Applicable law: Any interpretation or dispute arising from the informational use of this website shall be governed by the laws of the Republic of Chile.',
      ],
    },
  },
];