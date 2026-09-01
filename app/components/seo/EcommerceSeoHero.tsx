import {useState} from 'react';
import {Link} from 'react-router';
import {ClientProof} from '~/components/shared/ClientProof';
import {WORK_HERO_LOGOS, WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
import {CountUpNumber} from '~/components/work/WorkResults';
import {
  ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS,
  EcommerceSeoProofStrip,
} from './EcommerceSeoProofStrip';

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

type EcommerceSeoHeroProps = {
  croInteractive?: boolean;
  ctaLabel?: string;
  description?: string;
  pillLabel?: string;
  pillTo?: string;
  secondaryCta?: {label: string; to: string};
  showStats?: boolean;
  title?: string;
};

export function EcommerceSeoHero({
  croInteractive = false,
  ctaLabel = 'Talk to our SEO team',
  description = 'FoldTech helps ecommerce brands improve organic visibility through technical SEO, content strategy, on-page optimisation, ecommerce architecture and search-led growth work.',
  pillLabel = 'Looking to improve AI visibility? Explore AI SEO',
  pillTo = '/ai-seo-agency/',
  secondaryCta,
  showStats = true,
  title = 'Ecommerce SEO Agency Built for Organic Revenue Growth',
}: EcommerceSeoHeroProps) {
  const [isVariant, setIsVariant] = useState(false);

  return (
    <div className={`ft-ecommerce-seo-hero${croInteractive ? ' ft-ecommerce-seo-hero--cro' : ''}${isVariant ? ' is-variant' : ''}`}>
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
                className={`ft-ecommerce-seo-hero__title${isVariant ? ' is-compact' : ''}`}
                id="ecommerce-seo-hero-title"
              >
                {title}
              </h1>

              {croInteractive && isVariant ? (
                <div className="ft-ecommerce-seo-hero__variant-testimonial">
                  <ClientProof
                    testimonial={WORK_HERO_TESTIMONIAL}
                    triggerLabel="Hear from our client"
                  />
                </div>
              ) : null}
              {showStats ? (
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
              ) : null}

              {secondaryCta ? (
                <Link
                  className="ft-ecommerce-seo-hero__secondary-cta"
                  to={secondaryCta.to}
                  prefetch="intent"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>

            <div className="ft-ecommerce-seo-hero__right">
              {croInteractive ? (
                <div className="ft-ecommerce-seo-hero__ab-demo">
                  <span className="ft-ecommerce-seo-hero__ab-demo-pill"><span aria-hidden="true" />See CRO in action</span>
                  <div className="ft-ecommerce-seo-hero__ab-demo-toggle" aria-label="CRO hero view">
                    <button type="button" aria-pressed={!isVariant} className={!isVariant ? 'is-active' : undefined} onClick={() => setIsVariant(false)}>Control</button>
                    <button type="button" aria-pressed={isVariant} className={isVariant ? 'is-active' : undefined} onClick={() => setIsVariant(true)}>Variant</button>
                  </div>
                </div>
              ) : (
                <Link className="ft-ecommerce-seo-hero__pill" to={pillTo} prefetch="intent">{pillLabel}<span aria-hidden="true">→</span></Link>
              )}

              <p className="ft-ecommerce-seo-hero__description">                {description}
              </p>

              <Link
                className="ft-ecommerce-seo-hero__cta"
                to="/contact"
                prefetch="intent"
              >
                <span>{ctaLabel}</span>

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
                      width={logo.width}
                      height={logo.height}
                      alt={index < WORK_HERO_LOGOS.length ? logo.alt : ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <EcommerceSeoProofStrip items={ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS} />
        </div>
      </section>
    </div>
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
