export type ClientLogoMarqueeItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  size?: 'small' | 'large';
  noFilter?: boolean;
};

export const HOME_CLIENT_LOGOS: readonly ClientLogoMarqueeItem[] = [
  {
    src: '/images/home-services/clients/gymshark.svg',
    width: 180,
    height: 36,
    alt: 'Gymshark logo',
  },
  {
    src: '/images/home-services/clients/skims.svg',
    width: 130,
    height: 36,
    alt: 'SKIMS logo',
  },
  {
    src: '/images/home-services/clients/allbirds.svg',
    width: 140,
    height: 36,
    alt: 'Allbirds logo',
  },
  {
    src: '/images/home-services/clients/kylie.svg',
    width: 170,
    height: 36,
    alt: 'Kylie Cosmetics logo',
  },
  {
    src: '/images/home-services/clients/glossier.svg',
    width: 140,
    height: 36,
    alt: 'Glossier logo',
  },
  {
    src: '/images/home-services/clients/mvmt.svg',
    width: 130,
    height: 36,
    alt: 'MVMT logo',
  },
  {
    src: '/images/home-services/clients/heinz.svg',
    width: 120,
    height: 36,
    alt: 'Heinz logo',
  },
  {
    src: '/images/home-services/clients/rebeccaminkoff.svg',
    width: 190,
    height: 36,
    alt: 'Rebecca Minkoff logo',
  },
  {
    src: '/images/home-services/clients/bulletproof.svg',
    width: 160,
    height: 36,
    alt: 'Bulletproof logo',
  },
  {
    src: '/images/home-services/clients/chubbies.svg',
    width: 140,
    height: 36,
    alt: 'Chubbies logo',
  },
  {
    src: '/images/home-services/clients/cratebarrel.svg',
    width: 170,
    height: 36,
    alt: 'Crate & Barrel logo',
  },
  {
    src: '/images/home-services/clients/polaroid.svg',
    width: 140,
    height: 36,
    alt: 'Polaroid logo',
  },
  {
    src: '/images/home-services/clients/staples.svg',
    width: 140,
    height: 36,
    alt: 'Staples logo',
  },
  {
    src: '/images/home-services/clients/stevemadden.svg',
    width: 180,
    height: 36,
    alt: 'Steve Madden logo',
  },
  {
    src: '/images/home-services/clients/vuori.svg',
    width: 130,
    height: 36,
    alt: 'Vuori logo',
  },
  {
    src: '/images/home-services/clients/brooklinen.svg',
    width: 150,
    height: 36,
    alt: 'Brooklinen logo',
  },
  {
    src: '/images/home-services/clients/rothys.svg',
    width: 140,
    height: 36,
    alt: "Rothy's logo",
  },
  {
    src: '/images/home-services/clients/ridge.svg',
    width: 120,
    height: 36,
    alt: 'The Ridge logo',
  },
  {
    src: '/images/home-services/clients/casper.svg',
    width: 120,
    height: 36,
    alt: 'Casper logo',
  },
  {
    src: '/images/home-services/clients/aloyoga.svg',
    width: 100,
    height: 36,
    alt: 'Alo Yoga logo',
  },
  {
    src: '/images/home-services/clients/manscaped.svg',
    width: 160,
    height: 36,
    alt: 'Manscaped logo',
  },
  {
    src: '/images/home-services/clients/liquidiv.svg',
    width: 150,
    height: 36,
    alt: 'Liquid I.V. logo',
  },
  {
    src: '/images/home-services/clients/wearfigs.svg',
    width: 110,
    height: 36,
    alt: 'FIGS logo',
  },
  {
    src: '/images/home-services/clients/oatly.svg',
    width: 130,
    height: 36,
    alt: 'Oatly logo',
  },
] as const;
