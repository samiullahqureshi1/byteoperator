import {Link} from '~/lib/router-compat';

/**
 * Honest placeholder for resource hubs that have not launched yet
 * (podcast, webinars, guides, newsletter). It deliberately has no signup
 * form: /api/newsletter-subscribe does not store submissions yet, so a form
 * would confirm a subscription that never happens. Replace this with the
 * real content (and re-enable indexing and the sitemap entry) at launch.
 */
export function ComingSoonNotice({what}: {what: string}) {
  return (
    <section
      style={{
        marginTop: '1rem',
        padding: '3rem 2rem',
        borderRadius: '1.25rem',
        background: 'var(--ft-dark, #10192F)',
        border: '1px solid #1F2A44',
        textAlign: 'center',
      }}
    >
      <h2 style={{fontSize: '1.75rem', fontWeight: 600, color: '#fff', margin: '0 0 0.75rem'}}>
        Coming soon
      </h2>
      <p style={{color: '#A8B3C7', fontSize: '0.95rem', maxWidth: '36rem', margin: '0 auto 1.75rem', lineHeight: 1.6}}>
        {what} is not live yet. In the meantime, read our latest articles or talk
        to our team about your project.
      </p>
      <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap'}}>
        <Link
          to="/articles"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '50vw',
            background: '#306CE7',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          Read our articles
        </Link>
        <Link
          to="/contact"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '50vw',
            border: '1px solid #1F2A44',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          Talk to our team
        </Link>
      </div>
    </section>
  );
}
