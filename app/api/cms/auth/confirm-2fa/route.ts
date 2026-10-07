import { NextResponse } from 'next/server';
import { getCurrentCmsUser, createSessionToken, CMS_COOKIE_NAME } from '~/lib/cms/auth';
import { verifyTotp } from '~/lib/cms/crypto';
import { updateUser } from '~/lib/cms/db';

export async function POST(req: Request) {
  try {
    const session = getCurrentCmsUser();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid CMS session required' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { secret, code, recoveryCodes } = body;

    if (!secret || !code) {
      return NextResponse.json(
        { error: 'Secret and verification code are required' },
        { status: 400 }
      );
    }

    const isValid = verifyTotp(code.trim(), secret);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid 6-digit verification code. Please check your authenticator app.' },
        { status: 400 }
      );
    }

    // Save 2FA setup to user
    const updatedUser = {
      ...session.user,
      twoFactorEnabled: true,
      twoFactorSecret: secret,
      recoveryCodes: Array.isArray(recoveryCodes) ? recoveryCodes : [],
    };

    updateUser(updatedUser);

    // Reissue session token with twoFactorVerified: true
    const token = createSessionToken(updatedUser, true);

    const response = NextResponse.json({
      success: true,
      message: 'Two-factor authentication has been successfully enabled.',
    });

    response.cookies.set({
      name: CMS_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Confirm 2FA error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm 2FA' },
      { status: 500 }
    );
  }
}
