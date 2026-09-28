/*
 * Line icons for the case study "Technologies" section. Shapes match the
 * marks in /images/home-partners/*.svg; anything without a dedicated icon
 * falls back to a generic code glyph.
 */
const ICONS: Record<string, JSX.Element> = {
  'next.js': (
    <>
      <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19.5 22.5L11 11h-2v14h2.2v-9.5l8.3 11.2a13 13 0 0 0 2-1.7v-7h-2v4z" fill="currentColor" />
    </>
  ),
  'node.js': (
    <>
      <path d="M14 1L25 7.3V20.7L14 27L3 20.7V7.3L14 1Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 17.5V10.5L15 14L9 17.5Z" fill="currentColor" />
    </>
  ),
  graphql: (
    <>
      <path d="M14 2L24.4 8V20L14 26L3.6 20V8L14 2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 6L21 18H7Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="6" r="2" fill="currentColor" />
      <circle cx="21" cy="18" r="2" fill="currentColor" />
      <circle cx="7" cy="18" r="2" fill="currentColor" />
    </>
  ),
  websockets: (
    <path
      d="M4 10h18m0 0l-4-4m4 4l-4 4M24 18H6m0 0l4-4m-4 4l4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  n8n: (
    <>
      <rect x="1" y="7" width="10" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="17" y="7" width="10" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 14h6" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  react: (
    <g transform="translate(14 14)">
      <circle r="2.6" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.4">
        <ellipse rx="12.5" ry="4.8" />
        <ellipse rx="12.5" ry="4.8" transform="rotate(60)" />
        <ellipse rx="12.5" ry="4.8" transform="rotate(120)" />
      </g>
    </g>
  ),
  cloud: (
    <path
      d="M21.5 11.5C20.8 7.5 17.3 4.5 13 4.5C9.2 4.5 6 6.8 4.8 10.2C3.2 10.8 2 12.5 2 14.5C2 17 4 19 6.5 19H23.5C25.5 19 27 17.5 27 15.5C27 13.7 25.8 12.1 24 11.7L21.5 11.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  code: (
    <path
      d="M10 8l-6 6 6 6M18 8l6 6-6 6M16 5l-4 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

function iconKey(name: string): string {
  const key = name.toLowerCase();
  if (ICONS[key]) return key;
  if (key.includes('cloudflare') || key.includes('cloud')) return 'cloud';
  if (key.includes('websocket')) return 'websockets';
  return 'code';
}

export function TechIcon({name}: {name: string}) {
  return (
    <svg
      className="ft-cs__tech-icon"
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      aria-hidden="true"
    >
      {ICONS[iconKey(name)]}
    </svg>
  );
}
