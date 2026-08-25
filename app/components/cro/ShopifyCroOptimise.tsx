import {useId, useState} from 'react';

type CroOptimiseItem = {
  id: string;
  title: string;
  description: string;
};

const CRO_OPTIMISE_ITEMS: CroOptimiseItem[] = [
  {
    id: 'product',
    title: 'Product Pages & Collections',
    description:
      'Product and collection experiences reviewed for clearer information, stronger merchandising, trust signals and easier purchasing decisions.',
  },
  {
    id: 'checkout',
    title: 'Checkout & Cart Flow',
    description:
      'Review cart, upsells, shipping messaging, payment options and checkout friction that can affect completion and order value.',
  },
  {
    id: 'homepage',
    title: 'Homepage & Landing Pages',
    description:
      'Optimise messaging, value propositions, navigation paths and content hierarchy to make important journeys easier to understand.',
  },
  {
    id: 'navigation',
    title: 'Navigation & Site Search',
    description:
      'Improve menus, filtering, search and collection discovery so customers can reach relevant products with less friction.',
  },
  {
    id: 'mobile',
    title: 'Mobile Experience',
    description:
      'Review mobile layouts, tap targets, scrolling, responsive behaviour and performance across key ecommerce journeys.',
  },
  {
    id: 'pricing',
    title: 'Pricing & Promotions',
    description:
      'Review how discounts, bundles, incentives and promotional messaging are presented across the customer journey.',
  },
];

export function ShopifyCroOptimise() {
  const [activeItem, setActiveItem] = useState(
    CRO_OPTIMISE_ITEMS[0]?.id ?? 'product',
  );
  const [previewMode, setPreviewMode] = useState<'before' | 'after'>('before');
  const accordionId = useId();

  const isAfter = previewMode === 'after';

  return (
    <section
      className="ft-cro-optimise"
      aria-labelledby="ft-cro-optimise-title"
    >
      <div className="ft-cro-optimise__container">
        <div className="ft-cro-optimise__layout">
          <div className="ft-cro-optimise__left">
            <p className="ft-cro-optimise__eyebrow">What We Optimise</p>

            <h2
              className="ft-cro-optimise__title"
              id="ft-cro-optimise-title"
            >
              Every Part of Your Store.
              <br />
              Optimised With Purpose.
            </h2>

            <ul className="ft-cro-optimise__list">
              {CRO_OPTIMISE_ITEMS.map((item) => {
                const isActive = activeItem === item.id;
                const triggerId = `${accordionId}-${item.id}-trigger`;
                const panelId = `${accordionId}-${item.id}-panel`;

                return (
                  <li
                    className={`ft-cro-optimise__item${
                      isActive ? ' is-active' : ''
                    }`}
                    key={item.id}
                  >
                    <button
                      type="button"
                      className="ft-cro-optimise__item-trigger"
                      id={triggerId}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <span className="ft-cro-optimise__item-name">
                        {item.title}
                      </span>
                    </button>

                    <div
                      className="ft-cro-optimise__item-panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                    >
                      <div className="ft-cro-optimise__item-panel-inner">
                        <p className="ft-cro-optimise__item-description">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ft-cro-optimise__preview">
            <div
              className="ft-cro-optimise__toggle-bar"
              role="group"
              aria-label="CRO optimisation preview"
            >
              <button
                type="button"
                className={`ft-cro-optimise__toggle${
                  previewMode === 'before' ? ' is-active' : ''
                }`}
                aria-pressed={previewMode === 'before'}
                onClick={() => setPreviewMode('before')}
              >
                Before
              </button>

              <button
                type="button"
                className={`ft-cro-optimise__toggle${
                  previewMode === 'after' ? ' is-active' : ''
                }`}
                aria-pressed={previewMode === 'after'}
                onClick={() => setPreviewMode('after')}
              >
                After CRO
              </button>

              <span className="ft-cro-optimise__toggle-label">
                Toggle to see the optimisation
              </span>
            </div>

            <div
              className={`ft-cro-wireframe${isAfter ? ' is-variant' : ''}`}
              aria-label={
                isAfter
                  ? 'After CRO ecommerce wireframe'
                  : 'Before CRO ecommerce wireframe'
              }
            >
              <div className="ft-cro-wireframe__browser">
                <div className="ft-cro-wireframe__browser-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="ft-cro-wireframe__url">
                  yourstore.myshopify.com
                </span>
              </div>

              <div className="ft-cro-wireframe__nav">
                <span className="ft-cro-wireframe__logo" />

                <div className="ft-cro-wireframe__nav-links">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="ft-cro-wireframe__hero ft-cro-wireframe__section">
                <span className="ft-cro-wireframe__change-tag ft-cro-wireframe__change-tag--headline">
                  Clearer headline
                </span>

                <span className="ft-cro-wireframe__change-tag ft-cro-wireframe__change-tag--cta">
                  Stronger CTA
                </span>

                <div className="ft-cro-wireframe__hero-image" />

                <div className="ft-cro-wireframe__hero-copy">
                  <span className="ft-cro-wireframe__line ft-cro-wireframe__line--short" />
                  <span className="ft-cro-wireframe__line ft-cro-wireframe__line--medium" />
                  <span className="ft-cro-wireframe__line ft-cro-wireframe__line--small" />

                  <div className="ft-cro-wireframe__cta-row">
                    <span className="ft-cro-wireframe__cta ft-cro-wireframe__cta--primary" />
                    <span className="ft-cro-wireframe__cta ft-cro-wireframe__cta--secondary" />
                  </div>
                </div>
              </div>

              <div className="ft-cro-wireframe__products ft-cro-wireframe__section">
                <span className="ft-cro-wireframe__change-tag ft-cro-wireframe__change-tag--grid">
                  Optimised layout
                </span>

                {[1, 2, 3].map((product) => (
                  <div
                    className="ft-cro-wireframe__product"
                    key={product}
                    aria-hidden="true"
                  >
                    <div className="ft-cro-wireframe__product-image" />
                    <span className="ft-cro-wireframe__product-name" />
                    <span className="ft-cro-wireframe__product-price" />
                  </div>
                ))}
              </div>

              <div className="ft-cro-wireframe__trust">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}