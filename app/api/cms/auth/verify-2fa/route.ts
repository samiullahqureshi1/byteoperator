import { NextResponse } from 'next/server';
import { getUserById, updateUser } from '~/lib/cms/db';
import { verifyTotp } from '~/lib/cms/crypto';
import { createSessionToken, CMS_COOKIE_NAME } from '~/lib/cms/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, code } = body;

    if (!userId || !code) {
      return NextResponse.json(
        { error: 'User ID and 2FA code are required' },
        { status: 400 }
      );
    }

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not enabled for this user' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim();
    let isTotpValid = verifyTotp(cleanCode, user.twoFactorSecret);
    let isRecoveryCodeUsed = false;

    // Also check recovery codes if TOTP doesn't match
    if (!isTotpValid && user.recoveryCodes && user.recoveryCodes.length > 0) {
      const recoveryIndex = user.recoveryCodes.findIndex(
        (rc) => rc.replace('-', '').toUpperCase() === cleanCode.replace('-', '').toUpperCase()
      );
      if (recoveryIndex !== -1) {
        isTotpValid = true;
        isRecoveryCodeUsed = true;
        // Remove used recovery code
        const updatedRecoveryCodes = [...user.recoveryCodes];
        updatedRecoveryCodes.splice(recoveryIndex, 1);
        updateUser({
          ...user,
          recoveryCodes: updatedRecoveryCodes,
        });
      }
    }

    if (!isTotpValid) {
      return NextResponse.json(
        { error: 'Invalid 2FA code or recovery code. Please try again.' },
        { status: 401 }
      );
    }

    // Generate verified session token
    const token = createSessionToken(user, true);

    const response = NextResponse.json({
      success: true,
      recoveryCodeUsed: isRecoveryCodeUsed,
      user: {
        id: user.id,
        email: user.email,
        twoFactorEnabled: true,
      },
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
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { error: 'Internal error verifying 2FA code' },
      { status: 500 }
    );
  }
}
