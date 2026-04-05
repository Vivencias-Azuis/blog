'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SUPPORT_POPUP_KEY = 'va_support_popup_seen'
const SUPPORT_POPUP_DELAY_MS = 60_000

export default function SupportPromptPopup() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!pathname || pathname === '/' || pathname.startsWith('/apoie')) return

    try {
      if (localStorage.getItem(SUPPORT_POPUP_KEY) === '1') return
    } catch {
      // ignore
    }

    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(SUPPORT_POPUP_KEY, '1')
      } catch {
        // ignore
      }

      setIsOpen(true)
    }, SUPPORT_POPUP_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [pathname])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />

      <div
        className="relative w-full max-w-lg overflow-hidden rounded-block bg-surface shadow-overlay ring-1 ring-black/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-popup-title"
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand/15 via-blue-300/10 to-sand-300/10" />

        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            aria-label="Fechar popup"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-sand-700 ring-1 ring-black/10 hover:bg-white"
            onClick={() => setIsOpen(false)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-blue-900 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 12h16M12 4v16"
              />
            </svg>
          </div>

          <h2 id="support-popup-title" className="mt-5 text-2xl font-bold text-sand-900 sm:text-3xl">
            Apoie a continuidade do Vivências Azuis
          </h2>

          <p className="mt-3 text-sm text-sand-700 sm:text-base">
            Se este conteúdo te ajuda, você pode sustentar o projeto com apoio mensal ou doação avulsa.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apoie"
              data-cta="support_popup_open"
              data-cta-location="global_support_popup"
              className="inline-flex w-full items-center justify-center rounded-card bg-gradient-to-r from-brand to-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-pop transition hover:brightness-110 sm:w-auto"
              onClick={() => setIsOpen(false)}
            >
              Conhecer formas de apoiar
            </Link>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-card border border-sand-200 px-6 py-3.5 text-sm font-semibold text-sand-700 transition hover:bg-sand-50 sm:w-auto"
              onClick={() => setIsOpen(false)}
            >
              Agora não
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
