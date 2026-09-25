'use client';

import React from 'react';
import {Link} from '~/lib/router-compat';
import {useAside} from '~/components/Aside';

export type CartLayout = 'page' | 'aside';

export function CartMain({layout = 'aside'}: {cart?: any; layout?: CartLayout}) {
  const {close} = useAside();

  return (
    <div className="cart-main" style={{padding: '24px', textAlign: 'center'}}>
      <p style={{fontSize: '18px', color: '#fff', marginBottom: '16px'}}>Your cart is currently empty.</p>
      <p style={{fontSize: '14px', color: '#888', marginBottom: '24px'}}>
        Explore our dedicated software development packages and consulting services.
      </p>
      <Link
        href="/services"
        onClick={close}
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#fff',
          color: '#000',
          borderRadius: '100px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        Explore Services →
      </Link>
    </div>
  );
}
