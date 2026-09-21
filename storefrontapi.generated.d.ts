/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type BulkHoursQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type BulkHoursQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Product, 'id' | 'title'> & {
      featuredImage?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          sellingPlanAllocations: {
            nodes: Array<{
              sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'>;
              priceAdjustments: Array<{
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              }>;
            }>;
          };
        }
      >;
    }
  >;
};

export type ArticlesPageBlogsQueryVariables = StorefrontAPI.Exact<{
  after?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticlesPageBlogsQuery = {
  blogs: {
    nodes: Array<
      Pick<StorefrontAPI.Blog, 'id' | 'handle' | 'title'> & {
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
        showOnArticlesPage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
    pageInfo: Pick<StorefrontAPI.PageInfo, 'hasNextPage' | 'endCursor'>;
  };
};

export type ArticlesPageBlogArticlesQueryVariables = StorefrontAPI.Exact<{
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  after?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticlesPageBlogArticlesQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'id' | 'handle' | 'title' | 'excerpt' | 'publishedAt'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'title' | 'description'>
          >;
          articleCategory?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          articleType?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          featuredArticle?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          mainFeaturedArticle?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
        }
      >;
      pageInfo: Pick<StorefrontAPI.PageInfo, 'hasNextPage' | 'endCursor'>;
    };
  }>;
};

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
  }>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
    sellingPlanAllocations: {
      nodes: Array<{
        sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
        priceAdjustments: Array<{
          price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        }>;
      }>;
    };
  };
  parentRelationship?: StorefrontAPI.Maybe<{
    parent: Pick<StorefrontAPI.CartLine, 'id'>;
  }>;
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
  }>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
    sellingPlanAllocations: {
      nodes: Array<{
        sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
        priceAdjustments: Array<{
          price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        }>;
      }>;
    };
  };
  lineComponents: Array<
    Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
      attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
      sellingPlanAllocation?: StorefrontAPI.Maybe<{
        sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
      }>;
      cost: {
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        amountPerQuantity: Pick<
          StorefrontAPI.MoneyV2,
          'currencyCode' | 'amount'
        >;
        compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
      };
      merchandise: Pick<
        StorefrontAPI.ProductVariant,
        'id' | 'availableForSale' | 'requiresShipping' | 'title'
      > & {
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        product: Pick<
          StorefrontAPI.Product,
          'handle' | 'title' | 'id' | 'vendor'
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        sellingPlanAllocations: {
          nodes: Array<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
            priceAdjustments: Array<{
              price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            }>;
          }>;
        };
      };
      parentRelationship?: StorefrontAPI.Maybe<{
        parent: Pick<StorefrontAPI.CartLine, 'id'>;
      }>;
    }
  >;
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'id' | 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
          }>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            sellingPlanAllocations: {
              nodes: Array<{
                sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
                priceAdjustments: Array<{
                  price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
                }>;
              }>;
            };
          };
          parentRelationship?: StorefrontAPI.Maybe<{
            parent: Pick<StorefrontAPI.CartLine, 'id'>;
          }>;
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
          }>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            sellingPlanAllocations: {
              nodes: Array<{
                sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
                priceAdjustments: Array<{
                  price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
                }>;
              }>;
            };
          };
          lineComponents: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
              sellingPlanAllocation?: StorefrontAPI.Maybe<{
                sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
              }>;
              cost: {
                totalAmount: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                amountPerQuantity: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
              };
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'availableForSale' | 'requiresShipping' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                product: Pick<
                  StorefrontAPI.Product,
                  'handle' | 'title' | 'id' | 'vendor'
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                sellingPlanAllocations: {
                  nodes: Array<{
                    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
                    priceAdjustments: Array<{
                      price: Pick<
                        StorefrontAPI.MoneyV2,
                        'currencyCode' | 'amount'
                      >;
                    }>;
                  }>;
                };
              };
              parentRelationship?: StorefrontAPI.Maybe<{
                parent: Pick<StorefrontAPI.CartLine, 'id'>;
              }>;
            }
          >;
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type LlmsArticlesQueryVariables = StorefrontAPI.Exact<{
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type LlmsArticlesQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'handle' | 'title' | 'excerpt' | 'content' | 'publishedAt'
        >
      >;
    };
  }>;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type CaseStudyImageFragment = Pick<
  StorefrontAPI.Image,
  'url' | 'altText' | 'width' | 'height'
