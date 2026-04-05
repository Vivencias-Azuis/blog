import { z } from 'zod'
import type Stripe from 'stripe'
import type { SupportTierSlug } from '@/lib/support/config'

const supportTierSlugs = [
  'apoiar',
  'fortalecer',
  'sustentar',
] as const satisfies readonly [SupportTierSlug, ...SupportTierSlug[]]

const paymentMethods = ['card', 'pix'] as const

export const MIN_DONATION_AMOUNT_IN_CENTS = 500

const supportSourceSchema = z.string().trim().min(1).max(500).default('support-page')

export const subscriptionRequestSchema = z.object({
  tierSlug: z.enum(supportTierSlugs),
  source: supportSourceSchema,
})

export const donationRequestSchema = z.object({
  amountInCents: z.number().int().min(MIN_DONATION_AMOUNT_IN_CENTS),
  paymentMethod: z.enum(paymentMethods),
  payerEmail: z.string().trim().email().optional(),
  source: supportSourceSchema,
})

export function buildStripeSubscriptionCheckoutParams({
  priceId,
  siteUrl,
  tierSlug,
  source,
  clerkUserId,
  customerEmail,
}: {
  priceId: string
  siteUrl: string
  tierSlug: SupportTierSlug
  source: string
  clerkUserId?: string
  customerEmail?: string
}): Stripe.Checkout.SessionCreateParams {
  const metadata = {
    kind: 'subscription',
    tierSlug,
    source,
    ...(clerkUserId ? { clerkUserId } : {}),
  }

  return {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(clerkUserId ? { client_reference_id: clerkUserId } : {}),
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    success_url: `${siteUrl}/apoie/obrigado?kind=subscription&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/apoie/cancelado?kind=subscription`,
    metadata,
    ...(clerkUserId
      ? {
          subscription_data: {
            metadata,
          },
        }
      : {}),
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
