interface AboutHeroProps {
  content?: {
    heroTitle?: string;
    heroEyebrow?: string;
    heroImage?: string;
  };
}

export function AboutHero({content}: AboutHeroProps = {}) {
  const title =
    content?.heroTitle ||
    'Byte Operator is an independent AI automation and custom software engineering company empowering high-growth brands with resilient cloud architectures, high-performance web applications, and autonomous operational scale.';

  return (
    <section className="ft-about-hero">
      <div className="ft-about-hero__glow" aria-hidden="true" />

      <div className="ft-about-hero__container">
        <div className="ft-about-hero__inner">
          {content?.heroEyebrow ? (
            <p className="ft-about-hero__eyebrow" style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '16px' }}>
              {content.heroEyebrow}
            </p>
          ) : null}
          <h1 className="ft-about-hero__title">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}