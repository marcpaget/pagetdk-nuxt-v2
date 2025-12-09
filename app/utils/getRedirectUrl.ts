/**
 * Get the correct redirect URL for authentication flows
 * Works correctly in both development and Vercel deployment environments
 *
 * Based on Supabase documentation:
 * https://supabase.com/docs/guides/auth/concepts/redirect-urls
 */
export const getRedirectUrl = (path = '') => {
  // Get the site URL from environment variables
  let url =
    process.env.NUXT_PUBLIC_SITE_URL ?? // Production site URL
    process.env.VERCEL_URL ?? // Automatically set by Vercel
    'http://localhost:3001' // Development fallback

  // Ensure URL has proper protocol
  url = url.startsWith('http') ? url : `https://${url}`

  // Ensure trailing slash
  url = url.endsWith('/') ? url : `${url}/`

  // Append path if provided
  if (path) {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    url = `${url}${cleanPath}`
  }

  return url
}
