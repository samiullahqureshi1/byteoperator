import type {JsonLdDescriptor} from '~/lib/seo/jsonld';
import {jsonLdString} from '~/lib/seo/schema';

/** Renders the single page-level @graph built by the `~/lib/seo/jsonld` helpers. */
export function JsonLd({graph}: {graph: JsonLdDescriptor[]}) {
  const node = graph[0]?.['script:ld+json'];
  if (!node) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: jsonLdString(node)}}
    />
  );
}
