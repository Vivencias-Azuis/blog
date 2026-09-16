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
      setSubmitMessage('Inscrição confirmada. Você vai receber as próximas edições por e-mail.')
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
      <form onSubmit={handleSubmit} action={LEAD_ENDPOINT} method="POST">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
        <input type="hidden" name="origem" value={origem} />
        <label
          htmlFor={inputId}
          className="block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-azul-soft"
        >
          Seu e-mail
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id={inputId}
            name="email"
            type="email"
            required
            value={email}
            onFocus={trackFormStart}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@email.com"
            className="w-full rounded-sm border border-paper/30 bg-paper px-4 py-3 text-base text-ink placeholder-ink-mute transition-colors duration-150 focus:border-clay sm:flex-1"
          />
          <button
            type="submit"
            data-cta="newsletter_submit"
            data-cta-location={ctaLocation || origem}
            disabled={isSubmitting}
            className="shrink-0 rounded-sm border border-paper bg-paper px-6 py-3 font-sans text-sm font-semibold text-azul-deep transition-colors duration-150 hover:bg-azul-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Enviando…' : 'Inscrever-se'}
          </button>
        </div>
      </form>

      {submitMessage && (
        <p
          className={`mt-4 font-sans text-sm ${submitStatus === 'success' ? 'text-azul-soft' : 'text-clay-soft'}`}
          role={submitStatus === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {submitMessage}
        </p>
      )}
    </div>
  )
}
