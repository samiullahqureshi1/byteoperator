import {NextResponse} from 'next/server';
import {sendLeadNotificationEmail} from '~/lib/email-service';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let payload: Record<string, any> = {};

    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      const data = await request.formData();
      payload = {
        firstName: data.get('firstName')?.toString() || '',
        lastName: data.get('lastName')?.toString() || '',
        name: data.get('name')?.toString() || '',
        company: data.get('company')?.toString() || '',
        email: data.get('email')?.toString() || '',
        phone: data.get('phone')?.toString() || '',
        budget: data.get('budget')?.toString() || '',
        service: data.get('service')?.toString() || '',
        source: data.get('source')?.toString() || '',
        message: data.get('message')?.toString() || '',
        uploadedUrl: data.get('uploadedUrl')?.toString() || '',
        enquirySource: data.get('enquirySource')?.toString() || '',
        website: data.get('website')?.toString() || '', // honeypot
        marketingConsent: data.get('marketingConsent') === 'on' || data.get('marketingConsent') === 'true',
      };
    }

    // Honeypot check for bots
    if (payload.website) {
      console.warn('[Contact] Honeypot triggered by bot submission.');
      return NextResponse.json({ok: true, success: true});
    }

    if (!payload.email) {
      return NextResponse.json(
        {ok: false, error: 'Email address is required.'},
        {status: 400},
      );
    }

    // Send notification email to samiullah@byteoperator.com
    await sendLeadNotificationEmail({
      firstName: payload.firstName,
      lastName: payload.lastName,
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      budget: payload.budget,
      service: payload.service,
      source: payload.source,
      message: payload.message,
      uploadedUrl: payload.uploadedUrl,
      enquirySource: payload.enquirySource,
      marketingConsent: payload.marketingConsent,
    });

    return NextResponse.json({
      ok: true,
      success: true,
      message: 'Thank you for reaching out! We have received your message and will respond within 24 hours.',
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to process submission',
      },
      {status: 500},
    );
  }
}
