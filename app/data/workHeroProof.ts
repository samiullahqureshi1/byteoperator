import type {
  ClientProofLogo,
  ClientProofTestimonial,
} from '~/components/shared/ClientProof';

/**
 * The client review used across the site: hero badges, the about page, the
 * contact card and every service page. The thumbnail is a still lifted from
 * the video itself, so the face on the badge matches the one that plays.
 *
 * `quote` and `company` are still placeholders awaiting Liana's real copy.
 */
export const WORK_HERO_TESTIMONIAL: ClientProofTestimonial = {
  quote:
    'FoldTech helped us create a stronger ecommerce experience built around growth and performance.',
  person: 'Liana',
  company: 'Company Name',
  image: '/images/work/liana-review.webp',
  imageWidth: 260,
  imageHeight: 260,
  video: '/videos/lianareview.mp4',
};

export const WORK_HERO_LOGOS: ClientProofLogo[] = [
  {
    src: '/images/home-services/clients/logo-1.svg',
    alt: '',
    width: 438,
    height: 48,
  },
  {
    src: '/images/home-services/clients/logo-2.svg',
    alt: '',
    width: 547,
    height: 120,
  },
  {
    src: '/images/home-services/clients/logo-3.svg',
    alt: '',
    width: 1200,
    height: 200,
  },
  {
    src: '/images/home-services/clients/logo-4.svg',
    alt: '',
    width: 2609,
    height: 480,
  },
  {
    src: '/images/home-services/clients/logo-5.svg',
    alt: '',
    width: 1800,
    height: 541,
  },
  {
    src: '/images/home-services/clients/logo-6.svg',
    alt: '',
    width: 2789,
    height: 965,
  },
];
