export interface HeaderQuery {
  shop: {
    primaryDomain: {
      url: string;
    };
  };
  menu?: {
    id: string;
    items: Array<{
      id: string;
      resourceId?: string | null;
      tags?: string[];
      title: string;
      type?: string;
      url: string;
      items?: any[];
    }>;
  } | null;
}

export interface FooterQuery {
  menu?: {
    id: string;
    items: Array<{
      id: string;
      title: string;
      items: Array<{
        id: string;
        title: string;
        url?: string | null;
      }>;
    }>;
  } | null;
}

export type CartApiQueryFragment = any;
export type WorkFeaturedProjectsQuery = any;
export type WorkTopCaseStudiesQuery = any;
export type WorkCaseStudiesQuery = any;
export type BulkHoursQuery = any;
export type PredictiveSearchQuery = any;
export type RegularSearchQuery = any;
export type SearchQuery = any;
export type PageQuery = any;
export type ArticleQuery = any;
export type BlogQuery = any;
export type PolicyQuery = any;
export type ProductQuery = any;
export type ShopQuery = any;
export type GenericGraphQLQuery = Record<string, any>;
