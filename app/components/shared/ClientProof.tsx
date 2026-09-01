import {useCallback, useState, type ReactNode} from 'react';
import {VideoModal} from './VideoModal';

export type ClientProofTestimonial = {
  quote: string;
  person: string;
  company: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  video: string;
};

export type ClientProofLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

interface ClientProofProps {
  testimonial?: ClientProofTestimonial;
  logos?: ClientProofLogo[];
  triggerLabel?: ReactNode;
  triggerLabelLines?: readonly [string, string];
}

export function ClientProof({
  testimonial,
  logos = [],
  triggerLabel,
  triggerLabelLines,
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
              width={testimonial.imageWidth}
              height={testimonial.imageHeight}
              alt={`${testimonial.person} - ${testimonial.company}`}
              loading="lazy"
              decoding="async"
            />

            <div className="ft-work-hero__testimonial-content">
              <p>{testimonial.quote}</p>

              <span>
                <PlayIcon />
                {triggerLabelLines ? (
                  <span className="ft-client-proof__trigger-lines">
                    <span>{triggerLabelLines[0]}</span>
                    <span>{triggerLabelLines[1]}</span>
                  </span>
                ) : (
                  triggerLabel ??
                  `Hear from ${testimonial.person} - ${testimonial.company}`
                )}
              </span>
            </div>

            {triggerLabelLines ? <NorthEastArrowIcon /> : null}
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
                      width={logo.width}
                      height={logo.height}
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

function NorthEastArrowIcon() {
  return (
    <svg
      className="ft-client-proof__trigger-arrow"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10L10 4M5 4H10V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
