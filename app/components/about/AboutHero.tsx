import {useCallback, useState} from 'react';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
import {VideoModal} from '~/components/shared/VideoModal';

export function AboutHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  return (
    <section className="ft-about-hero">
      <div className="ft-about-hero__glow" aria-hidden="true" />

      <div className="ft-about-hero__container">
        <div className="ft-about-hero__inner">
          <h1 className="ft-about-hero__title">
            FoldTech is a Shopify ecommerce agency helping ambitious brands grow
            through strategy, creative development, search visibility,
            experimentation and ongoing optimisation.
          </h1>

          <button
            type="button"
            className="ft-about-hero__team-button"
            aria-label="Hear from our team"
            onClick={() => setIsVideoOpen(true)}
          >
            <span className="ft-about-hero__team-image">
              <img
                src={WORK_HERO_TESTIMONIAL.image}
                width={WORK_HERO_TESTIMONIAL.imageWidth}
                height={WORK_HERO_TESTIMONIAL.imageHeight}
                alt=""
                aria-hidden="true"
              />
            </span>

            <span className="ft-about-hero__team-text">
              Hear from
              <br />
              our team
            </span>

            <svg
              className="ft-about-hero__team-arrow"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M.89 9.243L9.373.757m0 0H1.596m7.778 0v7.779"
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <VideoModal
        open={isVideoOpen}
        src={WORK_HERO_TESTIMONIAL.video}
        ariaLabel="FoldTech team video"
        onClose={closeVideo}
      />
    </section>
  );
}