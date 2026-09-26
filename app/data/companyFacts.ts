/* =========================================================
   BYTE OPERATOR - APPROVED FACTS REGISTER

   The official company statistics published across the site.

   Every surface that shows a company figure reads from here:
   the homepage, the About page, the contact hero, the SEO
   results block, the Enterprise Platform Solutions hero chips.
========================================================= */

export type CompanyFact = {
  /** Rendered exactly as written. A comma here turns on grouped counting. */
  value: string;

  label: string;

  /** Count-up animation target, used by stat cards. */
  target: number;
  prefix: string;
  suffix: string;
  decimals: number;

  /** Long-form copy, used where a stat carries a paragraph. */
  description: string;

  /** What backs the figure. Internal - never rendered. */
  evidence: string;
};

export const COMPANY_FACTS = {
  projects: {
    value: '100+',
    label: 'Projects Completed',
    target: 100,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'Digital commerce, engineering, and performance optimisation projects delivered across client engagements.',
    evidence: 'Internal delivery record',
  },

  reviews: {
    value: '4.9/5.0',
    label: '414 Client Reviews',
    target: 4.9,
    prefix: '',
    suffix: '/5.0',
    decimals: 1,
    description:
      'Our client rating across verified project deliveries, reflecting our commitment to engineering excellence.',
    evidence: 'Verified client reviews',
  },

  engagements: {
    value: '180+',
    label: 'Client Engagements',
    target: 180,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'End-to-end digital engineering and growth engagements completed for high-growth brands.',
    evidence: 'Verified client platform records',
  },

  jobSuccess: {
    value: '100%',
    label: 'Job Success Rate',
    target: 100,
    prefix: '',
    suffix: '%',
    decimals: 0,
    description:
      'A 100% job success rate sustained across every client project and enterprise rollout.',
    evidence: 'Client delivery record',
  },

  clients: {
    value: '85+',
    label: 'Unique Clients Served',
    target: 85,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'Brands supported across build, migration, search, and conversion optimisation work.',
    evidence: 'Internal client register',
  },

  delivered: {
    value: '$2M+',
    label: 'Contract Value Delivered',
    target: 2,
    prefix: '$',
    suffix: 'M+',
    decimals: 0,
    description:
      'Client contract value delivered and settled through enterprise platform projects.',
    evidence: 'Client contract records',
  },

  team: {
    value: '~35',
    label: 'Specialists On The Team',
    target: 35,
    prefix: '~',
    suffix: '',
    decimals: 0,
    description:
      'Specialists across full-stack engineering, UX/UI design, SEO, CRO, and cloud architecture.',
    evidence: 'Internal headcount',
  },

  partnerSince: {
    value: '2025',
    label: 'Software Engineering Partner Since',
    target: 2025,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'Certified Software Engineering Partner and Enterprise Platform specialist since 2025.',
    evidence: 'Software Engineering Partner Directory',
  },

  founded: {
    value: '2025',
    label: 'Established Since',
    target: 2025,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'Delivering cutting-edge software engineering and platform growth since 2025.',
    evidence: 'Company registration records',
  },
} as const satisfies Record<string, CompanyFact>;

/* =========================================================
   WHAT EACH SURFACE SHOWS
========================================================= */

/** Homepage - key figures across desktop. */
export const HOME_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.reviews,
  COMPANY_FACTS.jobSuccess,
  COMPANY_FACTS.founded,
];

/** About page - the depth behind the headline. */
export const ABOUT_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.engagements,
  COMPANY_FACTS.jobSuccess,
  COMPANY_FACTS.team,
];

/** Contact hero - reasons to send the form. */
export const CONTACT_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.reviews,
  COMPANY_FACTS.clients,
  COMPANY_FACTS.partnerSince,
];

/** Work page - what the portfolio is backed by. */
export const WORK_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.engagements,
  COMPANY_FACTS.clients,
  COMPANY_FACTS.jobSuccess,
];

/** Track-record strip - verified figures. */
export const TRACK_RECORD_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.engagements,
  COMPANY_FACTS.delivered,
];
