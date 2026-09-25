import type {Metadata} from 'next';
import {EcommerceSeoHero} from '~/components/seo/EcommerceSeoHero';
import {EcommerceSeoProofStrip, ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS} from '~/components/seo/EcommerceSeoProofStrip';
import {EcommerceSeoAboutStatement} from '~/components/seo/EcommerceSeoAboutStatement';
import {EcommerceSeoCases} from '~/components/seo/EcommerceSeoCases';
import {EcommerceSeoProcess} from '~/components/seo/EcommerceSeoProcess';
import {EcommerceSeoServices} from '~/components/seo/EcommerceSeoServices';
import {EcommerceSeoTechStack} from '~/components/seo/EcommerceSeoTechStack';
import {EcommerceSeoEducation} from '~/components/seo/EcommerceSeoEducation';
import {EcommerceSeoReporting} from '~/components/seo/EcommerceSeoReporting';
import {EcommerceSeoSoftwareSpecialism} from '~/components/seo/EcommerceSeoSoftwareSpecialism';
import {EcommerceSeoResults} from '~/components/seo/EcommerceSeoResults';
import {HomeExperts} from '~/components/HomeExperts';

export const metadata: Metadata = {
  title: 'Ecommerce SEO Agency | Byte Operator - Dominate Organic & AI Search',
  description:
    'Generate predictable revenue from Google, ChatGPT, and Perplexity with specialized Ecommerce SEO and Generative Engine Optimization.',
  alternates: {
    canonical: 'https://byteoperator.com/ecommerce-seo-agency',
  },
};

export default function EcommerceSeoAgencyPage() {
  return (
    <div className="ecommerce-seo-page">
      <EcommerceSeoHero />
      <EcommerceSeoProofStrip items={ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS} />
      <EcommerceSeoAboutStatement />
      <EcommerceSeoCases />
      <EcommerceSeoProcess />
      <EcommerceSeoServices />
      <EcommerceSeoTechStack />
      <EcommerceSeoEducation />
      <EcommerceSeoReporting />
      <EcommerceSeoSoftwareSpecialism />
      <EcommerceSeoResults />
      <HomeExperts />
    </div>
  );
}
