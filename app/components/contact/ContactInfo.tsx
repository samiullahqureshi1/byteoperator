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
              Location
            </p>

            <p>Kalispell, MT — US</p>
          </div>
        </div>
      </div>
    </section>
  );
}