'use client';

import {useState} from 'react';
import {
  ArticlesIntro,
  type ArticleFilter,
} from '~/components/articles/ArticlesIntro';
import {ArticlesListing} from '~/components/articles/ArticlesListing';
import {HomeExperts} from '~/components/HomeExperts';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import type {ArticleItem} from '~/data/articlesData';

interface Props {
  articles: ArticleItem[];
  featuredArticle?: ArticleItem;
}

export function ArticlesPageView({articles, featuredArticle}: Props) {
  const [activeFilter, setActiveFilter] = useState<ArticleFilter>('all');

  return (
    <div className="articles-page">
      <ArticlesIntro
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <ArticlesListing
        activeFilter={activeFilter}
        articles={articles as any}
        featuredArticle={featuredArticle as any}
      />
      <WorkTestimonial />
      <div className="ft-articles-experts">
        <HomeExperts />
      </div>
    </div>
  );
}
