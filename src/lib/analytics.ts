export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function hasAnalytics() {
  return Boolean(GA_MEASUREMENT_ID)
}

export function pageview(url: string) {
  if (!hasAnalytics() || typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!hasAnalytics() || typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
