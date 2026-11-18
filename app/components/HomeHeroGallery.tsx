'use client';

import {useEffect, useRef} from 'react';
import type {HomePageContent} from '~/lib/cms/types';

export function HomeHeroGallery({content}: {content?: HomePageContent} = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (content?.galleryShowSection === false) {
    return null;
  }

  const videoUrl =
    content?.galleryVideoUrl ||
    'https://cdn.shopify.com/videos/c/o/v/3786294d9d3c46808dc8259eaee42075.mp4';

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      {threshold: 0.15},
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoUrl]);

  return (
    <section
      id="ft-home-hero-gallery"
      className="ft-hero-video-showcase"
      aria-label="Healthcare AI & Automation Video"
      style={{
        position: 'relative',
        width: '100%',
        padding: '2.5rem 2rem 5rem',
        background: 'var(--ft-dark-deep, #060F24)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.15)',
            backgroundColor: '#060F24',
          }}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '780px',
              objectFit: 'cover',
              display: 'block',
            }}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
