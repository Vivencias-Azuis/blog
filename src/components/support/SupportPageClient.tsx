'use client'

import { useEffect, useState } from 'react'
import OneTimeDonationPanel from '@/components/support/OneTimeDonationPanel'
import PixDonationStatus from '@/components/support/PixDonationStatus'
import SupportIntro from '@/components/support/SupportIntro'
import SupportTierGrid from '@/components/support/SupportTierGrid'
import type { SupportTier } from '@/lib/support/config'

interface PixState {
  chargeId: string
  status: 'PENDING' | 'PAID' | 'EXPIRED'
  brCode: string
  brCodeBase64: string
  expiresAt: string
}

async function parseJsonResponse(response: Response) {
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'Falha ao processar a solicitação.')
  }

  return payload
}

export default function SupportPageClient({
  tiers,
  donationSuggestions,
}: {
  tiers: readonly SupportTier[]
  donationSuggestions: readonly number[]
}) {
  const [loadingSlug, setLoadingSlug] = useState<SupportTier['slug'] | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number>(
    donationSuggestions[1] ?? 2500,
  )
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix')
  const [isSubmittingDonation, setIsSubmittingDonation] = useState(false)
  const [pixState, setPixState] = useState<PixState | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  async function startSubscriptionCheckout(tierSlug: SupportTier['slug']) {
    setLoadingSlug(tierSlug)
    setFeedback(null)

    try {
      const response = await fetch('/api/support/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierSlug, source: 'support-page' }),
      })
      const payload = await parseJsonResponse(response)
      window.location.href = payload.url
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Não foi possível iniciar a assinatura.',
      )
    } finally {
      setLoadingSlug(null)
    }
  }

  async function startDonationFlow() {
    setIsSubmittingDonation(true)
    setFeedback(null)

    try {
      const endpoint =
        paymentMethod === 'pix'
          ? '/api/support/donate/pix'
          : '/api/support/donate/card'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountInCents: selectedAmount,
          paymentMethod,
          source: 'support-page',
        }),
      })
      const payload = await parseJsonResponse(response)

      if (paymentMethod === 'card') {
        window.location.href = payload.url
        return
      }

      setPixState(payload)
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Não foi possível iniciar a doação.',
      )
    } finally {
      setIsSubmittingDonation(false)
    }
  }

  useEffect(() => {
    if (!pixState || pixState.status !== 'PENDING') {
      return
    }

    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch(
          `/api/support/donate/pix/${pixState.chargeId}`,
          { cache: 'no-store' },
        )
        const payload = await parseJsonResponse(response)

        setPixState((current) =>
          current
            ? {
                ...current,
                status: payload.status,
                expiresAt: payload.expiresAt,
              }
            : current,
        )
      } catch {
        window.clearInterval(intervalId)
      }
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [pixState])

  return (
    <div className="container-custom py-12 md:py-16">
      <SupportIntro />
      <SupportTierGrid
        tiers={tiers}
        onCheckout={startSubscriptionCheckout}
        loadingSlug={loadingSlug}
      />
      <OneTimeDonationPanel
        suggestions={donationSuggestions}
        selectedAmount={selectedAmount}
        onAmountChange={setSelectedAmount}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onDonate={startDonationFlow}
        loading={isSubmittingDonation}
      />
      {feedback ? (
        <div className="mt-6 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {feedback}
        </div>
      ) : null}
      {pixState ? (
        <div className="mt-8">
          <PixDonationStatus {...pixState} />
        </div>
      ) : null}
    </div>
  )
}
