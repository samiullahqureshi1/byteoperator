import { NextResponse } from 'next/server';
import { getCmsArticleByHandle, updateCmsArticle, deleteCmsArticle } from '~/lib/cms/db';
import { verifyAdminRequest } from '~/lib/cms/auth';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = getCmsArticleByHandle(params.id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Error getting article:', error);
    return NextResponse.json({ error: 'Failed to retrieve article' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = verifyAdminRequest();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const updates = await req.json();
    const updated = updateCmsArticle(params.id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      article: updated,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = verifyAdminRequest();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const deleted = deleteCmsArticle(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
