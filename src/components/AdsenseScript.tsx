'use client'

import Script from 'next/script'

export default function AdsenseScript() {
  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4134431815923665"
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  )
}
