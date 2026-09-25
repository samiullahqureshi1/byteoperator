import React from 'react';

export function Money({
  data,
  as: Component = 'span',
  withoutTrailingZeros = false,
  className,
  ...props
}: any) {
  if (!data) return null;
  const amount = parseFloat(data.amount || '0');
  const currencyCode = data.currencyCode || 'USD';
  
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: withoutTrailingZeros && amount % 1 === 0 ? 0 : 2,
  }).format(amount);

  return <Component className={className} {...props}>{formatted}</Component>;
}
