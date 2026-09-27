import type {Metadata} from 'next';
import {Link} from '~/lib/router-compat';

// Overrides the root layout's `index, follow` so a 404 carries one
// consistent directive, and replaces the homepage title/description.
export const metadata: Metadata = {
  title: 'Page Not Found | Byte Operator',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div style={{minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px'}}>
      <h1 style={{fontSize: '72px', fontWeight: 800, color: '#fff', margin: 0}}>404</h1>
      <h2 style={{fontSize: '24px', fontWeight: 600, color: '#ccc', marginTop: '12px', marginBottom: '16px'}}>
        Page Not Found
      </h2>
      <p style={{color: '#888', maxWidth: '440px', marginBottom: '32px'}}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        style={{
          padding: '14px 28px',
          background: '#fff',
          color: '#000',
          borderRadius: '100px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '15px',
        }}
      >
        Return to Homepage
      </Link>
    </div>
  );
}
