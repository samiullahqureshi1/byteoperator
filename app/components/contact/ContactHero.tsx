'use client';

import {WORK_HERO_LOGOS} from '~/data/workHeroProof';
import {CONTACT_FACTS} from '~/data/companyFacts';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {ContactForm} from '~/components/contact/ContactForm';

const CONTACT_STATS = CONTACT_FACTS;

export function ContactHero() {
  return (
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
  );
}
