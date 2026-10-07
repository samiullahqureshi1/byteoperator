import { NextResponse } from 'next/server';
import { CMS_COOKIE_NAME } from '~/lib/cms/auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete(CMS_COOKIE_NAME);
  return response;
}
