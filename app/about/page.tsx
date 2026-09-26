import type {Metadata} from 'next';
import {AboutHero} from '~/components/about/AboutHero';
import {AboutStoryStats} from '~/components/about/AboutStoryStats';
import {AboutValues} from '~/components/about/AboutValues';
import {AboutTeam} from '~/components/about/AboutTeam';
import {AboutTestimonials} from '~/components/about/AboutTestimonials';
import {AboutSpace} from '~/components/about/AboutSpace';
import {AboutJoin} from '~/components/about/AboutJoin';
import {HomeObservatory} from '~/components/HomeObservatory';

export const metadata: Metadata = {
  title: 'About Us | Byte Operator - Elite Software Engineering, Commerce & AI Agency',
  description:
    'Discover Byte Operator, an elite software engineering agency specializing in high-performance web development, headless ecommerce, conversion rate optimization, and autonomous AI automation.',
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
      {/* <AboutTeam /> */}
      <AboutTestimonials />
      <AboutSpace />
      <AboutJoin />
      <HomeObservatory />
    </div>
  );
}