>;

type CaseStudyMediaReference_Lc9p2qAkfOql545OMxgpSyumgqz6lEgbbAqn276jlNs_Fragment =
  {};

type CaseStudyMediaReference_GenericFile_Fragment = Pick<
  StorefrontAPI.GenericFile,
  'alt' | 'mimeType' | 'url'
> & {
  previewImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
};

type CaseStudyMediaReference_MediaImage_Fragment = {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
};

type CaseStudyMediaReference_Video_Fragment = Pick<
  StorefrontAPI.Video,
  'alt'
> & {
  previewImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
  sources: Array<Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>>;
};

export type CaseStudyMediaReferenceFragment =
  | CaseStudyMediaReference_Lc9p2qAkfOql545OMxgpSyumgqz6lEgbbAqn276jlNs_Fragment
  | CaseStudyMediaReference_GenericFile_Fragment
  | CaseStudyMediaReference_MediaImage_Fragment
  | CaseStudyMediaReference_Video_Fragment;

export type JournalArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type JournalArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          | 'id'
          | 'handle'
          | 'title'
          | 'tags'
          | 'excerpt'
          | 'contentHtml'
          | 'publishedAt'
        > & {
          authorV2?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ArticleAuthor, 'name'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
          lastModified?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          articleType?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          services?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          platform?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          caseStudyTitle?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          caseStudySubheading?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          caseStudyBlogDetails?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              fields: Array<
                Pick<
                  StorefrontAPI.MetaobjectField,
                  'key' | 'type' | 'value'
                > & {
                  reference?: StorefrontAPI.Maybe<
                    | (Pick<
                        StorefrontAPI.GenericFile,
                        'alt' | 'mimeType' | 'url'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      })
                    | {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    | (Pick<StorefrontAPI.Video, 'alt'> & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                        sources: Array<
                          Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                        >;
                      })
                  >;
                  references?: StorefrontAPI.Maybe<{
                    nodes: Array<
                      | (Pick<
                          StorefrontAPI.GenericFile,
                          'alt' | 'mimeType' | 'url'
                        > & {
                          previewImage?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                        })
                      | {
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                        }
                      | (Pick<StorefrontAPI.Video, 'alt'> & {
                          previewImage?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          sources: Array<
                            Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                          >;
                        })
                    >;
                  }>;
                }
              >;
            }>;
          }>;
        }
      >;
    }
  >;
};

export type ArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          'handle' | 'title' | 'contentHtml' | 'publishedAt'
        > & {
          author?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ArticleAuthor, 'name'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
        }
      >;
    }
  >;
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            author?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ArticleAuthor, 'name'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            blog: Pick<StorefrontAPI.Blog, 'handle'>;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
> & {
  author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  blog: Pick<StorefrontAPI.Blog, 'handle'>;
};

export type BlogsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogsQuery = {
  blogs: {
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
    nodes: Array<
      Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
      }
    >;
  };
};

export type CaseStudyPageQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
}>;

export type CaseStudyPageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Page,
      'id' | 'title' | 'handle' | 'body' | 'createdAt'
    > & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
    }
  >;
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'handle' | 'id' | 'title' | 'body'> & {
      faq?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type WorkFeaturedProjectsQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
}>;

export type WorkFeaturedProjectsQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'title' | 'handle' | 'excerpt' | 'content'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          result?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
          services?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          logo?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }>;
          }>;
        }
      >;
    };
  }>;
};

export type WorkTopCaseStudiesQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
}>;

export type WorkTopCaseStudiesQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'title' | 'handle' | 'tags' | 'excerpt' | 'content'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          result?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
          services?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          logo?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }>;
          }>;
        }
      >;
    };
  }>;
};

export type WorkCaseStudiesQueryVariables = StorefrontAPI.Exact<{
  after?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
}>;

export type WorkCaseStudiesQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'title' | 'handle' | 'tags' | 'excerpt' | 'content'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          result?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
          services?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          logo?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }>;
          }>;
        }
      >;
      pageInfo: Pick<StorefrontAPI.PageInfo, 'hasNextPage' | 'endCursor'>;
    };
  }>;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyItemFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type SearchArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'handle' | 'id' | 'title' | 'trackingParameters'
> & {blog: Pick<StorefrontAPI.Blog, 'handle'>};

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  term: StorefrontAPI.Scalars['String']['input'];
}>;

