import {HomeObservatory} from '~/components/HomeObservatory';
import {ComingSoonNotice} from '~/components/shared/ComingSoonNotice';

/*
 * Guides have not launched. Guide data in `~/data/guidesData.ts` is
 * intentionally not rendered until real, downloadable files exist.
 */
export function GuidesPageView() {
  return (
    <div className="ft-guides-page">
      <div className="ft-guides-container">
        {/* HERO */}
        <section className="ft-guides-hero">
          <div className="ft-guides-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c1.2 0 2-.8 2-2V4c0-1.2-.8-2-2-2zm-1 18H6V4h12v16z" />
            </svg>
            Byte Operator Technical Library
          </div>

          <h1 className="ft-guides-title">
            Actionable Engineering &amp; <span>Growth Blueprints</span>
          </h1>

          <p className="ft-guides-subtitle">
            Planned in-depth guides on software architecture, platform
            migrations, conversion optimisation and AI search.
          </p>
        </section>

        <ComingSoonNotice what="Our guides library" />
      </div>

      <HomeObservatory />
    </div>
  );
}
