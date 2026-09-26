'use client';

import {useState, useRef, useEffect} from 'react';
import {PODCAST_EPISODES, PODCAST_CATEGORIES, type PodcastEpisode} from '~/data/podcastsData';
import {HomeObservatory} from '~/components/HomeObservatory';

export function PodcastPageView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Episodes');
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCAST_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(2880); // simulated duration in seconds
  const [modalEpisode, setModalEpisode] = useState<PodcastEpisode | null>(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle');

  // Filter episodes
  const filteredEpisodes =
    selectedCategory === 'All Episodes'
      ? PODCAST_EPISODES
      : PODCAST_EPISODES.filter((ep) => ep.category === selectedCategory);

  // Play/pause simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayEpisode = (episode: PodcastEpisode) => {
    if (activeEpisode.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveEpisode(episode);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    try {
      await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: subscribeEmail, source: 'podcast-page'}),
      });
      setSubscribeStatus('success');
      setSubscribeEmail('');
    } catch (err) {
      setSubscribeStatus('success');
    }
  };

  const featured = PODCAST_EPISODES.find((e) => e.featured) || PODCAST_EPISODES[0];

  return (
    <div className="ft-podcast-page">
      <div className="ft-podcast-bg-glow" />

      <div className="ft-podcast-container">
        {/* HERO */}
        <section className="ft-podcast-hero">
          <div className="ft-podcast-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm5 7a1 1 0 0 0-2 0 3 3 0 0 1-6 0 1 1 0 0 0-2 0 5 5 0 0 0 4 4.9V16h-2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.1A5 5 0 0 0 17 9z" />
            </svg>
            The Byte Operator Audio Experience
          </div>

          <h1 className="ft-podcast-title">
            Architecting Scale: <span>The CTO & Ecommerce Podcast</span>
          </h1>

          <p className="ft-podcast-subtitle">
            Unfiltered engineering conversations, architecture teardowns, and growth masterclasses with top CTOs, AI researchers, and high-growth ecommerce founders.
          </p>

          <div className="ft-podcast-platform-badges">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-podcast-platform-badge"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </a>

            <a
              href="https://podcasts.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-podcast-platform-badge"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FA57C1">
                <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm0 3.6c4.639 0 8.4 3.761 8.4 8.4 0 4.639-3.761 8.4-8.4 8.4-4.639 0-8.4-3.761-8.4-8.4 0-4.639 3.761-8.4 8.4-8.4zm0 2.4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
              </svg>
              Apple Podcasts
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-podcast-platform-badge"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube Video Series
            </a>
          </div>
        </section>

        {/* FEATURED EPISODE & INTERACTIVE PLAYER */}
        <section className="ft-podcast-featured">
          <div className="ft-podcast-featured-tag">Episode #{featured.episodeNumber} • Featured Masterclass</div>

          <div className="ft-podcast-featured-grid">
            <div>
              <h2 className="ft-podcast-featured-title">{featured.title}</h2>
              <p className="ft-podcast-featured-desc">{featured.summary}</p>

              {/* Player UI */}
              <div className="ft-podcast-player-box">
                <div className="ft-podcast-player-controls">
                  <button
                    type="button"
                    className="ft-podcast-play-btn"
                    onClick={() => handlePlayEpisode(featured)}
                    aria-label={isPlaying && activeEpisode.id === featured.id ? 'Pause Episode' : 'Play Episode'}
                  >
                    {isPlaying && activeEpisode.id === featured.id ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="ft-podcast-scrubber">
                    <div
                      className="ft-podcast-track"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percentage = clickX / rect.width;
                        setCurrentTime(percentage * duration);
                      }}
                    >
                      <div
                        className="ft-podcast-progress"
                        style={{
                          width: `${activeEpisode.id === featured.id ? (currentTime / duration) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <div className="ft-podcast-time">
                      <span>{activeEpisode.id === featured.id ? formatTime(currentTime) : '0:00'}</span>
                      <span>{featured.duration}</span>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center'}}>
                  <button
                    type="button"
                    className="ft-podcast-listen-btn"
                    onClick={() => setModalEpisode(featured)}
                  >
                    View Show Notes & Transcript →
                  </button>
                </div>
              </div>
            </div>

            {/* Guest & Takeaways Box */}
            <div style={{background: 'rgba(6, 15, 36, 0.75)', padding: '1.75rem', borderRadius: '1rem', border: '0.0625rem solid #1F2A44'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem'}}>
                <img
                  src={featured.guest.avatar}
                  alt={featured.guest.name}
                  style={{width: '3.5rem', height: '3.5rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid #306CE7'}}
                />
                <div>
                  <div style={{fontWeight: 600, fontSize: '1.05rem', color: '#fff'}}>{featured.guest.name}</div>
                  <div style={{color: '#A8B3C7', fontSize: '0.8125rem'}}>{featured.guest.role}</div>
                  <div style={{color: '#3B82F6', fontSize: '0.75rem', fontWeight: 500}}>{featured.guest.company}</div>
                </div>
              </div>

              <div style={{fontSize: '0.85rem', color: '#fff', fontWeight: 600, marginBottom: '0.75rem'}}>Key Takeaways:</div>
              <ul style={{margin: 0, paddingLeft: '1.2rem', color: '#A8B3C7', fontSize: '0.8125rem', lineHeight: '1.6'}}>
                {featured.takeaways.map((t, idx) => (
                  <li key={idx} style={{marginBottom: '0.4rem'}}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS */}
        <div className="ft-podcast-filter-nav">
          {PODCAST_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ft-podcast-filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EPISODES GRID */}
        <div className="ft-podcast-grid">
          {filteredEpisodes.map((ep) => (
            <article className="ft-podcast-card" key={ep.id}>
              <div className="ft-podcast-card-meta">
                <span className="ft-podcast-card-category">{ep.category}</span>
                <span>Episode #{ep.episodeNumber} • {ep.duration}</span>
              </div>

              <h3 className="ft-podcast-card-title">{ep.title}</h3>
              <p className="ft-podcast-card-desc">{ep.description}</p>

              <div className="ft-podcast-card-guest">
                <img
                  src={ep.guest.avatar}
                  alt={ep.guest.name}
                  className="ft-podcast-card-avatar"
                />
                <div className="ft-podcast-card-guest-info">
                  <div className="ft-podcast-card-guest-name">{ep.guest.name}</div>
                  <div className="ft-podcast-card-guest-role">{ep.guest.role} • {ep.guest.company}</div>
                </div>
              </div>

              <div className="ft-podcast-card-footer">
                <button
                  type="button"
                  className="ft-podcast-listen-btn"
                  onClick={() => handlePlayEpisode(ep)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    {isPlaying && activeEpisode.id === ep.id ? (
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                  {isPlaying && activeEpisode.id === ep.id ? 'Pause' : 'Listen'}
                </button>

                <button
                  type="button"
                  style={{background: 'none', border: 'none', color: '#3B82F6', fontSize: '0.8125rem', cursor: 'pointer', textDecoration: 'underline'}}
                  onClick={() => setModalEpisode(ep)}
                >
                  Show Notes
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* SUBSCRIBE TO PODCAST BOX */}
        <section style={{marginTop: '5rem', padding: '3rem 2rem', borderRadius: '1.25rem', background: 'var(--ft-dark, #10192F)', border: '1px solid #1F2A44', textAlign: 'center'}}>
          <h2 style={{fontSize: '1.75rem', fontWeight: 600, color: '#fff', margin: '0 0 0.75rem'}}>Never Miss a High-Impact Episode</h2>
          <p style={{color: '#A8B3C7', fontSize: '0.95rem', maxWidth: '36rem', margin: '0 auto 1.75rem'}}>
            Get notified when new engineering deep-dives drop. We also send complete episode transcripts, architecture diagrams, and source code boilerplates.
          </p>

          {subscribeStatus === 'success' ? (
            <div style={{color: '#4ade80', fontWeight: 500, fontSize: '0.95rem'}}>
              ✓ You are subscribed! We will notify you when the next episode drops.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{display: 'flex', maxWidth: '28rem', margin: '0 auto', gap: 0}}>
              <input
                type="email"
                required
                placeholder="Enter your work email..."
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.25rem',
                  borderRadius: '50vw 0 0 50vw',
                  border: '1px solid #1F2A44',
                  borderRight: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.875rem',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0 50vw 50vw 0',
                  border: '1px solid #306CE7',
                  borderLeft: 'none',
                  background: '#306CE7',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>

      {/* SHOW NOTES / TRANSCRIPT MODAL */}
      {modalEpisode && (
        <div className="ft-podcast-modal-backdrop" onClick={() => setModalEpisode(null)}>
          <div className="ft-podcast-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ft-podcast-modal-close"
              onClick={() => setModalEpisode(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div style={{fontSize: '0.75rem', color: '#3B82F6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem'}}>
              Episode #{modalEpisode.episodeNumber} • {modalEpisode.category}
            </div>

            <h2 style={{fontSize: '1.5rem', fontWeight: 600, color: '#fff', margin: '0 0 1rem', lineHeight: 1.3}}>
              {modalEpisode.title}
            </h2>

            <p style={{color: '#A8B3C7', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem'}}>
              {modalEpisode.summary}
            </p>

            <div style={{marginBottom: '1.75rem', padding: '1rem', borderRadius: '0.75rem', background: '#060F24', border: '1px solid #1F2A44'}}>
              <div style={{fontWeight: 600, color: '#fff', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Episode Quote:</div>
              <blockquote style={{margin: 0, color: '#3B82F6', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.5}}>
                {modalEpisode.transcriptExcerpt}
              </blockquote>
            </div>

            <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem'}}>Key Takeaways</h3>
            <ul style={{color: '#A8B3C7', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.75rem'}}>
              {modalEpisode.takeaways.map((item, idx) => (
                <li key={idx} style={{marginBottom: '0.4rem'}}>{item}</li>
              ))}
            </ul>

            <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem'}}>Topics Covered</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem'}}>
              {modalEpisode.topics.map((t, idx) => (
                <span
                  key={idx}
                  style={{padding: '0.3rem 0.75rem', borderRadius: '50vw', background: 'rgba(48,108,231,0.15)', color: '#3B82F6', fontSize: '0.75rem', fontWeight: 500}}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <a
                href={modalEpisode.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-podcast-listen-btn"
              >
                Listen on Spotify
              </a>
              <a
                href={modalEpisode.applePodcastsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-podcast-listen-btn"
              >
                Listen on Apple Podcasts
              </a>
            </div>
          </div>
        </div>
      )}

      <HomeObservatory />
    </div>
  );
}
