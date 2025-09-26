import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import PWAStatus from '@/components/PWAStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Vivências Azuis',
    template: '%s | Vivências Azuis'
  },
  description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo. Artigos, dicas e experiências sobre TEA, inclusão e desenvolvimento.',
  keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', 'família', 'desenvolvimento', 'síndrome de asperger', 'transtorno do espectro autista'],
  authors: [{ name: 'Vivências Azuis', url: 'https://vivenciasazuis.com' }],
  creator: 'Vivências Azuis',
  publisher: 'Vivências Azuis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vivenciasazuis.com'),
  alternates: {
    canonical: '/',
  },
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/site.webmanifest',
  themeColor: '#4b7aa1',
  colorScheme: 'light',
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
    url: 'https://vivenciasazuis.com',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4134431815923665"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-white text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <PWAStatus />
        <PWAInstallPrompt />
      </body>
    </html>
  )
}