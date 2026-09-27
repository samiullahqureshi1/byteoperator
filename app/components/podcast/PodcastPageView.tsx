import {HomeObservatory} from '~/components/HomeObservatory';
import {ComingSoonNotice} from '~/components/shared/ComingSoonNotice';

/*
 * The podcast has not launched. Planned episodes live in
 * `~/data/podcastsData.ts` (all `comingSoon: true`) and are intentionally not
 * rendered until real audio and platform links exist.
 */
export function PodcastPageView() {
  return (
    <div className="ft-podcast-page">
      <div className="ft-podcast-bg-glow" />

      <div className="ft-podcast-container">
        {/* HERO */}
        <section className="ft-podcast-hero">
          <div className="ft-podcast-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm5 7a1 1 0 0 0-2 0 3 3 0 0 1-6 0 1 1 0 0 0-2 0 5 5 0 0 0 4 4.9V16h-2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.1A5 5 0 0 0 17 9z" />
            </svg>
            The Byte Operator Audio Experience
          </div>

          <h1 className="ft-podcast-title">
            Architecting Scale: <span>The CTO & Ecommerce Podcast</span>
          </h1>

          <p className="ft-podcast-subtitle">
            A planned podcast of engineering conversations and architecture
            teardowns from the Byte Operator team.
          </p>
        </section>

        <ComingSoonNotice what="The Architecting Scale podcast" />
      </div>

      <HomeObservatory />
    </div>
  );
}
