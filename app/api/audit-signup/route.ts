import {NextResponse} from 'next/server';

export async function GET() {
  return NextResponse.json({
    token: 'audit-token-' + Date.now(),
    captchaSiteKey: null,
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const url = data.get('url') || data.get('website');
    const email = data.get('email');
    const name = data.get('name');

    console.log('AI Visibility Audit requested:', {url, email, name});

    return NextResponse.json({
      success: true,
      message: 'Your AI Visibility Audit request has been scheduled! We will email you the report.',
    });
  } catch (error) {
    console.error('Audit signup error:', error);
    return NextResponse.json(
      {error: 'Failed to schedule audit'},
      {status: 500},
    );
  }
}
