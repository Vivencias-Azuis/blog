import { z } from 'zod'
import type Stripe from 'stripe'
import type { SupportTierSlug } from '@/lib/support/config'

const supportTierSlugs = [
  'apoiar',
  'fortalecer',
  'sustentar',
] as const satisfies readonly [SupportTierSlug, ...SupportTierSlug[]]

const paymentMethods = ['card', 'pix'] as const

export const subscriptionRequestSchema = z.object({
  tierSlug: z.enum(supportTierSlugs),
  source: z.string().min(1).default('support-page'),
})

export const donationRequestSchema = z.object({
  amountInCents: z.number().int().min(500),
  paymentMethod: z.enum(paymentMethods),
  source: z.string().min(1).default('support-page'),
})

export function buildStripeSubscriptionCheckoutParams({
  priceId,
  siteUrl,
  tierSlug,
  source,
}: {
  priceId: string
  siteUrl: string
  tierSlug: SupportTierSlug
  source: string
}): Stripe.Checkout.SessionCreateParams {
  return {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/apoie/obrigado?kind=subscription&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/apoie/cancelado?kind=subscription`,
    metadata: {
      kind: 'subscription',
      tierSlug,
      source,
    },
  }
}

export function buildStripeDonationCheckoutParams({
  amountInCents,
  siteUrl,
  source,
}: {
  amountInCents: number
  siteUrl: string
  source: string
}): Stripe.Checkout.SessionCreateParams {
  return {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Doação avulsa para Vivências Azuis',
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/apoie/obrigado?kind=donation-card&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/apoie/cancelado?kind=donation-card`,
    metadata: {
      kind: 'donation-card',
      source,
      amountInCents: String(amountInCents),
    },
  }
}

export interface AbacatePixPayload {
  readonly method: 'PIX'
  readonly data: {
    readonly amount: number
    readonly description: string
    readonly expiresIn: number
    readonly metadata: {
      readonly kind: 'donation'
      readonly source: string
    }
  }
}

export function buildAbacatePixPayload({
  amountInCents,
  source,
}: {
  amountInCents: number
  source: string
}): AbacatePixPayload {
  return {
    method: 'PIX',
    data: {
      amount: amountInCents,
      description: 'Doação para o projeto Vivências Azuis',
      expiresIn: 3600,
      metadata: {
        kind: 'donation',
        source,
      },
    },
  }
}
