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
    /**
     * Shopify Admin API — used by /api/newsletter-subscribe.
     * Access token for a custom app with `read_customers` and
     * `write_customers` scopes. Paired with `PUBLIC_STORE_DOMAIN`, which
     * Hydrogen already declares.
     */
    PRIVATE_ADMIN_API_ACCESS_TOKEN: string;
    /** EmailJS — used by /api/contact-submit. */
    SERVICE_ID: string;
    TEMPLETE_ID: string;
    PUBLIC_MAILJS_API_KEY: string;
    PRIVATE_MAILJS_API_KEY: string;
  }
}
