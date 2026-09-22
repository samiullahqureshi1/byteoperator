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
      alt: 'Wooden lattice chair and home decor styled on a side table',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-02.webp',
      alt: 'Personalised dog portrait water bottle',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-03.webp',
      alt: 'Personalised pet portrait mugs',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-04.webp',
      alt: 'Gold diamond engagement ring on black silk',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-05.webp',
      alt: 'Model in a cream lace blouse and skirt',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-06.webp',
      alt: 'Grey upholstered bar stool',
      url: '/work',
    },
  ],

  [
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-07.webp',
      alt: 'Skincare serum bottle on dark stone',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-08.webp',
      alt: 'Living room with a tufted sofa and marble coffee table',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-09.webp',
      alt: 'Model holding a blue skincare tube',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-10.webp',
      alt: 'Skateboarder riding a longboard',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-11.webp',
      alt: 'Girl in an embroidered denim dress',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-12.webp',
      alt: 'Woman applying a botanical hair oil outdoors',
      url: '/work',
    },
  ],

  [
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-13.webp',
      alt: 'Straw fedora hat on a wooden stand',
      url: '/work',
    },
    {
      title: 'Featured Work',
      image: '/images/home-gallery/project-14.webp',
      alt: 'Model in a patterned midi dress',
      url: '/work',
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
                      '-180.webp',
                    )} 180w, ${project.image.replace(
                      /\.webp$/,
                      '-350.webp',
                    )} 350w, ${project.image.replace(
                      /\.webp$/,
                      '-750.webp',
                    )} 750w`}
                    sizes="(min-width: 36rem) 20vw, 30vw"
                    alt={project.alt}
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
              poster="/images/home-gallery/hero-video-poster.webp"
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