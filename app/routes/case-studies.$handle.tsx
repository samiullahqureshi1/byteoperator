import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/case-studies.$handle';
import {caseStudyJsonLd} from '~/lib/seo/jsonld';
import {absoluteUrl} from '~/lib/seo/schema';
import {CASE_STUDY_PAGE_PREFIX} from '~/lib/route-mappings';
import {parseCaseStudy} from '~/lib/case-study-page';
import {CaseStudyLayout} from '~/components/work/CaseStudyDetail';
import caseStudyPageStyles from '~/styles/case-study-page.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';

/**
 * Case studies authored as Shopify pages (`cs-{name}`), served at
 * `/case-studies/{name}`. `/pages/cs-{name}` 301s here (`resolveCleanPath`).
 */
export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: caseStudyPageStyles},
  {rel: 'stylesheet', href: homeExpertsStyles},
];

export const meta: Route.MetaFunction = ({data}) => {
  if (!data) return [{title: 'Case study not found | FoldTech'}];
  const {page, name, study} = data;

  const path = `/case-studies/${name}`;
  const title =
    page.seo?.title || `${page.title} Case Study & Results | FoldTech`;
  const description = page.seo?.description?.trim() || study.intro;

  return [
    {title},
    ...(description ? [{name: 'description', content: description}] : []),
    {property: 'og:type', content: 'article'},
    {property: 'og:title', content: title},
    ...(description
      ? [{property: 'og:description', content: description}]
      : []),
    {tagName: 'link', rel: 'canonical', href: absoluteUrl(path)},
    ...caseStudyJsonLd({
      path,
      clientName: page.title,
      headline: page.title,
      description,
      datePublished: page.createdAt,
    }),
  ];
};

export async function loader({context, params, request}: Route.LoaderArgs) {
  // Single-fetch data requests can carry the `.data` suffix in the param.
  const requested = params.handle.replace(/\.data$/, '');
  const {page} = await context.storefront.query(CASE_STUDY_PAGE_QUERY, {
    variables: {handle: `${CASE_STUDY_PAGE_PREFIX}${requested}`},
  });

  if (!page) throw new Response('Not found', {status: 404});

  // Shopify matches handles case-insensitively; send `/case-studies/NAIMI`
  // to the one real URL instead of serving a second self-canonical copy.
  const name = page.handle.slice(CASE_STUDY_PAGE_PREFIX.length);
  if (requested !== name) {
    throw redirect(`/case-studies/${name}${new URL(request.url).search}`, 301);
  }

  return {page, name, study: parseCaseStudy(page.body, page.title)};
}

export default function CaseStudyPageRoute() {
  const {page, study} = useLoaderData<typeof loader>();
  // The tech stack ("A | B | C") renders as chips; other details in the hero.
  const stack = study.details.find((detail) => /stack/i.test(detail.label));

  return (
    <CaseStudyLayout
      title={page.title}
      content={study}
      details={study.details.filter((detail) => detail !== stack)}
      chips={stack?.value.split('|').map((tech) => tech.trim()) ?? []}
      images={[]}
    />
  );
}

const CASE_STUDY_PAGE_QUERY = `#graphql
  query CaseStudyPage(
    $handle: String!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      handle
      body
      createdAt
      seo {
        title
        description
      }
    }
  }
` as const;
