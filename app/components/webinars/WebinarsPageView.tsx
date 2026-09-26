'use client';

import {useState} from 'react';
import {WEBINARS_DATA, WEBINAR_CATEGORIES, type WebinarItem} from '~/data/webinarsData';
import {HomeObservatory} from '~/components/HomeObservatory';

export function WebinarsPageView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sessions');
  const [activeModalWebinar, setActiveModalWebinar] = useState<WebinarItem | null>(null);

  // Live Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regQuestion, setRegQuestion] = useState('');
  const [regSubmitted, setRegSubmitted] = useState(false);

  const filteredWebinars =
    selectedCategory === 'All Sessions'
      ? WEBINARS_DATA
      : WEBINARS_DATA.filter((w) => w.category === selectedCategory);

  const upcomingLive = WEBINARS_DATA.find((w) => w.status === 'upcoming') || WEBINARS_DATA[0];

  const handleRegisterLive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regName) return;
    try {
      await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          company: regCompany,
          question: regQuestion,
          source: 'webinar-live-registration',
        }),
      });
      setRegSubmitted(true);
    } catch (err) {
      setRegSubmitted(true);
    }
  };

  return (
    <div className="ft-webinars-page">
      <div className="ft-webinars-container">
        {/* HERO */}
        <section className="ft-webinars-hero">
          <div className="ft-webinars-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            Byte Operator Masterclasses & Teardowns
          </div>

          <h1 className="ft-webinars-title">
            Live Technical Teardowns &amp; <span>Architecture Masterclasses</span>
          </h1>

          <p className="ft-webinars-subtitle">
            Watch real-world code refactors, Core Web Vitals audits, AI search integrations, and conversion rate optimization teardowns led by elite software engineers.
          </p>
        </section>

        {/* FEATURED UPCOMING LIVE SESSION */}
        <section className="ft-webinar-featured-live">
          <div className="ft-webinar-live-badge">
            <span className="ft-webinar-live-dot" />
            Upcoming Live Technical Masterclass
          </div>

          <div className="ft-webinar-live-grid">
            <div>
              <h2 className="ft-webinar-live-title">{upcomingLive.title}</h2>
              <p className="ft-webinar-live-tagline">{upcomingLive.tagline}</p>

              <div className="ft-webinar-live-meta">
                <div className="ft-webinar-meta-item">
                  <span className="ft-webinar-meta-label">Date</span>
                  <span className="ft-webinar-meta-val">{upcomingLive.date}</span>
                </div>
                <div className="ft-webinar-meta-item">
                  <span className="ft-webinar-meta-label">Time</span>
                  <span className="ft-webinar-meta-val">{upcomingLive.time}</span>
                </div>
                <div className="ft-webinar-meta-item">
                  <span className="ft-webinar-meta-label">Duration</span>
                  <span className="ft-webinar-meta-val">{upcomingLive.duration}</span>
                </div>
                <div className="ft-webinar-meta-item">
                  <span className="ft-webinar-meta-label">Confirmed Attendees</span>
                  <span className="ft-webinar-meta-val">{upcomingLive.attendeesCount}+ Registrations</span>
                </div>
              </div>

              <div style={{marginBottom: '1.75rem'}}>
                <div style={{fontSize: '0.875rem', fontWeight: 600, color: '#fff', marginBottom: '0.65rem'}}>What You Will Learn:</div>
                <ul style={{margin: 0, paddingLeft: '1.2rem', color: '#A8B3C7', fontSize: '0.85rem', lineHeight: '1.6'}}>
                  {upcomingLive.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} style={{marginBottom: '0.35rem'}}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                {upcomingLive.speakers.map((s, idx) => (
                  <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
                    <img
                      src={s.avatar}
                      alt={s.name}
                      style={{width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', border: '1px solid #306CE7'}}
                    />
                    <div>
                      <div style={{fontSize: '0.8125rem', fontWeight: 600, color: '#fff'}}>{s.name}</div>
                      <div style={{fontSize: '0.75rem', color: '#A8B3C7'}}>{s.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Box */}
            <div className="ft-webinar-form-card">
              {regSubmitted ? (
                <div style={{textAlign: 'center', padding: '1.5rem 0'}}>
                  <div style={{fontSize: '2rem', marginBottom: '0.75rem'}}>🎉</div>
                  <h3 style={{fontSize: '1.35rem', color: '#4ade80', marginBottom: '0.5rem'}}>You Are Registered!</h3>
                  <p style={{color: '#A8B3C7', fontSize: '0.875rem', lineHeight: '1.6'}}>
                    We sent a calendar invite and direct private live-stream link to <strong>{regEmail}</strong>.
                  </p>
                  <div style={{marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(59,130,246,0.1)', borderRadius: '0.5rem', border: '1px solid rgba(59,130,246,0.3)', fontSize: '0.8125rem', color: '#3B82F6'}}>
                    📅 Add to Google Calendar / Outlook invite sent.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterLive}>
                  <h3>Reserve Your Free Seat</h3>
                  <p>Live session includes Q&A and instant storefront code diagnostics.</p>

                  <div className="ft-webinar-form-group">
                    <label className="ft-webinar-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="ft-webinar-input"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                    />
                  </div>

                  <div className="ft-webinar-form-group">
                    <label className="ft-webinar-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="ft-webinar-input"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>

                  <div className="ft-webinar-form-group">
                    <label className="ft-webinar-label">Store / Website URL</label>
                    <input
                      type="text"
                      placeholder="yourbrand.com"
                      className="ft-webinar-input"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                    />
                  </div>

                  <div className="ft-webinar-form-group">
                    <label className="ft-webinar-label">Specific Question / Audit Request</label>
                    <input
                      type="text"
                      placeholder="e.g. How do we fix high INP on mobile cart?"
                      className="ft-webinar-input"
                      value={regQuestion}
                      onChange={(e) => setRegQuestion(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="ft-webinar-submit-btn">
                    Register for Free Masterclass →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* CATEGORY FILTERS */}
        <div className="ft-webinars-filter-nav">
          {WEBINAR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ft-webinars-filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ON-DEMAND WEBINAR CARDS GRID */}
        <div className="ft-webinars-grid">
          {filteredWebinars.map((webinar) => (
            <article className="ft-webinar-card" key={webinar.id}>
              <div className="ft-webinar-card-thumbnail">
                <img
                  src={webinar.thumbnail}
                  alt={webinar.title}
                  loading="lazy"
                />
                <div className="ft-webinar-card-duration">
                  {webinar.status === 'upcoming' ? 'LIVE' : webinar.duration}
                </div>
              </div>

              <div className="ft-webinar-card-body">
                <div className="ft-webinar-card-category">{webinar.category}</div>
                <h3 className="ft-webinar-card-title">{webinar.title}</h3>
                <p className="ft-webinar-card-tagline">{webinar.tagline}</p>

                <div className="ft-webinar-card-footer">
                  <div className="ft-webinar-card-speaker">
                    <img
                      src={webinar.speakers[0]?.avatar}
                      alt={webinar.speakers[0]?.name}
                      className="ft-webinar-card-speaker-img"
                    />
                    <span>{webinar.speakers[0]?.name}</span>
                  </div>

                  <button
                    type="button"
                    className="ft-webinar-watch-btn"
                    onClick={() => setActiveModalWebinar(webinar)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {webinar.status === 'upcoming' ? 'View Details' : 'Watch Session'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* WEBINAR VIDEO & DETAILS MODAL */}
      {activeModalWebinar && (
        <div
          className="ft-podcast-modal-backdrop"
          onClick={() => setActiveModalWebinar(null)}
        >
          <div
            className="ft-podcast-modal"
            style={{maxWidth: '56rem'}}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ft-podcast-modal-close"
              onClick={() => setActiveModalWebinar(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div style={{fontSize: '0.75rem', color: '#3B82F6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem'}}>
              {activeModalWebinar.category} • {activeModalWebinar.duration}
            </div>

            <h2 style={{fontSize: '1.6rem', fontWeight: 600, color: '#fff', margin: '0 0 1rem', lineHeight: 1.25}}>
              {activeModalWebinar.title}
            </h2>

            {/* Video Player or Placeholder */}
            {activeModalWebinar.videoEmbedUrl ? (
              <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.75rem', marginBottom: '1.5rem', background: '#000'}}>
                <iframe
                  src={activeModalWebinar.videoEmbedUrl}
                  title={activeModalWebinar.title}
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={{background: '#060F24', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid #1F2A44'}}>
                <div style={{fontSize: '1.1rem', color: '#fff', fontWeight: 600}}>Live Interactive Broadcast</div>
                <div style={{color: '#A8B3C7', fontSize: '0.85rem', marginTop: '0.5rem'}}>{activeModalWebinar.date} at {activeModalWebinar.time}</div>
              </div>
            )}

            <p style={{color: '#A8B3C7', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem'}}>
              {activeModalWebinar.overview}
            </p>

            <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem'}}>Agenda & Timestamps</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem'}}>
              {activeModalWebinar.agenda.map((item, idx) => (
                <div key={idx} style={{padding: '0.75rem 1rem', background: '#060F24', borderRadius: '0.5rem', border: '1px solid #1F2A44'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.2rem'}}>
                    <span style={{fontFamily: 'monospace', color: '#3B82F6', fontSize: '0.8rem', fontWeight: 600}}>{item.timestamp}</span>
                    <strong style={{color: '#fff', fontSize: '0.875rem'}}>{item.title}</strong>
                  </div>
                  <div style={{color: '#A8B3C7', fontSize: '0.8125rem'}}>{item.description}</div>
                </div>
              ))}
            </div>

            {activeModalWebinar.resources && activeModalWebinar.resources.length > 0 && (
              <div>
                <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem'}}>Downloadable Session Resources</h3>
                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                  {activeModalWebinar.resources.map((res, idx) => (
                    <div
                      key={idx}
                      style={{display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(48,108,231,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#fff', fontSize: '0.8125rem'}}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                      </svg>
                      <strong>{res.title}</strong> ({res.type} • {res.size})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <HomeObservatory />
    </div>
  );
}
