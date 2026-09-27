import {responsiveImage} from '~/lib/responsive-image';

export function ServicesWideImage() {
  return (
    <section className="ft-services-wide-image">
      <div className="ft-services-wide-image__container">
        <div className="ft-services-wide-image__inner">
          <img
            {...responsiveImage('/images/services/services-wide.webp', '100vw', 1920)}
            width={1672}
            height={941}
            alt="Byte Operator Software ecommerce services"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}