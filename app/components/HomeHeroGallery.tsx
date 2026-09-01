/*
 * Gallery navigation is temporarily disabled (see the render loop
 * below, which renders a plain <div> instead of a <Link>). Each
 * entry's `url` is intentionally kept here, unused, so navigation
 * can be restored later by swapping the <div> back to a <Link to={project.url}>.
 */
const GALLERY_LAYERS = [
  [
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-01.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-02.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-03.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-04.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-05.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-06.webp',
      url: '/pages/case-studies',
    },
  ],

  [
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-07.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-08.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-09.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-10.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-11.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-12.webp',
      url: '/pages/case-studies',
    },
  ],

  [
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-13.webp',
      url: '/pages/case-studies',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-14.webp',
      url: '/pages/case-studies',
    },
  ],
] as const;

export function HomeHeroGallery() {
  return (
    <section
      id="ft-home-hero-gallery"
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
                // Navigation temporarily disabled: was <Link to={project.url} prefetch="intent">.
                <div
                  className="ft-hero-gallery__item"
                  key={project.image}
                >
                  <img
                    className="ft-hero-gallery__item-image"
                    src={project.image.replace(
                      /\.webp$/,
                      '-750.webp',
                    )}
                    srcSet={`${project.image.replace(
                      /\.webp$/,
                      '-350.webp',
                    )} 350w, ${project.image.replace(
                      /\.webp$/,
                      '-750.webp',
                    )} 750w`}
                    sizes="(min-width: 36rem) 20vw, 30vw"
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
                </div>
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