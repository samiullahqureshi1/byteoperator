'use client';

import React, {useId} from 'react';
import {useLocation} from '~/lib/router-compat';
import {Link} from '~/lib/router-compat';
import {FloatingContactCta} from './FloatingContactCta';
import {Aside, useAside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {SITE_HEADER_MENU, SITE_FOOTER_MENU} from '~/data/navigation';

interface PageLayoutProps {
  children?: React.ReactNode;
}

export function PageLayout({children = null}: PageLayoutProps) {
  const {pathname} = useLocation();
  const isAboutPage = pathname.replace(/\/+$/, '') === '/about';

  return (
    <Aside.Provider>
      <SearchAside />
      <MobileMenuAside header={SITE_HEADER_MENU as any} publicStoreDomain="byteoperator.com" />
      <Header
        header={SITE_HEADER_MENU as any}
        cart={Promise.resolve(null)}
        isLoggedIn={Promise.resolve(false)}
        publicStoreDomain="byteoperator.com"
        variant="default"
      />
      <main>{children}</main>
      <Footer
        footer={Promise.resolve(SITE_FOOTER_MENU as any)}
        header={SITE_HEADER_MENU as any}
        publicStoreDomain="byteoperator.com"
      />
      <FloatingContactCta />
    </Aside.Provider>
  );
}

function SearchAside() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const {close} = useAside();

  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchTerm.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
            }
          }}
          style={{display: 'flex', gap: '8px'}}
        >
          <input
            name="q"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services, work, insights..."
            type="search"
            style={{flex: 1, padding: '10px 14px', borderRadius: '4px', border: '1px solid #333', background: '#111', color: '#fff'}}
          />
          <button type="submit" style={{padding: '10px 18px', background: '#fff', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}>
            Search
          </button>
        </form>

        <div style={{marginTop: '24px'}}>
          <p style={{fontSize: '13px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px'}}>Popular Searches</p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li>
              <Link href="/shopify-plus-agency" style={{color: '#fff', textDecoration: 'none', fontSize: '15px'}} onClick={close}>
                Enterprise Software Agency →
              </Link>
            </li>
            <li>
              <Link href="/shopify-cro-audit" style={{color: '#fff', textDecoration: 'none', fontSize: '15px'}} onClick={close}>
                Conversion & Performance Optimization Audit →
              </Link>
            </li>
            <li>
              <Link href="/ecommerce-seo-agency" style={{color: '#fff', textDecoration: 'none', fontSize: '15px'}} onClick={close}>
                Ecommerce SEO Agency →
              </Link>
            </li>
            <li>
              <Link href="/work" style={{color: '#fff', textDecoration: 'none', fontSize: '15px'}} onClick={close}>
                Case Studies &amp; Portfolio →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: any;
  publicStoreDomain: string;
}) {
  return (
    <Aside type="mobile" heading="MENU">
      <HeaderMenu
        menu={header.menu}
        viewport="mobile"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside>
  );
}
