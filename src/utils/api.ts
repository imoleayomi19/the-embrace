/**
 * Resolves the appropriate API URL for the current environment.
 * - In local development: uses relative path ("/api/...") handled by Vite dev middleware.
 * - On Vercel: uses relative path ("/api/...") handled by Vercel Serverless Functions.
 * - If VITE_API_BASE_URL is set: uses that URL as prefix.
 * - If deployed statically on the custom domain (where serverless /api is not hosted locally on Apache):
 *   automatically routes to the deployed Vercel backend so newsletter and contact submissions work.
 */
export function getApiUrl(path: string): string {
  const customBase = import.meta.env.VITE_API_BASE_URL;
  if (customBase) {
    return `${customBase.replace(/\/$/, '')}${path}`;
  }

  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'embracetechng.com' ||
      window.location.hostname === 'www.embracetechng.com')
  ) {
    return `https://the-embrace.vercel.app${path}`;
  }

  return path;
}

