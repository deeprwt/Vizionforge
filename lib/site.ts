/**
 * Canonical public origin of the website (no trailing slash).
 * vizionforge.com redirects to www.vizionforge.com, so www is the default.
 */
export const SITE_URL = (process.env.SITE_URL || "https://www.vizionforge.com").replace(/\/+$/, "")
