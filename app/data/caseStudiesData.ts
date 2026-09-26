export interface CaseStudyItem {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  category?: string;
  tags: string[];
  href?: string;
  result?: { value: string };
  services?: { value: string };
  metrics?: Array<{ label: string; value: string }>;
  client?: string;
  industry?: string;
  image?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  logo?: {
    reference?: {
      image?: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    };
  };
  intro?: string;
  details?: Array<{ label: string; value: string }>;
  stats?: Array<{ value: string; label: string }>;
  chapters?: Array<{
    number: string;
    title: string;
    subheading: string;
    points: Array<{ title: string; text: string }>;
  }>;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-1',
    handle: 'triangl',
    title: 'TRIANGL',
    subtitle: 'Global Luxury Swimwear Replatform & Performance',
    category: 'Fashion & Apparel',
    tags: ['cro', 'software-plus', 'international', 'fashion', 'development'],
    result: { value: '+42% Mobile Conversion Rate' },
    services: { value: 'Enterprise Platform Solutions / Custom Theme / Global Checkout' },
    metrics: [
      { label: 'Mobile Conversion', value: '+42%' },
      { label: 'Avg Order Value', value: '+18%' },
      { label: 'Page Load Speed', value: '0.8s' },
    ],
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'TRIANGL Case Study',
      width: 1200,
      height: 800,
    },
    intro: 'How Byte Operator redesigned and re-architected TRIANGL’s global e-commerce presence for high-velocity international scaling.',
    details: [
      { label: 'Client', value: 'TRIANGL Swimwear' },
      { label: 'Industry', value: 'Fashion & Luxury Goods' },
      { label: 'Platform', value: 'Enterprise Platform Solutions' },
      { label: 'Services', value: 'CRO, Custom Theme, Multi-Currency' },
    ],
    stats: [
      { value: '+42%', label: 'Mobile Conversion' },
      { value: '1.2s', label: 'Faster Load Times' },
      { value: '65%', label: 'Increase in Global Transactions' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'High traffic, international currency friction and slow mobile UX',
        points: [
          { title: 'Global Localization', text: 'Serving customers across 80+ countries with automatic currency and tax calculation.' },
          { title: 'Mobile Checkout Flow', text: 'Reducing friction in the multi-step size and color selector for swimwear separates.' },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Headless-grade speed on Enterprise Platform Solutions with custom Liquid & Hydrogen components',
        points: [
          { title: 'Custom Fit Guide', text: 'Interactive bikini top and bottom mix-and-match selector with instant cart updates.' },
          { title: 'Performance Optimization', text: 'Sub-second page transitions, asset preloading, and responsive image srcset.' },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Record revenue growth and industry-leading mobile conversion metrics',
        points: [
          { title: 'Conversion Boost', text: 'Mobile conversion grew by 42% in the first 90 days after launch.' },
          { title: 'Retention Growth', text: 'Repeat customer purchase rates increased by 24% year-over-year.' },
        ],
      },
    ],
  },
  {
    id: 'cs-2',
    handle: 'chimi-eyewear',
    title: 'CHIMI Eyewear',
    subtitle: 'Swedish Eyewear Brand Global Scaling',
    category: 'Accessories & Luxury',
    tags: ['cro', 'software-plus', 'seo', 'design'],
    result: { value: '+65% International Revenue' },
    services: { value: 'Custom Enterprise Platform Solutions / 3D Virtual Try-On' },
    metrics: [
      { label: 'International Revenue', value: '+65%' },
      { label: 'Bounce Rate', value: '-31%' },
      { label: 'Checkout Completion', value: '+28%' },
    ],
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'CHIMI Eyewear Case Study',
      width: 1200,
      height: 800,
    },
    intro: 'Rebuilding CHIMI’s digital flagship to match their Scandinavian aesthetic while driving unprecedented conversion globally.',
    details: [
      { label: 'Client', value: 'CHIMI Eyewear' },
      { label: 'Industry', value: 'Luxury Accessories' },
      { label: 'Platform', value: 'Enterprise Platform Solutions' },
    ],
    stats: [
      { value: '+65%', label: 'International Sales' },
      { value: '-31%', label: 'Bounce Rate' },
      { value: '+28%', label: 'Checkout Completion' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Elevating digital brand perception while solving sizing friction online',
        points: [
          { title: 'Brand Alignment', text: 'Translating physical retail luxury into fluid web animations and editorial layouts.' },
          { title: 'Virtual Fitting', text: 'Overcoming return rates caused by customers guessing frame fit.' },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Precision CRO and headless architectural patterns',
        points: [
          { title: 'Interactive Sizing', text: 'Detailed frame dimensions and virtual face-shape recommendations.' },
          { title: 'SEO Architecture', text: 'Structured schema and collection page hierarchy ranking #1 for designer sunglasses keywords.' },
        ],
      },
    ],
  },
  {
    id: 'cs-3',
    handle: 'castore',
    title: 'Castore Sportswear',
    subtitle: 'High Performance Athletic Brand Enterprise Scale',
    category: 'Sportswear & Performance',
    tags: ['migration', 'software-plus', 'cro', 'seo'],
    result: { value: '+88% Black Friday Peak Sales' },
    services: { value: 'Enterprise Architecture / Speed Optimization / CRO' },
    metrics: [
      { label: 'Peak Concurrency', value: '50k/min' },
      { label: 'Load Time', value: '0.9s' },
      { label: 'Conversion Uplift', value: '+34%' },
    ],
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'Castore Sportswear Case Study',
      width: 1200,
      height: 800,
    },
    intro: 'Powering high-velocity kit launches and international sporting federation stores on Enterprise Platform Solutions.',
    details: [
      { label: 'Client', value: 'Castore' },
      { label: 'Industry', value: 'Sportswear' },
      { label: 'Platform', value: 'Enterprise Platform Solutions Enterprise' },
    ],
    stats: [
      { value: '+88%', label: 'Black Friday Peak' },
      { value: '0.9s', label: 'Average Load Time' },
      { value: '+34%', label: 'Conversion Uplift' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Handling massive spike traffic during football & F1 kit drops',
        points: [
          { title: 'Surge Traffic', text: 'Tens of thousands of simultaneous users rushing to purchase limited edition jerseys.' },
          { title: 'Inventory Syncing', text: 'Real-time multi-warehouse inventory allocation across UK, EU, and US.' },
        ],
      },
    ],
  },
];

export function getCaseStudyByHandle(handle: string): CaseStudyItem | undefined {
  return CASE_STUDIES.find((cs) => cs.handle === handle || cs.id === handle);
}
