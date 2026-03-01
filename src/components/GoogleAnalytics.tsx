'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GA_MEASUREMENT_ID, hasAnalytics, pageview, trackEvent } from '@/lib/analytics'

const AFFILIATE_HOSTS = ['lojamundoautista.com.br']

function getClickTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null
  return target.closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null
}

function isAffiliateLink(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href)
    if (url.searchParams.has('lm')) return true
    if ((url.searchParams.get('utm_source') || '').toLowerCase() === 'affiliate') return true
    return AFFILIATE_HOSTS.includes(url.hostname)
  } catch {
    return false
  }
}

function inferCtaName(el: HTMLAnchorElement | HTMLButtonElement) {
  if (el.dataset.cta) return el.dataset.cta
  const text = (el.textContent || '').trim().toLowerCase().slice(0, 60)
  if (!text) return 'unknown_cta'
  return text
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 40) || 'unknown_cta'
}

function getPostContext(el: HTMLAnchorElement | HTMLButtonElement) {
  const article = el.closest('[data-post-article]')
  if (!(article instanceof HTMLElement)) return {}

  return {
    slug: article.dataset.postArticle || undefined,
    category: article.dataset.postCategory || undefined,
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!hasAnalytics()) return
    const query = typeof window !== 'undefined' ? window.location.search : ''
    const normalizedQuery = query.startsWith('?') ? query.slice(1) : query
    pageview(normalizedQuery ? `${pathname}?${normalizedQuery}` : pathname)
  }, [pathname])

  useEffect(() => {
    if (!hasAnalytics()) return

    const onClick = (event: MouseEvent) => {
      const el = getClickTarget(event.target)
      if (!el) return
      const postContext = getPostContext(el)

      if (el instanceof HTMLAnchorElement && isAffiliateLink(el)) {
        trackEvent('affiliate_click', {
          link_url: el.href,
          link_text: (el.textContent || '').trim().slice(0, 120),
          location: window.location.pathname,
          ...postContext,
        })
      }

      if (!el.dataset.cta) return

      trackEvent('click_cta', {
        cta_name: inferCtaName(el),
        location: window.location.pathname,
        target_url: el instanceof HTMLAnchorElement ? el.href : undefined,
        ...postContext,
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!hasAnalytics()) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}
