/*
  FOUNDERS — BYTE OPERATOR
  Verified facts only (confirmed by Byte Operator, 2026-09-27).
  Used by the About page founders section and the site-wide Person schema,
  so the visible names/roles and the structured data can never disagree.

  To add later (only with verified information):
  - image: path to a real photo, e.g. '/images/about/founders/samiullah-qureshi.webp'
  - bio: a short, approved biography
*/

export type Founder = {
  /** Stable slug, used in the Person schema @id. Never change once published. */
  id: string;
  name: string;
  /** Exact role title; also the schema `jobTitle`. */
  role: 'Founder' | 'Co-Founder';
  /** Verified LinkedIn profile URL. */
  linkedin?: string;
  /** Real photo only. Leave undefined until one is provided. */
  image?: {src: string; width: number; height: number};
};

export const FOUNDERS: readonly Founder[] = [
  {
    id: 'samiullah-qureshi',
    name: 'Samiullah Qureshi',
    role: 'Founder',
    linkedin: 'https://www.linkedin.com/in/samiullah-qureshi-756261318/',
  },
  {
    id: 'uzair-khan',
    name: 'Uzair Khan',
    role: 'Co-Founder',
    linkedin: 'https://www.linkedin.com/in/uzair-khan-jadoon-88893030b/',
  },
];
