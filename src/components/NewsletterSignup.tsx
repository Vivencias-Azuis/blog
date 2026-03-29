'use client'

import type { FormEvent } from 'react'
import { useId, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { AnalyticsPageType, AnalyticsTrafficIntent, buildAnalyticsEventParams, inferPageType, inferTrafficIntent } from '@/lib/analytics-contract'

const LEAD_ENDPOINT = '/api/newsletter-lead'

type NewsletterSignupProps = {
  origem?: string
  className?: string
  ctaLocation?: string
  pageType?: AnalyticsPageType
  trafficIntent?: AnalyticsTrafficIntent
  postSlug?: string
  postCategory?: string
}

export default function NewsletterSignup({
  origem = 'blog-cta',
  className,
  ctaLocation,
  pageType,
  trafficIntent,
  postSlug,
  postCategory,
}: NewsletterSignupProps) {
  const inputId = useId()
  const hasTrackedFormStart = useRef(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')
  const [submitMessage, setSubmitMessage] = useState('')

  const trackFormStart = () => {
    if (hasTrackedFormStart.current) return
    hasTrackedFormStart.current = true

    const pathname = window.location.pathname
    trackEvent('form_start', {
      form_name: 'newsletter_signup',
      ...buildAnalyticsEventParams({
        pathname,
        pageType: pageType || inferPageType(pathname),
        postSlug,
        postCategory,
        ctaId: 'newsletter_submit',
        ctaLocation: ctaLocation || origem,
        trafficIntent: trafficIntent || inferTrafficIntent(pathname),
      }),
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    setSubmitMessage('')

    try {
      const formEl = e.currentTarget
      const body = new FormData(formEl)
      body.set('email', email)
      body.set('origem', origem)
      body.set('_replyto', email)
      body.set('_subject', 'Newsletter - Vivências Azuis')

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
      setSubmitMessage('Inscrição confirmada! Você começará a receber nossas novidades em breve. 💙')
      const pathname = window.location.pathname
      trackEvent('lead_submit', {
        origem,
        ...buildAnalyticsEventParams({
          pathname,
          pageType: pageType || inferPageType(pathname),
          postSlug,
          postCategory,
          ctaId: 'newsletter_submit',
          ctaLocation: ctaLocation || origem,
          leadType: 'newsletter',
          trafficIntent: trafficIntent || inferTrafficIntent(pathname),
        }),
      })
      setEmail('')
      formEl.reset()
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Falha de conexão ao enviar. Verifique sua internet e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} action={LEAD_ENDPOINT} method="POST" className="flex flex-col sm:flex-row gap-4">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
        <input type="hidden" name="origem" value={origem} />
        <input
          id={inputId}
          name="email"
          type="email"
          required
          value={email}
          onFocus={trackFormStart}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail"
          className="flex-1 rounded-card border border-white/30 bg-white/90 px-6 py-4 text-sand-900 placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Seu e-mail"
        />
        <button
          type="submit"
          data-cta="newsletter_submit"
          data-cta-location={ctaLocation || origem}
          disabled={isSubmitting}
          className="rounded-card bg-surface px-8 py-4 font-semibold text-link transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Enviando…' : 'Inscrever-se'}
        </button>
      </form>

      {submitMessage && (
        <p
          className={`mt-4 text-sm ${submitStatus === 'success' ? 'text-blue-100' : 'text-red-200'}`}
          role={submitStatus === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {submitMessage}
        </p>
      )}
    </div>
  )
}
