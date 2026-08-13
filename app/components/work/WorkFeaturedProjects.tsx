import {Link} from 'react-router';

const FEATURED_PROJECTS = [
  {
    name: 'Cambridge Satchel',
    result: '+XX% Organic Traffic',
    services: 'SEO, Ecommerce design & development',
    image: '/images/work/featured/project-01.webp',
    logo: '/images/work/featured/01-logo.svg',
    href: '/pages/case-studies',
  },
  {
    name: 'Candy Kittens',
    result: '+XX% Conversion Rate',
    services: 'Ecommerce growth retainer',
    image: '/images/work/featured/project-02.webp',
    logo: '/images/work/featured/02-logo.svg',
    href: '/pages/case-studies',
  },
  {
    name: 'Billionaire Boys Club',
    result: '+XX% Revenue Growth',
    services: 'Ecommerce design & development',
    image: '/images/work/featured/project-03.webp',
    logo: '/images/work/featured/03-logo.svg',
    href: '/pages/case-studies',
  },
];

export function WorkFeaturedProjects() {
  return (
    <section className="ft-work-featured">
      <div className="ft-work-featured__grid">
        {FEATURED_PROJECTS.map((project) => (
          <Link
            className="ft-work-featured__card"
            to={project.href}
            key={project.name}
          >
            <img
              className="ft-work-featured__image"
              src={project.image}
              alt={project.name}
              loading="lazy"
              decoding="async"
            />

            <div className="ft-work-featured__overlay" />

            <span className="ft-work-featured__result">
              {project.result}
            </span>

            <div className="ft-work-featured__content">
              <img
                className="ft-work-featured__logo"
                src={project.logo}
                alt=""
                loading="lazy"
                decoding="async"
              />

              <h2 className="ft-work-featured__title">
                {project.name}
              </h2>

              <p className="ft-work-featured__services">
                {project.services}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}