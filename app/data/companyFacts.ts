/* =========================================================
   BYTE OPERATOR — APPROVED FACTS REGISTER

   The only company statistics published anywhere on the site.

   Every surface that shows a company figure reads from here:
   the homepage, the About page, the contact hero, the SEO
   results block, the Enterprise Platform Solutions hero chips. Before this
   existed the homepage said 16,500+ stores and the About page
   said 150+ — both live, on the same domain, 110x apart.

   Adding a figure here publishes it. If it cannot be evidenced
   against a contract, a third-party platform record or the
   Software Engineering Partner Directory, it does not go in.
========================================================= */

export type CompanyFact = {
  /** Rendered exactly as written. A comma here turns on grouped counting. */
  value: string;

  label: string;

  /** Count-up animation target, used by the About page stat cards. */
  target: number;
  prefix: string;
  suffix: string;
  decimals: number;

  /** Long-form copy, used where a stat carries a paragraph. */
  description: string;

  /** What backs the figure. Internal — never rendered. */
  evidence: string;
};

export const COMPANY_FACTS = {
  projects: {
    value: '2800+',
    label: 'Projects Completed',
    target: 2800,
    prefix: '',
    suffix: '+',
    decimals: 0,
    description:
      'Ecommerce, development and optimisation projects delivered across client engagements, giving our team practical experience across complex storefront requirements.',
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
      'Our rating on the Software Engineering Partner Directory across 414 client reviews — a record built on delivered work rather than marketing claims.',
    evidence: 'Software Engineering Partner Directory',
  },

  engagements: {
    value: '666',
    label: 'Client Engagements',
    target: 666,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'Client engagements completed end to end and closed out on a verified third-party delivery platform, every one of them logged against a contract.',
    evidence: 'Third-party platform record',
  },

  hours: {
    value: '53,797',
    label: 'Tracked Delivery Hours',
    target: 53797,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'Delivery hours tracked against client work on a verified third-party platform — time measured by the platform, not estimated by us.',
    evidence: 'Third-party platform record',
  },

  jobSuccess: {
    value: '100%',
    label: 'Job Success Rate',
    target: 100,
    prefix: '',
    suffix: '%',
    decimals: 0,
    description:
      'A perfect job success score across every engagement on our verified third-party platform record, sustained since 2011.',
    evidence: 'Third-party platform record',
  },

  clients: {
    value: '131',
    label: 'Unique Clients Served',
    target: 131,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'Brands supported between 2015 and 2026 across build, migration, search and conversion work, from growth-stage merchants through to Enterprise Platform Solutions operations.',
    evidence: 'Internal contract export, 2015-2026',
  },

  delivered: {
    value: '$800K+',
    label: 'Contract Value Delivered',
    target: 800,
    prefix: '$',
    suffix: 'K+',
    decimals: 0,
    description:
      'Client contract value delivered and settled through our verified third-party platform record.',
    evidence: 'Third-party platform record',
  },

  team: {
    value: '~50',
    label: 'Specialists On The Team',
    target: 50,
    prefix: '~',
    suffix: '',
    decimals: 0,
    description:
      'Specialists across engineering, design, SEO, CRO and delivery, working as one team rather than a network of contractors.',
    evidence: 'Internal headcount',
  },

  partnerSince: {
    value: '2016',
    label: 'Software Engineering Partner Since',
    target: 2016,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'A Software Engineering Partner since January 2016, and a Enterprise Software Partner and Software Engineering Expert since.',
    evidence: 'Software Engineering Partner Directory',
  },

  founded: {
    value: '2010',
    label: 'Established Since',
    target: 2010,
    prefix: '',
    suffix: '',
    decimals: 0,
    description:
      'Delivering ecommerce work since 2010, with a continuous third-party platform history running back to 2011.',
    evidence: 'Third-party company records',
  },
} as const satisfies Record<string, CompanyFact>;

/* =========================================================
   WHAT EACH SURFACE SHOWS

   The homepage and About grids are `repeat(4)`, the contact
   grid `repeat(2)` — four tiles each. The track-record strip
   takes three. Reshuffle by editing these lists; nothing in
   the components needs touching.
========================================================= */

/** Homepage — six figures on one line across desktop. */
export const HOME_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.reviews,
  COMPANY_FACTS.hours,
  COMPANY_FACTS.jobSuccess,
  COMPANY_FACTS.founded,
];

/** About page — the depth behind the headline. */
export const ABOUT_FACTS = [
  COMPANY_FACTS.engagements,
  COMPANY_FACTS.hours,
  COMPANY_FACTS.jobSuccess,
  COMPANY_FACTS.team,
];

/** Contact hero — reasons to send the form. */
export const CONTACT_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.reviews,
  COMPANY_FACTS.clients,
  COMPANY_FACTS.partnerSince,
];

/** Work page — what the portfolio is backed by. */
export const WORK_FACTS = [
  COMPANY_FACTS.projects,
  COMPANY_FACTS.engagements,
  COMPANY_FACTS.clients,
  COMPANY_FACTS.jobSuccess,
];

/** Track-record strip — the three third-party verified figures. */
export const TRACK_RECORD_FACTS = [
  COMPANY_FACTS.engagements,
  COMPANY_FACTS.hours,
  COMPANY_FACTS.delivered,
];
