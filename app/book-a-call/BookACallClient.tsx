'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import type {BookACallPageContent} from '~/lib/cms/types';

export function BookACallClient({content}: {content?: BookACallPageContent}) {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contact');
  }, [router]);

  return (
    <div style={{minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px'}}>
      <h1 style={{fontSize: '28px', marginBottom: '16px', color: '#fff'}}>Redirecting to Contact...</h1>
      <a
        href="/contact"
        style={{
          padding: '12px 24px',
          background: '#38bdf8',
          color: '#000',
          borderRadius: '100px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Go to Contact Page
      </a>
    </div>
  );
}
