export interface HeaderMenuItem {
  id: string;
  title: string;
  url: string;
  items?: HeaderMenuItem[];
}

export const SITE_HEADER_MENU = {
  shop: {
    primaryDomain: {
      url: 'https://www.byteoperator.com',
    },
  },
  menu: {
    id: 'main-menu',
    items: [
      {
        id: 'our-work',
        title: 'Our Work',
        url: '/work',
        items: [],
      },
      {
        id: 'services',
        title: 'Services',
        url: '/services',
        items: [],
      },
      {
        id: 'about',
        title: 'About us',
        url: '/about',
        items: [],
      },
      {
        id: 'resources',
        title: 'Resources',
        url: '/articles',
        items: [],
      },
      {
        id: 'contact',
        title: 'Contact',
        url: '/contact',
        items: [],
      },
    ],
  },
};

export const SITE_FOOTER_MENU = {
  menu: {
    id: 'footer-menu',
    items: [
      {
        id: 'footer-services',
        title: 'Services',
        items: [
          {id: 'fs-1', title: 'Enterprise Software Solutions', url: '/services/software-developers'},
          {id: 'fs-2', title: 'Performance & CRO Audits', url: '/services/software-audits'},
          {id: 'fs-3', title: 'Technical SEO & Search Architecture', url: '/ecommerce-seo-agency'},
          {id: 'fs-4', title: 'Custom Frontend & Web Engineering', url: '/services/software-theme-development-builds'},
          {id: 'fs-5', title: 'Cloud & API System Integrations', url: '/services/software-integrations'},
          {id: 'fs-6', title: 'Platform & Cloud Migrations', url: '/services/software-migrations'},
          {id: 'fs-7', title: 'AI Visibility & Generative Search', url: '/ai-visibility-audit'},
        ],
      },
      {
        id: 'footer-company',
        title: 'Company',
        items: [
          {id: 'fc-1', title: 'Our Work', url: '/work'},
          {id: 'fc-2', title: 'About Us', url: '/about'},
          {id: 'fc-3', title: 'Articles & Insights', url: '/articles'},
          {id: 'fc-4', title: 'Contact Us', url: '/contact'},
          {id: 'fc-5', title: 'Book a Call', url: '/book-a-call'},
        ],
      },
      {
        id: 'footer-resources',
        title: 'Resources',
        items: [
          {id: 'fr-1', title: 'Engineering & CRO Guides', url: '/articles'},
          {id: 'fr-2', title: 'AI Architecture Strategy', url: '/articles'},
          {id: 'fr-3', title: 'Technical Case Studies', url: '/work'},
          {id: 'fr-4', title: 'Cloud Platform Architecture', url: '/services/software-migrations'},
        ],
      },
    ],
  },
};
