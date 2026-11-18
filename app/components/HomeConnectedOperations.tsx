'use client';

import {HomeFeature} from '~/components/HomeFeature';
import type {HomeFeatureData} from '~/data/homeFeatures';

const CONNECTED_OPS_FEATURE: HomeFeatureData = {
  id: 'connected-healthcare-operations',
  layout: 'media-right',
  spacing: 'standard',
  theme: 'dark',
  eyebrow: 'CONNECTED HEALTHCARE OPERATIONS',
  heading: 'From Patient Communication to Connected Healthcare Operations',
  description: [
    'Healthcare automation is most effective when individual processes work together. We design connected workflows that help manage requests from the first patient interaction through to the appropriate application or team member.',
    '• 01 Patient Contact: A patient contacts the practice through a supported communication channel.',
    '• 02 AI Communication: An AI agent handles approved routine inquiries and captures relevant information.',
    '• 03 Workflow Automation: Automated processes trigger the appropriate administrative actions based on agreed rules.',
    '• 04 System Integration: Relevant information moves between supported applications through configured integrations.',
    '• 05 Human Handover: Requests requiring personal attention are routed to the appropriate staff member.',
    '• 06 Follow-Up: Approved reminders, notifications, and follow-up tasks are triggered according to the configured workflow.',
    'Each solution is scoped around the organization’s systems, policies, and operational requirements. Human oversight remains essential for requests requiring staff judgment or clinical attention.',
  ],
  buttons: [
    {
      label: 'Plan Your Connected Operations',
      href: '/contact',
    },
  ],
  media: {
    href: '/contact',
    primary:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Connected_Operations_Section_Image.png?v=1793802992',
    primaryAlt:
      'From Patient Communication to Connected Healthcare Operations',
    primaryWidth: 1920,
    primaryHeight: 1080,
    secondary: '',
    secondaryAlt: '',
    secondaryWidth: 0,
    secondaryHeight: 0,
    captionTitle: 'Connected Healthcare Operations',
    captionText: 'End-to-End Automated & Integrated Clinical Workflows',
  },
};

export function HomeConnectedOperations() {
  return <HomeFeature feature={CONNECTED_OPS_FEATURE} />;
}
