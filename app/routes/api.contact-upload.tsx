import type {Route} from './+types/api.contact-upload';

const UPLOAD_FOLDER = 'foldtech/contact-uploads';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'pdf',
  'doc',
  'docx',
] as const;

const ALLOWED_MIME_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

const GENERIC_MIME_TYPES = [
  '',
  'application/octet-stream',
  'binary/octet-stream',
];

interface CloudinaryUploadResponse {
  secure_url?: string;
  error?: {message?: string};
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function getExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf('.');

  if (lastDot < 0) {
    return '';
  }

  return fileName.slice(lastDot + 1).toLowerCase();
}

/**
 * Cloudinary signed uploads are a SHA-1 of the alphabetically sorted
 * params being signed, with the API secret appended. The secret is only
 * ever read here, on the server, and is never returned to the browser.
 */
async function signUpload(params: Record<string, string>, apiSecret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  const digest = await crypto.subtle.digest(
    'SHA-1',
    new TextEncoder().encode(`${toSign}${apiSecret}`),
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function loader() {
  return jsonResponse({error: 'Method not allowed.'}, 405);
}

export async function action({context, request}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return jsonResponse({error: 'Method not allowed.'}, 405);
  }

  const cloudName = context.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = context.env.CLOUDINARY_API_KEY;
  const apiSecret = context.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return jsonResponse(
      {
        error:
          'File uploads are not available right now. Please send your file to info@thefoldtech.com instead.',
      },
      500,
    );
  }

  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return jsonResponse(
      {error: 'We could not read that upload. Please try again.'},
      400,
    );
  }

  const file = form.get('file');

  if (!(file instanceof File) || file.size === 0) {
    return jsonResponse({error: 'Please choose a file to upload.'}, 400);
  }

  if (file.size > MAX_FILE_SIZE) {
    return jsonResponse(
      {error: 'That file is larger than 10MB. Please upload a smaller file.'},
      400,
    );
  }

  const extension = getExtension(file.name);
  const mimeType = file.type.toLowerCase();

  const extensionAllowed = (ALLOWED_EXTENSIONS as readonly string[]).includes(
    extension,
  );
  const mimeAllowed =
    (ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType) ||
    GENERIC_MIME_TYPES.includes(mimeType);

  if (!extensionAllowed || !mimeAllowed) {
    return jsonResponse(
      {
        error:
          'That file type is not supported. Please upload a JPG, PNG, WEBP, PDF, DOC or DOCX file.',
      },
      400,
    );
  }

  const timestamp = Math.round(Date.now() / 1000).toString();

  const signature = await signUpload(
    {
      folder: UPLOAD_FOLDER,
      timestamp,
    },
    apiSecret,
  );

  const upload = new FormData();
  upload.append('file', file, file.name);
  upload.append('api_key', apiKey);
  upload.append('timestamp', timestamp);
  upload.append('folder', UPLOAD_FOLDER);
  upload.append('signature', signature);

  let response: Response;

  try {
    response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: 'POST',
        body: upload,
      },
    );
  } catch {
    return jsonResponse(
      {error: 'We could not reach the upload service. Please try again.'},
      502,
    );
  }

  let result: CloudinaryUploadResponse;

  try {
    result = (await response.json()) as CloudinaryUploadResponse;
  } catch {
    result = {};
  }

  if (!response.ok || !result.secure_url) {
    return jsonResponse(
      {
        error:
          result.error?.message ||
          'The upload failed. Please try again or email your file to info@thefoldtech.com.',
      },
      502,
    );
  }

  return jsonResponse({url: result.secure_url});
}
