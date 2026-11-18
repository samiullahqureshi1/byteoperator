'use client';

import {useState} from 'react';
import {Link} from '~/lib/router-compat';

const FAQS = [
  {
    number: '01',
    question: 'What healthcare AI solutions does Byte Operator provide?',
    answer:
      'Byte Operator develops AI voice agents for inbound call handling, patient inquiry capture, appointment scheduling workflows, automated administrative task execution, EHR/EMR interoperability, and custom healthcare software tailored to medical practices and clinics.',
  },
  {
    number: '02',
    question: 'Can you build an AI receptionist for a medical practice?',
    answer:
      'Yes. We build intelligent, custom-trained voice receptionists that can answer routine inbound patient inquiries, collect intake details, assist with scheduling requests, and cleanly route urgent or complex inquiries to the appropriate clinical or admin staff member.',
  },
  {
    number: '03',
    question: 'Can an AI voice agent schedule healthcare appointments?',
    answer:
      'Yes. Depending on your connected practice-management software or EHR system, voice agents can check calendar availability, capture appointment requests, and schedule or reschedule appointments through approved API workflows.',
  },
  {
    number: '04',
    question: 'Can you integrate with an EHR or EMR system?',
    answer:
      'Yes. We evaluate API availability, vendor capabilities, and access permissions for your specific EHR/EMR systems to enable secure, synchronized data exchange via REST APIs, webhooks, HL7, or FHIR standards where supported.',
  },
  {
    number: '05',
    question: 'What healthcare workflows can be automated?',
    answer:
      'Potential automations include patient inquiry routing, appointment confirmations and SMS/voice reminders, digital intake data capture, follow-up task notifications, internal staff alerts, and continuous cross-application data synchronization.',
  },
  {
    number: '06',
    question: 'Do you develop custom healthcare software?',
    answer:
      'Yes. We design and build custom web applications, patient and staff portals, internal clinical dashboards, operational reporting tools, and execute modernization projects for legacy software platforms.',
  },
  {
    number: '07',
    question: 'Do you work with small medical practices and clinics?',
    answer:
      'Yes. We collaborate with medical practices, dental clinics, dermatology and aesthetic centers, ophthalmology clinics, primary care providers, and multi-location specialty groups looking to eliminate administrative bottlenecks.',
  },
  {
    number: '08',
    question: 'Are your healthcare solutions HIPAA compliant?',
    answer:
      'We incorporate security and privacy best practices—including role-based access control, end-to-end encryption in transit and at rest, secure API design, and audit logging. Exact compliance requirements and business associate agreements (BAAs) are scoped during technical discovery based on your infrastructure and architecture.',
  },
  {
    number: '09',
    question: 'How long does a healthcare software project take?',
    answer:
      'Targeted automations or voice agent deployments typically launch within 2 to 4 weeks. Full-scale custom healthcare applications, complex integrations, or multi-platform architectures generally span 6 to 12 weeks depending on scope and vendor API availability.',
  },
  {
    number: '10',
    question: 'Do you provide ongoing software support?',
    answer:
      'Yes. We provide continuous support, proactive monitoring, regular security updates, system maintenance, and iterative feature development to ensure your software and automations evolve with your practice.',
  },
] as const;

export function HomeHealthcareFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section className="ft-home-faqs">
      <div className="ft-home-faqs__container">
        <div className="ft-home-faqs__grid">
          {/* Left Column: Heading, Subtitle & Callout Card */}
          <div className="ft-home-faqs__left">
            <div className="ft-home-faqs__header">
              <p className="ft-home-faqs__eyebrow">
                FREQUENTLY ASKED QUESTIONS
              </p>
              <h2 className="ft-home-faqs__heading">
                Healthcare AI and
                <br />
                Software Development FAQs
              </h2>
              <p className="ft-home-faqs__subtitle">
                Find clear answers to common questions about our healthcare software development, AI voice agents, system integrations, and implementation process.
              </p>
            </div>

            {/* Callout box */}
            <div className="ft-home-faqs__callout">
              <h3 className="ft-home-faqs__callout-title">
                Have questions about your specific systems?
              </h3>
              <p className="ft-home-faqs__callout-text">
                Our engineering team can evaluate your technical requirements, EHR/EMR platforms, and workflow automation possibilities during a discovery call.
              </p>
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-home-faqs__callout-btn"
              >
                Speak with our engineering team →
              </Link>
            </div>
          </div>

          {/* Right Column: FAQ Accordion List */}
          <div className="ft-home-faqs__right">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.number}
                  className={`ft-home-faqs__item ${isOpen ? 'ft-home-faqs__item--open' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="ft-home-faqs__trigger"
                    aria-expanded={isOpen}
                  >
                    <div className="ft-home-faqs__trigger-content">
                      <span className="ft-home-faqs__number">
                        {faq.number}
                      </span>
                      <span
                        className="ft-home-faqs__question"
                        style={{
                          color: isOpen ? '#ffffff' : '#f1f5f9',
                        }}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className="ft-home-faqs__icon"
                      style={{
                        color: isOpen ? '#60a5fa' : '#94a3b8',
                      }}
                    >
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="ft-home-faqs__answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
