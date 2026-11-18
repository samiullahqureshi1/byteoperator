'use client';

import {HomeFeature} from '~/components/HomeFeature';
import type {HomeFeatureData} from '~/data/homeFeatures';

const PROCESS_FEATURE: HomeFeatureData = {
  id: 'development-process',
  layout: 'media-right',
  spacing: 'standard',
  theme: 'dark',
  eyebrow: 'OUR DEVELOPMENT PROCESS',
  heading: 'A Clear Process From Discovery to Deployment',
  description: [
    'We follow a structured approach to understand your requirements, plan the solution, and deliver the agreed technology.',
    '• 01 Discovery & Requirements: Understand your organization, workflows, users, existing systems, and project objectives.',
    '• 02 Solution Design: Define the project scope, technical architecture, integration requirements, and implementation approach.',
    '• 03 Development & Integration: Build the agreed application, automation, or connected system.',
    '• 04 Testing & Deployment: Evaluate functionality, permissions, integrations, and expected workflows before deployment.',
    '• 05 Support & Improvement: Provide agreed maintenance, technical support, and future development.',
  ],
  buttons: [
    {
      label: 'Discuss Your Project',
      href: '/contact',
    },
  ],
  media: {
    href: '/contact',
    primary:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Development_Process_Section_Image.png?v=1793803314',
    primaryAlt:
      'Our Development Process - A Clear Process From Discovery to Deployment',
    primaryWidth: 1920,
    primaryHeight: 1080,
    secondary: '',
    secondaryAlt: '',
    secondaryWidth: 0,
    secondaryHeight: 0,
    captionTitle: 'Development Process',
    captionText: 'Structured Engineering From Scoping to Deployment',
  },
};

export function HomeProcess() {
  return <HomeFeature feature={PROCESS_FEATURE} />;
}
