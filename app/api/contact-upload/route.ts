import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({error: 'No file provided'}, {status: 400});
    }

    // In local / production without external S3, we accept the file metadata or convert small files
    const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    console.log(`[Upload] File received: ${fileName} (${(file.size / 1024).toFixed(1)} KB)`);

    // Return a reference URL or placeholder acknowledgment
    const simulatedUrl = `https://byteoperator.com/uploads/${Date.now()}_${fileName}`;

    return NextResponse.json({
      ok: true,
      url: simulatedUrl,
      fileName,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('[Upload] Error processing file:', error);
    return NextResponse.json(
      {error: 'Failed to process file upload'},
      {status: 500},
    );
  }
}
