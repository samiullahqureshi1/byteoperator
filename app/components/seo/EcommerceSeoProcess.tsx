'use client';

import {useEffect, useRef, useState} from 'react';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Audit & Discovery',
    description:
      'We start with a detailed review of your ecommerce store across crawlability, indexation, site architecture, keyword coverage, internal linking, content and technical performance. The goal is to identify the issues limiting organic visibility and the opportunities with the strongest commercial relevance.',
  },
  {
    number: '02',
    title: 'Strategy & Roadmap',
    description:
      'We turn the audit into a prioritised SEO roadmap aligned with your business goals. Technical fixes, collection and product optimisation, content opportunities and internal-linking improvements are organised by impact and implementation priority.',
  },
  {
    number: '03',
    title: 'Implement & Optimise',
    description:
      'Our SEO and development work is connected, so recommendations can move into implementation. From structured data and page-speed improvements to collection content, product optimisation and internal linking, we focus on improvements that strengthen both search visibility and the ecommerce experience.',
  },
  {
    number: '04',
    title: 'Measure & Scale',
    description:
      'We review organic visibility, traffic, keyword movement, conversions and technical health to understand what is improving and where the next opportunity sits. Those learnings feed into the next optimisation cycle so the SEO strategy continues to develop over time.',
  },
] as const;

type ProcessStep = {
  description: string;
  number: string;
  title: string;
};

type EcommerceSeoProcessProps = {
  compactTestimonial?: boolean;
  label?: string;
  steps?: readonly ProcessStep[];
  subtitle?: string;
  title?: string;
};

