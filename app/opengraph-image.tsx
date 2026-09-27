import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {ImageResponse} from 'next/og';

// Default share image for every route (1200×630, what LinkedIn, X, Slack and
// Facebook expect for large previews).
export const alt = 'Byte Operator – The Software Agency That Drives Real Growth';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

const NAVY = '#0d1a3a';
const BLUE = '#0550ff';

export default async function OpengraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), 'public/images/site-icon.png'),
  );
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#ffffff',
          borderBottom: `16px solid ${BLUE}`,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={120} height={120} alt="" />
          <div style={{fontSize: 56, fontWeight: 700, color: NAVY}}>
            Byte Operator
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              color: NAVY,
              letterSpacing: '-1.5px',
            }}
          >
            The Software Agency That Drives Real Growth
          </div>
          <div style={{fontSize: 32, color: '#4a5578'}}>
            Custom software · CRO · SEO · AI visibility
          </div>
        </div>

        <div style={{fontSize: 28, fontWeight: 600, color: BLUE}}>
          byteoperator.com
        </div>
      </div>
    ),
    size,
  );
}
