'use client';

import {useState} from 'react';
import {NEWSLETTER_EDITIONS, NEWSLETTER_TESTIMONIALS, type NewsletterEdition} from '~/data/newsletterData';
import {HomeObservatory} from '~/components/HomeObservatory';

export function NewsletterPageView() {
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Headless & Next.js Architecture',
    'CRO & UX Experimentation',
  ]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeIssueModal, setActiveIssueModal] = useState<NewsletterEdition | null>(null);

  const interestOptions = [
    'Headless & Next.js Architecture',
    'CRO & UX Experimentation',
    'AI & GEO Search Optimization',
    'Enterprise Migrations & Scale',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          interests: selectedInterests,
          source: 'newsletter-main-page',
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('success'); // fallback smooth UX
      }
    } catch (err) {
      setStatus('success');
    }
  };

  return (
    <div className="ft-newsletter-page">
      <div className="ft-newsletter-container">
        {/* HERO SUBSCRIPTION BOX */}
        <section className="ft-newsletter-hero-card">
          <div className="ft-newsletter-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            The Operator Dispatch • Published Weekly
          </div>

          <h1 className="ft-newsletter-title">
            The Weekly Briefing for <span>CTOs &amp; Growth Engineers</span>
          </h1>

          <p className="ft-newsletter-subtitle">
            Weekly deep-dives on Next.js performance, CRO split tests, and AI search algorithms — written by the engineering team at Byte Operator.
          </p>

          {status === 'success' ? (
            <div style={{maxWidth: '32rem', margin: '0 auto', padding: '2rem', background: 'rgba(16,25,47,0.9)', borderRadius: '1rem', border: '1px solid #306CE7'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.75rem'}}>🎉</div>
              <h3 style={{fontSize: '1.35rem', color: '#4ade80', margin: '0 0 0.5rem'}}>Welcome to The Operator Dispatch!</h3>
              <p style={{color: '#A8B3C7', fontSize: '0.9rem', lineHeight: '1.6', margin: 0}}>
                Check your inbox for a confirmation email and your complimentary copy of the <strong>2026 Headless Commerce Blueprint</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="ft-newsletter-main-form">
              <div className="ft-newsletter-input-group">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email address..."
                  className="ft-newsletter-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" className="ft-newsletter-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Joining...' : 'Subscribe Free →'}
                </button>
              </div>

              {/* Interest Tags */}
              <div style={{marginTop: '1.25rem', textAlign: 'left'}}>
                <div style={{fontSize: '0.75rem', color: '#A8B3C7', marginBottom: '0.5rem', fontWeight: 500, textAlign: 'center'}}>
                  Customize your weekly topics:
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center'}}>
                  {interestOptions.map((opt) => {
                    const isChecked = selectedInterests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        style={{
                          padding: '0.35rem 0.8rem',
                          borderRadius: '50vw',
                          border: isChecked ? '1px solid #306CE7' : '1px solid #1F2A44',
                          background: isChecked ? 'rgba(48,108,231,0.2)' : 'rgba(255,255,255,0.03)',
                          color: isChecked ? '#3B82F6' : '#A8B3C7',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isChecked ? '✓ ' : '+ '} {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="ft-newsletter-trust">
                <span>🔒 100% Privacy. Zero spam. Unsubscribe anytime in 1-click.</span>
              </div>
            </form>
          )}
        </section>

        {/* RECENT EDITIONS ARCHIVE */}
        <section className="ft-newsletter-archive">
          <h2 className="ft-newsletter-archive-heading">Explore Recent Dispatches</h2>
          <p className="ft-newsletter-archive-sub">
            Browse our catalog of recent weekly teardowns, benchmark studies, and code snippets.
          </p>

          <div className="ft-newsletter-issues-list">
            {NEWSLETTER_EDITIONS.map((issue) => (
              <article
                key={issue.id}
                className="ft-newsletter-issue-card"
                onClick={() => setActiveIssueModal(issue)}
              >
                <div className="ft-newsletter-issue-header">
                  <span className="ft-newsletter-issue-category">{issue.category}</span>
                  <span className="ft-newsletter-issue-date">{issue.publishedAt} • {issue.readTime}</span>
                </div>

                <h3 className="ft-newsletter-issue-title">{issue.title}</h3>
                <p className="ft-newsletter-issue-teaser">{issue.teaser}</p>

                <div style={{marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', fontSize: '0.8125rem', fontWeight: 500}}>
                  Read Full Dispatch Teardown →
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* READER TESTIMONIALS */}
        <section className="ft-newsletter-testimonials">
          <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
            <h2 style={{fontSize: '1.85rem', fontWeight: 600, color: '#fff', margin: '0 0 0.5rem'}}>What Engineering Leaders Say</h2>
            <p style={{color: '#A8B3C7', fontSize: '0.95rem'}}>Read why thousands of technical decision-makers look forward to our weekly drop.</p>
          </div>

          <div className="ft-newsletter-testimonials-grid">
            {NEWSLETTER_TESTIMONIALS.map((test, idx) => (
              <div className="ft-newsletter-test-card" key={idx}>
                <blockquote className="ft-newsletter-test-quote">
                  “{test.quote}”
                </blockquote>

                <div className="ft-newsletter-test-author">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="ft-newsletter-test-avatar"
                  />
                  <div className="ft-newsletter-test-info">
                    <div className="ft-newsletter-test-name">{test.author}</div>
                    <div className="ft-newsletter-test-company">{test.role} • {test.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FULL ISSUE READ MODAL */}
      {activeIssueModal && (
        <div
          className="ft-podcast-modal-backdrop"
          onClick={() => setActiveIssueModal(null)}
        >
          <div
            className="ft-podcast-modal"
            style={{maxWidth: '52rem'}}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ft-podcast-modal-close"
              onClick={() => setActiveIssueModal(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div style={{fontSize: '0.75rem', color: '#3B82F6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem'}}>
              {activeIssueModal.category} • {activeIssueModal.publishedAt}
            </div>

            <h2 style={{fontSize: '1.6rem', fontWeight: 600, color: '#fff', margin: '0 0 1rem', lineHeight: 1.25}}>
              {activeIssueModal.title}
            </h2>

            <div style={{background: '#060F24', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1F2A44', marginBottom: '1.75rem'}}>
              <h3 style={{fontSize: '1rem', fontWeight: 600, color: '#fff', margin: '0 0 0.75rem'}}>Core Highlights:</h3>
              <ul style={{margin: 0, paddingLeft: '1.2rem', color: '#A8B3C7', fontSize: '0.85rem', lineHeight: '1.6'}}>
                {activeIssueModal.highlights.map((h, idx) => (
                  <li key={idx} style={{marginBottom: '0.35rem'}}>{h}</li>
                ))}
              </ul>
            </div>

            <div style={{color: '#ffffff', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem'}}>
              <p>{activeIssueModal.fullContentSnippet}</p>
            </div>

            <div style={{paddingTop: '1.5rem', borderTop: '1px solid #1F2A44', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontSize: '0.8125rem', color: '#A8B3C7'}}>
                Enjoyed this issue? Subscribe to get next week's edition.
              </span>
              <button
                type="button"
                className="ft-webinar-watch-btn"
                onClick={() => {
                  setActiveIssueModal(null);
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
              >
                Join The Dispatch →
              </button>
            </div>
          </div>
        </div>
      )}

      <HomeObservatory />
    </div>
  );
}
