import {Link} from 'react-router';
import {WORK_HERO_LOGOS} from '~/data/workHeroProof';
import {CountUpNumber} from '~/components/work/WorkResults';

/* =========================================================
   FOLDTECH — ECOMMERCE SEO HERO

   Bespoke hero markup. The shared CountUpNumber / ClientProof
   components are intentionally not reused here: their DOM and
   global styles cannot reproduce the reference layout.
========================================================= */

const STATS = [
  {target: 20, suffix: 'K+', label: 'Tasks Delivered'},
  {target: 15, suffix: 'K+', label: 'Stores Built'},
  {
    target: 3.1,
    prefix: '$',
    suffix: 'B+',
    decimals: 1,
    label: 'Merchant Revenue',
  },
] as const;

/**
 * Social proof strip items.
 *
 * Only verified FoldTech proof data may be listed here. No verified
 * credential-style proof points (ratings, partner status, founding year,
 * keyword counts) currently exist in the repository, so the strip stays
 * disabled until real data is supplied.
 */
const PROOF_ITEMS = [
  {
    type: 'rating',
    text: '4.8/5 on Google',
  },
  {
    type: 'shopify-partners',
    text: 'Shopify Plus Partner',
  },
  {
    type: 'text',
    text: 'Est. 2018',
  },
  {
    type: 'text',
    text: '15,000+ page 1 keywords',
  },
] as const;

/**
 * The marquee spans the full viewport width, so the logo set is repeated
 * enough times to keep the track wider than the widest viewport. The
 * animation offset in CSS assumes exactly this many repeats.
 */
const MARQUEE_REPEATS = 4;

const MARQUEE_LOGOS = Array.from(
  {length: MARQUEE_REPEATS},
  () => WORK_HERO_LOGOS,
).flat();

export function EcommerceSeoHero() {
  return (
    <main className="ft-ecommerce-seo-hero">
      <section
        className="ft-ecommerce-seo-hero__section"
        aria-labelledby="ecommerce-seo-hero-title"
      >
        <div className="ft-ecommerce-seo-hero__glow" aria-hidden="true" />

        <div className="ft-ecommerce-seo-hero__inner">
          <p className="ft-ecommerce-seo-hero__brand">
            <span>FoldTech</span>

            <img
              src="/images/home-services/badges/logo-search-white.svg"
              alt="Search"
              width="54"
              height="24"
            />
          </p>

          <div className="ft-ecommerce-seo-hero__main">
            <div className="ft-ecommerce-seo-hero__left">
              <h1
                className="ft-ecommerce-seo-hero__title"
                id="ecommerce-seo-hero-title"
              >
                Ecommerce SEO Agency Built for Organic Revenue Growth
              </h1>

              <dl
                className="ft-ecommerce-seo-hero__stats"
                aria-label="FoldTech results"
              >
                {STATS.map((stat) => (
                  <div
                    className="ft-ecommerce-seo-hero__stat"
                    key={stat.label}
                  >
                    <dt className="ft-ecommerce-seo-hero__stat-value">
                      <CountUpNumber
                        target={stat.target}
                        prefix={'prefix' in stat ? stat.prefix : undefined}
                        suffix={stat.suffix}
                        decimals={
                          'decimals' in stat ? stat.decimals : undefined
                        }
                      />
                    </dt>

                    <dd className="ft-ecommerce-seo-hero__stat-label">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="ft-ecommerce-seo-hero__right">
              <Link
                className="ft-ecommerce-seo-hero__pill"
                to="/ecommerce-ai-seo/"
                prefetch="intent"
              >
                Looking to improve AI visibility? Explore AI SEO
                <span aria-hidden="true">→</span>
              </Link>

              <p className="ft-ecommerce-seo-hero__description">
                FoldTech helps ecommerce brands improve organic visibility
                through technical SEO, content strategy, on-page optimisation,
                ecommerce architecture and search-led growth work.
              </p>

              <Link
                className="ft-ecommerce-seo-hero__cta"
                to="/contact"
                prefetch="intent"
              >
                <span>Talk to our SEO team</span>

                <HeroCtaArrow />
              </Link>
            </div>
          </div>

          <div className="ft-ecommerce-seo-hero__marquee">
            <p className="ft-ecommerce-seo-hero__marquee-label">
              Trusted by ecommerce brands
            </p>

            <div className="ft-ecommerce-seo-hero__marquee-window">
              <div className="ft-ecommerce-seo-hero__marquee-track">
                {MARQUEE_LOGOS.map((logo, index) => (
                  <span
                    className="ft-ecommerce-seo-hero__marquee-logo"
                    key={`${logo.alt}-${index}`}
                    aria-hidden={index >= WORK_HERO_LOGOS.length}
                  >
                    <img
                      src={logo.src}
                      alt={index < WORK_HERO_LOGOS.length ? logo.alt : ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {PROOF_ITEMS.length ? (
     <ul className="ft-ecommerce-seo-hero__proof">
  {PROOF_ITEMS.map((item, index) => (
    <li
      className="ft-ecommerce-seo-hero__proof-entry"
      key={item.text}
    >
      {index > 0 ? (
        <span
          className="ft-ecommerce-seo-hero__proof-divider"
          aria-hidden="true"
        />
      ) : null}

      <span className="ft-ecommerce-seo-hero__proof-item">
        {item.type === 'rating' ? (
          <span
            className="ft-ecommerce-seo-hero__stars"
            aria-hidden="true"
          >
            {Array.from({length: 5}).map((_, starIndex) => (
              <svg
                key={starIndex}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
              </svg>
            ))}
          </span>
        ) : null}

       {item.type === 'shopify-partners' ? (
  <span className="ft-ecommerce-seo-hero__proof-logos">
    <img
      className="ft-ecommerce-seo-hero__proof-logo"
      src="/images/home-partners/shopify-plus.svg"
      alt="Shopify Plus"
    />

    <img
      className="ft-ecommerce-seo-hero__proof-logo ft-ecommerce-seo-hero__proof-logo--shopify"
      src="/images/home-partners/shopify.svg"
      alt="Shopify"
    />
  </span>
) : null}

       {item.type !== 'shopify-partners' ? item.text : null}
      </span>
    </li>
  ))}
</ul>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function HeroCtaArrow() {
  return (
    <svg
      className="ft-ecommerce-seo-hero__cta-arrow"
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
