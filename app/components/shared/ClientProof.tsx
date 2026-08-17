import {useCallback, useState, type ReactNode} from 'react';
import {VideoModal} from './VideoModal';

export type ClientProofTestimonial = {
  quote: string;
  person: string;
  company: string;
  image: string;
  video: string;
};

export type ClientProofLogo = {
  src: string;
  alt: string;
};

interface ClientProofProps {
  testimonial?: ClientProofTestimonial;
  logos?: ClientProofLogo[];
  triggerLabel?: ReactNode;
}

export function ClientProof({
  testimonial,
  logos = [],
  triggerLabel,
}: ClientProofProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  return (
    <>
      <div className="ft-work-hero__right">
        {testimonial ? (
          <button
            type="button"
            className="ft-work-hero__testimonial"
            onClick={() => setIsVideoOpen(true)}
            aria-label={`Hear from ${testimonial.person}`}
          >
            <img
              className="ft-work-hero__testimonial-image"
              src={testimonial.image}
              alt={`${testimonial.person} - ${testimonial.company}`}
              loading="lazy"
              decoding="async"
            />

            <div className="ft-work-hero__testimonial-content">
              <p>{testimonial.quote}</p>

              <span>
                <PlayIcon />
                {triggerLabel ??
                  `Hear from ${testimonial.person} - ${testimonial.company}`}
              </span>
            </div>
          </button>
        ) : null}

        {logos.length ? (
          <div className="ft-work-hero__logos">
            <p className="ft-work-hero__logos-label">
              Trusted by ecommerce brands
            </p>

            <div className="ft-work-hero__logos-window">
              <div className="ft-work-hero__logos-track">
                {[...logos, ...logos].map((logo, index) => (
                  <div
                    className="ft-work-hero__logo"
                    key={`${logo.alt}-${index}`}
                    aria-hidden={index >= logos.length}
                  >
                    <img
                      src={logo.src}
                      alt={index < logos.length ? logo.alt : ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {testimonial ? (
        <VideoModal
          open={isVideoOpen}
          src={testimonial.video}
          ariaLabel={`${testimonial.person} testimonial video`}
          onClose={closeVideo}
        />
      ) : null}
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
