import type {
  ClientProofLogo,
  ClientProofTestimonial,
} from '~/components/shared/ClientProof';

export const WORK_HERO_TESTIMONIAL: ClientProofTestimonial = {
  quote:
    'FoldTech helped us create a stronger ecommerce experience built around growth and performance.',
  person: 'Client Name',
  company: 'Company Name',
  image: '/images/home-people/people.jpeg',
  video: '/videos/foldtech-hero-video.mp4',
};

export const WORK_HERO_LOGOS: ClientProofLogo[] = [
  {
    src: '/images/home-projects/cambridge/logo.svg',
    alt: 'Cambridge Satchel',
  },
  {
    src: '/images/home-services/clients/billionaire-boys-club.svg',
    alt: 'Billionaire Boys Club',
  },
  {
    src: '/images/home-projects/111skin/logo.svg',
    alt: '111SKIN',
  },
  {
    src: '/images/home-services/clients/candy-kittens.svg',
    alt: 'Candy Kittens',
  },
  {
    src: '/images/home-services/clients/muc-off.svg',
    alt: 'Muc-Off',
  },
  {
    src: '/images/home-projects/case/logo.svg',
    alt: 'Case Furniture',
  },
];
