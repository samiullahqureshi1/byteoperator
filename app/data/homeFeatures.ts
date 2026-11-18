import {
  CRO_CLEAN_PATH,
  resolveCanonicalPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

/* =========================================================
   BYTE OPERATOR - HOME FEATURE DATA
========================================================= */

export type HomeFeatureLayout =
  | 'media-left'
  | 'media-right';

export type HomeFeatureSpacing =
  | 'first'
  | 'standard'
  | 'deep';

export type HomeFeatureTheme =
  | 'dark'
  | 'light';

export type HomeFeatureLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HomeFeatureBadge = {
  label: string;
  href: string;
};

export type HomeFeatureButton = {
  label: string;
  href?: string;
  calendly?: boolean;
};

export type HomeFeatureMedia = {
  href: string;

  primary: string;
  primaryAlt: string;
  primaryWidth: number;
  primaryHeight: number;

  secondary: string;
  secondaryAlt: string;
  secondaryWidth: number;
  secondaryHeight: number;

  captionTitle: string;
  captionText: string;
};

export type HomeFeatureData = {
  id: string;

  layout: HomeFeatureLayout;

  spacing: HomeFeatureSpacing;

  theme: HomeFeatureTheme;

  eyebrow: string;

  heading: string;

  description: readonly string[];

  logos?: readonly HomeFeatureLogo[];

  badges?: readonly HomeFeatureBadge[];

  buttons: readonly HomeFeatureButton[];

  media: HomeFeatureMedia;
};


/* =========================================================
   SHARED ROUTES
========================================================= */

const ROUTES = {
  caseStudies: '/work',
  contact: '/contact',
  aiVoiceAgents: '/services/ai-voice-agents-healthcare',
  aiWorkflowAutomation: '/services/ai-workflow-automation-healthcare',
  systemIntegration: '/services/software-integrations',
  customHealthcareSoftware: '/services/custom-healthcare-software-development',
  saasDevelopment: '/services/saas-web-application-development',
  cloudInfrastructure: '/services/cloud-infrastructure-engineering',
} as const;


/* =========================================================
   HOME FEATURES
========================================================= */

export const HOME_FEATURES = [
  /* =======================================================
     01 - AI VOICE AGENTS
  ======================================================= */
  {
    id: 'ai-voice-agents-healthcare',
    layout: 'media-left',
    spacing: 'first',
    theme: 'dark',
    eyebrow: 'AI VOICE AGENTS',
    heading: 'AI Voice Agents for Healthcare Patient Communication',
    description: [
      'Help patients connect with your practice through intelligent voice-agent solutions designed around your communication workflows.',
      'Byte Operator develops AI voice-agent systems that can support routine patient interactions, capture requests, and route conversations to the appropriate team members.',
      'Depending on the implementation and connected systems, capabilities can include: Inbound call answering and routine practice inquiries, appointment requests and scheduling workflows, appointment rescheduling through supported systems, patient information and inquiry collection, call routing and human team handover, appointment reminders and approved follow-up calls, structured conversation records and notifications.',
      'Our approach focuses on making patient communication more accessible while keeping your team involved whenever human assistance is required.',
    ],
    buttons: [
      {
        label: 'Explore AI Voice Agents',
        href: ROUTES.aiVoiceAgents,
      },
    ],
    media: {
      href: ROUTES.aiVoiceAgents,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/AI_Voice_Agents_Section_Rounded.png?v=1793788739',
      primaryAlt:
        'AI Voice Agents for Healthcare Patient Communication',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Healthcare Voice Agents',
      captionText: '24/7 Intelligent Patient Communication & Triage',
    },
  },

  /* =======================================================
     02 - HEALTHCARE WORKFLOW AUTOMATION
  ======================================================= */
  {
    id: 'ai-workflow-automation-healthcare',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'HEALTHCARE WORKFLOW AUTOMATION',
    heading: 'Healthcare Workflow Automation That Reduces Repetitive Work',
    description: [
      'Reduce manual administrative processes with healthcare workflow automation designed around your existing systems and business requirements.',
      'We help identify repetitive tasks and develop automated workflows that improve coordination between applications and teams.',
      'Potential automation workflows include: Patient inquiry capture and routing, appointment confirmations and reminders, digital intake and information collection, follow-up task creation and notifications, internal team alerts and workflow handovers, data synchronization between supported applications, routine administrative process automation.',
      'Every workflow is planned around your organization’s operational requirements, available technology, and approval processes.',
    ],
    buttons: [
      {
        label: 'Discuss Your Automation Requirements',
        href: ROUTES.aiWorkflowAutomation,
      },
    ],
    media: {
      href: ROUTES.aiWorkflowAutomation,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Workflow_Automation_Story_Image.png?v=1793792357',
      primaryAlt:
        'Healthcare workflow automation pipelines and administrative routing',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Workflow Automation',
      captionText: 'Administrative Task Orchestration & Automated Alerts',
    },
  },

  /* =======================================================
     03 - HEALTHCARE SYSTEM INTEGRATION
  ======================================================= */
  {
    id: 'healthcare-system-integration',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'HEALTHCARE SYSTEM INTEGRATION',
    heading: 'Connect Your Healthcare Systems and Applications',
    description: [
      'Disconnected applications can create unnecessary manual work and fragmented processes. Our integration solutions help supported systems exchange information and coordinate essential business workflows.',
      'Our integration services can include: API development and third-party API integration, scheduling and practice-management system connectivity, CRM and communication platform integration, secure data exchange and workflow synchronization, custom middleware and integration services, healthcare interoperability assessment, HL7 and FHIR integration planning, where applicable.',
      'We evaluate the available APIs, technical requirements, access permissions, and vendor capabilities before defining an integration solution.',
    ],
    buttons: [
      {
        label: 'Explore Integration Services',
        href: ROUTES.systemIntegration,
      },
    ],
    media: {
      href: ROUTES.systemIntegration,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/System_Integration_Section_Image.png?v=1793792551',
      primaryAlt:
        'Healthcare system integration and secure API data workflows',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'System Integration',
      captionText: 'Practice Management & EHR Interoperability',
    },
  },

  /* =======================================================
     04 - SOLUTIONS BY SPECIALTY
  ======================================================= */
  {
    id: 'solutions-by-specialty',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'SOLUTIONS BY SPECIALTY',
    heading: 'Healthcare Technology Tailored to Your Medical Specialty',
    description: [
      'Different healthcare specialties have different patient communication, administrative, and technology requirements. We develop solutions around the workflows and operational needs of each organization.',
      '• Medical Practices: Patient communication, appointment workflows, intake processes, and administrative automation.',
      '• Dental Practices: Patient inquiries, appointment coordination, follow-ups, and connected practice workflows.',
      '• Dermatology & Aesthetic Clinics: Consultation inquiries, patient communication, appointment requests, and administrative automation.',
      '• Ophthalmology Clinics: Patient communication, appointment coordination, and connected administrative processes.',
      '• Primary Care Practices: Patient access workflows, routine inquiries, intake processes, and administrative task automation.',
      '• Other Healthcare Specialties: Custom technology solutions designed around your specialty, systems, and operational requirements.',
    ],
    buttons: [
      {
        label: 'Find a Solution for Your Practice',
        href: ROUTES.contact,
      },
    ],
    media: {
      href: ROUTES.contact,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Solutions_by_Specialty_Image.png?v=1793802329',
      primaryAlt:
        'Healthcare specialty technology solutions and practice workflows',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Specialty Solutions',
      captionText: 'Tailored Technology for Practices & Specialty Clinics',
    },
  },

  /* =======================================================
     05 - CUSTOM HEALTHCARE SOFTWARE
  ======================================================= */
  {
    id: 'custom-healthcare-software',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'CUSTOM HEALTHCARE SOFTWARE',
    heading: 'Custom Healthcare Software Development',
    description: [
      'When off-the-shelf platforms do not fully support your workflows, custom software can provide a more suitable approach.',
      'Byte Operator develops software around your organization’s requirements, users, business processes, and integration needs.',
      'Our custom software development services can include: Custom healthcare web applications, patient and staff portals, internal management platforms, operational dashboards and reporting tools, workflow and data-management applications, legacy application modernization, ongoing maintenance and feature development.',
      'From initial requirements to development and deployment, we focus on building software that addresses real operational challenges.',
    ],
    buttons: [
      {
        label: 'Discuss Your Software Project',
        href: ROUTES.customHealthcareSoftware,
      },
    ],
    media: {
      href: ROUTES.customHealthcareSoftware,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Custom_Software_Section_Image.png?v=1793802627',
      primaryAlt:
        'Custom healthcare software platforms and portals',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Custom Software Development',
      captionText: 'Tailored Web Applications & Portals Built to Scale',
    },
  },

  /* =======================================================
     06 - SAAS & WEB APPLICATION DEVELOPMENT
  ======================================================= */
  {
    id: 'saas-web-application-development',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'SAAS & WEB APPLICATION DEVELOPMENT',
    heading: 'SaaS and Web Applications Designed to Scale',
    description: [
      'Building a successful digital product requires more than a functional interface. It needs a reliable architecture, secure access, maintainable code, and a clear path for future development.',
      'We help businesses design and develop: SaaS platforms and subscription-based applications, custom web applications, multi-user and role-based platforms, administrative dashboards, database-driven applications, API-connected digital products, existing application enhancements and modernization.',
      'From product planning to development and deployment, we build around your technical requirements and business objectives.',
    ],
    buttons: [
      {
        label: 'Build Your Application',
        href: ROUTES.saasDevelopment,
      },
    ],
    media: {
      href: ROUTES.saasDevelopment,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/SaaS_Web_Apps_Section_Image.webp?v=1793802744',
      primaryAlt:
        'Scalable SaaS and multi-user web applications',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'SaaS Platform Engineering',
      captionText: 'Modern Web Architecture & Multi-Tenant Infrastructure',
    },
  },

  /* =======================================================
     07 - CLOUD & INFRASTRUCTURE ENGINEERING
  ======================================================= */
  {
    id: 'cloud-infrastructure-engineering',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'CLOUD & INFRASTRUCTURE ENGINEERING',
    heading: 'Cloud and Infrastructure Engineering for Modern Healthcare Applications',
    description: [
      'Reliable digital products need a technical foundation that supports performance, security, maintenance, and future growth.',
      'Our cloud and infrastructure services can include: Cloud architecture and environment planning, application deployment and configuration, database architecture and management, API and backend infrastructure, development and deployment automation, application monitoring and maintenance, backup and recovery planning.',
      'We assess your technical requirements before recommending an infrastructure architecture or deployment approach.',
    ],
    buttons: [
      {
        label: 'Explore Cloud Infrastructure',
        href: ROUTES.cloudInfrastructure,
      },
    ],
    media: {
      href: ROUTES.cloudInfrastructure,
      primary:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Cloud_Infrastructure_Section_Image.png?v=1793802857',
      primaryAlt:
        'Cloud and backend infrastructure engineering',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Cloud Engineering',
      captionText: 'Resilient Backend, Database & Infrastructure Design',
    },
  },
] as const satisfies readonly HomeFeatureData[];
