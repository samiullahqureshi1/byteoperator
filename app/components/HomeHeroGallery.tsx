'use client';

import {useEffect, useRef} from 'react';
import {resizedImageUrl, responsiveImage} from '~/lib/responsive-image';

/*
 * Entries whose image is an Unsplash stock photo are labelled "(Concept)":
 * they are illustrative, not Byte Operator client projects. Use real project
 * screenshots (with permission) before presenting an entry as client work.
 *
 * Gallery navigation is temporarily disabled (see the render loop
 * below, which renders a plain <div> instead of a <Link>). Each
 * entry's `url` is intentionally kept here, unused, so navigation
 * can be restored later by swapping the <div> back to a <Link to={project.url}>.
 */
const GALLERY_LAYERS = [
  [
    {
      title: 'Athletic Running Footwear (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
      alt: 'High-performance athletic running footwear',
      url: '/work',
    },
    {
      title: 'Botanical Lotion & Care (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?v=1790430987',
      alt: 'Luxury botanical skincare and lotion product',
      url: '/work',
    },
    {
      title: 'Minimalist Glass Beverage (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
      alt: 'Minimalist designer glass beverage bottle',
      url: '/work',
    },
    {
      title: 'Wireless Audio Headphones (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/kiran-ck-LSNJ-pltdu8-unsplash.jpg?v=1790430955',
      alt: 'Premium wireless headphones and handsfree audio',
      url: '/work',
    },
    {
      title: 'Active Lifestyle Running (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/reuben-mansell-nwOip8AOZz0-unsplash.jpg?v=1790431668',
      alt: 'Active runner lifestyle and performance gear',
      url: '/work',
    },
    {
      title: 'Organic Skincare (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/mitzie-organics-dnstpPqCBbw-unsplash.jpg?v=1790431660',
      alt: 'Natural organic cosmetic skincare range',
      url: '/work',
    },
  ],

  [
    {
      title: 'Organic Facial Essence (Concept)',
      image:
        'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash_837aa5a5-44fa-461d-b117-da92ca95bf85.jpg?v=1790431658',
      alt: 'Luxury organic facial essence and hydration serum',
      url: '/work',
    },
    {
      title: 'Fine Jewelry & Diamonds',
      image: '/images/home-gallery/project-04.webp',
      alt: 'Gold diamond engagement ring and fine jewelry on black silk',
      url: '/work',
    },
    {
      title: 'Nordic Interior Living',
      image: '/images/home-gallery/project-08.webp',
      alt: 'Architectural living room with tufted sofa and marble table',
      url: '/work',
    },
    {
      title: 'Ready-to-Wear Fashion',
      image: '/images/home-gallery/project-05.webp',
      alt: 'Fashion model in cream lace blouse and ensemble',
      url: '/work',
    },
    {
      title: 'Designer Apparel',
      image: '/images/home-gallery/project-11.webp',
      alt: 'Artisan embroidered designer dress presentation',
      url: '/work',
    },
    {
      title: 'Modern Living & Furniture',
      image: '/images/home-gallery/project-01.webp',
      alt: 'Wooden lattice chair and contemporary home decor',
      url: '/work',
    },
  ],

  [
    {
      title: 'Handcrafted Headwear',
      image: '/images/home-gallery/project-13.webp',
      alt: 'Straw fedora hat on custom wooden stand',
      url: '/work',
    },
    {
      title: 'Active Streetwear & Boarding',
      image: '/images/home-gallery/project-10.webp',
      alt: 'Urban skateboarder in athletic streetwear',
      url: '/work',
    },
  ],
] as const;

/*
 * Centre video. The original upload (Shopify CDN, 1600x1200 60fps, ~20MB)
 * is re-encoded into two H.264 files with the moov atom up front so they
 * start streaming immediately:
 *   - 1600x1200 60fps (~5.8MB) for wider screens
 *   - 960x720 30fps (~2.3MB) for phones, where the cell is small and square
 * Nothing is downloaded until the gallery is about to scroll into view;
 * until then (and permanently for reduced-motion users) the first frame
 * shows as the poster.
 */
const HERO_VIDEO = {
  desktop: '/videos/home-hero-1600.mp4',
  mobile: '/videos/home-hero-960.mp4',
  mobileQuery: '(max-width: 48rem)',
  poster: resizedImageUrl('/images/home-gallery/home-hero-video-poster.jpg', 1200),
};

export function HomeHeroGallery() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure DOM properties are set for bulletproof autoplay
    video.defaultMuted = true;
    video.muted = true;

    // Reduced motion, or no way to tell when the video is on screen:
    // keep the poster and never download the video.
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    let isVisible = false;
    let isPageLoaded = document.readyState === 'complete';

    const playVideo = () => {
      if (!video.src || document.hidden || !isVisible) return;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires interaction
        });
      }
    };

    // Only fetch once the page itself has finished loading, so the video
    // never competes with the hero's own CSS, fonts and images.
    const startVideo = () => {
      if (!isVisible || !isPageLoaded) return;

      if (!video.src) {
        video.src = window.matchMedia(HERO_VIDEO.mobileQuery).matches
          ? HERO_VIDEO.mobile
          : HERO_VIDEO.desktop;
      }

      playVideo();
    };

    const handleLoad = () => {
      isPageLoaded = true;
      startVideo();
    };

    if (!isPageLoaded) {
      window.addEventListener('load', handleLoad, {once: true});
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);

        if (!isVisible) {
          video.pause();
          return;
        }

        startVideo();
      },
      // Start loading shortly before the gallery reaches the viewport.
      {rootMargin: '25% 0px'},
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section
      id="ft-home-hero-gallery"
      className="ft-hero-gallery"
      aria-label="Ecommerce storefront design concepts"
    >
      <div className="ft-hero-gallery__inner">
        <div className="ft-hero-gallery__grid">
          {GALLERY_LAYERS.map((layer, layerIndex) => (
            <div
              className="ft-hero-gallery__layer"
              key={`gallery-layer-${layerIndex}`}
            >
              {layer.map((project, itemIndex) => (
                <div
                  className="ft-hero-gallery__item"
                  key={`gallery-item-${layerIndex}-${itemIndex}`}
                >
                  <img
                    className="ft-hero-gallery__item-image"
                    {...responsiveImage(project.image, '(max-width: 37.5rem) 34vw, 16vw', 828)}
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
              ref={videoRef}
              className="ft-hero-gallery__video"
              poster={HERO_VIDEO.poster}
              muted
              loop
              playsInline
              preload="none"
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