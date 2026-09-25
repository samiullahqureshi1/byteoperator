'use client';

import {useCallback, useState} from 'react';
import {VideoModal} from '~/components/shared/VideoModal';
import {
  WORK_HERO_LOGOS,
  WORK_HERO_TESTIMONIAL,
} from '~/data/workHeroProof';
import {CONTACT_FACTS} from '~/data/companyFacts';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {ContactForm} from '~/components/contact/ContactForm';


const CONTACT_STATS = CONTACT_FACTS;

export function ContactHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
  }, []);

  return (
    <>
      <section className="ft-contact-hero">
        <div
          className="ft-contact-hero__gradient"
          aria-hidden="true"
        />

        <div className="ft-contact-hero__container">
          <div className="ft-contact-hero__grid">
            <div className="ft-contact-hero__left">
              <div className="ft-contact-hero__content">
                <h1 className="ft-contact-hero__title">
                  Let&apos;s grow your digital platform
                </h1>

                <p className="ft-contact-hero__description">
                  Tell us about your goals and speak to our team about
                  the right Software, SEO, CRO or ecommerce solution for
                  your next stage of growth.
                </p>

                <div className="ft-contact-hero__response">
                  <span
                    className="ft-contact-hero__response-dot"
                    aria-hidden="true"
                  />

                  <span>Typically replies within 24 hours</span>
                </div>

                <div className="ft-contact-hero__alt-action">
                  <span className="ft-contact-hero__alt-action-label">
                    Prefer to talk it through?
                  </span>

                  <CalendlyButton
                    className="ft-contact-hero__book-cta"
                    label="Book a Call"
                  />
                </div>
              </div>

              <div className="ft-contact-hero__testimonial-wrap">
                <button
                  type="button"
                  className="ft-contact-hero__testimonial"
                  onClick={() => setVideoOpen(true)}
                  aria-label={`Hear from ${WORK_HERO_TESTIMONIAL.person}`}
                >
                  <img
                    className="ft-contact-hero__testimonial-image"
                    src={WORK_HERO_TESTIMONIAL.image}
                    width={WORK_HERO_TESTIMONIAL.imageWidth}
                    height={WORK_HERO_TESTIMONIAL.imageHeight}
                    alt={`${WORK_HERO_TESTIMONIAL.person} - ${WORK_HERO_TESTIMONIAL.company}`}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="ft-contact-hero__testimonial-body">
                    <p className="ft-contact-hero__testimonial-quote">
                      “{WORK_HERO_TESTIMONIAL.quote}”
                    </p>

                    <span className="ft-contact-hero__testimonial-cta">
                      <PlayIcon />

                      Hear from {WORK_HERO_TESTIMONIAL.person}
                    </span>
                  </div>
                </button>
              </div>

              <div className="ft-contact-hero__stats">
                {CONTACT_STATS.map((stat) => (
                  <div
                    className="ft-contact-hero__stat"
                    key={stat.label}
                  >
                    <p className="ft-contact-hero__stat-number">
                      {stat.value}
                    </p>

                    <p className="ft-contact-hero__stat-label">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="ft-contact-hero__logos">
                <p className="ft-contact-hero__logos-label">
                  Trusted by ecommerce brands
                </p>

                <div className="ft-contact-hero__logos-window">
                  <div className="ft-contact-hero__logos-track">
                    {[...WORK_HERO_LOGOS, ...WORK_HERO_LOGOS].map(
                      (logo, index) => (
                        <div
                          className="ft-contact-hero__logo"
                          key={`${logo.alt}-${index}`}
                          aria-hidden={
                            index >= WORK_HERO_LOGOS.length
                          }
                        >
                          <img
                            src={logo.src}
                            width={logo.width}
                            height={logo.height}
                            alt={logo.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-contact-hero__form-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        open={videoOpen}
        src={WORK_HERO_TESTIMONIAL.video}
        ariaLabel={`${WORK_HERO_TESTIMONIAL.person} testimonial video`}
        onClose={closeVideo}
      />
    </>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="7.5"
        stroke="currentColor"
      />

      <path
        d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
