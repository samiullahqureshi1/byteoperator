import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {notFound} from 'next/navigation';
import {Link} from '~/lib/router-compat';

interface Props {
  params: {
    handle: string;
  };
}

interface PolicyDocument {
  title: string;
  category: string;
  lastUpdated: string;
  description: string;
  body: string;
}

const POLICY_DATA: Record<string, PolicyDocument> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    category: 'Legal & Compliance',
    lastUpdated: 'September 2026',
    description: 'How Byte Operator collects, processes, and safeguards client and visitor data in compliance with global standards.',
    body: `
      <h2>1. Introduction &amp; Commitment</h2>
      <p>
        Byte Operator ("we", "our", or "us") is dedicated to safeguarding the privacy and security of our clients, prospective partners, and website visitors. This Privacy Policy details the types of information we collect, the lawful purposes for which we use it, how we protect your information, and your individual rights under the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and applicable global data protection frameworks.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We collect information you provide directly through our digital channels as well as data gathered automatically during your interactions with our website:</p>
      <ul>
        <li><strong>Direct Inquiries &amp; Consultation Requests:</strong> Full name, corporate email address, telephone number, company name, project budget ranges, services of interest, and project technical details submitted via our contact forms.</li>
        <li><strong>AI Visibility Audits:</strong> Store URLs, domain metadata, and contact email addresses provided to generate comprehensive platform audits.</li>
        <li><strong>Technical &amp; Log Telemetry:</strong> IP addresses, browser specifications, operating system parameters, referring URLs, device information, and interaction metrics gathered through server access logs.</li>
        <li><strong>Client Project Assets:</strong> Source code repositories, architectural diagrams, API keys, and staging environment credentials shared during formal client engineering engagements under non-disclosure agreements.</li>
      </ul>

      <h2>3. Lawful Basis &amp; How We Use Your Information</h2>
      <p>We process your data strictly under legitimate business interests, contractual necessity, and explicit consent:</p>
      <ul>
        <li>To review, evaluate, and respond to your technical inquiries and consultation requests.</li>
        <li>To deliver agreed-upon software engineering, ecommerce development, and AI automation services as outlined in formal Statements of Work.</li>
        <li>To generate and deliver requested AI visibility and performance audit reports.</li>
        <li>To monitor, secure, and optimize the performance, uptime, and user experience of our digital platforms.</li>
        <li>To distribute relevant engineering insights, case studies, and industry updates when you explicitly subscribe to our publications.</li>
      </ul>

      <h2>4. Data Protection, Security &amp; Infrastructure</h2>
      <p>
        We enforce rigorous technical and organizational controls to protect client information from unauthorized access, loss, or alteration. All web communications are encrypted via TLS 1.3. Cloud databases utilize AES-256 encryption at rest. Internal access to client codebases and project telemetry is strictly limited on a need-to-know basis and protected by multi-factor authentication.
      </p>

      <h2>5. Third-Party Service Providers</h2>
      <p>We collaborate with trusted third-party technology providers to manage our infrastructure and service delivery:</p>
      <ul>
        <li><strong>Email &amp; Communication:</strong> Resend for automated transactional notifications and lead dispatch.</li>
        <li><strong>Cloud Hosting &amp; CDN:</strong> Cloudflare, AWS, and Vercel for DNS, DDoS protection, edge caching, and serverless execution.</li>
        <li><strong>Database &amp; Analytics:</strong> Supabase and PostgreSQL for secure, structured data storage.</li>
      </ul>
      <p>We do not sell, rent, or commercialize your personal data to third parties under any circumstances.</p>

      <h2>6. Cookies &amp; Tracking Technologies</h2>
      <p>
        Our website uses essential functional cookies and privacy-friendly telemetry to analyze aggregate traffic patterns and ensure site stability. You may configure your browser settings to decline non-essential cookies without impeding your ability to navigate the site.
      </p>

      <h2>7. Data Retention &amp; Disposal</h2>
      <p>
        We retain personal data only as long as necessary to fulfill the purposes outlined in this policy or to comply with statutory legal and accounting obligations. Upon client request or termination of engagement, project credentials and proprietary assets are purged or returned in accordance with contractual terms.
      </p>

      <h2>8. Your Privacy Rights</h2>
      <p>Under applicable international privacy laws, you possess the right to:</p>
      <ul>
        <li>Request access to the personal data we hold about you.</li>
        <li>Request correction of inaccurate or incomplete personal records.</li>
        <li>Request the permanent erasure of your personal data ("right to be forgotten").</li>
        <li>Object to or request restriction of specific processing activities.</li>
        <li>Withdraw previously granted consent at any time without retroactive penalty.</li>
      </ul>

      <h2>9. Contact &amp; Data Protection Inquiries</h2>
      <p>
        For any questions regarding this Privacy Policy or to exercise your statutory rights, contact our Data Privacy team directly:
      </p>
      <p>
        <strong>Byte Operator Privacy Team</strong><br />
        Email: <a href="mailto:info@byteoperator.com">info@byteoperator.com</a><br />
        Website: <a href="https://www.byteoperator.com">https://www.byteoperator.com</a>
      </p>
    `,
  },
  'terms-of-service': {
    title: 'Terms of Service',
    category: 'Service Agreements',
    lastUpdated: 'September 2026',
    description: 'General legal terms, intellectual property ownership, and client partnership obligations governing all Byte Operator engagements.',
    body: `
      <h2>1. Agreement to Terms</h2>
      <p>
        These Terms of Service ("Terms") govern your access to and use of the Byte Operator website (<a href="https://www.byteoperator.com">byteoperator.com</a>) and all software engineering, ecommerce development, conversion rate optimization, and AI automation services provided by Byte Operator. By accessing our website or engaging our agency services, you agree to be bound by these Terms and any specific Statement of Work (SOW) executed between the parties.
      </p>

      <h2>2. Scope of Services &amp; Statements of Work</h2>
      <p>
        Byte Operator provides specialized digital engineering services, including full-stack web applications, headless ecommerce platforms, cloud architectures, custom API integrations, and autonomous AI automation pipelines. Specific deliverables, project milestones, pricing structures, and timelines are formally defined in individual Statements of Work. In the event of any conflict between these Terms and an executed SOW, the terms of the SOW shall take precedence.
      </p>

      <h2>3. Intellectual Property Ownership</h2>
      <p>
        We believe in complete intellectual property ownership for our clients:
      </p>
      <ul>
        <li><strong>Client Deliverables:</strong> Upon full and final settlement of all milestone invoices for a given project phase, 100% of all intellectual property rights, source code repositories, design assets, and custom digital deliverables created specifically for the client are fully transferred and assigned to the client.</li>
        <li><strong>Byte Operator Pre-Existing IP:</strong> Byte Operator retains all ownership rights in our pre-existing frameworks, internal developer tooling, proprietary algorithms, and general engineering methodologies. To the extent any pre-existing components are embedded in client deliverables, the client is granted a perpetual, non-exclusive, worldwide, royalty-free license to use and modify them for their internal business operations.</li>
        <li><strong>Open Source Components:</strong> Deliverables may incorporate open-source libraries (e.g. Next.js, React, Tailwind CSS), which remain governed by their respective open-source licenses (such as MIT or Apache 2.0).</li>
      </ul>

      <h2>4. Client Responsibilities &amp; Approvals</h2>
      <p>To ensure high engineering velocity and milestone adherence, clients agree to:</p>
      <ul>
        <li>Provide timely access to relevant third-party systems, staging environments, API keys, and asset repositories required for project completion.</li>
        <li>Designate a qualified technical or commercial representative authorized to approve deliverables and milestone sign-offs.</li>
        <li>Review sprint deliverables within the designated User Acceptance Testing (UAT) window (standard 14 calendar days).</li>
      </ul>

      <h2>5. Fees, Invoicing &amp; Payment Terms</h2>
      <p>
        All fees are quoted in USD unless specified otherwise in the SOW. Project milestones and monthly retainer fees are invoiced according to the schedule set forth in the agreement. Invoices are payable within 14 calendar days of receipt. Late payments may be subject to a statutory interest charge of 1.5% per month on outstanding balances.
      </p>

      <h2>6. Confidentiality &amp; Non-Disclosure</h2>
      <p>
        Both parties agree to hold in strict confidence all proprietary technical information, business data, financial records, customer details, and trade secrets disclosed during the course of the engagement. Confidential obligations survive termination of the agreement for a minimum period of three (3) years.
      </p>

      <h2>7. Warranties &amp; Engineering Quality</h2>
      <p>
        Byte Operator warrants that all code and deliverables will be developed in a professional, workmanlike manner conforming to prevailing modern engineering standards and agreed-upon specifications. We provide a complimentary thirty (30) day bug-fix warranty on custom development following initial production deployment to resolve any reproducible defects in delivered code.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        Except for willful misconduct or breach of confidentiality obligations, neither party shall be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, or data. In all events, the total aggregate liability of Byte Operator arising out of or related to any project engagement shall be limited to the total fees actually paid by the client under the applicable Statement of Work during the six (6) months preceding the claim.
      </p>

      <h2>9. Governing Law &amp; Dispute Resolution</h2>
      <p>
        These Terms and all client engagements shall be governed by and construed in accordance with applicable commercial laws. The parties agree to attempt in good faith to resolve any dispute through direct executive consultation prior to initiating formal arbitration or legal proceedings.
      </p>
    `,
  },
  'refund-policy': {
    title: 'Refund & Payment Policy',
    category: 'Billing & Milestones',
    lastUpdated: 'September 2026',
    description: 'Milestone billing schedules, acceptance verification, deposit policies, and refund criteria for Byte Operator projects.',
    body: `
      <h2>1. Overview &amp; Commercial Transparency</h2>
      <p>
        At Byte Operator, we operate with complete commercial clarity. Our engineering engagements are structured around clear sprint milestones, rigorous quality benchmarks, and transparent sign-offs to ensure clients only pay for verified progress and verified deliverables.
      </p>

      <h2>2. Milestone-Based Project Engagements</h2>
      <p>
        For fixed-scope engineering builds (e.g. headless storefront development, platform migrations, custom full-stack web applications), billing is structured into distinct sequential phases:
      </p>
      <ul>
        <li><strong>Discovery &amp; Architectural Deposit:</strong> Initial deposits allocated toward technical architecture planning, system specifications, and sprint scheduling are non-refundable once discovery kickoff has commenced.</li>
        <li><strong>Phase &amp; Sprint Milestones:</strong> Milestone payments are linked directly to demonstrable deliverables (e.g. design system sign-off, frontend staging demo, API integration completion). Upon delivery of each milestone, the client is provided a 14-day User Acceptance Testing (UAT) review period.</li>
        <li><strong>Milestone Sign-Off:</strong> Once a milestone is formally reviewed, approved, or deployed to production, the associated sprint fee is considered earned and non-refundable.</li>
      </ul>

      <h2>3. 14-Day User Acceptance Testing (UAT) &amp; Revision Guarantee</h2>
      <p>
        We stand firmly behind the quality of our code:
      </p>
      <ul>
        <li>Every sprint delivery includes dedicated revision and QA cycles to address any deviations from the agreed-upon technical specifications.</li>
        <li>If a deliverable fails to meet the documented criteria, our engineering team will remediate and correct the code at zero additional charge within the active sprint window.</li>
        <li>If a reproducible defect is identified within 30 days of production launch, we provide full complimentary bug-fix support.</li>
      </ul>

      <h2>4. Uncommenced Sprints &amp; Project Adjustments</h2>
      <p>
        If a client chooses to cancel or reschedule a multi-phase project prior to the commencement of subsequent unworked sprint phases:
      </p>
      <ul>
        <li>Any advance funds deposited for uncommenced future sprints will be fully refunded or credited toward future engineering hours, less any incurred third-party licensing or resource allocation costs.</li>
        <li>Work completed up to the date of cancellation will be invoiced and handed over in full, including all source code repositories and documentation.</li>
      </ul>

      <h2>5. Service Credits &amp; SLA Non-Performance</h2>
      <p>
        In the rare circumstance that Byte Operator is unable to deliver a specified core requirement due to internal technical failure that cannot be remediated during the revision window, the client will be offered a prorated service credit or partial refund corresponding to the unfulfilled component.
      </p>

      <h2>6. Refund Processing &amp; Inquiries</h2>
      <p>
        Approved refunds are processed to the original payment method (bank wire, ACH, or credit card) within 5 to 10 business days. For billing questions or milestone inquiries, contact our billing department directly:
      </p>
      <p>
        <strong>Byte Operator Finance &amp; Accounts</strong><br />
        Email: <a href="mailto:info@byteoperator.com">info@byteoperator.com</a><br />
        Subject: Billing &amp; Milestone Inquiry
      </p>
    `,
  },
  'subscription-policy': {
    title: 'Subscription & Cancellation Policy',
    category: 'Retainers & SLA',
    lastUpdated: 'September 2026',
    description: 'Terms governing monthly dedicated developer pods, continuous CRO retainers, SLA support, and cancellation procedures.',
    body: `
      <h2>1. Retainer &amp; Subscription Models</h2>
      <p>
        Byte Operator offers ongoing engineering partnerships, dedicated developer pods, continuous Conversion Rate Optimization (CRO), and enterprise SLA support retainers to ensure your digital commerce and software platforms maintain peak performance and continuous feature velocity.
      </p>

      <h2>2. Billing Cycles &amp; Invoicing</h2>
      <p>
        Monthly retainers and ongoing support subscriptions are billed on a recurring 30-day billing cycle in advance of each service period. Recurring invoices are generated and dispatched electronically with net-14 payment terms or automated payment processing via Stripe/Wire.
      </p>

      <h2>3. Dedicated Capacity &amp; Rollover Hours</h2>
      <p>
        To ensure guaranteed developer availability and sub-second response SLA:
      </p>
      <ul>
        <li>Engineering retainer hours represent dedicated developer capacity reserved specifically for your brand during the active billing month.</li>
        <li>Clients are encouraged to utilize their allocated capacity within the active monthly cycle through prioritized backlog planning.</li>
        <li>Unless specified otherwise in your SOW, up to 20% of unused retainer hours from an active billing cycle may roll over into the immediately following month. Rollover hours expire after 60 days.</li>
      </ul>

      <h2>4. Cancellation &amp; Retainer Modification Notice</h2>
      <p>
        We value long-term partnerships built on trust rather than restrictive lock-ins:
      </p>
      <ul>
        <li><strong>Notice Period:</strong> Monthly retainer subscriptions may be modified, upgraded, downgraded, or cancelled with a thirty (30) calendar day written notice prior to the start of the next billing cycle.</li>
        <li><strong>Notice Submission:</strong> Notice must be submitted via email to your dedicated Account Director or sent directly to <a href="mailto:info@byteoperator.com">info@byteoperator.com</a>.</li>
        <li><strong>Active Month Fulfillment:</strong> During the 30-day notice period, our engineering team will continue delivering scheduled sprint backlog items and comprehensive offboarding documentation.</li>
      </ul>

      <h2>5. Retainer Pausing</h2>
      <p>
        Clients facing seasonal shifts or product freezes may request to pause their ongoing retainer for up to sixty (60) days per calendar year with 14 days advance written notice, preserving priority developer pod assignment upon resumption.
      </p>

      <h2>6. Offboarding &amp; Handover Guarantee</h2>
      <p>
        Upon conclusion of any retainer agreement, Byte Operator guarantees a smooth, zero-disruption handover:
      </p>
      <ul>
        <li>Full transfer and sync of all git repositories, deployment pipelines, and environment variables.</li>
        <li>Detailed architectural and technical documentation detailing all active workflows and custom code modules.</li>
        <li>Revocation of internal staging keys and transfer of master ownership of all third-party accounts.</li>
      </ul>

      <h2>7. Support Contact</h2>
      <p>
        For inquiries regarding ongoing subscriptions, capacity adjustments, or cancellation requests:
      </p>
      <p>
        <strong>Byte Operator Client Operations</strong><br />
        Email: <a href="mailto:info@byteoperator.com">info@byteoperator.com</a><br />
        Website: <a href="https://www.byteoperator.com">https://www.byteoperator.com</a>
      </p>
    `,
  },
};

