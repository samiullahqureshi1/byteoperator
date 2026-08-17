import {useEffect, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';

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

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoOpen]);

  const videoModal =
    testimonial &&
    isVideoOpen &&
    typeof document !== 'undefined'
      ? createPortal(
          <div
            className="ft-video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${testimonial.person} testimonial video`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsVideoOpen(false);
              }
            }}
          >
            <div className="ft-video-modal__content">
              <button
                type="button"
                className="ft-video-modal__close"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 5L19 19M19 5L5 19"
                    stroke="currentColor"
                  />
                </svg>
              </button>

              <video
                className="ft-video-modal__video"
                src={testimonial.video}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>,
          document.body,
        )
      : null;

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

      {videoModal}
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
