'use client';

import {HomeFeature} from '~/components/HomeFeature';
import type {HomeFeatureData} from '~/data/homeFeatures';

const SECURITY_FEATURE: HomeFeatureData = {
  id: 'security-privacy',
  layout: 'media-left',
  spacing: 'standard',
  theme: 'dark',
  eyebrow: 'SECURITY & PRIVACY',
  heading: 'Security and Privacy Considerations From the Start',
  description: [
    'Healthcare technology can involve sensitive information, making security and privacy important considerations throughout the development process.',
    '• Role-Based Access: User authentication, granular permissions, and least-privilege security.',
    '• Data Protection: Modern cryptographic encryption protocols in transit and at rest.',
    '• Secure API Architecture: Validated endpoints, rate-limiting, and secured access tokens.',
    '• Audit Trails & Monitoring: Structured activity logs and system monitoring for full traceability.',
    '• Resilience & Disaster Recovery: Automated backup planning and structured data retention schedules.',
    'Healthcare projects must be evaluated against applicable legal, contractual, and regulatory requirements. Security requirements are defined during project discovery rather than making unsupported blanket claims.',
  ],
  buttons: [
    {
      label: 'Discuss Security Requirements',
      href: '/contact',
    },
  ],
  media: {
    href: '/contact',
    primary:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Security_Privacy_Section_Image.png?v=1793803531',
    primaryAlt:
      'Security and Privacy Considerations From the Start - Byte Operator Healthcare Engineering',
    primaryWidth: 1920,
    primaryHeight: 1080,
    secondary: '',
    secondaryAlt: '',
    secondaryWidth: 0,
    secondaryHeight: 0,
    captionTitle: 'Security & Privacy Engineering',
    captionText: 'Architectural Safeguards, Encryption & Access Controls',
  },
};

export function HomeSecurityPrivacy() {
  return <HomeFeature feature={SECURITY_FEATURE} />;
}
