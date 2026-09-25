'use client';

import {useCallback, useEffect, useState} from 'react';

const AUTOPLAY_DELAY = 5000;

const TESTIMONIALS = [
  {
    quote:
      'The Byte Operator team made the entire ecommerce project feel clear and well organised from start to finish. Communication was strong and the final experience felt aligned with what we wanted to achieve.',
    name: 'Jordan Lee',
    company: 'Ecommerce Manager — Demo Brand',
  },
  {
    quote:
      'Working with Byte Operator gave us a much clearer direction for our digital platform. The team understood the commercial goals behind the project and helped turn those priorities into a stronger customer experience.',
    name: 'Alex Morgan',
    company: 'Marketing Lead — Example Client',
  },
] as const;

export function AboutTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isCrossfadeReady, setIsCrossfadeReady] = useState(false); 

  const goPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? TESTIMONIALS.length - 1 : current - 1,
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      current === TESTIMONIALS.length - 1 ? 0 : current + 1,
    );
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsCrossfadeReady(true));

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (isAutoplayPaused) return;

    const intervalId = window.setInterval(goNext, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [goNext, isAutoplayPaused]);

  return (
    <section
      className="ft-about-testimonials"
      aria-labelledby="ft-about-testimonials-title"
    >
      <div className="ft-about-testimonials__container">
        <h2
          id="ft-about-testimonials-title"
          className="ft-about-testimonials__heading"
        >
          Your Experience Is Our Priority
        </h2>

        <p className="ft-about-testimonials__description">
          See our clients&apos; kind words for yourself!
        </p>

        <div
          className={`ft-about-testimonials__slider ${
            isCrossfadeReady
              ? 'ft-about-testimonials__slider--ready'
              : ''
          }`}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          <div className="ft-about-testimonials__quote-mark ft-about-testimonials__quote-mark--open">
            “
          </div>

          <div className="ft-about-testimonials__item">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                className={`ft-about-testimonials__content ${
                  index === activeIndex
                    ? 'ft-about-testimonials__content--active'
                    : ''
                }`}
                aria-hidden={index !== activeIndex}
                key={testimonial.name}
              >
                <h3 className="ft-about-testimonials__item-heading">
                  &ldquo;{testimonial.quote}&rdquo;
                </h3>

                <p className="ft-about-testimonials__item-description">
                  <span className="ft-about-testimonials__item-name">
                    {testimonial.name}
                  </span>

                  <span className="ft-about-testimonials__item-company">
                    {testimonial.company}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="ft-about-testimonials__quote-mark ft-about-testimonials__quote-mark--close">
            ”
          </div>
        </div>

        <div className="ft-about-testimonials__arrows">
          <button
            type="button"
            className="ft-about-testimonials__arrow"
            aria-label="Previous testimonial"
            onClick={goPrevious}
          >
            <svg
              viewBox="0 0 11 19"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 18L1.5 9.5 10 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="ft-about-testimonials__arrow"
            aria-label="Next testimonial"
            onClick={goNext}
          >
            <svg
              viewBox="0 0 11 19"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l8.5 8.5L1 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}