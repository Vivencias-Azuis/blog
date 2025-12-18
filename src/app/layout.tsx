import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const PWAStatus = dynamic(() => import('@/components/PWAStatus'), { ssr: false })
const PWAInstallPrompt = dynamic(() => import('@/components/PWAInstallPrompt'), { ssr: false })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4b7aa1',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: {
    default: 'Vivências Azuis',
    template: '%s | Vivências Azuis'
  },
  description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo. Artigos, dicas e experiências sobre TEA, inclusão e desenvolvimento.',
  keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', 'família', 'desenvolvimento', 'síndrome de asperger', 'transtorno do espectro autista'],
  authors: [{ name: 'Vivências Azuis', url: 'https://www.vivenciasazuis.com.br' }],
  creator: 'Vivências Azuis',
  publisher: 'Vivências Azuis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.vivenciasazuis.com.br'),
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vivências Azuis',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4b7aa1',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.vivenciasazuis.com.br',
    title: 'Vivências Azuis - Blog sobre Autismo e Inclusão',
    description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo. Artigos, dicas e experiências sobre TEA, inclusão e desenvolvimento.',
    siteName: 'Vivências Azuis',
    images: [
      {
        url: '/logo-text.svg',
        width: 1200,
        height: 630,
        alt: 'Vivências Azuis - Blog sobre Autismo e Inclusão',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vivenciasazuis',
    creator: '@vivenciasazuis',
    title: 'Vivências Azuis - Blog sobre Autismo e Inclusão',
    description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo.',
    images: ['/logo-text.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-4134431815923665',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4134431815923665"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <PWAStatus />
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
