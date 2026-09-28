import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {AboutHero} from '~/components/about/AboutHero';
import {AboutStoryStats} from '~/components/about/AboutStoryStats';
import {AboutValues} from '~/components/about/AboutValues';
import {AboutFounders} from '~/components/about/AboutFounders';
import {AboutTestimonials} from '~/components/about/AboutTestimonials';
import {AboutSpace} from '~/components/about/AboutSpace';
import {AboutJoin} from '~/components/about/AboutJoin';
import {HomeObservatory} from '~/components/HomeObservatory';

export const metadata: Metadata = pageMetadata({
  title: 'About Byte Operator — AI Automation & Custom Software Engineering',
  description:
    'Learn about Byte Operator, an independent software engineering and AI automation company delivering custom SaaS platforms, modern web apps, and intelligent agent workflows.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutStoryStats />
      <AboutValues />
      <AboutFounders />
      <AboutTestimonials />
      <AboutSpace />
      <AboutJoin />
      <HomeObservatory />
    </div>
  );
}
