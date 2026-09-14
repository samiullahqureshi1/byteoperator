/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
  /**
   * Server-only credentials. These are read exclusively inside route
   * actions via context.env and must never be exposed to the browser.
   */
  interface Env {
    /** Cloudinary — used by /api/contact-upload. */
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    /** EmailJS — used by /api/contact-submit. */
    SERVICE_ID: string;
    TEMPLETE_ID: string;
    PUBLIC_MAILJS_API_KEY: string;
    PRIVATE_MAILJS_API_KEY: string;
    /**
     * Shopify Admin API (custom app) — used by /api/audit-signup to write
     * leads into the customer database. Never expose these to the browser.
     */
    SHOPIFY_STORE_DOMAIN: string;
    SHOPIFY_ADMIN_TOKEN: string;
    SHOPIFY_API_VERSION: string;
    /**
     * Cloudflare Turnstile — bot protection for public forms. The CAPTCHA is
     * enforced only when both are set; leave them unset to disable it.
     */
    PUBLIC_TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
  }
}
