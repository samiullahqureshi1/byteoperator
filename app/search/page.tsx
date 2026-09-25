'use client';

import {useState, useMemo, Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import {Link} from '~/lib/router-compat';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {ARTICLES_DATA} from '~/data/articlesData';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return {services: [], work: [], articles: []};

    const services = Object.entries(SERVICE_PAGE_CONFIGS)
      .filter(([handle, cfg]) => {
        const text = `${handle} ${cfg.hero?.eyebrow || ''} ${cfg.hero?.heading || ''}`.toLowerCase();
        return text.includes(q);
      })
      .map(([handle, cfg]) => ({
        title: cfg.hero?.eyebrow || cfg.hero?.heading || handle,
        href: `/services/${handle}`,
        type: 'Service',
      }));

    const work = CASE_STUDIES
      .filter((cs) => cs.title.toLowerCase().includes(q) || (cs.intro && cs.intro.toLowerCase().includes(q)) || (cs.subtitle && cs.subtitle.toLowerCase().includes(q)))
      .map((cs) => ({title: cs.title, href: `/work/${cs.handle}`, type: 'Case Study'}));

    const articles = ARTICLES_DATA
      .filter((art) => art.title.toLowerCase().includes(q) || (art.excerpt && art.excerpt.toLowerCase().includes(q)))
      .map((art) => ({title: art.title, href: `/articles/${art.handle}`, type: 'Article'}));

    return {services, work, articles};
  }, [query]);

  const totalCount = results.services.length + results.work.length + results.articles.length;

  return (
    <div style={{maxWidth: '1000px', margin: '0 auto', padding: '120px 24px 80px'}}>
      <h1 style={{fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '24px'}}>Search Results</h1>

      <form onSubmit={(e) => e.preventDefault()} style={{marginBottom: '40px'}}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services, case studies, insights..."
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '18px',
            background: '#141414',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#fff',
            outline: 'none',
          }}
        />
      </form>

      {query ? (
        <div>
          <p style={{color: '#888', marginBottom: '32px'}}>
            Found {totalCount} result{totalCount === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </p>

          {totalCount === 0 ? (
            <div style={{padding: '40px 0', color: '#aaa'}}>
              <p>No matches found. Try searching for &ldquo;Plus&rdquo;, &ldquo;CRO&rdquo;, &ldquo;SEO&rdquo;, or &ldquo;Migration&rdquo;.</p>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
              {results.services.length > 0 && (
                <div>
                  <h2 style={{fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', marginBottom: '16px'}}>Services</h2>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {results.services.map((item) => (
                      <Link key={item.href} href={item.href} style={{padding: '16px 20px', background: '#161616', border: '1px solid #282828', borderRadius: '6px', color: '#fff', textDecoration: 'none', display: 'flex', justifyContent: 'space-between'}}>
                        <span>{item.title}</span>
                        <span style={{color: '#888'}}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.work.length > 0 && (
                <div>
                  <h2 style={{fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', marginBottom: '16px'}}>Case Studies &amp; Work</h2>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {results.work.map((item) => (
                      <Link key={item.href} href={item.href} style={{padding: '16px 20px', background: '#161616', border: '1px solid #282828', borderRadius: '6px', color: '#fff', textDecoration: 'none', display: 'flex', justifyContent: 'space-between'}}>
                        <span>{item.title}</span>
                        <span style={{color: '#888'}}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.articles.length > 0 && (
                <div>
                  <h2 style={{fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', marginBottom: '16px'}}>Articles &amp; Guides</h2>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {results.articles.map((item) => (
                      <Link key={item.href} href={item.href} style={{padding: '16px 20px', background: '#161616', border: '1px solid #282828', borderRadius: '6px', color: '#fff', textDecoration: 'none', display: 'flex', justifyContent: 'space-between'}}>
                        <span>{item.title}</span>
                        <span style={{color: '#888'}}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p style={{color: '#888'}}>Type a search term above to search our services, case studies, and insights.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{padding: '120px 24px', color: '#888', textAlign: 'center'}}>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
