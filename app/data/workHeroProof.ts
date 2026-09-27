import type {
  ClientProofLogo,
  ClientProofTestimonial,
} from '~/components/shared/ClientProof';
import {HOME_CLIENT_LOGOS} from '~/data/clientLogos';

/**
 * The client review used across the site: hero badges, the about page, the
 * contact card and every service page. The thumbnail is a still lifted from
 * the video itself, so the face on the badge matches the one that plays.
 *
 * `quote` and `company` are still placeholders awaiting Liana's real copy.
 */
export const WORK_HERO_TESTIMONIAL: ClientProofTestimonial = {
  quote:
    'Byte Operator helped us create a stronger ecommerce experience built around growth and performance.',
  person: 'Liana',
  company: 'Byte Operator Client',
  image: '/images/work/liana-review.webp',
  imageWidth: 260,
  imageHeight: 260,
  video: '/videos/lianareview.mp4',
};

/** The first six homepage client logos, so names and sizes live in one place. */
export const WORK_HERO_LOGOS: ClientProofLogo[] = HOME_CLIENT_LOGOS.slice(
  0,
  6,
).map(({src, alt, width, height}) => ({src, alt, width, height}));
