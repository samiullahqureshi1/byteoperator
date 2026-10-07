'use client';

import {useEffect} from 'react';
import {openCalendly} from '~/lib/calendly';
import type {BookACallPageContent} from '~/lib/cms/types';

export function BookACallClient({content}: {content?: BookACallPageContent}) {
  useEffect(() => {
    openCalendly();
  }, []);

  const title = content?.heroTitle || 'Book a Call with Byte Operator';
  const subtitle =
    content?.heroSubtitle ||
    'Opening the scheduling calendar. If the calendar did not open automatically, click the button below.';
  const buttonText = content?.ctaButtonText || 'Open Calendar';

  return (
    <div style={{minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px'}}>
      {content?.heroEyebrow ? (
        <p style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '16px' }}>
          {content.heroEyebrow}
        </p>
      ) : null}
      <h1 style={{fontSize: '32px', marginBottom: '16px', color: '#fff'}}>{title}</h1>
      <p style={{color: '#aaa', maxWidth: '500px', marginBottom: '24px', lineHeight: 1.6}}>
        {subtitle}
      </p>
      <button
        type="button"
        onClick={() => openCalendly()}
        style={{
          padding: '14px 28px',
          background: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '100px',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
