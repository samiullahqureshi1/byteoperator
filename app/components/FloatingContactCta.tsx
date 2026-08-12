import {Link} from 'react-router';

export function FloatingContactCta() {
  return (
    <Link
      to="/pages/contact"
      className="ft-floating-cta"
      aria-label="Get in touch"
      prefetch="intent"
    >
      <span
        className="ft-floating-cta__circle"
        aria-hidden="true"
      />

      <span
        className="ft-floating-cta__text"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="ft-floating-circle-path"
              d="
                M 50,50
                m -37,0
                a 37,37 0 1,1 74,0
                a 37,37 0 1,1 -74,0
              "
            />
          </defs>

          <text>
            <textPath
              href="#ft-floating-circle-path"
              startOffset="0%"
            >
              GET IN TOUCH • GET IN TOUCH •
            </textPath>
          </text>
        </svg>
      </span>

      <span
        className="ft-floating-cta__arrow"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4 16L16 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <path
            d="M7 4H16V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}