'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { AnalyticsTrafficIntent, buildAnalyticsEventParams } from '@/lib/analytics-contract'

type PostTrackingProps = {
  slug: string
  title: string
  category: string
  intent: AnalyticsTrafficIntent
}

export default function PostTracking({ slug, title, category, intent }: PostTrackingProps) {
  useEffect(() => {
    const pathname = window.location.pathname

    trackEvent('view_post', {
      title,
      ...buildAnalyticsEventParams({
        pathname,
        pageType: 'post',
        postSlug: slug,
        postCategory: category,
        trafficIntent: intent,
      }),
    })
  }, [slug, title, category, intent])

  return null
}
