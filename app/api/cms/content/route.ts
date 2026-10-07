import { NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '~/lib/cms/db';
import { verifyAdminRequest } from '~/lib/cms/auth';
import { CmsSiteContent } from '~/lib/cms/types';

export async function GET() {
  try {
    const content = getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error fetching CMS content:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve site content' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = verifyAdminRequest();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const updates: Partial<CmsSiteContent> = await req.json();
    const updated = updateSiteContent(updates);

    return NextResponse.json({
      success: true,
      message: 'Page content updated successfully',
      content: updated,
    });
  } catch (error) {
    console.error('Error updating CMS content:', error);
    return NextResponse.json(
      { error: 'Failed to update site content' },
      { status: 500 }
    );
  }
}