export type RegularSearchQuery = {
  articles: {
    nodes: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'handle' | 'id' | 'title' | 'trackingParameters'
      > & {blog: Pick<StorefrontAPI.Blog, 'handle'>}
    >;
  };
  pages: {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    blog: Pick<StorefrontAPI.Blog, 'handle'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          blog: Pick<StorefrontAPI.Blog, 'handle'>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

export type SitemapCaseStudyHandlesQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type SitemapCaseStudyHandlesQuery = {
  featured?: StorefrontAPI.Maybe<{
    articles: {nodes: Array<Pick<StorefrontAPI.Article, 'handle'>>};
  }>;
  top?: StorefrontAPI.Maybe<{
    articles: {nodes: Array<Pick<StorefrontAPI.Article, 'handle'>>};
  }>;
  caseStudies?: StorefrontAPI.Maybe<{
    articles: {nodes: Array<Pick<StorefrontAPI.Article, 'handle'>>};
  }>;
};

export type CaseStudyArticleFragment = Pick<
  StorefrontAPI.Article,
  | 'id'
  | 'title'
  | 'handle'
  | 'tags'
  | 'excerpt'
  | 'excerptHtml'
  | 'contentHtml'
  | 'publishedAt'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
  seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, 'title' | 'description'>>;
  services?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  platform?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  caseStudyTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  caseStudySubheading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  caseStudyBlogDetails?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      fields: Array<
        Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
          reference?: StorefrontAPI.Maybe<
            | (Pick<StorefrontAPI.GenericFile, 'alt' | 'mimeType' | 'url'> & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
              })
            | {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
              }
            | (Pick<StorefrontAPI.Video, 'alt'> & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                sources: Array<
                  Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                >;
              })
          >;
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              | (Pick<StorefrontAPI.GenericFile, 'alt' | 'mimeType' | 'url'> & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                })
              | {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                }
              | (Pick<StorefrontAPI.Video, 'alt'> & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                  >;
                })
            >;
          }>;
        }
      >;
    }>;
  }>;
};

export type CaseStudyDetailQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
}>;

