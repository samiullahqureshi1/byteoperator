import {useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  BulkHoursPanel,
  BULK_HOURS_HANDLE,
  BULK_HOURS_PATH,
  BULK_HOURS_QUERY,
} from '~/components/BulkHours';
import {ServiceDetailFaqs} from '~/components/services/detail/ServiceDetailFaqs';
import {HomeExperts} from '~/components/HomeExperts';
import {HomePartners} from '~/components/HomePartners';
import {ClientLogoMarquee} from '~/components/HomeServices';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {absoluteUrl} from '~/lib/seo/schema';
import bulkHoursStyles from '~/styles/bulk-hours.css?url';
import contactHeroStyles from '~/styles/contact-hero.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import homePartnersStyles from '~/styles/home-partners.css?url';
import homeServicesStyles from '~/styles/home-services.css?url';
import productPageStyles from '~/styles/product-page.css?url';
import serviceDetailFaqStyles from '~/styles/service-detail-faqs.css?url';
import workTestimonialStyles from '~/styles/work-testimonial.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: bulkHoursStyles},
  // Carries the contact form inside the "Ask for a quote" modal.
  {rel: 'stylesheet', href: contactHeroStyles},
  {rel: 'stylesheet', href: serviceDetailFaqStyles},
  {rel: 'stylesheet', href: homePartnersStyles},
  // Carries the client logo marquee under the buy panel.
  {rel: 'stylesheet', href: homeServicesStyles},
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

const STATS = [
  {figure: '600+', label: 'Shopify projects delivered'},
  {figure: '17+ yrs', label: 'Working on Shopify'},
  {figure: 'Plus', label: 'Shopify Plus expertise in-house'},
  {figure: 'One team', label: 'CRO, development and integrations'},
];

/* Everything an hour can be spent on, in the order the team is asked for it. */
const COVERS = [
  {
    title: 'Shopify development',
    text: 'Custom sections, Liquid work, theme modifications and frontend development.',
  },
  {
    title: 'CRO & UX',
    text: 'Product page improvements, cart optimisation, navigation and customer journey work.',
  },
  {
    title: 'Shopify Plus',
    text: 'Advanced functionality, scripts, B2B features and Plus-specific development.',
  },
  {
    title: 'App & API integrations',
    text: 'Shopify apps, APIs, third-party platforms and custom integrations.',
  },
  {
    title: 'Performance',
    text: 'Speed improvements, Core Web Vitals and technical frontend cleanup.',
  },
  {
    title: 'Store support',
    text: 'Bug fixes, troubleshooting, QA and day-to-day Shopify requests.',
  },
  {
    title: 'Shopify & ecommerce SEO',
    text: 'Technical SEO fixes, on-page work, structured data and content templates.',
  },
  {
    title: 'AI search & GEO',
    text: 'Generative engine optimisation and AI visibility improvements for your store.',
  },
  {
    title: 'Email, SMS & Klaviyo',
    text: 'Flow builds, campaign templates, segmentation and retention automation.',
  },
  {
    title: 'Migrations & replatforming',
    text: 'Data, URL and SEO continuity when moving onto Shopify or between themes.',
  },
  {
    title: 'Internationalisation',
    text: 'Markets, currencies, translations and region-specific store setup.',
  },
  {
    title: 'Audits & A/B testing',
    text: 'Design, technical and SEO audits, plus experiment builds and analysis.',
  },
  {
    title: 'B2B & wholesale',
    text: 'Company accounts, price lists, gated catalogues and wholesale workflows.',
  },
  {
    title: 'Subscriptions',
    text: 'Recurring product setup, selling plans and subscriber experience work.',
  },
];

const STEPS = [
  {
    title: 'Choose your hours',
    text: 'Buy them once, or subscribe and get the same hours every month.',
  },
  {
    title: 'Send your requirements',
    text: 'Share the Shopify tasks you want the FoldTech team to pick up.',
  },
  {
    title: 'We estimate the work',
    text: 'You get an hour estimate before any meaningful work begins.',
  },
  {
    title: 'We build',
    text: 'Approved work is completed and the hours come off your balance.',
  },
];



