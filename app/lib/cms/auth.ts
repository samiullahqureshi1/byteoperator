import { cookies } from 'next/headers';
import { verifySignedToken, createSignedToken } from './crypto';
import { getUserById, getUserByEmail } from './db';
import { CmsUser } from './types';

export const CMS_COOKIE_NAME = 'byte_cms_session';

export interface AuthSessionPayload {
  userId: string;
  email: string;
  twoFactorVerified: boolean;
  exp: number;
}

export function createSessionToken(user: CmsUser, twoFactorVerified = false): string {
  // Session expires in 7 days
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  const payload: AuthSessionPayload = {
    userId: user.id,
    email: user.email,
    twoFactorVerified,
    exp,
  };
  return createSignedToken(payload);
}

export function getCurrentCmsUser(): { user: CmsUser; session: AuthSessionPayload } | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(CMS_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifySignedToken<AuthSessionPayload>(token);
    if (!payload || !payload.userId) return null;

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    const user = getUserById(payload.userId);
    if (!user) return null;

    // If 2FA is enabled on the user account, verify session has twoFactorVerified = true
    if (user.twoFactorEnabled && !payload.twoFactorVerified) {
      return null;
    }

    return { user, session: payload };
  } catch {
    return null;
  }
}

export function verifyAdminRequest(): { user: CmsUser; error?: string } | { user?: never; error: string } {
  const current = getCurrentCmsUser();
  if (!current) {
    return { error: 'Unauthorized: Valid CMS session required' };
  }
  return { user: current.user };
}
