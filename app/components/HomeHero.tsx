'use client';

import {
  resolveCleanPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';
import {CalendlyButton} from '~/components/shared/CalendlyButton';

import type {HomePageContent} from '~/lib/cms/types';

export function HomeHero({content}: {content?: HomePageContent} = {}) {
  const scrollToGallery = () => {
    const gallery = document.getElementById(
      'ft-home-hero-gallery',
    );
    const header = document.querySelector('.charle-header');

    if (!gallery) return;

    const headerHeight =
      header?.getBoundingClientRect().height ?? 0;

    window.scrollTo({
      top: gallery.getBoundingClientRect().top +
        window.scrollY -
        headerHeight,
      behavior: 'smooth',
    });
  };

  const eyebrow = content?.heroEyebrow || 'HEALTHCARE AI SOLUTIONS & SOFTWARE ENGINEERING';
  const prefix = content?.heroTitlePrefix || 'Smarter Healthcare Operations,';
  const highlight = content?.heroTitleHighlight || 'Powered by AI and Software Engineering';
  const description =
    content?.heroSubtitle ||
    'Byte Operator helps healthcare organizations automate administrative workflows, streamline patient communication, and build connected software systems tailored to your operational needs.';
  const primaryCta = content?.primaryCtaText || 'Explore Our Solutions';
  const primaryCtaLink = content?.primaryCtaLink || '/expertise';

  const renderHeroLines = () => {
    return (
      <>
        <span className="ft-home-hero__title-line">
          {prefix}
        </span>{' '}
        <span className="ft-home-hero__title-line ft-home-hero__title-line--highlight">
          <span>{highlight}</span>
        </span>
      </>
    );
  };

  return (
    <section
      className="ft-home-hero"
      aria-labelledby="ft-home-hero-title"
    >
      <div
        className="ft-home-hero__glow"
        aria-hidden="true"
      />

      <div className="ft-home-hero__content">
        <p className="ft-home-hero__eyebrow">
          {eyebrow}
        </p>

        <h1
          className="ft-home-hero__title"
          id="ft-home-hero-title"
        >
          {renderHeroLines()}
        </h1>

        <p className="ft-home-hero__description">
          {description}
        </p>

        <div className="ft-home-hero__actions">
          <CalendlyButton className="ft-home-hero__book-cta" label="Book a Discovery Call" />

          <a
            className="ft-home-hero__work-link"
            href={primaryCtaLink}
            onClick={(event) => {
              if (primaryCtaLink.startsWith('#')) {
                event.preventDefault();
                scrollToGallery();
              }
            }}
          >
            <span>{primaryCta}</span>
            <ArrowDownIcon />
          </a>
        </div>

        <p
          className="ft-home-hero__subtag"
          style={{
            marginTop: '1.25rem',
            fontSize: '0.9375rem',
            color: 'var(--color-text-secondary, #94a3b8)',
            letterSpacing: '0.01em',
          }}
        >
          Technology solutions for medical practices, specialty clinics, and healthcare organizations.
        </p>
      </div>
    </section>
  );
}



function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 3V15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M4.5 10.5L9 15L13.5 10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
