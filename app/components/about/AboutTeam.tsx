import {CalendlyButton} from '~/components/shared/CalendlyButton';

const TEAM_MEMBERS = [
  {
    name: 'Sami Ullah Qureshi',
    role: 'Founder & Chief Technology Officer',
    image: '/images/about/team-01.webp',
  },
  {
    name: 'Hamza Tariq',
    role: 'Principal Software & Cloud Architect',
    image: '/images/about/team-02.webp',
  },
  {
    name: 'Zeeshan Ali',
    role: 'Lead AI Systems & Automation Engineer',
    image: '/images/about/team-03.webp',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Commerce Strategy & CRO',
    image: '/images/about/team-04.webp',
  },
  {
    name: 'David Zhao',
    role: 'Senior Next.js & Headless Specialist',
    image: '/images/about/team-05.webp',
  },
  {
    name: 'Maya Al-Hassan',
    role: 'Head of Product & Interface Design',
    image: '/images/about/team-06.webp',
  },
] as const;

export function AboutTeam() {
  return (
    <section
      className="ft-about-team"
      aria-labelledby="ft-about-team-title"
    >
      <div className="ft-about-team__container">
        <div className="ft-about-team__inner">
          {/* LEFT */}
          <div className="ft-about-team__left">
            <h2
              id="ft-about-team-title"
              className="ft-about-team__heading"
            >
              Engineering &amp;
              <br />
              Strategic Leadership
            </h2>

            <p className="ft-about-team__description">
              Senior software architects, AI researchers, and commerce strategists dedicated to scaling your digital platforms.
            </p>

            <div className="ft-about-team__badges">
              <a
                href="/services"
                className="ft-about-team__badge"
              >
                Our Services
              </a>

              <a
                href="/work"
                className="ft-about-team__badge"
              >
                Case Studies
              </a>

              <a
                href="/contact"
                className="ft-about-team__badge"
              >
                Get in Touch
              </a>

              <CalendlyButton
                className="ft-about-team__badge"
                label="Book Architecture Call"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="ft-about-team__right">
            {TEAM_MEMBERS.map((member) => (
              <article
                className="ft-about-team__item"
                key={member.name}
              >
                <div className="ft-about-team__item-image">
                  <img
                    src={member.image}
                    width={290}
                    height={378}
                    alt={member.name}
                    className="ft-about-team__item-image-image"
                    loading="lazy"
                  />
                </div>

                <div className="ft-about-team__item-content">
                  <h3 className="ft-about-team__item-name">
                    {member.name}
                  </h3>

                  <p className="ft-about-team__item-role">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}