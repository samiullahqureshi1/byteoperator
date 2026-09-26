'use client';

import {useState} from 'react';
import {GUIDES_DATA, GUIDE_CATEGORIES, type TechnicalGuide} from '~/data/guidesData';
import {HomeObservatory} from '~/components/HomeObservatory';

export function GuidesPageView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Guides');
  const [activeModalGuide, setActiveModalGuide] = useState<TechnicalGuide | null>(null);

  // Download form state
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadRole, setDownloadRole] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredGuides =
    selectedCategory === 'All Guides'
      ? GUIDES_DATA
      : GUIDES_DATA.filter((g) => g.category === selectedCategory);

  const flagshipGuide = GUIDES_DATA.find((g) => g.featured) || GUIDES_DATA[0];

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail) return;
    try {
      await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: downloadEmail,
          role: downloadRole,
          guideId: activeModalGuide?.id || flagshipGuide.id,
          source: 'technical-guide-download',
        }),
      });
      setDownloadSuccess(true);
    } catch (err) {
      setDownloadSuccess(true);
    }
  };

  return (
    <div className="ft-guides-page">
      <div className="ft-guides-container">
        {/* HERO */}
        <section className="ft-guides-hero">
          <div className="ft-guides-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c1.2 0 2-.8 2-2V4c0-1.2-.8-2-2-2zm-1 18H6V4h12v16z" />
            </svg>
            Byte Operator Technical Library
          </div>

          <h1 className="ft-guides-title">
            Actionable Engineering &amp; <span>Growth Blueprints</span>
          </h1>

          <p className="ft-guides-subtitle">
            Download our battle-tested whitepapers, headless architecture runbooks, CRO audit frameworks, and AI search protocols used to scale 8-figure enterprise storefronts.
          </p>
        </section>

        {/* FLAGSHIP FEATURED GUIDE */}
        <section className="ft-guide-featured-card">
          <div>
            <span className="ft-guide-flagship-badge">{flagshipGuide.badgeText}</span>
            <h2 className="ft-guide-featured-title">{flagshipGuide.title}</h2>
            <p className="ft-guide-featured-subtitle">{flagshipGuide.subtitle}</p>

            <div className="ft-guide-specs">
              <div className="ft-guide-spec-item">
                <span>📄</span>
                <strong>{flagshipGuide.pagesCount} Pages</strong>
              </div>
              <div className="ft-guide-spec-item">
                <span>⏱️</span>
                <strong>{flagshipGuide.readTime}</strong>
              </div>
              <div className="ft-guide-spec-item">
                <span>💾</span>
                <strong>{flagshipGuide.fileSize} ({flagshipGuide.downloadFormat})</strong>
              </div>
              <div className="ft-guide-spec-item">
                <span>👤</span>
                <strong>By {flagshipGuide.author.name}</strong> ({flagshipGuide.author.role})
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <button
                type="button"
                className="ft-webinar-submit-btn"
                style={{width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}
                onClick={() => {
                  setActiveModalGuide(flagshipGuide);
                  setDownloadSuccess(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                </svg>
                Instant Free Download (PDF + Assets)
              </button>

              <button
                type="button"
                style={{background: 'transparent', border: '1px solid #1F2A44', color: '#fff', borderRadius: '0.5rem', padding: '0.85rem 1.25rem', fontSize: '0.9rem', cursor: 'pointer'}}
                onClick={() => {
                  setActiveModalGuide(flagshipGuide);
                  setDownloadSuccess(false);
                }}
              >
                Preview Table of Contents →
              </button>
            </div>
          </div>

          {/* Included Assets Pack */}
          <div className="ft-guide-download-box">
            <h3>Package Includes:</h3>
            <p>Every blueprint comes with companion repository code and Figma assets.</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {flagshipGuide.includedAssets.map((asset, idx) => (
                <div
                  key={idx}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#060F24', borderRadius: '0.5rem', border: '1px solid #1F2A44'}}
                >
                  <span style={{fontSize: '0.8125rem', color: '#fff', fontWeight: 500}}>{asset.name}</span>
                  <span style={{fontSize: '0.75rem', color: '#3B82F6', fontWeight: 600}}>{asset.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORY FILTERS */}
        <div className="ft-guides-filter-nav">
          {GUIDE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ft-guides-filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GUIDES GRID */}
        <div className="ft-guides-grid">
          {filteredGuides.map((guide) => (
            <article className="ft-guide-card" key={guide.id}>
              <div className="ft-guide-card-header">
                <span className="ft-guide-card-badge">{guide.badgeText}</span>
                <span className="ft-guide-card-format">{guide.downloadFormat} • {guide.fileSize}</span>
              </div>

              <h3 className="ft-guide-card-title">{guide.title}</h3>
              <p className="ft-guide-card-desc">{guide.subtitle}</p>

              <div className="ft-guide-card-meta">
                <span className="ft-guide-card-pages">{guide.pagesCount} Pages • {guide.readTime}</span>

                <button
                  type="button"
                  className="ft-guide-card-btn"
                  onClick={() => {
                    setActiveModalGuide(guide);
                    setDownloadSuccess(false);
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                  </svg>
                  Get Blueprint
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* GUIDE PREVIEW & DOWNLOAD MODAL */}
      {activeModalGuide && (
        <div
          className="ft-podcast-modal-backdrop"
          onClick={() => setActiveModalGuide(null)}
        >
          <div
            className="ft-podcast-modal"
            style={{maxWidth: '52rem'}}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ft-podcast-modal-close"
              onClick={() => setActiveModalGuide(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <span className="ft-guide-flagship-badge">{activeModalGuide.badgeText}</span>

            <h2 style={{fontSize: '1.6rem', fontWeight: 600, color: '#fff', margin: '0.5rem 0 1rem', lineHeight: 1.25}}>
              {activeModalGuide.title}
            </h2>

            <p style={{color: '#A8B3C7', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem'}}>
              {activeModalGuide.overview}
            </p>

            <div style={{background: '#060F24', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1F2A44', marginBottom: '1.75rem'}}>
              <h3 style={{fontSize: '1rem', fontWeight: 600, color: '#fff', margin: '0 0 0.5rem'}}>Executive Summary</h3>
              <p style={{margin: 0, color: '#A8B3C7', fontSize: '0.85rem', lineHeight: '1.6'}}>
                {activeModalGuide.executiveSummary}
              </p>
            </div>

            <h3 style={{fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem'}}>Table of Contents</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', maxHeight: '12rem', overflowY: 'auto', paddingRight: '0.5rem'}}>
              {activeModalGuide.tableOfContents.map((chapter, idx) => (
                <div key={idx} style={{padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.375rem', fontSize: '0.8125rem', color: '#ffffff'}}>
                  {chapter}
                </div>
              ))}
            </div>

            {/* Instant Download Form */}
            <div style={{background: 'linear-gradient(135deg, rgba(48,108,231,0.1) 0%, rgba(16,25,47,0.9) 100%)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #306CE7'}}>
              {downloadSuccess ? (
                <div style={{textAlign: 'center', padding: '0.5rem 0'}}>
                  <div style={{fontSize: '1.75rem', marginBottom: '0.5rem'}}>📥</div>
                  <h4 style={{fontSize: '1.2rem', color: '#4ade80', margin: '0 0 0.35rem'}}>Download Initiated!</h4>
                  <p style={{color: '#A8B3C7', fontSize: '0.85rem', margin: 0}}>
                    We have dispatched the complete PDF package and companion source code assets to <strong>{downloadEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDownload}>
                  <h4 style={{fontSize: '1.1rem', fontWeight: 600, color: '#fff', margin: '0 0 0.5rem'}}>Download Instant Copy</h4>
                  <p style={{color: '#A8B3C7', fontSize: '0.8125rem', margin: '0 0 1rem'}}>
                    Receive the full unredacted PDF guide and companion assets directly in your inbox.
                  </p>

                  <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
                    <input
                      type="email"
                      required
                      placeholder="work.email@company.com"
                      value={downloadEmail}
                      onChange={(e) => setDownloadEmail(e.target.value)}
                      style={{
                        flex: '1 1 14rem',
                        padding: '0.7rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #1F2A44',
                        background: 'rgba(6,15,36,0.9)',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Your Role (e.g. CTO, Lead Dev)"
                      value={downloadRole}
                      onChange={(e) => setDownloadRole(e.target.value)}
                      style={{
                        flex: '1 1 12rem',
                        padding: '0.7rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #1F2A44',
                        background: 'rgba(6,15,36,0.9)',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />

                    <button
                      type="submit"
                      style={{
                        padding: '0.7rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: '#306CE7',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Download Now →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <HomeObservatory />
    </div>
  );
}
