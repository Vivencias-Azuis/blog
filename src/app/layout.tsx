import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import PWAStatus from '@/components/PWAStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vivências Azuis',
  description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo.',
  keywords: ['autismo', 'inclusão', 'blog', 'experiências', 'apoio'],
  authors: [{ name: 'Vivências Azuis' }],
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/site.webmanifest',
  themeColor: '#4b7aa1',
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
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://vivenciasazuis.com',
    title: 'Vivências Azuis',
    description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo.',
    siteName: 'Vivências Azuis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivências Azuis',
    description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo.',
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
        <PWAStatus />
        <PWAInstallPrompt />
      </body>
    </html>
  )
}