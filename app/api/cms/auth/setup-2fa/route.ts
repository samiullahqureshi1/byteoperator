import { NextResponse } from 'next/server';
import { getCurrentCmsUser } from '~/lib/cms/auth';
import { generateBase32Secret, generateOtpAuthUri, generateRecoveryCodes } from '~/lib/cms/crypto';

export async function POST() {
  try {
    const session = getCurrentCmsUser();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid CMS session required' },
        { status: 401 }
      );
    }

    const secret = generateBase32Secret(20);
    const otpAuthUri = generateOtpAuthUri(session.user.email, secret, 'ByteOperator');
    const recoveryCodes = generateRecoveryCodes(8);

    return NextResponse.json({
      success: true,
      secret,
      otpAuthUri,
      recoveryCodes,
    });
  } catch (error) {
    console.error('Setup 2FA error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate 2FA setup' },
      { status: 500 }
    );
  }
}
