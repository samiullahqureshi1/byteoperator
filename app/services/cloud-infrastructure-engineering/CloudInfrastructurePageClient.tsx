'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (ALL 15 QUESTIONS FROM SPECIFICATION)
========================================================= */

const CLOUD_INFRA_FAQS = [
  {
    number: '01',
    question: 'What is cloud infrastructure engineering?',
    answer:
      'Cloud infrastructure engineering is the process of designing, building, configuring and improving the technology environments that support cloud-based applications and business systems. It involves architecture, computing resources, storage, networking, security, automation, monitoring and infrastructure optimization.',
  },
  {
    number: '02',
    question: 'What do cloud infrastructure engineering services include?',
    answer:
      'Cloud infrastructure engineering services can include cloud architecture design, infrastructure implementation, migration, modernization, automation, security planning, monitoring, performance improvement and resource optimization. The exact scope depends on an organization\'s technical and business requirements.',
  },
  {
    number: '03',
    question: 'What is the difference between cloud engineering and cloud computing?',
    answer:
      'Cloud computing refers to the delivery of computing resources and services over a network. Cloud engineering focuses on designing, implementing, integrating and optimizing the infrastructure and systems that use those resources.',
  },
  {
    number: '04',
    question: 'What is the difference between cloud infrastructure and traditional IT infrastructure?',
    answer:
      'Traditional IT infrastructure commonly relies on physical servers, networking equipment and storage maintained within an organization\'s facilities or data centers. Cloud infrastructure uses cloud-based resources that can be provisioned and managed through cloud service providers. Some organizations combine both approaches through hybrid infrastructure.',
  },
  {
    number: '05',
    question: 'Which cloud platforms can businesses use?',
    answer:
      'Common cloud platforms include Amazon Web Services (AWS), Microsoft Azure and Google Cloud Platform (GCP). The appropriate platform depends on application requirements, existing systems, integration needs, security considerations and business objectives.',
  },
  {
    number: '06',
    question: 'What is involved in cloud migration?',
    answer:
      'Cloud migration typically involves infrastructure assessment, workload discovery, dependency analysis, architecture planning, migration strategy selection, workload transition, testing and post-migration optimization. The process should be tailored to the systems being moved.',
  },
  {
    number: '07',
    question: 'How does cloud infrastructure engineering improve scalability?',
    answer:
      'Cloud infrastructure engineering helps organizations design environments that can accommodate changing workloads. Architecture planning, resource allocation, automation and monitoring can support more flexible infrastructure as application requirements evolve.',
  },
  {
    number: '08',
    question: 'What is the difference between public, private and hybrid cloud?',
    answer:
      'Public cloud uses resources provided through a cloud service provider. Private cloud is dedicated to an individual organization. Hybrid cloud combines private infrastructure with public cloud resources to support different workload requirements.',
  },
  {
    number: '09',
    question: 'How can businesses improve cloud infrastructure security?',
    answer:
      'Businesses can improve cloud security through appropriate identity and access management, network protection, encryption, secure configurations, monitoring, vulnerability assessment and backup planning. Security measures should be aligned with the organization\'s applications, data and applicable obligations.',
  },
  {
    number: '10',
    question: 'What is Infrastructure as Code (IaC)?',
    answer:
      'Infrastructure as Code is an approach to managing and provisioning infrastructure through machine-readable configuration files or code. It helps teams create repeatable infrastructure environments and manage changes more consistently.',
  },
  {
    number: '11',
    question: 'How does DevOps support cloud infrastructure management?',
    answer:
      'DevOps brings development and operations practices closer together through collaboration, automation and consistent deployment processes. In cloud environments, DevOps can help teams manage infrastructure changes, automate deployments and improve software delivery workflows.',
  },
  {
    number: '12',
    question: 'How can healthcare organizations build secure and scalable cloud infrastructure?',
    answer:
      'Healthcare organizations should begin by assessing application requirements, data sensitivity, integration dependencies, access controls, availability and applicable regulatory obligations. Infrastructure architecture should account for secure data handling, backup and recovery, application performance and operational continuity.',
  },
  {
    number: '13',
    question: 'How much do cloud infrastructure engineering services cost?',
    answer:
      'The cost depends on infrastructure complexity, workload size, cloud platform requirements, migration scope, security needs, integrations and ongoing operational responsibilities. A technical assessment helps establish a suitable project scope and cost estimate.',
  },
  {
    number: '14',
    question: 'How long does a cloud infrastructure project take?',
    answer:
      'Project timelines depend on the existing infrastructure, number of workloads, application dependencies, migration complexity, testing requirements and implementation scope. A focused infrastructure project may take less time than a complex enterprise modernization initiative.',
  },
  {
    number: '15',
    question: 'When should a business modernize its cloud infrastructure?',
    answer:
      'Modernization may be appropriate when infrastructure becomes difficult to maintain, application performance declines, operating costs become inefficient, security requirements change or existing systems cannot adequately support business growth.',
  },
] as const;

/* =========================================================
   TECHNOLOGY LOGOS DATA (WHITE VECTOR SVGS)
========================================================= */

