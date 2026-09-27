import {HomeObservatory} from '~/components/HomeObservatory';
import {ComingSoonNotice} from '~/components/shared/ComingSoonNotice';

/*
 * The newsletter has not launched. Editions and testimonials in
 * `~/data/newsletterData.ts` are intentionally not rendered, and there is no
 * signup form: /api/newsletter-subscribe does not store submissions yet.
 */
export function NewsletterPageView() {
  return (
    <div className="ft-newsletter-page">
      <div className="ft-newsletter-container">
        {/* HERO */}
        <section className="ft-newsletter-hero-card">
          <div className="ft-newsletter-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            The Operator Dispatch
          </div>

          <h1 className="ft-newsletter-title">
            The Weekly Briefing for <span>CTOs &amp; Growth Engineers</span>
          </h1>

          <p className="ft-newsletter-subtitle">
            A planned weekly briefing on web performance, conversion
            optimisation and AI search from the Byte Operator team.
          </p>
        </section>

        <ComingSoonNotice what="The Operator Dispatch newsletter" />
      </div>

      <HomeObservatory />
    </div>
  );
}
