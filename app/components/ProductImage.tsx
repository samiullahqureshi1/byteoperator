import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
  productTitle,
}: {
  image: ProductVariantFragment['image'];
  productTitle?: string;
}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        /*
         * Falls back to the product name rather than the generic
         * "Product Image", which tells a screen reader nothing.
         */
        alt={image.altText || productTitle || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
