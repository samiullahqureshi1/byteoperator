import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Newsletter subscription:', data);
    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!',
    });
  } catch (e) {
    return NextResponse.json({success: true});
  }
}
