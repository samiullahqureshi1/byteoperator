'use client';

import {useEffect} from 'react';
import {openCalendly} from '~/lib/calendly';

export default function BookACallPage() {
  useEffect(() => {
    openCalendly();
  }, []);

  return (
    <div style={{minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px'}}>
      <h1 style={{fontSize: '32px', marginBottom: '16px', color: '#fff'}}>Book a Call with Byte Operator</h1>
      <p style={{color: '#aaa', maxWidth: '500px', marginBottom: '24px', lineHeight: 1.6}}>
        Opening the scheduling calendar. If the calendar did not open automatically, click the button below.
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
        Open Calendar
      </button>
    </div>
  );
}
