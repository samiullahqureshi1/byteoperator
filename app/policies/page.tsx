import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {Link} from '~/lib/router-compat';

export const metadata: Metadata = pageMetadata({
  title: 'Company Policies & Legal Agreements | Byte Operator',
  description:
    'Review Byte Operator official company policies, including our Privacy Policy, Terms of Service, Refund & Payment Policy, and Subscription & Cancellation terms.',
  path: '/policies',
});

const POLICIES = [
  {
    handle: 'privacy-policy',
    title: 'Privacy Policy',
    hint: 'Data protection, client confidentiality, GDPR compliance, and telemetry security.',
    tag: 'Legal & Compliance',
  },
  {
    handle: 'terms-of-service',
    title: 'Terms of Service',
    hint: 'Contract terms governing software engineering, intellectual property, and deliverables.',
    tag: 'Service Agreements',
  },
  {
    handle: 'refund-policy',
    title: 'Refund & Payment Policy',
    hint: 'Milestone schedules, project sprint payments, acceptance criteria, and refund conditions.',
    tag: 'Billing & Milestones',
  },
  {
    handle: 'subscription-policy',
    title: 'Subscription & Cancellation Policy',
    hint: 'Monthly engineering retainers, SLA hours, rollover policies, and cancellation notice terms.',
    tag: 'Retainers & SLA',
  },
];

export default function PoliciesIndexPage() {
  return (
    <main className="ft-policy-page">
      <section className="ft-policy-hero">
        <div className="ft-policy-hero__inner">
          <p className="ft-policy-hero__eyebrow">Trust &amp; Transparency</p>
          <h1 className="ft-policy-hero__title">Company Policies &amp; Agreements</h1>
          <p className="ft-policy-hero__lede">
            We hold ourselves to the highest standards of technical integrity and commercial clarity. Review the terms, data protections, and operational policies governing Byte Operator client partnerships.
          </p>
        </div>
      </section>

      <section className="ft-policy-index">
        <div className="ft-policy-index__grid">
          {POLICIES.map((p) => (
            <Link
              key={p.handle}
              href={`/policies/${p.handle}`}
              className="ft-policy-card"
            >
              <div className="ft-policy-card__text">
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#306CE7',
                    marginBottom: '0.35rem',
                  }}
                >
                  {p.tag}
                </span>
                <span className="ft-policy-card__title">{p.title}</span>
                <span className="ft-policy-card__hint">{p.hint}</span>
              </div>
              <span className="ft-policy-card__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