export type CaseStudyDetailQuery = {
  featured?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Article,
        | 'id'
        | 'title'
        | 'handle'
        | 'tags'
        | 'excerpt'
        | 'excerptHtml'
        | 'contentHtml'
        | 'publishedAt'
      > & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
        services?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        platform?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        caseStudyTitle?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        caseStudySubheading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        caseStudyBlogDetails?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            fields: Array<
              Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
                reference?: StorefrontAPI.Maybe<
                  | (Pick<
                      StorefrontAPI.GenericFile,
                      'alt' | 'mimeType' | 'url'
                    > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    })
                  | {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    }
                  | (Pick<StorefrontAPI.Video, 'alt'> & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      sources: Array<
                        Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                      >;
                    })
                >;
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    | (Pick<
                        StorefrontAPI.GenericFile,
                        'alt' | 'mimeType' | 'url'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      })
                    | {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    | (Pick<StorefrontAPI.Video, 'alt'> & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                        sources: Array<
                          Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                        >;
                      })
                  >;
                }>;
              }
            >;
          }>;
        }>;
      }
    >;
  }>;
  topCaseStudies?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Article,
        | 'id'
        | 'title'
        | 'handle'
        | 'tags'
        | 'excerpt'
        | 'excerptHtml'
        | 'contentHtml'
        | 'publishedAt'
      > & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
        services?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        platform?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        caseStudyTitle?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        caseStudySubheading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        caseStudyBlogDetails?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            fields: Array<
              Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
                reference?: StorefrontAPI.Maybe<
                  | (Pick<
                      StorefrontAPI.GenericFile,
                      'alt' | 'mimeType' | 'url'
                    > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    })
                  | {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    }
                  | (Pick<StorefrontAPI.Video, 'alt'> & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      sources: Array<
                        Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                      >;
                    })
                >;
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    | (Pick<
                        StorefrontAPI.GenericFile,
                        'alt' | 'mimeType' | 'url'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      })
                    | {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    | (Pick<StorefrontAPI.Video, 'alt'> & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                        sources: Array<
                          Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                        >;
                      })
                  >;
                }>;
              }
            >;
          }>;
        }>;
      }
    >;
  }>;
  caseStudies?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Article,
        | 'id'
        | 'title'
        | 'handle'
        | 'tags'
        | 'excerpt'
        | 'excerptHtml'
        | 'contentHtml'
        | 'publishedAt'
      > & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
        services?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        platform?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        caseStudyTitle?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        caseStudySubheading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        caseStudyBlogDetails?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            fields: Array<
              Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
                reference?: StorefrontAPI.Maybe<
                  | (Pick<
                      StorefrontAPI.GenericFile,
                      'alt' | 'mimeType' | 'url'
                    > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    })
                  | {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    }
                  | (Pick<StorefrontAPI.Video, 'alt'> & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      sources: Array<
                        Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                      >;
                    })
                >;
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    | (Pick<
                        StorefrontAPI.GenericFile,
                        'alt' | 'mimeType' | 'url'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      })
                    | {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    | (Pick<StorefrontAPI.Video, 'alt'> & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                        sources: Array<
                          Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                        >;
                      })
                  >;
                }>;
              }
            >;
          }>;
        }>;
      }
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  query BulkHours(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      id\n      title\n      featuredImage {\n        url\n        altText\n        width\n        height\n      }\n      selectedOrFirstAvailableVariant(\n        selectedOptions: []\n        ignoreUnknownOptions: true\n        caseInsensitiveMatch: true\n      ) {\n        id\n        availableForSale\n        price {\n          amount\n          currencyCode\n        }\n        sellingPlanAllocations(first: 1) {\n          nodes {\n            sellingPlan {\n              id\n              name\n            }\n            priceAdjustments {\n              price {\n                amount\n                currencyCode\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: BulkHoursQuery;
    variables: BulkHoursQueryVariables;
  };
  '#graphql\n  query ArticlesPageBlogs(\n    $after: String\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    blogs(first: 250, after: $after) {\n      nodes {\n        id\n        handle\n        title\n        seo {\n          title\n          description\n        }\n        showOnArticlesPage: metafield(\n          namespace: "custom"\n          key: "show_on_articles_page"\n        ) {\n          value\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n': {
    return: ArticlesPageBlogsQuery;
    variables: ArticlesPageBlogsQueryVariables;
  };
  '#graphql\n  query ArticlesPageBlogArticles(\n    $blogHandle: String!\n    $after: String\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    blog(handle: $blogHandle) {\n      articles(\n        first: 250\n        after: $after\n        sortKey: PUBLISHED_AT\n        reverse: true\n      ) {\n        nodes {\n          id\n          handle\n          title\n          excerpt\n          publishedAt\n          image {\n            id\n            altText\n            url\n            width\n            height\n          }\n          seo {\n            title\n            description\n          }\n          articleCategory: metafield(\n            namespace: "custom"\n            key: "article_category"\n          ) {\n            value\n          }\n          articleType: metafield(\n            namespace: "custom"\n            key: "article_type"\n          ) {\n            value\n          }\n          featuredArticle: metafield(\n            namespace: "custom"\n            key: "featured_article"\n          ) {\n            value\n          }\n          mainFeaturedArticle: metafield(\n            namespace: "custom"\n            key: "main_featured_article"\n          ) {\n            value\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n': {
    return: ArticlesPageBlogArticlesQuery;
    variables: ArticlesPageBlogArticlesQueryVariables;
  };
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  query LlmsArticles(\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    blog(handle: $blogHandle) {\n      articles(first: 250, sortKey: PUBLISHED_AT, reverse: true) {\n        nodes {\n          handle\n          title\n          excerpt\n          content\n          publishedAt\n        }\n      }\n    }\n  }\n': {
    return: LlmsArticlesQuery;
    variables: LlmsArticlesQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
  '#graphql\n  fragment CaseStudyImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  fragment CaseStudyMediaReference on MetafieldReference {\n    ... on MediaImage {\n      image {\n        ...CaseStudyImage\n      }\n    }\n    ... on Video {\n      alt\n      previewImage {\n        ...CaseStudyImage\n      }\n      sources {\n        url\n        mimeType\n      }\n    }\n    ... on GenericFile {\n      alt\n      mimeType\n      url\n      previewImage {\n        ...CaseStudyImage\n      }\n    }\n  }\n\n  query JournalArticle(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        id\n        handle\n        title\n        tags\n        excerpt\n        contentHtml\n        publishedAt\n        authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n        lastModified: metafield(\n          namespace: "custom"\n          key: "last_modified"\n        ) {\n          value\n        }\n        articleType: metafield(namespace: "custom", key: "article_type") {\n          value\n        }\n        services: metafield(namespace: "custom", key: "services") {\n          value\n        }\n        platform: metafield(namespace: "custom", key: "platform") {\n          value\n        }\n        caseStudyTitle: metafield(\n          namespace: "custom"\n          key: "case_study_title"\n        ) {\n          value\n        }\n        caseStudySubheading: metafield(\n          namespace: "custom"\n          key: "case_study_subheading"\n        ) {\n          value\n        }\n        caseStudyBlogDetails: metafield(\n          namespace: "custom"\n          key: "case_study_blog_post"\n        ) {\n          reference {\n            ... on Metaobject {\n              fields {\n                key\n                type\n                value\n                reference {\n                  ...CaseStudyMediaReference\n                }\n                references(first: 20) {\n                  nodes {\n                    ...CaseStudyMediaReference\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: JournalArticleQuery;
    variables: JournalArticleQueryVariables;
  };
  '#graphql\n  query Article(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n    }\n  }\n': {
    return: ArticleQuery;
    variables: ArticleQueryVariables;
  };
  '#graphql\n  query Blog(\n    $language: LanguageCode\n    $blogHandle: String!\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      title\n      handle\n      seo {\n        title\n        description\n      }\n      articles(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ArticleItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n\n      }\n    }\n  }\n  fragment ArticleItem on Article {\n    author: authorV2 {\n      name\n    }\n    contentHtml\n    handle\n    id\n    image {\n      id\n      altText\n      url\n      width\n      height\n    }\n    publishedAt\n    title\n    blog {\n      handle\n    }\n  }\n': {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  '#graphql\n  query Blogs(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    blogs(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        title\n        handle\n        seo {\n          title\n          description\n        }\n      }\n    }\n  }\n': {
    return: BlogsQuery;
    variables: BlogsQueryVariables;
  };
  '#graphql\n  query CaseStudyPage(\n    $handle: String!\n    $language: LanguageCode\n    $country: CountryCode\n  ) @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      id\n      title\n      handle\n      body\n      createdAt\n      seo {\n        title\n        description\n      }\n    }\n  }\n': {
    return: CaseStudyPageQuery;
    variables: CaseStudyPageQueryVariables;
  };
  '#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      handle\n      id\n      title\n      body\n      faq: metafield(namespace: "custom", key: "faqs") {\n        value\n      }\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageQuery;
    variables: PageQueryVariables;
  };
  '#graphql\n  query WorkFeaturedProjects(\n    $language: LanguageCode\n    $country: CountryCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: "featured") {\n      articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {\n        nodes {\n          title\n          handle\n          image {\n            url\n            altText\n            width\n            height\n          }\n          excerpt\n          content\n          result: metafield(namespace: "custom", key: "result") {\n            value\n          }\n          services: metafield(namespace: "custom", key: "services") {\n            value\n          }\n          logo: metafield(namespace: "custom", key: "logo") {\n            reference {\n              ... on MediaImage {\n                image {\n                  url\n                  altText\n                  width\n                  height\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: WorkFeaturedProjectsQuery;
    variables: WorkFeaturedProjectsQueryVariables;
  };
  '#graphql\n  query WorkTopCaseStudies(\n    $language: LanguageCode\n    $country: CountryCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: "top-case-studies") {\n      # Every top case study; a cap silently drops the oldest off /work.\n      articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {\n        nodes {\n          title\n          handle\n          tags\n          image {\n            url\n            altText\n            width\n            height\n          }\n          excerpt\n          content\n          result: metafield(namespace: "custom", key: "result") {\n            value\n          }\n          services: metafield(namespace: "custom", key: "services") {\n            value\n          }\n          logo: metafield(namespace: "custom", key: "logo") {\n            reference {\n              ... on MediaImage {\n                image {\n                  url\n                  altText\n                  width\n                  height\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: WorkTopCaseStudiesQuery;
    variables: WorkTopCaseStudiesQueryVariables;
  };
  '#graphql\n  query WorkCaseStudies(\n    $after: String\n    $language: LanguageCode\n    $country: CountryCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: "case-studies") {\n      articles(\n        first: 250\n        after: $after\n        sortKey: PUBLISHED_AT\n        reverse: true\n      ) {\n        nodes {\n          title\n          handle\n          tags\n          image {\n            url\n            altText\n            width\n            height\n          }\n          excerpt\n          content\n          result: metafield(namespace: "custom", key: "result") {\n            value\n          }\n          services: metafield(namespace: "custom", key: "services") {\n            value\n          }\n          logo: metafield(namespace: "custom", key: "logo") {\n            reference {\n              ... on MediaImage {\n                image {\n                  url\n                  altText\n                  width\n                  height\n                }\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n': {
    return: WorkCaseStudiesQuery;
    variables: WorkCaseStudiesQueryVariables;
  };
  '#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n  fragment PolicyItem on ShopPolicy {\n    id\n    title\n    handle\n  }\n  query Policies ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      privacyPolicy {\n        ...PolicyItem\n      }\n      shippingPolicy {\n        ...PolicyItem\n      }\n      termsOfService {\n        ...PolicyItem\n      }\n      refundPolicy {\n        ...PolicyItem\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: PoliciesQuery;
    variables: PoliciesQueryVariables;
  };
  '#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $first: Int\n    $language: LanguageCode\n    $term: String!\n  ) @inContext(country: $country, language: $language) {\n    articles: search(\n      query: $term,\n      types: [ARTICLE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Article {\n          ...SearchArticle\n        }\n      }\n    }\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n  }\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment SearchArticle on Article {\n    __typename\n    handle\n    id\n    title\n    blog {\n      handle\n    }\n    trackingParameters\n  }\n\n': {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      pages {\n        ...PredictivePage\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  '#graphql\n  query SitemapCaseStudyHandles {\n    featured: blog(handle: "featured") {\n      articles(first: 250) { nodes { handle } }\n    }\n    top: blog(handle: "top-case-studies") {\n      articles(first: 250) { nodes { handle } }\n    }\n    caseStudies: blog(handle: "case-studies") {\n      articles(first: 250) { nodes { handle } }\n    }\n  }\n': {
    return: SitemapCaseStudyHandlesQuery;
    variables: SitemapCaseStudyHandlesQueryVariables;
  };
  '#graphql\n  fragment CaseStudyImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  fragment CaseStudyMediaReference on MetafieldReference {\n    ... on MediaImage {\n      image {\n        ...CaseStudyImage\n      }\n    }\n    ... on Video {\n      alt\n      previewImage {\n        ...CaseStudyImage\n      }\n      sources {\n        url\n        mimeType\n      }\n    }\n    ... on GenericFile {\n      alt\n      mimeType\n      url\n      previewImage {\n        ...CaseStudyImage\n      }\n    }\n  }\n\n  fragment CaseStudyArticle on Article {\n    id\n    title\n    handle\n    tags\n    image {\n      ...CaseStudyImage\n    }\n    excerpt\n    excerptHtml\n    contentHtml\n    publishedAt\n    seo {\n      title\n      description\n    }\n    services: metafield(namespace: "custom", key: "services") {\n      value\n    }\n    platform: metafield(namespace: "custom", key: "platform") {\n      value\n    }\n    caseStudyTitle: metafield(namespace: "custom", key: "case_study_title") {\n      value\n    }\n    caseStudySubheading: metafield(\n      namespace: "custom"\n      key: "case_study_subheading"\n    ) {\n      value\n    }\n    caseStudyBlogDetails: metafield(\n      namespace: "custom"\n      key: "case_study_blog_post"\n    ) {\n      reference {\n        ... on Metaobject {\n          fields {\n            key\n            type\n            value\n            reference {\n              ...CaseStudyMediaReference\n            }\n            references(first: 20) {\n              nodes {\n                ...CaseStudyMediaReference\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n  query CaseStudyDetail(\n    $articleHandle: String!\n    $language: LanguageCode\n    $country: CountryCode\n  ) @inContext(language: $language, country: $country) {\n    featured: blog(handle: "featured") {\n      articleByHandle(handle: $articleHandle) {\n        ...CaseStudyArticle\n      }\n    }\n    topCaseStudies: blog(handle: "top-case-studies") {\n      articleByHandle(handle: $articleHandle) {\n        ...CaseStudyArticle\n      }\n    }\n    caseStudies: blog(handle: "case-studies") {\n      articleByHandle(handle: $articleHandle) {\n        ...CaseStudyArticle\n      }\n    }\n  }\n': {
    return: CaseStudyDetailQuery;
    variables: CaseStudyDetailQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