const CLOUD_TECH_LOGOS = [
  { src: '/images/home-partners/aws.svg', alt: 'Amazon Web Services', width: 160, height: 40 },
  { src: '/images/home-partners/google-cloud.svg', alt: 'Google Cloud Platform', width: 170, height: 40 },
  { src: '/images/home-partners/docker.svg', alt: 'Docker Containers', width: 160, height: 40 },
  { src: '/images/home-partners/kubernetes.svg', alt: 'Kubernetes Orchestration', width: 170, height: 40 },
  { src: '/images/home-partners/golang.svg', alt: 'Go / Golang', width: 160, height: 40 },
  { src: '/images/home-partners/python.svg', alt: 'Python', width: 160, height: 40 },
  { src: '/images/home-partners/postgresql.svg', alt: 'PostgreSQL', width: 170, height: 40 },
  { src: '/images/home-partners/redis.svg', alt: 'Redis Cache', width: 160, height: 40 },
  { src: '/images/home-partners/mongodb.svg', alt: 'MongoDB', width: 160, height: 40 },
  { src: '/images/home-partners/typescript.svg', alt: 'TypeScript', width: 160, height: 40 },
  { src: '/images/home-partners/nodejs.svg', alt: 'Node.js', width: 160, height: 40 },
  { src: '/images/home-partners/fhir.svg', alt: 'FHIR / Health Cloud', width: 160, height: 40 },
] as const;

/* =========================================================
   2. CORE SERVICES DATA & 3D COVERFLOW CAROUSEL
========================================================= */

const CLOUD_SERVICES = [
  {
    badge: 'Architecture',
    title: 'Cloud Architecture & Infrastructure Design',
    desc: 'A reliable cloud environment begins with the right architecture. Poor infrastructure decisions create unnecessary complexity, performance bottlenecks, and avoidable operating costs. We plan cloud environments around workloads, data needs, and future growth objectives.',
    items: [
      'Assessing existing infrastructure and technical requirements',
      'Planning scalable compute, storage, and networking environments',
      'Public, private, hybrid, and multi-cloud deployment evaluation',
      'High availability, fault tolerance, and disaster recovery planning',
    ],
  },
  {
    badge: 'Modernization',
    title: 'Cloud Migration & Modernization',
    desc: 'Moving workloads to the cloud requires more than transferring applications and data. A successful migration needs careful assessment, dependency mapping, workload prioritization, and post-migration validation to reduce disruption.',
    items: [
      'Workload dependency mapping and migration readiness assessment',
      'On-premises to cloud and cloud-to-cloud transition planning',
      'Legacy infrastructure modernization and database refactoring',
      'Rigorous cutover testing and workload performance validation',
    ],
  },
  {
    badge: 'Implementation',
    title: 'Cloud Infrastructure Implementation',
    desc: 'Cloud infrastructure must be implemented with careful consideration of how compute, storage, networking, and access controls interact. We establish environments that support application requirements and future expansion.',
    items: [
      'Cloud environment provisioning, VPC, and subnet configuration',
      'Compute and persistent storage resource optimization',
      'Virtualization, container runtime, and workload cluster setup',
      'Environment configuration, smoke testing, and validation checks',
    ],
  },
  {
    badge: 'Automation',
    title: 'DevOps & Infrastructure Automation',
    desc: 'Manual infrastructure management introduces configuration drift and operational overhead. Infrastructure as Code (IaC) and automated CI/CD pipelines allow configurations to be versioned, tested, and repeated reliably.',
    items: [
      'Infrastructure as Code (Terraform, OpenTofu, CloudFormation)',
      'Automated CI/CD build, test, and release deployment pipelines',
      'Configuration management with Ansible and GitOps workflows',
      'Environment consistency across development, staging, and production',
    ],
  },
  {
    badge: 'Security',
    title: 'Cloud Security & Infrastructure Protection',
    desc: 'Security is built into every layer rather than treated as an afterthought. We implement zero-trust network boundaries, fine-grained access policies, data encryption, and vulnerability management across critical environments.',
    items: [
      'Identity & Access Management (IAM) and least-privilege policies',
      'Zero-trust network architecture, VPC peering, and WAF rules',
      'End-to-end data encryption at rest (AES-256) and in transit (TLS 1.3)',
      'Vulnerability scanning, audit logging, and automated backup routines',
    ],
  },
  {
    badge: 'Observability',
    title: 'Infrastructure Monitoring & Management',
    desc: 'Infrastructure needs continuous visibility to identify bottlenecks and operational anomalies before they affect users. We implement end-to-end observability across metrics, centralized logs, and distributed traces.',
    items: [
      'Infrastructure performance and resource saturation tracking',
      'Centralized log aggregation, parsing, and analytical dashboards',
      'Proactive threshold alerting and automated incident detection',
      'Regular maintenance schedules and operational reliability reviews',
    ],
  },
  {
    badge: 'FinOps',
    title: 'Cloud Optimization & Performance Engineering',
    desc: 'Cloud environments should evolve alongside business requirements. Resources that are appropriate during initial deployment may become inefficient over time. We align infrastructure allocation directly with workloads and operating budgets.',
    items: [
      'Reviewing resource utilization and eliminating idle instances',
      'Database query tuning, cache tiering, and network routing optimization',
      'Auto-scaling policy calibration based on real-time traffic surges',
      'Cloud cost governance (FinOps) and reserved instance commitments',
    ],
  },
] as const;

function CloudServicesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CLOUD_SERVICES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CLOUD_SERVICES.length) % CLOUD_SERVICES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 45) {
      prevSlide();
    } else if (deltaX < -45) {
      nextSlide();
    }
    setTouchStartX(null);
  };

  const getCardClass = (idx: number) => {
    const diff = (idx - activeSlide + CLOUD_SERVICES.length) % CLOUD_SERVICES.length;
    if (diff === 0) return 'ft-cloud-infra-slider-card ft-cloud-infra-slider-card--active';
    if (diff === 1) return 'ft-cloud-infra-slider-card ft-cloud-infra-slider-card--next';
    if (diff === CLOUD_SERVICES.length - 1) return 'ft-cloud-infra-slider-card ft-cloud-infra-slider-card--prev';
    return 'ft-cloud-infra-slider-card ft-cloud-infra-slider-card--hidden';
  };

  return (
    <section className="ft-cloud-infra-section" aria-label="Comprehensive Services">
      <div className="ft-cloud-infra-container">
        <div className="ft-cloud-infra-section__header">
          <span className="ft-cloud-infra-eyebrow">FULL-LIFECYCLE ENGINEERING</span>
          <h2 className="ft-cloud-infra-heading">
            Comprehensive Cloud &amp; Infrastructure Engineering Services
          </h2>
          <p className="ft-cloud-infra-subheading">
            Modern businesses need more than cloud resources. They need infrastructure that is properly designed, efficiently deployed, secure and capable of adapting as their requirements change. Byte Operator addresses the technical foundations behind reliable digital operations.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-cloud-infra-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-cloud-infra-slider-nav-btn ft-cloud-infra-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-cloud-infra-slider-nav-btn ft-cloud-infra-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-cloud-infra-slider-stage">
            {CLOUD_SERVICES.map((service, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={service.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <span className="ft-cloud-infra-card__badge">{service.badge}</span>
                  <h3 className="ft-cloud-infra-card__title">{service.title}</h3>
                  <p className="ft-cloud-infra-card__desc">{service.desc}</p>
                  <ul className="ft-cloud-infra-card__list">
                    {service.items.map((item, itemIdx) => (
                      <li className="ft-cloud-infra-card__list-item" key={itemIdx}>
                        <span className="ft-cloud-infra-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="ft-cloud-infra-slider-dots">
            {CLOUD_SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-cloud-infra-slider-dot ${i === activeSlide ? 'ft-cloud-infra-slider-dot--active' : ''}`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   8. WHY CHOOSE BYTE OPERATOR (6 CARDS SCROLL-DRIVEN DECK SLIDER)
========================================================= */

const ADVANTAGES = [
  {
    title: 'Business-Aligned Planning',
    subtitle: 'Operational Alignment, Compliance & Budget Realities',
    badge: 'Advantage 01',
    route: '/contact',
    desc: 'Architecture decisions reflect practical business requirements, compliance mandates, and budget realities rather than technology choices made in a vacuum.',
  },
  {
    title: 'Engineering-Led Solutions',
    subtitle: 'Senior Software Architects & DevOps Engineers',
    badge: 'Advantage 02',
    route: '/contact',
    desc: 'You work directly with senior software architects and DevOps engineers who design, code, and deploy your infrastructure with precision.',
  },
  {
    title: 'Security-Conscious Architecture',
    subtitle: 'Zero-Trust, IAM & Encryption Baked Into Foundation',
    badge: 'Advantage 03',
    route: '/contact',
    desc: 'Access controls, data encryption, and vulnerability management are baked into the foundation rather than treated as a checklist item at the end.',
  },
  {
    title: 'Scalable Foundations',
    subtitle: 'Traffic Spikes, High-Throughput & Workload Elasticity',
    badge: 'Advantage 04',
    route: '/contact',
    desc: 'Infrastructure is engineered to support current workloads while seamlessly accommodating future application versions, traffic spikes, and data growth.',
  },
  {
    title: 'Integration & Modernization',
    subtitle: 'Legacy Systems, Hybrid Clouds & Modern Stacks',
    badge: 'Advantage 05',
    route: '/contact',
    desc: 'We ensure new cloud environments connect seamlessly with existing legacy databases, APIs, ERP systems, and third-party SaaS platforms.',
  },
  {
    title: 'Focus on Long-Term Efficiency',
    subtitle: 'Maintainable IaC, Documentation & Knowledge Transfer',
    badge: 'Advantage 06',
    route: '/contact',
    desc: 'We structure code and resources so your in-house teams can easily manage, monitor, and extend the infrastructure after deployment.',
  },
] as const;

const ADVANTAGE_ROTATES = ['-1.8deg', '1.4deg', '-0.8deg', '1.9deg', '-1.2deg', '1.5deg'];

function CloudAdvantageDeckSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollDistance = Math.max(section.offsetHeight - viewportHeight, 1);
    const targetScroll = sectionTop + (index / (ADVANTAGES.length - 1)) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    const updateExperienceCards = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollDistance;
      const progress = clamp(rawProgress, 0, 1);
      const activePosition = progress * (ADVANTAGES.length - 1);
      const isSmallScreen = window.innerWidth <= 768;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const distance = index - activePosition;
        const direction = index % 2 === 0 ? -1 : 1;

        let y = 0;
        let z = 0;
        let rotateZ = 0;
        let scale = 1;
        let opacity = 0;
        let layer = 1;

        if (distance > 0) {
          if (distance > 1.2) {
            y = 260;
            opacity = 0;
            scale = 0.95;
            layer = 1;
          } else {
            y = distance * 220;
            opacity = clamp(1 - (distance - 0.25) * 2, 0, 1);
            scale = 1 - distance * 0.035;
            rotateZ = direction * distance * 1.6;
            layer = 25 - index;
          }
        } else {
          const past = clamp(-distance, 0, 3);
          const pastOffset = isSmallScreen ? 16 : 22;
          y = -past * pastOffset;
          z = -past * 40;
          rotateZ = direction * past * 1.8;
          scale = 1 - past * 0.035;
          opacity = past > 2.5 ? 0 : clamp(1 - past * 0.25, 0.45, 1);
          layer = 20 - Math.round(past);
        }

        if (Math.abs(distance) < 0.5) {
          layer = 35;
        }

        card.style.setProperty('--experience-card-y', `${y.toFixed(1)}px`);
        card.style.setProperty('--experience-card-z', `${z.toFixed(1)}px`);
        card.style.setProperty('--experience-card-rotate-z', `${rotateZ.toFixed(2)}deg`);
        card.style.setProperty('--experience-card-scale', scale.toFixed(3));
        card.style.setProperty('--experience-card-opacity', opacity.toFixed(3));
        card.style.setProperty('--experience-card-layer', String(layer));
        card.style.pointerEvents = Math.abs(distance) < 0.6 ? 'auto' : 'none';
      });

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, ADVANTAGES.length - 1));
    };

    const handleScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateExperienceCards();
          ticking = false;
        });
      }
    };

    updateExperienceCards();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ft-cloud-infra-experience-section" aria-label="Why Choose Byte Operator">
      <div className="ft-cloud-infra-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-cloud-infra-experience-heading">
          <span className="ft-cloud-infra-experience-eyebrow">THE BYTE OPERATOR ADVANTAGE</span>
          <h2 className="ft-cloud-infra-heading">
            Why Choose Byte Operator for Cloud &amp; Infrastructure Engineering?
          </h2>
          <p className="ft-cloud-infra-subheading">
            Infrastructure decisions have long-term consequences for application performance, operational complexity, security and business growth. We approach cloud engineering from the perspective of the business outcomes infrastructure is expected to support.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-cloud-infra-experience-list">
          {ADVANTAGES.map((adv, index) => (
            <article
              key={adv.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-cloud-infra-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: ADVANTAGE_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-cloud-infra-experience-arrow"
                onClick={() => scrollToCard((index + 1) % ADVANTAGES.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next advantage"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              {/* Main content in middle */}
              <div className="ft-cloud-infra-experience-copy">
                <div className="ft-cloud-infra-experience-copy__header">
                  <h3 className="ft-cloud-infra-experience-copy__title">{adv.title}</h3>
                  <span className="ft-cloud-infra-experience-copy__subtitle">{adv.subtitle}</span>
                </div>
                <p className="ft-cloud-infra-experience-copy__summary">{adv.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-cloud-infra-experience-side">
                <span className="ft-cloud-infra-experience-date">{adv.badge}</span>
                <Link
                  to={adv.route}
                  className="ft-cloud-infra-experience-link"
                >
                  <span>Discuss Need</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Pagination & Progress Controls */}
        <div className="ft-cloud-infra-experience-progress">
          <span className="ft-cloud-infra-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(ADVANTAGES.length).padStart(2, '0')}
          </span>
          <div className="ft-cloud-infra-experience-dots">
            {ADVANTAGES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-cloud-infra-experience-dot ${
                  dotIdx === currentActiveIndex ? 'ft-cloud-infra-experience-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to advantage ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-cloud-infra-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function CloudInfrastructurePageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-cloud-infra-page">
      {/* =========================================================
          1. HERO SECTION (2-Line Heading with Exact Font Specs)
      ========================================================= */}
      <section className="ft-cloud-infra-hero">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-hero__header">
            <p className="ft-cloud-infra-hero__eyebrow">
              CLOUD INFRASTRUCTURE ENGINEERING SERVICES
            </p>
            <h1 className="ft-cloud-infra-hero__title">
              <span className="ft-cloud-infra-hero__title-line">
                Cloud &amp; Infrastructure
              </span>
              <span className="ft-cloud-infra-hero__title-line">
                Engineering
              </span>
            </h1>

            <div className="ft-cloud-infra-hero__text-group">
              <p className="ft-cloud-infra-hero__lead">
                Build a stronger technology foundation with cloud and infrastructure engineering solutions designed around your business needs. Byte Operator helps organizations plan, build, modernize and optimize their technology environments to support performance, scalability, security and long-term growth. Whether you are moving from traditional infrastructure to cloud environments, modernizing existing systems or improving the reliability of your technology operations, the right infrastructure architecture makes a measurable difference to how your business operates. Our approach focuses on building practical, scalable infrastructure that supports your applications, data, teams and business objectives. Build infrastructure that is ready for what comes next.
              </p>
            </div>

            <div className="ft-cloud-infra-hero__cta-group">
              <CalendlyButton
                label="Talk to Our Cloud Engineering Team"
                className="ft-cloud-infra-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-cloud-infra-hero__btn-secondary"
              >
                Discuss Your Infrastructure Project &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CORE COMPREHENSIVE SERVICES (7 Cards 3D Coverflow Carousel)
      ========================================================= */}
      <CloudServicesSlider />

      {/* MIGRATION STRATEGIES (5 R's) */}
      <section className="ft-cloud-infra-section" aria-label="Migration Strategies" style={{ paddingTop: 0 }}>
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-strategies-box">
            <div className="ft-cloud-infra-strategies-header">
              <h3 className="ft-cloud-infra-strategies-title">
                The 5 Cloud Migration Strategies We Execute
              </h3>
              <p className="ft-cloud-infra-strategies-desc">
                Depending on technical and business requirements, we match each workload with the optimal migration strategy:
              </p>
            </div>

            <div className="ft-cloud-infra-strategies-grid">
              <div className="ft-cloud-infra-strategy-item">
                <h4 className="ft-cloud-infra-strategy-name">Rehosting</h4>
                <p className="ft-cloud-infra-strategy-detail">
                  Moving workloads to a new infrastructure environment with limited architectural changes (lift-and-shift) for rapid transition.
                </p>
              </div>

              <div className="ft-cloud-infra-strategy-item">
                <h4 className="ft-cloud-infra-strategy-name">Replatforming</h4>
                <p className="ft-cloud-infra-strategy-detail">
                  Making selected optimizations to workloads (such as adopting managed databases or container runtimes) while retaining core application code.
                </p>
              </div>

              <div className="ft-cloud-infra-strategy-item">
                <h4 className="ft-cloud-infra-strategy-name">Refactoring</h4>
                <p className="ft-cloud-infra-strategy-detail">
                  Redesigning application components to take full advantage of cloud-native capabilities, microservices, and serverless compute.
                </p>
              </div>

              <div className="ft-cloud-infra-strategy-item">
                <h4 className="ft-cloud-infra-strategy-name">Repurchasing</h4>
                <p className="ft-cloud-infra-strategy-detail">
                  Replacing legacy or custom components with suitable SaaS solutions or managed cloud alternatives where bespoke software is unnecessary.
                </p>
              </div>

              <div className="ft-cloud-infra-strategy-item">
                <h4 className="ft-cloud-infra-strategy-name">Retaining or Retiring</h4>
                <p className="ft-cloud-infra-strategy-detail">
                  Keeping workloads that should not yet be migrated due to hardware/compliance constraints, while systematically decommissioning redundant systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. PLATFORMS & TECHNOLOGIES SPLIT SECTION (2-Col Reference)
      ========================================================= */}
      <section className="ft-cloud-infra-section ft-cloud-infra-section--darker" aria-label="Platforms & Technologies">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-tech-split">
            {/* Left Column: Context & 3 Core Tech Categories */}
            <div className="ft-cloud-infra-tech-split__left">
              <p className="ft-cloud-infra-tech-split__eyebrow">
                PLATFORMS &amp; INFRASTRUCTURE TECHNOLOGIES
              </p>
              <h2 className="ft-cloud-infra-tech-split__title">
                Engineered Across Leading Cloud Platforms &amp; Modern Toolchains
              </h2>
              <p className="ft-cloud-infra-tech-split__desc">
                Cloud infrastructure depends on the right combination of platforms, architecture and engineering practices. The technology choices reflect your application&apos;s requirements, existing systems, operational capabilities, security needs and long-term business objectives.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#38bdf8', fontSize: '1.1rem', fontWeight: 700 }}>
                    1. Cloud Computing Platforms
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    Public cloud environments tailored to workload specs: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).
                  </p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#38bdf8', fontSize: '1.1rem', fontWeight: 700 }}>
                    2. Containers &amp; Application Infrastructure
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    Docker containerization, Kubernetes (EKS/GKE/AKS) cluster orchestration, workload scheduling, and microservice meshes.
                  </p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#38bdf8', fontSize: '1.1rem', fontWeight: 700 }}>
                    3. Infrastructure Automation &amp; DevOps
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    Infrastructure as Code, configuration management, automated CI/CD pipelines, GitOps, and real-time observability telemetry.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: White Vector SVGs in 2-3 column grid */}
            <div className="ft-cloud-infra-tech-split__right">
              {CLOUD_TECH_LOGOS.map((tech) => (
                <div key={tech.alt} className="ft-cloud-infra-tech-logo-item">
                  <img
                    src={tech.src}
                    alt={tech.alt}
                    width={tech.width}
                    height={tech.height}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. DEPLOYMENT MODELS (5 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-cloud-infra-section" aria-label="Deployment Models">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">ARCHITECTURAL FLEXIBILITY</span>
            <h2 className="ft-cloud-infra-heading">
              Cloud Architecture &amp; Infrastructure Deployment Models
            </h2>
            <p className="ft-cloud-infra-subheading">
              Different organizations require different deployment models. The right choice depends on workload requirements, security considerations, existing systems, operational resources and business objectives.
            </p>
          </div>

          <div className="ft-cloud-infra-grid-3">
            {/* 1 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Public Cloud</span>
              <h3 className="ft-cloud-infra-card__title">
                Public Cloud Infrastructure
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Public cloud environments provide on-demand access to computing, storage, and managed services through cloud providers. Ideal for businesses seeking elastic scalability, global content distribution, and rapid deployment without maintaining physical data centers.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Private Cloud</span>
              <h3 className="ft-cloud-infra-card__title">
                Private Cloud Infrastructure
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Dedicated infrastructure environments designed for the exclusive use of an organization. Provides complete administrative control over configurations, resource isolation, and bespoke network topology to meet strict governance or compliance mandates.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Hybrid Cloud</span>
              <h3 className="ft-cloud-infra-card__title">
                Hybrid Cloud Infrastructure
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Combines private on-premises infrastructure with public cloud resources. Supports organizations that must retain sensitive workloads locally while leveraging public cloud elasticity for customer-facing applications and burst compute.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Multi-Cloud</span>
              <h3 className="ft-cloud-infra-card__title">
                Multi-Cloud Infrastructure
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Distributes workloads across multiple cloud service providers (AWS, Azure, GCP) to eliminate vendor lock-in, take advantage of specialized vendor services, and establish cross-cloud disaster recovery resilience.
              </p>
            </div>

            {/* 5 - Centered */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Cloud-Native</span>
              <h3 className="ft-cloud-infra-card__title">
                Cloud-Native Infrastructure
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Engineered specifically for cloud environments using containerization, microservices, declarative APIs, and automated orchestration. Maximizes agility, continuous deployment speed, and self-healing resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. MIGRATION & MODERNIZATION METHODOLOGY (6 Steps)
      ========================================================= */}
      <section className="ft-cloud-infra-section ft-cloud-infra-section--darker" aria-label="Migration Methodology">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">STRUCTURED METHODOLOGY</span>
            <h2 className="ft-cloud-infra-heading">
              Our Cloud Migration &amp; Infrastructure Modernization Approach
            </h2>
            <p className="ft-cloud-infra-subheading">
              Every infrastructure environment has different requirements. Our structured 6-phase engineering approach reduces operational disruption while unlocking modern cloud capabilities.
            </p>
          </div>

          <div className="ft-cloud-infra-process-grid">
            {/* Step 1 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">01</span>
              <h3 className="ft-cloud-infra-process-title">Discovery &amp; Infrastructure Assessment</h3>
              <p className="ft-cloud-infra-process-desc">
                Reviewing current infrastructure, application dependencies, resource utilization, bandwidth constraints, and business modernization objectives.
              </p>
              <div className="ft-cloud-infra-process-objective">
                <strong>Objective:</strong> Establish a clear technical baseline and pinpoint areas requiring architectural improvement.
              </div>
            </div>

            {/* Step 2 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">02</span>
              <h3 className="ft-cloud-infra-process-title">Architecture &amp; Migration Planning</h3>
              <p className="ft-cloud-infra-process-desc">
                Defining target cloud architecture, selecting the appropriate migration strategy (Rehost, Replatform, Refactor), and modeling network boundaries and access rules.
              </p>
              <div className="ft-cloud-infra-process-objective">
                <strong>Objective:</strong> Develop a practical infrastructure roadmap aligned with business and technical requirements.
              </div>
            </div>

            {/* Step 3 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">03</span>
              <h3 className="ft-cloud-infra-process-title">Infrastructure Design &amp; Implementation</h3>
              <p className="ft-cloud-infra-process-desc">
                Authoring declarative Infrastructure as Code (IaC), provisioning virtual networks, clusters, IAM policies, and persistent storage environments.
              </p>
              <div className="ft-cloud-infra-process-objective">
                <strong>Objective:</strong> Build an automated, repeatable infrastructure foundation ready for application workloads.
              </div>
            </div>

            {/* Step 4 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">04</span>
              <h3 className="ft-cloud-infra-process-title">Migration, Integration &amp; Deployment</h3>
              <p className="ft-cloud-infra-process-desc">
                Executing staged workload migration, database replication, API gateway connectivity, and automated CI/CD pipeline deployments.
              </p>
              <div className="ft-cloud-infra-process-objective">
                <strong>Objective:</strong> Transition workloads and systems with minimal downtime while validating target functionality.
              </div>
            </div>

            {/* Step 5 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">05</span>
              <h3 className="ft-cloud-infra-process-title">Testing &amp; Validation</h3>
              <p className="ft-cloud-infra-process-desc">
                Conducting rigorous load testing, penetration verification, failover simulation, latency benchmarking, and end-to-end data integrity checks.
              </p>
              <div className="ft-cloud-infra-process-objective">
                <strong>Objective:</strong> Verify that the infrastructure environment satisfies performance, security, and resilience SLAs.
              </div>
            </div>

            {/* Step 6 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">06</span>
              <h3 className="ft-cloud-infra-process-title">Optimization &amp; Continuous Improvement</h3>
              <p className="ft-cloud-infra-process-desc">
                Continuous observability reviews, automated cost optimization (FinOps), capacity tuning, and scheduled security posture updates.
              </p>
              <div className="ft-cloud-infra-process-objective">
                <strong>Objective:</strong> Keep infrastructure aligned with changing business, performance, and budgetary requirements.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. SECURITY, RELIABILITY & SCALABILITY PILLARS (5 Cards)
      ========================================================= */}
      <section className="ft-cloud-infra-section" aria-label="Security & Reliability">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">MISSION-CRITICAL RESILIENCE</span>
            <h2 className="ft-cloud-infra-heading">
              Secure, Reliable &amp; Scalable Cloud Infrastructure
            </h2>
            <p className="ft-cloud-infra-subheading">
              A modern infrastructure environment must support more than application deployment. It must guarantee availability, data sovereignty, resilience, and horizontal scaling under heavy traffic.
            </p>
          </div>

          <div className="ft-cloud-infra-grid-3">
            {/* 1 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Zero-Trust</span>
              <h3 className="ft-cloud-infra-card__title">
                Infrastructure Security &amp; Access Management
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Granular identity and access management (IAM), multi-factor authentication, role-based controls, and isolated network perimeters prevent unauthorized access across cloud environments.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Protection</span>
              <h3 className="ft-cloud-infra-card__title">
                Data Protection &amp; Backup Planning
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Automated snapshot policies, cross-region replication, cryptographic key management (KMS), and immutable backups guarantee data recovery in the event of hardware or system failure.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Uptime</span>
              <h3 className="ft-cloud-infra-card__title">
                High Availability &amp; Resilience
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Multi-Availability Zone (AZ) deployments, elastic load balancing, automated health checks, and self-healing container pods eliminate single points of failure.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Continuity</span>
              <h3 className="ft-cloud-infra-card__title">
                Disaster Recovery &amp; Business Continuity
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Tailored Recovery Point Objectives (RPO) and Recovery Time Objectives (RTO) backed by automated failover runbooks to ensure operational continuity during disruptions.
              </p>
            </div>

            {/* 5 - Centered */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Elasticity</span>
              <h3 className="ft-cloud-infra-card__title">
                Performance &amp; Scalability
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Horizontal and vertical auto-scaling groups dynamically allocate compute, memory, and database IOPS to handle peak traffic demands without degrading user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. HEALTHCARE CLOUD INFRASTRUCTURE (Specialized Section)
      ========================================================= */}
      <section className="ft-cloud-infra-section ft-cloud-infra-section--darker" aria-label="Healthcare Cloud Infrastructure">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">HEALTHCARE TECHNOLOGY</span>
            <h2 className="ft-cloud-infra-heading">
              Cloud Infrastructure Engineering for Healthcare Organizations
            </h2>
            <p className="ft-cloud-infra-subheading">
              Healthcare organizations increasingly depend on digital health platforms, connected clinical applications and reliable access to patient data. The infrastructure supporting these systems must be designed around availability, privacy, integration requirements and operational continuity.
            </p>
          </div>

          <div className="ft-cloud-infra-grid-3">
            {/* 1 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">
                Infrastructure for Healthcare Applications
              </h3>
              <p className="ft-cloud-infra-card__desc">
                High-performance compute clusters and low-latency storage supporting EHRs, clinical workflow engines, telemedicine portals, and patient-facing digital health platforms.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">
                Secure Healthcare Data Environments
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Encrypted data lakes, dedicated database instances, access auditing, and segregated network segments designed to protect sensitive personal and health information.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">
                Healthcare System Integration
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Secure API gateways and message broker infrastructure facilitating HL7 v2 and FHIR data exchange with laboratories, imaging archives (PACS), and hospital systems.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">
                Scalable Digital Health Platforms
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Elastic microservice architecture capable of scaling as patient volume, telehealth sessions, and connected IoT medical device feeds expand over time.
              </p>
            </div>

            {/* 5 - Centered */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">
                Business Continuity for Healthcare Operations
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Redundant infrastructure, automated failover routing, and point-in-time recovery to ensure critical clinical systems remain operational without interruption.
              </p>
            </div>
          </div>

          {/* COMPLIANCE NOTICE BOX */}
          <div className="ft-cloud-infra-notice-box">
            <h4 className="ft-cloud-infra-notice-title">
              <span>&#9888;</span> Important Regulatory &amp; Compliance Notice
            </h4>
            <p className="ft-cloud-infra-notice-desc">
              Security and regulatory requirements such as HIPAA, BAA, HL7 and FHIR must be evaluated and confirmed for each specific solution. They should not be assumed solely because an infrastructure solution is intended for healthcare. Byte Operator reviews technical architecture and vendor agreements to ensure applicable regulatory standards are satisfied.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. INDUSTRIES WE SUPPORT (5 Industry Cards - Centered)
      ========================================================= */}
      <section className="ft-cloud-infra-section" aria-label="Industries Supported">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">INDUSTRY EXPERTISE</span>
            <h2 className="ft-cloud-infra-heading">
              Industries We Support
            </h2>
            <p className="ft-cloud-infra-subheading">
              Cloud infrastructure requirements differ across industries. Each organization has its own application architecture, operational processes, security needs and growth objectives.
            </p>
          </div>

          <div className="ft-cloud-infra-grid-3">
            {/* 1 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Healthcare</span>
              <h3 className="ft-cloud-infra-card__title">
                Healthcare &amp; Digital Health
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Healthcare technology environments requiring reliable application infrastructure, secure data handling, integration capabilities, and business continuity planning.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">FinTech</span>
              <h3 className="ft-cloud-infra-card__title">
                Financial Services &amp; FinTech
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Demanding requirements around data protection, high-throughput transaction processing, strict access management, auditability, and sub-millisecond latency.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Enterprise</span>
              <h3 className="ft-cloud-infra-card__title">
                Enterprise &amp; Corporate Organizations
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Modernizing legacy infrastructure, connecting distributed corporate systems, improving resource utilization, and supporting complex multi-tiered software stacks.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">SaaS</span>
              <h3 className="ft-cloud-infra-card__title">
                SaaS &amp; Technology Companies
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Flexible cloud infrastructure supporting automated CI/CD releases, multi-tenant database partitioning, workload auto-scaling, and product velocity.
              </p>
            </div>

            {/* 5 - Centered */}
            <div className="ft-cloud-infra-card">
              <span className="ft-cloud-infra-card__badge">Ecommerce</span>
              <h3 className="ft-cloud-infra-card__title">
                E-commerce &amp; Digital Platforms
              </h3>
              <p className="ft-cloud-infra-card__desc">
                Handling sudden flash-sale traffic spikes, global content delivery (CDN), headless checkout microservices, and seamless ERP/CRM integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. BUSINESS BENEFITS (7 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-cloud-infra-section ft-cloud-infra-section--darker" aria-label="Business Benefits">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">MEASURABLE VALUE</span>
            <h2 className="ft-cloud-infra-heading">
              Business Benefits of Cloud &amp; Infrastructure Engineering
            </h2>
            <p className="ft-cloud-infra-subheading">
              Well-planned infrastructure improves the technical foundation of an organization and directly supports more effective business operations.
            </p>
          </div>

          <div className="ft-cloud-infra-grid-3">
            {/* 1 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Greater Scalability</h3>
              <p className="ft-cloud-infra-card__desc">
                Accommodate changing workloads and evolving application requirements without relying on expensive, fixed on-premises hardware capacity.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Improved Reliability</h3>
              <p className="ft-cloud-infra-card__desc">
                Appropriate architecture, proactive monitoring, redundancy, and automated recovery planning reduce the frequency and impact of infrastructure outages.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Stronger Security Posture</h3>
              <p className="ft-cloud-infra-card__desc">
                Security-focused planning addresses identity and access management, encryption, network configuration, and vulnerability remediation across the entire lifecycle.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Better Resource Utilization</h3>
              <p className="ft-cloud-infra-card__desc">
                Continuous infrastructure reviews identify underused or overprovisioned resources, lowering monthly cloud operational expenditures.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Improved Application Performance</h3>
              <p className="ft-cloud-infra-card__desc">
                Architectural tuning, caching strategies, and load balancing resolve bottlenecks and deliver responsive user experiences globally.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Reduced Complexity</h3>
              <p className="ft-cloud-infra-card__desc">
                Modernization and automation streamline environment management, reducing manual operational interventions and configuration drift.
              </p>
            </div>

            {/* 7 - Centered */}
            <div className="ft-cloud-infra-card">
              <h3 className="ft-cloud-infra-card__title">Greater Business Agility</h3>
              <p className="ft-cloud-infra-card__desc">
                A dependable cloud foundation makes it faster and safer for development teams to release features, enter new markets, and support new digital initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. WHY CHOOSE BYTE OPERATOR (6 Cards Scroll-Driven Deck)
      ========================================================= */}
      <CloudAdvantageDeckSlider />

      {/* =========================================================
          11. ENGINEERING PROCESS FLOW (6 Lifecycle Phases)
      ========================================================= */}
      <section className="ft-cloud-infra-section ft-cloud-infra-section--darker" aria-label="Process Flow">
        <div className="ft-cloud-infra-container">
          <div className="ft-cloud-infra-section__header">
            <span className="ft-cloud-infra-eyebrow">STEP-BY-STEP EXECUTION</span>
            <h2 className="ft-cloud-infra-heading">
              Our Cloud Infrastructure Engineering Process
            </h2>
            <p className="ft-cloud-infra-subheading">
              A clear process connects infrastructure strategy with practical implementation, ensuring timely execution and predictable outcomes.
            </p>
          </div>

          <div className="ft-cloud-infra-process-grid">
            {/* Phase 1 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">01</span>
              <h3 className="ft-cloud-infra-process-title">Discover</h3>
              <p className="ft-cloud-infra-process-desc">
                Understand existing systems, workloads, dependencies, resource bottlenecks, and business objectives.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">02</span>
              <h3 className="ft-cloud-infra-process-title">Design</h3>
              <p className="ft-cloud-infra-process-desc">
                Develop a target infrastructure architecture based on performance, security, scalability, and operational requirements.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">03</span>
              <h3 className="ft-cloud-infra-process-title">Build</h3>
              <p className="ft-cloud-infra-process-desc">
                Configure and implement the infrastructure components using automated code templates and validated configurations.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">04</span>
              <h3 className="ft-cloud-infra-process-title">Secure</h3>
              <p className="ft-cloud-infra-process-desc">
                Incorporate appropriate access controls, network segmentation, data encryption, and audit monitoring policies.
              </p>
            </div>

            {/* Phase 5 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">05</span>
              <h3 className="ft-cloud-infra-process-title">Optimize</h3>
              <p className="ft-cloud-infra-process-desc">
                Evaluate resource utilization, load performance, automated scaling thresholds, and infrastructure cost efficiency.
              </p>
            </div>

            {/* Phase 6 */}
            <div className="ft-cloud-infra-process-card">
              <span className="ft-cloud-infra-process-step">06</span>
              <h3 className="ft-cloud-infra-process-title">Improve</h3>
              <p className="ft-cloud-infra-process-desc">
                Identify ongoing opportunities for modernization, reliability enhancements, and operational automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          12. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Accordion)
      ========================================================= */}
      <section className="ft-home-faqs" aria-label="Frequently Asked Questions">
        <div className="ft-home-faqs__container">
          <div className="ft-home-faqs__grid">
            {/* Left Column: Sticky Title + Discovery Call Box */}
            <div className="ft-home-faqs__left">
              <div className="ft-home-faqs__header">
                <p className="ft-home-faqs__eyebrow">
                  FREQUENTLY ASKED QUESTIONS
                </p>
                <h2 className="ft-home-faqs__heading">
                  Cloud Infrastructure Engineering FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about cloud architecture, migration strategies, Infrastructure as Code, security best practices, and cost optimization.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your cloud infrastructure?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our cloud architects can evaluate your existing workloads, review migration feasibility, and outline an infrastructure roadmap during a discovery consultation.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            {/* Right Column: 15 Interactive Accordion Items */}
            <div className="ft-home-faqs__right">
              {CLOUD_INFRA_FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={faq.number}
                    className={`ft-home-faqs__item ${isOpen ? 'ft-home-faqs__item--open' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
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
                          color: isOpen ? '#38bdf8' : '#94a3b8',
                        }}
                      >
                        {isOpen ? '\u2014' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="ft-home-faqs__answer">
                        <p style={{ margin: 0 }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          13. FINAL CONVERSION CTA BLOCK
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="CLOUD INFRASTRUCTURE & DEVOPS"
        title="Build a Stronger Cloud Infrastructure with Byte Operator"
        description="Your infrastructure should support where your business is today and where it plans to go next. Whether you are planning a cloud migration, modernizing existing systems, improving performance, or designing a scalable environment for new applications, Byte Operator can help."
        tagline="Let's build an infrastructure foundation that supports your next stage of growth."
        primaryButtonLabel="Talk to Our Cloud Engineering Team"
        secondaryButtonLabel="Request an Infrastructure Consultation →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'High Availability & Scalability',
            description:
              'Multi-zone Kubernetes clusters, auto-scaling compute groups, and resilient edge routing with 99.99% uptime targets.',
          },
          {
            title: 'Infrastructure as Code (IaC)',
            description:
              'Deterministic, reproducible environments provisioned via Terraform and automated GitHub Actions pipelines.',
          },
          {
            title: 'Cloud Security & Compliance',
            description:
              'HIPAA/SOC2 compliant networking, least-privilege IAM scoping, zero-trust perimeter, and encrypted data volumes.',
          },
        ]}
      />
    </div>
  );
}
