'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

const LEAD_ENDPOINT = '/api/ebook-lead'
const DISMISS_KEY = 'va_ebook_popup_dismissed_at'
const SUBMITTED_KEY = 'va_ebook_popup_submitted'
const DISMISS_DAYS = 7

function isWithinDays(timestampMs: number, days: number) {
  const now = Date.now()
  const maxAgeMs = days * 24 * 60 * 60 * 1000
  return now - timestampMs < maxAgeMs
}

export default function EbookLeadPopup() {
  const titleId = useId()
  const descriptionId = useId()
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [formData, setFormData] = useState({ nome: '', email: '' })

  useEffect(() => {
    const forceOpen =
      typeof window !== 'undefined' &&
      (new URLSearchParams(window.location.search).get('ebook') === '1' ||
        new URLSearchParams(window.location.search).get('ebook') === 'true' ||
        new URLSearchParams(window.location.search).get('ebook') === 'force')

    try {
      if (!forceOpen && localStorage.getItem(SUBMITTED_KEY) === '1') return

      const dismissedAtRaw = localStorage.getItem(DISMISS_KEY)
      if (dismissedAtRaw) {
        const dismissedAt = Number(dismissedAtRaw)
        if (!forceOpen && Number.isFinite(dismissedAt) && isWithinDays(dismissedAt, DISMISS_DAYS)) return
      }
    } catch {
      // ignore
    }

    const t = window.setTimeout(() => {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null
      setIsOpen(true)
    }, forceOpen ? 0 : 4500)

    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const t = window.setTimeout(() => firstInputRef.current?.focus(), 0)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      handleClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setSubmitStatus('')
    setSubmitMessage('')

    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      // ignore
    }

    window.setTimeout(() => lastActiveElementRef.current?.focus(), 0)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitStatus('')

    try {
      const formEl = e.currentTarget
      const body = new FormData(formEl)
      body.set('_replyto', formData.email)
      body.set('_subject', 'E-book - Guia Prático: Primeiros 30 Dias Após o Diagnóstico (1º capítulo)')
      body.set('origem', 'popup-home')

      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' }
      })

      if (!res.ok) {
        setSubmitStatus('error')
        setSubmitMessage('Não foi possível enviar agora. Tente novamente em instantes.')
        return
      }

      try {
        const json = (await res.json()) as { ok?: boolean; message?: string }
        if (json.ok === false) {
          setSubmitStatus('error')
          setSubmitMessage(json.message || 'Não foi possível confirmar seu envio agora. Tente novamente em instantes.')
          return
        }
      } catch {
        // ignore (treat as success if status is OK)
      }

      setSubmitStatus('success')
      setSubmitMessage('Obrigada! Você receberá o 1º capítulo no e-mail informado. 💙')
      trackEvent('lead_submit', {
        lead_type: 'ebook',
        origem: 'popup-home',
        location: window.location.pathname,
      })
      setFormData({ nome: '', email: '' })
      formEl.reset()
      try {
        localStorage.setItem(SUBMITTED_KEY, '1')
      } catch {
        // ignore
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Falha de conexão ao enviar. Verifique sua internet e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Fechar"
        onClick={handleClose}
      />

      <div
        className="relative w-full max-w-lg rounded-block bg-surface shadow-overlay ring-1 ring-black/10 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand/10 via-blue-300/10 to-sand-300/10" />

        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-sand-700 ring-1 ring-black/10 hover:bg-white"
            aria-label="Fechar popup"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-4">
            <div className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-blue-900 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 id={titleId} className="text-2xl sm:text-3xl font-bold text-sand-900 leading-tight">
                Guia Prático: Primeiros 30 Dias Após o Diagnóstico
              </h2>
              <p id={descriptionId} className="mt-2 text-sm sm:text-base text-sand-700">
                Cadastre-se para receber gratuitamente o <span className="font-semibold">1º capítulo</span> por e-mail.
              </p>
            </div>
          </div>

          {submitMessage && (
            <div
              className={`mt-5 rounded-2xl border p-4 text-sm ${
                submitStatus === 'success'
                  ? 'bg-brand-soft border-brand/30 text-sand-900'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
              role={submitStatus === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} action={LEAD_ENDPOINT} method="POST" className="mt-6 space-y-4">
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
            <input type="hidden" name="tipo" value="ebook-primeiros-30-dias" />

            <div>
              <label htmlFor="ebook-nome" className="block text-sm font-semibold text-sand-900 mb-2">
                Nome
              </label>
              <input
                ref={firstInputRef}
                id="ebook-nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                autoComplete="name"
                className="w-full rounded-card border border-sand-200 bg-surface px-5 py-3 text-sand-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="ebook-email" className="block text-sm font-semibold text-sand-900 mb-2">
                E-mail *
              </label>
              <input
                id="ebook-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                autoComplete="email"
                className="w-full rounded-card border border-sand-200 bg-surface px-5 py-3 text-sand-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="seu@email.com"
              />
            </div>

            <button
              type="submit"
              data-cta="ebook_submit"
              disabled={isSubmitting}
              className="w-full rounded-card bg-gradient-to-r from-brand to-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-pop transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Enviando…' : 'Quero o 1º capítulo'}
            </button>

            <div className="flex items-center justify-between gap-4 text-xs text-sand-600">
              <p className="leading-snug">
                Ao se inscrever, você concorda com a nossa{' '}
                <Link href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-link">
                  Política de Privacidade
                </Link>
                .
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="shrink-0 underline underline-offset-2 hover:text-link"
              >
                Agora não
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
