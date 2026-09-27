/*
  CLIENT LOGOS — BYTE OPERATOR
  Only add logos of brands that are confirmed, real Byte Operator clients.
  Do NOT add any brand logo unless the project is live in the case studies.
*/

export type ClientLogoMarqueeItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  size?: 'small' | 'large';
  noFilter?: boolean;
};

/*
  Real client logos — add here as projects are confirmed and case studies published.
  Each logo must correspond to an existing entry in caseStudiesData.ts.

  The files in /images/work/logos/ are text wordmarks standing in until the
  real logo files arrive. To swap one in, replace its `src`, `width` and
  `height` (keep the height at 36 and scale the width to the logo's ratio).
*/
export const HOME_CLIENT_LOGOS: readonly ClientLogoMarqueeItem[] = [
  {
    src: '/images/work/logos/collabix.svg',
    width: 120,
    height: 36,
    alt: 'Collabix logo',
  },
  {
    src: '/images/work/logos/replex.svg',
    width: 91,
    height: 36,
    alt: 'Replex Engine logo',
  },
  {
    src: '/images/work/logos/aydi.svg',
    width: 164,
    height: 36,
    alt: 'Aydi Active logo',
  },
  {
    src: '/images/work/logos/nordic-haven.svg',
    width: 179,
    height: 36,
    alt: 'Nordic Haven logo',
  },
  {
    src: '/images/work/logos/omniretail.svg',
    width: 150,
    height: 36,
    alt: 'OmniRetail logo',
  },
  {
    src: '/images/work/logos/speedify.svg',
    width: 164,
    height: 36,
    alt: 'Speedify AI logo',
  },
  {
    src: '/images/work/logos/kids-wonderland.svg',
    width: 222,
    height: 36,
    alt: 'Kids Wonderland logo',
  },
  {
    src: '/images/work/logos/autonomous-agent.svg',
    width: 339,
    height: 36,
    alt: 'Autonomous Agent Swarms logo',
  },
] as const;
