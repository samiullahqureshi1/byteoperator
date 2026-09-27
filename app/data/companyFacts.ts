/* =========================================================
   BYTE OPERATOR - APPROVED FACTS REGISTER

   The official company statistics published across the site.

   Every surface that shows a company figure reads from here:
   the homepage, the About page, the contact hero, the SEO
   results block, the Enterprise Platform Solutions hero chips.

   RULE: Only publish figures that can be verified from internal
   records. Do not inflate or estimate upward. A conservative
   real number is worth more than an impressive false one.
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
    value: '20+',
    label: 'Projects Delivered',
    target: 20,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'Digital engineering, platform builds, and performance optimisation projects delivered since 2025.',
    evidence: 'Internal delivery record',
  },

  reviews: {
    value: '4.9/5.0',
    label: 'Client Satisfaction',
    target: 4.9,
    prefix: '',
    suffix: '/5.0',
    decimals: 1,
    description:
      'Our client satisfaction rating across delivered projects, reflecting our commitment to engineering excellence.',
    evidence: 'Client feedback on file',
  },

  engagements: {
    value: '15+',
    label: 'Client Engagements',
    target: 15,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'End-to-end digital engineering and growth engagements completed for high-growth brands since 2025.',
    evidence: 'Internal client register',
  },

  jobSuccess: {
    value: '100%',
    label: 'Job Success Rate',
    target: 100,
    prefix: '',
    suffix: '%',
    decimals: 0,
    description:
      'A 100% on-time delivery rate sustained across every client project and enterprise rollout.',
    evidence: 'Client delivery record',
  },

  clients: {
    value: '15+',
    label: 'Clients Served',
    target: 15,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'Brands supported across build, migration, search, and conversion optimisation work since 2025.',
    evidence: 'Internal client register',
  },

  delivered: {
    value: '$500K+',
    label: 'Contract Value Delivered',
    target: 500,
    prefix: '$',
    suffix: 'K+',
    decimals: 0,
    description:
      'Client contract value delivered through engineering, platform, and growth projects.',
    evidence: 'Client contract records',
  },

  team: {
    value: '~10',
    label: 'Specialists On The Team',
    target: 10,
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
