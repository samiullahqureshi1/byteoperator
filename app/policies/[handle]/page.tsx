import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Link} from '~/lib/router-compat';

interface Props {
  params: {
    handle: string;
  };
}

const POLICY_DATA: Record<string, {title: string; body: string}> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    body: `
      <h2>1. Introduction</h2>
      <p>Byte Operator ("we", "our", or "us") respects your privacy and is committed to protecting the personal data of our website visitors and clients.</p>
      <h2>2. Information We Collect</h2>
      <p>We may collect personal identification information including name, email address, company name, phone number, and project details submitted through our contact and audit forms.</p>
      <h2>3. How We Use Your Data</h2>
      <p>We use your information exclusively to respond to inquiries, provide requested Software engineering and consulting services, and deliver marketing insights if subscribed.</p>
      <h2>4. Data Security</h2>
      <p>We implement industry-standard security measures and encryption to maintain the safety of your personal information.</p>
    `,
  },
  'terms-of-service': {
    title: 'Terms of Service',
    body: `
      <h2>1. Agreement to Terms</h2>
      <p>By accessing or using the services provided by Byte Operator, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      <h2>2. Intellectual Property</h2>
      <p>All custom themes, code, designs, and deliverables produced under client agreements are transferred to the client upon full payment, unless explicitly stated otherwise in the project statement of work.</p>
      <h2>3. Limitation of Liability</h2>
      <p>In no event shall Byte Operator be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services or website.</p>
    `,
  },
  'refund-policy': {
    title: 'Refund Policy',
    body: `
      <h2>1. Project Engagements</h2>
      <p>Retainers and deposits for bespoke Software design, development, and consulting are allocated toward dedicated engineering sprints and are non-refundable once work has commenced.</p>
      <h2>2. Satisfaction Guarantee</h2>
      <p>We work collaboratively through milestone reviews to ensure every deliverable meets our agreed-upon technical specifications and quality standards.</p>
    `,
  },
  'subscription-policy': {
    title: 'Subscription & Retainer Policy',
    body: `
      <h2>1. Monthly Retainers</h2>
      <p>Ongoing development and CRO support retainers are billed monthly in advance. Hours are scheduled and delivered within the active billing cycle.</p>
      <h2>2. Cancellation Notice</h2>
      <p>Retainer agreements may be modified or cancelled with a 30-day written notice prior to the next billing cycle.</p>
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(POLICY_DATA).map((handle) => ({handle}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const policy = POLICY_DATA[params.handle];
  return {
    title: policy ? `${policy.title} | Byte Operator` : 'Policy | Byte Operator',
  };
}

export default function PolicyDetailPage({params}: Props) {
  const policy = POLICY_DATA[params.handle];

  if (!policy) {
    notFound();
  }

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px', color: '#eee', lineHeight: 1.8}}>
      <Link href="/policies" style={{color: '#888', textDecoration: 'none', display: 'inline-block', marginBottom: '24px', fontSize: '14px'}}>
        ← All Policies
      </Link>
      <h1 style={{fontSize: '40px', fontWeight: 700, marginBottom: '32px', color: '#fff'}}>{policy.title}</h1>
      <div
        className="policy-content"
        dangerouslySetInnerHTML={{__html: policy.body}}
        style={{fontSize: '16px'}}
      />
    </div>
  );
}
