import type {ClientProofLogo} from '~/components/shared/ClientProof';
import {HOME_CLIENT_LOGOS} from '~/data/clientLogos';

/*
 * The placeholder client testimonial (quote + company "Byte Operator Client")
 * was removed on 2026-09-27: it was never real copy. Add a testimonial here
 * only with the client's approved quote, name and company. The review video
 * and still remain at /videos/lianareview.mp4 and /images/work/liana-review.webp.
 */

/** The first six homepage client logos, so names and sizes live in one place. */
export const WORK_HERO_LOGOS: ClientProofLogo[] = HOME_CLIENT_LOGOS.slice(
  0,
  6,
).map(({src, alt, width, height}) => ({src, alt, width, height}));
