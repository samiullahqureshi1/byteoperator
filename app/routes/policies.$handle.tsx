import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/policies.$handle';
import {type Shop} from '@shopify/hydrogen/storefront-api-types';
import policyPageStyles from '~/styles/policy-page.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: policyPageStyles},
];

type SelectedPolicies = keyof Pick<
  Shop,
  | 'privacyPolicy'
  | 'shippingPolicy'
  | 'termsOfService'
  | 'refundPolicy'
  | 'subscriptionPolicy'
>;

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.policy.title ?? ''} | FoldTech`},
    /* robots.txt already sends `Disallow: /policies/`; this agrees with it. */
    {name: 'robots', content: 'noindex,follow'},
  ];
};

export async function loader({params, context}: Route.LoaderArgs) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(
    /-([a-z])/g,
    (_: unknown, m1: string) => m1.toUpperCase(),
  ) as SelectedPolicies;

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      subscriptionPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  return {policy};
}

export default function Policy() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <div className="ft-policy-page">
      <header className="ft-policy-hero">
        <div className="ft-policy-hero__inner">
          <p className="ft-policy-hero__eyebrow">Legal</p>
          <h1 className="ft-policy-hero__title">{policy.title}</h1>
        </div>
      </header>

      <div className="ft-policy-panel">
        <div className="ft-policy-panel__inner">
          <div className="ft-policy-back">
            <Link to="/policies">← Back to Policies</Link>
          </div>

          <div
            className="ft-policy-content"
            dangerouslySetInnerHTML={{__html: policy.body}}
          />
        </div>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $subscriptionPolicy: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
      # ShopPolicyWithDefault, not ShopPolicy, so the fragment can't apply.
      subscriptionPolicy @include(if: $subscriptionPolicy) {
        body
        handle
        id
        title
        url
      }
    }
  }
` as const;
