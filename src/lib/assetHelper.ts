/**
 * Bulletproof asset path resolver for multi-target deployments:
 * Works seamlessly on:
 * - GitHub Pages subpath (e.g. https://bosaj.github.io/l7ot/)
 * - Custom domain root (e.g. https://l7ot.ma/ or https://l7ot-morocco.netlify.app/)
 * - Vercel / Netlify / Docker containers
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return ''

  // Already an absolute external URL or data URI
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }

  // Strip leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  const base = import.meta.env.BASE_URL

  // If Vite base is specifically configured to a subpath like '/l7ot/' or explicit './'
  if (base && base !== '/') {
    const normalized = base.endsWith('/') ? base : `${base}/`
    return `${normalized}${cleanPath}`
  }

  // Fallback to relative './' which guarantees resolution relative to the current HTML path
  return `./${cleanPath}`
}
