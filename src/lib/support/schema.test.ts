import { describe, expect, it } from 'vitest'
import {
  buildAbacatePixPayload,
  buildStripeDonationCheckoutParams,
  buildStripeSubscriptionCheckoutParams,
  donationRequestSchema,
  subscriptionRequestSchema,
} from '@/lib/support/schema'

describe('support schema', () => {
  it('accepts a valid recurring support request', () => {
    expect(
      subscriptionRequestSchema.parse({
        tierSlug: 'fortalecer',
        source: 'support-page',
      }),
    ).toEqual({
      tierSlug: 'fortalecer',
      source: 'support-page',
    })
  })

  it('rejects invalid one-time donation amounts', () => {
    expect(() =>
      donationRequestSchema.parse({
        amountInCents: 100,
        paymentMethod: 'pix',
        source: 'support-page',
      }),
    ).toThrow()
  })

  it('builds Stripe checkout params for subscriptions', () => {
    expect(
      buildStripeSubscriptionCheckoutParams({
        priceId: 'price_123',
        siteUrl: 'https://www.vivenciasazuis.com.br',
        tierSlug: 'fortalecer',
        source: 'support-page',
      }),
    ).toMatchObject({
      mode: 'subscription',
      line_items: [{ price: 'price_123', quantity: 1 }],
      success_url:
        'https://www.vivenciasazuis.com.br/apoie/obrigado?kind=subscription&session_id={CHECKOUT_SESSION_ID}',
      cancel_url:
        'https://www.vivenciasazuis.com.br/apoie/cancelado?kind=subscription',
      metadata: {
        kind: 'subscription',
        tierSlug: 'fortalecer',
        source: 'support-page',
      },
    })
  })

  it('builds Stripe checkout params for one-time card donations', () => {
    expect(
      buildStripeDonationCheckoutParams({
        amountInCents: 2500,
        siteUrl: 'https://www.vivenciasazuis.com.br',
        source: 'support-page',
      }),
    ).toMatchObject({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Doação avulsa para Vivências Azuis',
            },
            unit_amount: 2500,
          },
          quantity: 1,
        },
      ],
      success_url:
        'https://www.vivenciasazuis.com.br/apoie/obrigado?kind=donation-card&session_id={CHECKOUT_SESSION_ID}',
      cancel_url:
        'https://www.vivenciasazuis.com.br/apoie/cancelado?kind=donation-card',
      metadata: {
        kind: 'donation-card',
        source: 'support-page',
        amountInCents: '2500',
      },
    })
  })

  it('builds Abacate Pay transparent pix payloads', () => {
    expect(
      buildAbacatePixPayload({
        amountInCents: 5000,
        source: 'support-page',
      }),
    ).toMatchObject({
      method: 'PIX',
      data: {
        amount: 5000,
        description: 'Doação para o projeto Vivências Azuis',
        expiresIn: 3600,
        metadata: {
          kind: 'donation',
          source: 'support-page',
        },
      },
    })
  })
})
