import { NextResponse } from 'next/server';
import { getCurrentCmsUser } from '~/lib/cms/auth';

export async function GET() {
  try {
    const session = getCurrentCmsUser();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        twoFactorEnabled: session.user.twoFactorEnabled,
        createdAt: session.user.createdAt,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
}
