import type {Metadata} from 'next';
import {Link} from '~/lib/router-compat';

export const metadata: Metadata = {
  title: 'Company Policies | Byte Operator',
  description: 'Byte Operator company terms, privacy policy, refund policy, and service level agreements.',
  alternates: {
    canonical: 'https://byteoperator.com/policies',
  },
};

const POLICIES = [
  {handle: 'privacy-policy', title: 'Privacy Policy', description: 'How we handle and protect your client and visitor data.'},
  {handle: 'terms-of-service', title: 'Terms of Service', description: 'Terms and conditions governing our agency services and website.'},
  {handle: 'refund-policy', title: 'Refund Policy', description: 'Policies regarding project retainers, milestone payments, and refunds.'},
  {handle: 'subscription-policy', title: 'Subscription & Cancellation Policy', description: 'Terms governing ongoing monthly retainers and support hours.'},
];

export default function PoliciesIndexPage() {
  return (
    <div style={{maxWidth: '900px', margin: '0 auto', padding: '120px 24px 80px'}}>
      <h1 style={{fontSize: '44px', fontWeight: 700, marginBottom: '20px', color: '#fff'}}>Policies</h1>
      <p style={{fontSize: '18px', color: '#aaa', marginBottom: '48px'}}>
        Transparency is central to how we partner with brands. Review our formal policies below.
      </p>

      <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        {POLICIES.map((p) => (
          <Link
            key={p.handle}
            href={`/policies/${p.handle}`}
            style={{
              padding: '24px',
              borderRadius: '8px',
              background: '#161616',
              border: '1px solid #282828',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease',
            }}
          >
            <h2 style={{fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '8px'}}>
              {p.title} →
            </h2>
            <p style={{fontSize: '15px', color: '#888', margin: 0}}>{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
