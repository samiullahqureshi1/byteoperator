import {useLoaderData} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {Route} from './+types/products.$handle';
import {
  BulkHoursPanel,
  BULK_HOURS_HANDLE,
  BULK_HOURS_IMAGE,
  BULK_HOURS_PATH,
  BULK_HOURS_QUERY,
} from '~/components/BulkHours';
import {ServiceDetailFaqs} from '~/components/services/detail/ServiceDetailFaqs';
import {HomeExperts} from '~/components/HomeExperts';
import {HomePartners} from '~/components/HomePartners';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {absoluteUrl} from '~/lib/seo/schema';
import bulkHoursStyles from '~/styles/bulk-hours.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import homePartnersStyles from '~/styles/home-partners.css?url';
import productPageStyles from '~/styles/product-page.css?url';
import serviceDetailFaqStyles from '~/styles/service-detail-faqs.css?url';
import workTestimonialStyles from '~/styles/work-testimonial.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: bulkHoursStyles},
  {rel: 'stylesheet', href: serviceDetailFaqStyles},
  {rel: 'stylesheet', href: homePartnersStyles},
  {rel: 'stylesheet', href: workTestimonialStyles},
  {rel: 'stylesheet', href: homeExpertsStyles},
  // Last, so the page-level colour overrides win.
  {rel: 'stylesheet', href: productPageStyles},
];

export const meta: Route.MetaFunction = ({data}) => [
  {title: `${data?.product.title ?? 'Bulk hours'} | FoldTech`},
  {
    name: 'description',
    content:
      'Prepaid Shopify design, development and support hours from FoldTech. Buy between 1 and 100 hours once, or subscribe monthly at a lower hourly rate.',
  },
  // Shared links carry utm params; they all point at the one clean URL.
  {tagName: 'link', rel: 'canonical', href: absoluteUrl(BULK_HOURS_PATH)},
  // A buy link to share, not a search result, like /cart.
  {name: 'robots', content: 'noindex,follow'},
];

/**
 * Bulk Hours is the only product with a page. Every other product URL 404s,
 * since product pages were retired in favour of the service pages.
 */
export async function loader({params, context}: Route.LoaderArgs) {
  // Single-fetch data requests can expose the `.data` suffix in the param.
  const handle = params.handle?.replace(/\.data$/, '');

  if (handle !== BULK_HOURS_HANDLE) {
    throw new Response('Not Found', {status: 404});
  }

  const {product} = await context.storefront.query(BULK_HOURS_QUERY, {
    variables: {handle},
  });

  if (!product?.selectedOrFirstAvailableVariant) {
    throw new Response('Not Found', {status: 404});
  }

  return {product};
}

const USES = [
  'Theme changes',
  'Shopify development',
  'Design updates',
  'App setup',
  'Store support',
];

const FAQS = [
  {
    question: 'What can I use bulk hours for?',
    answer:
      'Any Shopify work the team takes on for your store: theme and design changes, new sections and pages, app and integration setup, conversion improvements and day-to-day support.',
  },
  {
    question: 'How does the monthly subscription work?',
    answer:
      'Choose Monthly, pick your hours and check out once. You pay for those hours today, and the same number of hours is charged every month after that to the card you used at checkout.',
  },
  {
    question: 'Where do I manage my subscription?',
    answer:
      'Sign in to your account on the store to see your subscription and its next billing date.',
  },
  {
    question: 'What if I need more than 100 hours?',
    answer:
      'For larger projects, ask for a quote through the contact page and we will scope the work with you.',
  },
];

export default function BulkHoursProductPage() {
  const {product} = useLoaderData<typeof loader>();

  return (
    <div className="ft-product">
      <section className="ft-product__hero">
        <div className="ft-product__container">
          <p className="ft-product__eyebrow">Shopify development hours</p>

          <div className="ft-product__grid">
            <div className="ft-product__intro">
              <h1 className="ft-product__title">{product.title}</h1>
              <p className="ft-product__lead">
                Prepaid time with the FoldTech team for the Shopify work your
                store needs. Buy the hours once, or subscribe and get the same
                hours every month at a lower rate.
              </p>
              <ul className="ft-product__uses" aria-label="What hours cover">
                {USES.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>
            </div>

            <div className="ft-product__buy">
              <BulkHoursPanel product={product} />
            </div>

            <div className="ft-product__media">
              {product.featuredImage ? (
                <Image
                  className="ft-product__image"
                  data={product.featuredImage}
                  sizes="(min-width: 62em) 55vw, 100vw"
                />
              ) : (
                <img
                  className="ft-product__image"
                  src={BULK_HOURS_IMAGE.src}
                  alt={BULK_HOURS_IMAGE.alt}
                  width={BULK_HOURS_IMAGE.width}
                  height={BULK_HOURS_IMAGE.height}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <ServiceDetailFaqs title="Bulk hours" faqs={FAQS} />
      <HomePartners />
      <WorkTestimonial />
      <HomeExperts />
    </div>
  );
}