const FAQS = [
  {
    question: 'What can I use bulk hours for?',
    answer:
      'Any Shopify work the team takes on for your store: theme and design changes, new sections and pages, app and integration setup, conversion improvements, performance work and day-to-day support.',
  },
  {
    question: 'How are hours tracked?',
    answer:
      'Time is logged against each task and deducted from your balance. You can ask for your remaining balance at any point.',
  },
  {
    question: 'Will I know how many hours a task will take before you start?',
    answer:
      'Yes. You receive an hour estimate for the work, and meaningful development only begins once you approve it.',
  },
  {
    question: 'Do unused hours expire?',
    answer:
      'No. Hours never expire, so you can hold a balance and use it when the work comes up.',
  },
  {
    question: 'Can multiple tasks use the same hour balance?',
    answer:
      'Yes. One balance covers as many tasks as you like, across design, development, CRO and support.',
  },
  {
    question: 'What happens when my hours run out?',
    answer:
      'We tell you before the balance is exhausted so you can top up, move to a monthly plan, or pause the work.',
  },
  {
    question: 'How does the monthly subscription work?',
    answer:
      'Choose Subscribe & Save, pick your hours and check out once. You pay for those hours today, and the same number of hours is charged every month after that to the card you used at checkout.',
  },
  {
    question: 'Can I change my monthly number of hours?',
    answer:
      'Yes. Tell us the new amount and we will update the plan from your next billing date.',
  },
  {
    question: 'Where do I manage or cancel my subscription?',
    answer:
      'Sign in to your account on the store to see your subscription and its next billing date, or to cancel it. Hours you have already bought remain yours.',
  },
  {
    question: 'What if I need more than 100 hours?',
    answer:
      'Larger engagements are better scoped as a project. Ask for a quote through the contact page and we will plan the work with you.',
  },
];

export default function BulkHoursProductPage() {
  const {product} = useLoaderData<typeof loader>();

  return (
    <div className="ft-product">
      <section className="ft-product__hero">
        <div className="ft-product__container">
          <div className="ft-product__grid">
            <div className="ft-product__intro">
              <p className="ft-product__eyebrow">Shopify development hours</p>
              <h1 className="ft-product__title">{product.title}</h1>
              <p className="ft-product__lead">
                Prepaid time with the FoldTech team for the Shopify work your
                store needs. Buy the hours once, or subscribe and get the same
                hours every month at a lower rate.
              </p>
            </div>

            <div className="ft-product__buy">
              <BulkHoursPanel product={product} />
            </div>

            {/* Everything that supports the decision without being part of
                it. Its own grid area, so it sits under the copy on desktop
                and under the panel on a phone, where the purchase should
                come before the supporting detail. */}
            <div className="ft-product__aside">
              <ul className="ft-product__uses" aria-label="What hours cover">
                {USES.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>

              <p className="ft-product__trust">
                <span>Shopify experts</span>
                <span>600+ projects</span>
                <span>Hours never expire</span>
              </p>

              <dl className="ft-product__stats">
                {STATS.map((stat) => (
                  <div className="ft-product__stat" key={stat.figure}>
                    <dt>{stat.figure}</dt>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Outside the 82rem container so the marquee runs the width of
            the page, as it does on the homepage. */}
        <div className="ft-product__logos">
          <ClientLogoMarquee />
        </div>
      </section>

      {/* One light band, as on the service pages: what the hours cover,
          how the work runs, what an amount of hours buys, and who it
          suits — read in that order before the FAQs. */}
      <section className="ft-product__band">
        <div className="ft-product__container">
          <div className="ft-product__block">
            <p className="ft-product__band-eyebrow">What the hours cover</p>
            <h2 className="ft-product__band-title">
              Use your hours across your Shopify store
            </h2>
            <ul className="ft-product__covers">
              {COVERS.map((cover) => (
                <li className="ft-product__cover" key={cover.title}>
                  <h3>{cover.title}</h3>
                  <p>{cover.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-product__block">
            <p className="ft-product__band-eyebrow">How it works</p>
            <h2 className="ft-product__band-title">
              From purchase to production
            </h2>
            <ol className="ft-product__steps">
              {STEPS.map((step, index) => (
                <li className="ft-product__step" key={step.title}>
                  <span className="ft-product__step-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>

      <WorkTestimonial />
      <ServiceDetailFaqs title="Buying bulk hours" faqs={FAQS} />
      <HomePartners />
      <HomeExperts />
    </div>
  );
}
