import { NextResponse } from 'next/server';
import { getCurrentCmsUser, createSessionToken, CMS_COOKIE_NAME } from '~/lib/cms/auth';
import { verifyPassword, hashPassword } from '~/lib/cms/crypto';
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
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'New passwords do not match' },
        { status: 400 }
      );
    }

    // Verify old password
    const isCurrentValid = verifyPassword(
      currentPassword,
      session.user.passwordHash,
      session.user.salt
    );

    if (!isCurrentValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const { hash, salt } = hashPassword(newPassword);

    const updatedUser = {
      ...session.user,
      passwordHash: hash,
      salt: salt,
    };

    updateUser(updatedUser);

    // Refresh token
    const token = createSessionToken(updatedUser, session.session.twoFactorVerified);

    const response = NextResponse.json({
      success: true,
      message: 'Password successfully updated',
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
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
