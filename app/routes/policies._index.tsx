import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/policies._index';
import type {PoliciesQuery, PolicyItemFragment} from 'storefrontapi.generated';
import policyPageStyles from '~/styles/policy-page.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: policyPageStyles},
];

/*
 * This route had no `meta` export, and `root.tsx` has none either, so the page
 * shipped with no title at all. robots.txt already sends `Disallow: /policies/`,
 * so it is titled and noindexed rather than given structured data.
 */
export const meta: Route.MetaFunction = () => [
  {title: 'Policies | FoldTech'},
  {name: 'robots', content: 'noindex,follow'},
];

export async function loader({context}: Route.LoaderArgs) {
  const data: PoliciesQuery = await context.storefront.query(POLICIES_QUERY);
  
  const shopPolicies = data.shop;
  const policies: PolicyItemFragment[] = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy): policy is PolicyItemFragment => policy != null);

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();

  return (
    <div className="ft-policy-page">
      <header className="ft-policy-hero">
        <div className="ft-policy-hero__inner">
          <p className="ft-policy-hero__eyebrow">Legal</p>
          <h1 className="ft-policy-hero__title">Policies</h1>
          <p className="ft-policy-hero__lede">
            How we handle your data, your orders and your agreement with
            FoldTech.
          </p>
        </div>
      </header>

      <div className="ft-policy-index">
        <div className="ft-policy-index__grid">
          {policies.map((policy) => (
            <Link
              className="ft-policy-card"
              key={policy.id}
              to={`/policies/${policy.handle}`}
            >
              <span className="ft-policy-card__text">
                <span className="ft-policy-card__title">{policy.title}</span>
                <span className="ft-policy-card__hint">Read the full policy</span>
              </span>
              <span className="ft-policy-card__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
` as const;
