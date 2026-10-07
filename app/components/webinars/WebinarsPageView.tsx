import {HomeObservatory} from '~/components/HomeObservatory';
import {ComingSoonNotice} from '~/components/shared/ComingSoonNotice';

/*
 * Webinars have not launched. Session data in `~/data/webinarsData.ts` is
 * intentionally not rendered until real, scheduled sessions exist.
 */
interface WebinarsContentProps {
  content?: {
    heroEyebrow?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string;
    coverImage?: string;
  };
}

export function WebinarsPageView({content}: WebinarsContentProps = {}) {
  return (
    <div className="ft-webinars-page">
      <div className="ft-webinars-container">
        {/* HERO */}
        <section className="ft-webinars-hero">
          <div className="ft-webinars-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            {content?.heroEyebrow || 'Byte Operator Masterclasses & Teardowns'}
          </div>

          <h1 className="ft-webinars-title">
            {content?.heroTitle || 'Live Technical Teardowns & Architecture Masterclasses'}
          </h1>

          <p className="ft-webinars-subtitle">
            {content?.heroSubtitle ||
              'Planned live sessions on Core Web Vitals, AI search and conversion optimisation, led by the Byte Operator team.'}
          </p>
        </section>

        <ComingSoonNotice what="Our webinar programme" />
      </div>

      <HomeObservatory />
    </div>
  );
}
