import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const budget = data.get('budget');
    const services = data.getAll('services');

    console.log('Contact form submission received:', {name, email, message, budget, services});

    // Successfully received lead
    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Our team will get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return NextResponse.json(
      {error: 'Failed to process submission'},
      {status: 500},
    );
  }
}
