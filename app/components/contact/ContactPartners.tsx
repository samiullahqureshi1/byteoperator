import {CONTACT_PARTNER_LOGOS} from '~/components/HomePartners';

export function ContactPartners() {
  return (
    <section
      className="ft-contact-partners"
      aria-labelledby="ft-contact-partners-title"
    >
      <div className="ft-contact-partners__container">
        <h2
          className="ft-contact-partners__label"
          id="ft-contact-partners-title"
        >
          Technology partners
        </h2>

        <div className="ft-contact-partners__logos">
          {CONTACT_PARTNER_LOGOS.map((logo) => (
            <div className="ft-contact-partners__logo" key={logo.src}>
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
