'use client';

import React from 'react';

export function AddToCartButton({
  children,
  disabled,
  onClick,
  className,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines?: any[];
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
