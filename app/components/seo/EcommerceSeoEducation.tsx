interface EcommerceSeoEducationProps {
  html: string;
}

export function EcommerceSeoEducation({html}: EcommerceSeoEducationProps) {
  if (!html.trim()) return null;

  return (
    <section className="ft-ecommerce-seo-education">
      <div
        className="ft-ecommerce-seo-education__content"
        dangerouslySetInnerHTML={{__html: html}}
      />
    </section>
  );
}