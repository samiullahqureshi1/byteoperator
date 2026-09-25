import React from 'react';

export function Image({
  data,
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  ...props
}: any) {
  const imgSrc = data?.url || src;
  const imgAlt = data?.altText || alt || '';
  const imgWidth = data?.width || width;
  const imgHeight = data?.height || height;

  if (!imgSrc) return null;

  return (
    <img
      src={imgSrc}
      alt={imgAlt}
      width={imgWidth}
      height={imgHeight}
      className={className}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      {...props}
    />
  );
}
