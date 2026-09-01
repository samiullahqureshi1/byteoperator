const TEAM_MEMBERS = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    image: '/images/about/team-01.webp',
  },
  {
    name: 'Jordan Lee',
    role: 'Head of Growth',
    image: '/images/about/team-02.webp',
  },
  {
    name: 'Taylor Smith',
    role: 'Head of Design',
    image: '/images/about/team-03.webp',
  },
  {
    name: 'Chris Walker',
    role: 'Head of Operations',
    image: '/images/about/team-04.webp',
  },
  {
    name: 'Sam Wilson',
    role: 'Head of Development',
    image: '/images/about/team-05.webp',
  },
  {
    name: 'Jamie Brown',
    role: 'Head of People',
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
              Our Leadership
              <br />
              Team
            </h2>

            <p className="ft-about-team__description">
              Driving growth for your business
            </p>

            <div className="ft-about-team__badges">
              <a
                href="/services/"
                className="ft-about-team__badge"
              >
                Services
              </a>

              <a
                href="/work/"
                className="ft-about-team__badge"
              >
                Our Work
              </a>

              <a
                href="/contact/"
                className="ft-about-team__badge"
              >
                Get in touch
              </a>
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