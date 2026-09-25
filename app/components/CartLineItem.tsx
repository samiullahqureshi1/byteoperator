'use client';

import React from 'react';

export type CartLine = any;

export function CartLineItem({line}: {line: any}) {
  return (
    <div className="cart-line-item">
      <span>{line?.title || 'Item'}</span>
    </div>
  );
}
