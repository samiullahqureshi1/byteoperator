import {NextResponse} from 'next/server';
import {sendLeadNotificationEmail} from '~/lib/email-service';

export async function GET() {
  return NextResponse.json({
    token: 'audit-token-' + Date.now(),
    captchaSiteKey: null,
  });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let payload: Record<string, any> = {};

    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      const data = await request.formData();
      payload = {
        website: data.get('url') || data.get('website') || '',
        email: data.get('email')?.toString() || '',
        name: data.get('name')?.toString() || '',
        honeypot: data.get('homepage')?.toString() || '',
      };
    }

    if (payload.honeypot) {
      return NextResponse.json({success: true, ok: true});
    }

    if (!payload.email) {
      return NextResponse.json(
        {error: 'Email address is required.'},
        {status: 400},
      );
    }

    // Forward Audit request directly to info@byteoperator.com
    await sendLeadNotificationEmail({
      name: payload.name || 'AI Audit Requester',
      email: payload.email,
      service: 'Free AI Visibility Audit',
      source: 'AI Visibility Audit Landing Page',
      message: `Requested free AI Visibility Audit for store / website: ${payload.website || 'Not specified'}`,
      enquirySource: 'AI Visibility Audit Form',
    });

    return NextResponse.json({
      success: true,
      ok: true,
      message: 'Your AI Visibility Audit request has been scheduled! We will email you the report within 3 working days.',
    });
  } catch (error) {
    console.error('Audit signup error:', error);
    return NextResponse.json(
      {error: 'Failed to schedule audit'},
      {status: 500},
    );
  }
}