export function EcommerceSeoProcess({
  compactTestimonial = false,
  label = 'Our SEO Process',
  steps = PROCESS_STEPS,
  subtitle = 'Every engagement follows a structured four-step process built around your business goals, search opportunities and commercial priorities. The focus stays on measurable improvements rather than vanity metrics.',
  title = 'How We Grow Organic Revenue for Ecommerce Brands',
}: EcommerceSeoProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const serpRef = useRef<HTMLDivElement>(null);

  const [processActive, setProcessActive] = useState(false);
  const [serpActive, setSerpActive] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      setProcessActive(true);
      setSerpActive(true);
      return;
    }

    const section = sectionRef.current;
    const serp = serpRef.current;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const processObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        processObserver.disconnect();

        timer = setTimeout(() => {
          setProcessActive(true);
        }, 600);
      },
      {
        threshold: 0.15,
      },
    );

    const serpObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setSerpActive(true);
        serpObserver.disconnect();
      },
      {
        threshold: 0.3,
      },
    );

    if (section) processObserver.observe(section);
    if (serp) serpObserver.observe(serp);

    return () => {
      processObserver.disconnect();
      serpObserver.disconnect();

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ft-ecommerce-seo-process${
        processActive ? ' is-active' : ''
      }`}
      aria-labelledby="ecommerce-seo-process-title"
    >
      <div
        className="ft-ecommerce-seo-process__glow"
        aria-hidden="true"
      />

      <div className="ft-ecommerce-seo-process__container">
        <div className="ft-ecommerce-seo-process__header">
          <div className="ft-ecommerce-seo-process__header-text">
            <p className="ft-ecommerce-seo-process__label">
              {label}
            </p>

            <h2
              className="ft-ecommerce-seo-process__title"
              id="ecommerce-seo-process-title"
            >
              {title}
            </h2>

            <p className="ft-ecommerce-seo-process__subtitle">
              Every engagement follows a structured four-step process built
              around your business goals, search opportunities and commercial
              priorities. The focus stays on measurable improvements rather
              than vanity metrics.
            </p>
          </div>

          <div
            ref={serpRef}
            className="ft-ecommerce-seo-process__serp-wrap"
          >
            <SerpWireframe active={serpActive} />
          </div>
        </div>

        <div className="ft-ecommerce-seo-process__grid">
          <div
            className="ft-ecommerce-seo-process__line-wrap"
            aria-hidden="true"
          >
            <div className="ft-ecommerce-seo-process__line">
              <div className="ft-ecommerce-seo-process__line-fill" />
            </div>
          </div>

          {steps.map((step, index) => (
            <article
              className="ft-ecommerce-seo-process__step"
              data-step={index + 1}
              key={step.number}
            >
              <div className="ft-ecommerce-seo-process__number-wrap">
                <span className="ft-ecommerce-seo-process__number">
                  {step.number}
                </span>

                <span
                  className="ft-ecommerce-seo-process__dot"
                  aria-hidden="true"
                />
              </div>

              <h3 className="ft-ecommerce-seo-process__step-title">
                {step.title}
              </h3>

              <p className="ft-ecommerce-seo-process__step-description">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SerpWireframe({active}: {active: boolean}) {
  return (
    <svg
      className={`ft-ecommerce-seo-process__serp${
        active ? ' is-active' : ''
      }`}
      viewBox="0 0 380 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main SERP card */}
      <rect
        x="16"
        y="16"
        width="220"
        height="208"
        rx="10"
        fill="#041f27"
      />

      <rect
        x="16"
        y="16"
        width="220"
        height="208"
        rx="10"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.5"
      />

      {/* Search bar */}
      <rect
        x="28"
        y="28"
        width="196"
        height="20"
        rx="10"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.7"
      />

      <circle
        cx="40"
        cy="38"
        r="4"
        stroke="#40adaa"
        strokeWidth="0.9"
      />

      <line
        x1="43"
        y1="41"
        x2="45"
        y2="43"
        stroke="#40adaa"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      <rect
        x="54"
        y="35"
        width="50"
        height="5"
        rx="2.5"
        fill="rgba(255,255,255,0.12)"
      />

      {/* Result 1 */}
      <rect
        x="26"
        y="56"
        width="200"
        height="46"
        rx="6"
        fill="rgba(64,173,170,0.08)"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--1"
        x="34"
        y="64"
        width="100"
        height="6"
        rx="3"
        fill="#afdddc"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--2"
        x="34"
        y="74"
        width="70"
        height="5"
        rx="2.5"
        fill="#40adaa"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--3"
        x="34"
        y="83"
        width="170"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.12)"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--4"
        x="34"
        y="90"
        width="140"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.12)"
      />

      {/* #1 badge */}
      <rect
        x="200"
        y="60"
        width="20"
        height="12"
        rx="6"
        fill="#40adaa"
        opacity="0.2"
      />

      <text
        x="210"
        y="69"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="7"
        fontWeight="600"
        fill="#afdddc"
      >
        #1
      </text>

      {/* Result 2 */}
      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--5"
        x="34"
        y="114"
        width="80"
        height="6"
        rx="3"
        fill="#afdddc"
        opacity="0.4"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--6"
        x="34"
        y="124"
        width="55"
        height="5"
        rx="2.5"
        fill="#40adaa"
        opacity="0.3"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--7"
        x="34"
        y="133"
        width="160"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.08)"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--8"
        x="34"
        y="140"
        width="130"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.08)"
      />

      {/* Result 3 */}
      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--9"
        x="34"
        y="158"
        width="65"
        height="5"
        rx="2.5"
        fill="#afdddc"
        opacity="0.2"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--10"
        x="34"
        y="167"
        width="45"
        height="4"
        rx="2"
        fill="#40adaa"
        opacity="0.15"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--11"
        x="34"
        y="175"
        width="140"
        height="3.5"
        rx="1.75"
        fill="rgba(255,255,255,0.06)"
      />

      {/* Result 4 */}
      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--12"
        x="34"
        y="192"
        width="55"
        height="5"
        rx="2.5"
        fill="#afdddc"
        opacity="0.1"
      />

      <rect
        className="ft-ecommerce-seo-process__serp-line ft-ecommerce-seo-process__serp-line--13"
        x="34"
        y="200"
        width="35"
        height="4"
        rx="2"
        fill="#40adaa"
        opacity="0.08"
      />

      {/* AI panel 1 */}
      <g className="ft-ecommerce-seo-process__serp-ai ft-ecommerce-seo-process__serp-ai--1">
        <rect
          x="250"
          y="40"
          width="116"
          height="80"
          rx="8"
          fill="rgba(64,173,170,0.06)"
          stroke="rgba(175,221,220,0.16)"
          strokeWidth="0.5"
        />

        <circle
          cx="264"
          cy="56"
          r="6"
          fill="rgba(64,173,170,0.15)"
          stroke="#40adaa"
          strokeWidth="0.5"
        />

        <rect
          x="276"
          y="50"
          width="78"
          height="4"
          rx="2"
          fill="#afdddc"
          opacity="0.4"
        />

        <rect
          x="276"
          y="58"
          width="78"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="276"
          y="65"
          width="60"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="276"
          y="72"
          width="72"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="260"
          y="86"
          width="50"
          height="12"
          rx="6"
          fill="rgba(64,173,170,0.12)"
        />

        <rect
          x="266"
          y="90"
          width="26"
          height="4"
          rx="2"
          fill="#afdddc"
          opacity="0.5"
        />
      </g>

      {/* AI panel 2 */}
      <g className="ft-ecommerce-seo-process__serp-ai ft-ecommerce-seo-process__serp-ai--2">
        <rect
          x="250"
          y="132"
          width="116"
          height="56"
          rx="8"
          fill="rgba(64,173,170,0.06)"
          stroke="rgba(175,221,220,0.16)"
          strokeWidth="0.5"
        />

        <circle
          cx="264"
          cy="148"
          r="6"
          fill="rgba(64,173,170,0.15)"
          stroke="#40adaa"
          strokeWidth="0.5"
        />

        <rect
          x="276"
          y="142"
          width="78"
          height="4"
          rx="2"
          fill="#afdddc"
          opacity="0.4"
        />

        <rect
          x="276"
          y="150"
          width="78"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="276"
          y="157"
          width="60"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="276"
          y="164"
          width="72"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="260"
          y="174"
          width="6"
          height="4"
          rx="1"
          fill="#40adaa"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}