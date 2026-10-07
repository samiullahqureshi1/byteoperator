'use client';

import {useEffect, useRef} from 'react';
import {resizedImageUrl, responsiveImage} from '~/lib/responsive-image';
import type {HomePageContent} from '~/lib/cms/types';

const DEFAULT_GALLERY_LAYERS = [
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
];

export function HomeHeroGallery({content}: {content?: HomePageContent} = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (content?.galleryShowSection === false) {
    return null;
  }

  const mediaType = content?.galleryMediaType || 'gallery';

  const heroVideoDesktop = content?.galleryVideoUrl || '/videos/home-hero-1600.mp4';
  const heroVideoMobile = content?.galleryVideoMobileUrl || '/videos/home-hero-960.mp4';
  const heroVideoPoster = content?.galleryVideoPoster || resizedImageUrl('/images/home-gallery/home-hero-video-poster.jpg', 1200);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

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
        playPromise.catch(() => {});
      }
    };

    const startVideo = () => {
      if (!isVisible || !isPageLoaded) return;
      if (!video.src) {
        video.src = window.matchMedia('(max-width: 48rem)').matches
          ? heroVideoMobile
          : heroVideoDesktop;
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
  }, [heroVideoDesktop, heroVideoMobile]);

  // Mode 2: Single Image Mode
  if (mediaType === 'image') {
    const singleImgUrl =
      content?.gallerySingleImageUrl ||
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992';
    const singleImgAlt =
      content?.gallerySingleImageAlt || 'Byte Operator Engineering Platform';

    return (
      <section
        id="ft-home-hero-gallery"
        className="ft-hero-gallery"
        aria-label="Byte Operator Hero Visual"
        style={{ padding: '24px 0 48px', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              backgroundColor: '#0a0d18',
              maxHeight: '720px',
            }}
          >
            <img
              src={singleImgUrl}
              alt={singleImgAlt}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '720px',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    );
  }

  // Mode 3: Single Video Mode
  if (mediaType === 'video') {
    return (
      <section
        id="ft-home-hero-gallery"
        className="ft-hero-gallery"
        aria-label="Byte Operator Hero Video"
        style={{ padding: '24px 0 48px', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              backgroundColor: '#0a0d18',
            }}
          >
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '720px',
                objectFit: 'cover',
                display: 'block',
              }}
              poster={heroVideoPoster}
              muted
              loop
              playsInline
              controls
              preload="none"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    );
  }

  // Mode 1: Full Interactive Multi-Layer Gallery Mode
  // If custom items are in CMS, map them into the 3 parallax layers
  const customItems = content?.galleryItems;
  const layers = customItems && customItems.length >= 14
    ? [
        customItems.slice(0, 6),
        customItems.slice(6, 12),
        customItems.slice(12),
      ]
    : customItems && customItems.length > 0
      ? [
          customItems.slice(0, Math.min(customItems.length, 6)),
          customItems.slice(6, Math.min(customItems.length, 12)),
          customItems.slice(12),
        ].filter((l) => l.length > 0)
      : DEFAULT_GALLERY_LAYERS;

  return (
    <section
      id="ft-home-hero-gallery"
      className="ft-hero-gallery"
      aria-label="Ecommerce storefront design concepts"
    >
      <div className="ft-hero-gallery__inner">
        <div className="ft-hero-gallery__grid">
          {layers.map((layer, layerIndex) => (
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
                    alt={project.alt || project.title}
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
              poster={heroVideoPoster}
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