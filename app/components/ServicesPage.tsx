import {ServicesDirectory} from './services/ServicesDirectory';
import {ServicesHero} from './services/ServicesHero';
import {ServicesWideImage} from './services/ServicesWideImage';

interface ServicesPageProps {
  page: {
    handle: string;
    body: string;
  };
}

function getFirstParagraph(html: string) {
  const match = html.match(/<p\b[^>]*>[\s\S]*?<\/p>/i);

  return match?.[0] ?? '';
}

export function ServicesPage({
  page,
}: ServicesPageProps) {
  const heroDescription = getFirstParagraph(page.body);

  return (
    <main
      className="ft-services-page"
      data-page-handle={page.handle}
    >
      <ServicesHero descriptionHtml={heroDescription} />
      <ServicesWideImage />
      <ServicesDirectory />
    </main>
  );
}
