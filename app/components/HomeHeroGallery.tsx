import {Link} from 'react-router';

const GALLERY_LAYERS = [
  [
    {
      title: 'Project One',
      image: '/images/home-gallery/project-01.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Two',
      image: '/images/home-gallery/project-02.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Three',
      image: '/images/home-gallery/project-03.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Four',
      image: '/images/home-gallery/project-04.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Five',
      image: '/images/home-gallery/project-05.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Six',
      image: '/images/home-gallery/project-06.webp',
      url: '/pages/case-studies',
    },
  ],

  [
    {
      title: 'Project Seven',
      image: '/images/home-gallery/project-07.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Eight',
      image: '/images/home-gallery/project-08.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Nine',
      image: '/images/home-gallery/project-09.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Ten',
      image: '/images/home-gallery/project-10.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Eleven',
      image: '/images/home-gallery/project-11.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Twelve',
      image: '/images/home-gallery/project-12.webp',
      url: '/pages/case-studies',
    },
  ],

  [
    {
      title: 'Project Thirteen',
      image: '/images/home-gallery/project-13.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Project Fourteen',
      image: '/images/home-gallery/project-14.webp',
      url: '/pages/case-studies',
    },
  ],
] as const;

export function HomeHeroGallery() {
  return (
    <section
      className="ft-hero-gallery"
      aria-label="Selected FoldTech ecommerce projects"
    >
      <div className="ft-hero-gallery__inner">
        <div className="ft-hero-gallery__grid">
          {GALLERY_LAYERS.map((layer, layerIndex) => (
            <div
              className="ft-hero-gallery__layer"
              key={`gallery-layer-${layerIndex}`}
            >
              {layer.map((project) => (
                <Link
                  className="ft-hero-gallery__item"
                  key={project.image}
                  to={project.url}
                  prefetch="intent"
                  aria-label={`View ${project.title}`}
                >
                  <img
                    className="ft-hero-gallery__item-image"
                    src={project.image}
                    alt={`${project.title} ecommerce project`}
                    loading="lazy"
                    decoding="async"
                  />

                  <div
                    className="ft-hero-gallery__item-hover"
                    aria-hidden="true"
                  >
                    <div className="ft-hero-gallery__item-content">
                      <p>{project.title}</p>

                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}

          <div className="ft-hero-gallery__main-image">
            <video
              className="ft-hero-gallery__video"
              src="/videos/foldtech-hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="ft-hero-gallery__arrow"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.5 6.5H12M12 6.5L6.5 1M12 6.5L6.5 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}