import type {Metadata} from 'next';
import {AboutHero} from '~/components/about/AboutHero';
import {AboutStoryStats} from '~/components/about/AboutStoryStats';
import {AboutValues} from '~/components/about/AboutValues';
import {AboutTestimonials} from '~/components/about/AboutTestimonials';
import {AboutSpace} from '~/components/about/AboutSpace';
import {AboutJoin} from '~/components/about/AboutJoin';
import {HomeObservatory} from '~/components/HomeObservatory';

export const metadata: Metadata = {
  title: 'About Us | Byte Operator - Leading Software & Ecommerce Agency',
  description:
    'We are Byte Operator, an elite software agency specializing in high performance store development, conversion rate optimization, and AI commerce strategy.',
  alternates: {
    canonical: 'https://byteoperator.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutStoryStats />
      <AboutValues />
      <AboutTestimonials />
      <AboutSpace />
      <AboutJoin />
      <HomeObservatory />
    </div>
  );
}
