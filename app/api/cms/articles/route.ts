import { NextResponse } from 'next/server';
import { getCmsArticles, createCmsArticle } from '~/lib/cms/db';
import { verifyAdminRequest, getCurrentCmsUser } from '~/lib/cms/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = getCurrentCmsUser();
    // Allow drafts to be returned only if admin is logged in or if explicitly requested with admin session
    const includeDrafts = Boolean(user && searchParams.get('all') === 'true');

    const articles = getCmsArticles(includeDrafts);
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
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

    const body = await req.json();
    const { title, excerpt, contentHtml, category, handle, status, featured, mainFeatured, image, seo } = body;

    if (!title || !handle) {
      return NextResponse.json(
        { error: 'Article Title and Handle/Slug are required' },
        { status: 400 }
      );
    }

    // Auto format handle slug
    const cleanHandle = handle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');

    const newArticle = createCmsArticle({
      title: title.trim(),
      handle: cleanHandle,
      excerpt: excerpt?.trim() || '',
      contentHtml: contentHtml || '',
      category: category || 'cro',
      articleType: 'Article',
      featured: Boolean(featured),
      mainFeatured: Boolean(mainFeatured),
      status: status === 'draft' ? 'draft' : 'published',
      image: {
        url: image?.url || '/images/mega-menu-resources.webp',
        altText: image?.altText || title,
        width: image?.width || 1200,
        height: image?.height || 675,
      },
      seo: {
        title: seo?.title || title,
        description: seo?.description || excerpt || '',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Article created successfully',
      article: newArticle,
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
