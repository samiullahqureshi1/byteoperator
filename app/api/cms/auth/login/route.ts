import { NextResponse } from 'next/server';
import { getUserByEmail } from '~/lib/cms/db';
import { verifyPassword } from '~/lib/cms/crypto';
import { createSessionToken, CMS_COOKIE_NAME } from '~/lib/cms/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please check your email and password.' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please check your email and password.' },
        { status: 401 }
      );
    }

    // If 2FA is enabled, prompt user to enter TOTP code
    if (user.twoFactorEnabled) {
      return NextResponse.json({
        success: true,
        requires2fa: true,
        userId: user.id,
        email: user.email,
      });
    }

    // Create session token
    const token = createSessionToken(user, false);

    const response = NextResponse.json({
      success: true,
      requires2fa: false,
      user: {
        id: user.id,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });

    response.cookies.set({
      name: CMS_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
