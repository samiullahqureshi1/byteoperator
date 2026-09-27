import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {FOUNDERS} from '~/data/founders';

/**
 * Founder / Co-Founder section for the About page. Reuses the About team
 * layout (`ft-about-team`) so typography and spacing match the site.
 *
 * Cards are text-only until real photos exist: when a founder gets an
 * `image` in `~/data/founders.ts`, it renders in the same frame the team
 * section uses. Never add placeholder or stock images here.
 */
export function AboutFounders() {
  return (
    <section
      className="ft-about-team ft-about-founders"
      aria-labelledby="ft-about-founders-title"
    >
      <div className="ft-about-team__container">
        <div className="ft-about-team__inner">
          <div className="ft-about-team__left">
            <h2 id="ft-about-founders-title" className="ft-about-team__heading">
              Founders
            </h2>

            <p className="ft-about-team__description">
              Byte Operator was founded by Samiullah Qureshi, with Uzair Khan
              as Co-Founder. To discuss a project, get in touch or book a
              call with our team.
            </p>

            <div className="ft-about-team__badges">
              <a href="/contact" className="ft-about-team__badge">
                Get in Touch
              </a>

              <CalendlyButton className="ft-about-team__badge" label="Book a Call" />
            </div>
          </div>

          <div className="ft-about-team__right">
            {FOUNDERS.map((founder) => (
              <article
                className={`ft-about-team__item${
                  founder.image ? '' : ' ft-about-founders__item--text'
                }`}
                key={founder.id}
              >
                {founder.image ? (
                  <div className="ft-about-team__item-image">
                    <img
                      className="ft-about-team__item-image-image"
                      src={founder.image.src}
                      width={founder.image.width}
                      height={founder.image.height}
                      alt={`${founder.name}, ${founder.role} of Byte Operator`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}

                <div className="ft-about-team__item-content">
                  <h3 className="ft-about-team__item-name">{founder.name}</h3>

                  <p className="ft-about-team__item-role">
                    {founder.role} — Byte Operator
                  </p>

                  {founder.linkedin ? (
                    <a
                      className="ft-about-founders__link"
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} on LinkedIn`}
                    >
                      LinkedIn ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
