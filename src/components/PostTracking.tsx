'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

type PostTrackingProps = {
  slug: string
  title: string
  category: string
}

export default function PostTracking({ slug, title, category }: PostTrackingProps) {
  useEffect(() => {
    trackEvent('view_post', {
      slug,
      title,
      category,
      location: window.location.pathname,
    })
  }, [slug, title, category])

  return null
}
