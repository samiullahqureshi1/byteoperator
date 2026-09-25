export function ContactInfo() {
  return (
    <section
      className="ft-contact-info"
      aria-label="Contact details"
    >
      <div className="ft-contact-info__container">
        <div className="ft-contact-info__grid">
          <div className="ft-contact-info__block">
            <p className="ft-contact-info__label">
              Email us
            </p>

            <a href="mailto:info@byteoperator.com">
              info@byteoperator.com
            </a>
          </div>

          <div className="ft-contact-info__block">
            <p className="ft-contact-info__label">
              Kalispell
            </p>

            <p>Kalispell, US</p>
          </div>

          <div className="ft-contact-info__block">
            <p className="ft-contact-info__label">
              Call / WhatsApp
            </p>

            <a href="tel:+15123876926">
              +1 (512) 387-6926
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}