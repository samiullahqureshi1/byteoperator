'use client';

import {HomeFeature} from '~/components/HomeFeature';
import type {HomeFeatureData} from '~/data/homeFeatures';

const WHY_CHOOSE_FEATURE: HomeFeatureData = {
  id: 'why-choose-byte-operator',
  layout: 'media-left',
  spacing: 'standard',
  theme: 'dark',
  eyebrow: 'WHY CHOOSE BYTE OPERATOR?',
  heading: 'More Than a Software Vendor. Your Healthcare Technology Partner.',
  description: [
    'Choosing the right technology partner means finding a team that understands both your operational challenges and the engineering required to address them.',
    '• AI and Software Under One Roof: Bring automation, custom application development, and system integration together through one engineering partner.',
    '• Solutions Built Around Your Workflow: We begin with your operational requirements rather than forcing your organization into a generic solution.',
    '• Connected Technology: Develop applications and workflows that work together through suitable APIs and integrations.',
    '• Practical Engineering: Select technologies and architectures based on your requirements, project scope, and long-term goals.',
    '• Built for Future Growth: Develop solutions with maintainability, future enhancements, and changing operational needs in mind.',
  ],
  buttons: [
    {
      label: 'Book a Discovery Call',
      href: '/contact',
      calendly: true,
    },
  ],
  media: {
    href: '/contact',
    primary:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Why_Choose_Byte_Operator_Image.png?v=1793803162',
    primaryAlt:
      'Why Choose Byte Operator - Healthcare AI and Software Engineering Partner',
    primaryWidth: 1920,
    primaryHeight: 1080,
    secondary: '',
    secondaryAlt: '',
    secondaryWidth: 0,
    secondaryHeight: 0,
    captionTitle: 'Engineering Partnership',
    captionText: 'Scalable Software & Intelligent Healthcare Workflows',
  },
};

export function HomeWhyChoose() {
  return <HomeFeature feature={WHY_CHOOSE_FEATURE} />;
}
