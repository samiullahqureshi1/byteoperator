import {responsiveImage} from '~/lib/responsive-image';

export function AboutValues() {
  return (
    <section className="ft-about-values">
      <div className="ft-about-values__fluid">
        <div className="ft-about-values__image">
          <img
            {...responsiveImage('/images/about/values-team.webp', '100vw', 1920)}
            width={1970}
            height={1306}
            alt="Byte Operator engineering team collaborating on architecture"
            className="ft-about-values__image-image"
          />
        </div>
      </div>

      <div className="ft-about-values__container">
        <div className="ft-about-values__inner">
          <div className="ft-about-values__left">
            <h2 className="ft-about-values__heading">Our Principles</h2>
          </div>

          <div className="ft-about-values__right">
            <h3 className="ft-about-values__subheading">
              Engineering Integrity &amp; Sub-Second Latency
            </h3>

            <p className="ft-about-values__description">
              We reject brittle code and bloated dependencies. Every system we build is architected with modern TypeScript, modular Next.js components, optimized GraphQL schemas, and resilient database layers designed for strong Core Web Vitals and dependable, monitored uptime.
            </p>

            <h3 className="ft-about-values__subheading">
              Autonomous Automation &amp; AI-First Execution
            </h3>

            <p className="ft-about-values__description">
              We leverage cutting-edge artificial intelligence, autonomous multi-agent swarms, and custom webhook pipelines like our Replex Engine to eliminate manual overhead. We turn complex lead capture, catalog syncing, and customer workflows into instant, reliable background tasks.
            </p>

            <h3 className="ft-about-values__subheading">
              Data-Driven Commercial Velocity
            </h3>

            <p className="ft-about-values__description">
              Great engineering must move the commercial needle. We unite rigorous experimentation, A/B testing, Generative Engine Optimization (GEO), and checkout CRO to ensure every feature deployment directly lifts conversion rates, average order values, and long-term brand valuation.
            </p>

            <h3 className="ft-about-values__subheading">
              Direct Partnership &amp; Radical Transparency
            </h3>

            <p className="ft-about-values__description">
              We operate without intermediate account managers or bureaucratic bottlenecks. Our clients collaborate directly with senior full-stack architects, cloud engineers, and technical strategists who take complete ownership of your milestones and roadmap from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}