import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

const HANDLE_KEY_MAP: Record<string, 'privacyPolicy' | 'termsOfService' | 'refundPolicy' | 'subscriptionPolicy'> = {
  'privacy-policy': 'privacyPolicy',
  'terms-of-service': 'termsOfService',
  'refund-policy': 'refundPolicy',
  'subscription-policy': 'subscriptionPolicy',
};

export function generateStaticParams() {
  return Object.keys(POLICY_DATA).map((handle) => ({handle}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const policy = POLICY_DATA[params.handle];
  if (!policy) {
    return {
      title: 'Policy Not Found | Byte Operator',
    };
  }

  const cmsContent = getSiteContent();
  const cmsKey = HANDLE_KEY_MAP[params.handle];
  const cmsOverride = cmsKey ? cmsContent[cmsKey] : undefined;

  return pageMetadata({
    title: cmsOverride?.seoTitle || `${cmsOverride?.title || policy.title} | Byte Operator`,
    description: cmsOverride?.seoDescription || cmsOverride?.summary || policy.description,
    path: `/policies/${params.handle}`,
  });
}

export default function PolicyDetailPage({params}: Props) {
  const basePolicy = POLICY_DATA[params.handle];

  if (!basePolicy) {
    notFound();
  }

  const cmsContent = getSiteContent();
  const cmsKey = HANDLE_KEY_MAP[params.handle];
  const cmsOverride = cmsKey ? cmsContent[cmsKey] : undefined;

  const policy = {
    title: cmsOverride?.title || basePolicy.title,
    category: basePolicy.category,
    lastUpdated: cmsOverride?.lastUpdated || basePolicy.lastUpdated,
    description: cmsOverride?.summary || basePolicy.description,
    body: cmsOverride?.contentHtml || basePolicy.body,
  };

  return (
    <main className="ft-policy-page">
      <section className="ft-policy-hero">
        <div className="ft-policy-hero__inner">
          <p className="ft-policy-hero__eyebrow">{policy.category}</p>
          <h1 className="ft-policy-hero__title">{policy.title}</h1>
          <p className="ft-policy-hero__lede">{policy.description}</p>
        </div>
      </section>

      <section className="ft-policy-panel">
        <div className="ft-policy-panel__inner">
          <div className="ft-policy-back">
            <Link href="/policies">
              <span aria-hidden="true">←</span>
              <span>All Policies</span>
            </Link>
          </div>

          <div
            className="ft-policy-content"
            dangerouslySetInnerHTML={{__html: policy.body}}
          />

          <hr style={{borderColor: 'rgba(255, 255, 255, 0.1)', margin: '3rem 0 1.5rem'}} />

          <p style={{fontSize: '0.8125rem', color: '#8E9FB8', margin: 0}}>
            Last updated: <strong>{policy.lastUpdated}</strong>. For questions regarding our company policies, email{' '}
            <a href="mailto:info@byteoperator.com" style={{color: '#3B82F6'}}>
              info@byteoperator.com
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
