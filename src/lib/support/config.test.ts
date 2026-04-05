import { describe, expect, it } from 'vitest'
import {
  donationSuggestions,
  getSupportPixEnv,
  getSupportStripeEnv,
  getSupportTierBySlug,
  supportTiers,
} from '@/lib/support/config'

describe('support config', () => {
  it('returns the three recurring tiers in ascending order', () => {
    expect(supportTiers.map((tier) => tier.slug)).toEqual([
      'apoiar',
      'fortalecer',
      'sustentar',
    ])

    expect(supportTiers.map((tier) => tier.amountInCents)).toEqual([
      1000,
      2000,
      3500,
    ])
  })

  it('returns the matching tier by slug', () => {
    expect(getSupportTierBySlug('fortalecer')?.priceIdEnvKey).toBe(
      'STRIPE_PRICE_ID_FORTALECER',
    )
  })

  it('exposes the suggested one-time donation values', () => {
    expect(donationSuggestions).toEqual([1000, 2500, 5000])
  })

  it('parses the stripe environment variables', () => {
    const env = getSupportStripeEnv({
      NEXT_PUBLIC_SITE_URL: 'https://www.vivenciasazuis.com.br',
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRICE_ID_APOIAR: 'price_apoiar',
      STRIPE_PRICE_ID_FORTALECER: 'price_fortalecer',
      STRIPE_PRICE_ID_SUSTENTAR: 'price_sustentar',
    })

    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://www.vivenciasazuis.com.br')
    expect(env.STRIPE_SECRET_KEY).toBe('sk_test_123')
  })

  it('accepts mercado pago as the active pix provider', () => {
    const env = getSupportPixEnv({
      PIX_PROVIDER: 'mercado_pago',
      MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR_test_123',
    })

    expect(env.PIX_PROVIDER).toBe('mercado_pago')
  })

  it('accepts direct pix as the active pix provider', () => {
    const env = getSupportPixEnv({
      PIX_PROVIDER: 'direct_pix',
    })

    expect(env.PIX_PROVIDER).toBe('direct_pix')
  })

  it('rejects missing required payment environment variables', () => {
    expect(() =>
      getSupportStripeEnv({
        NEXT_PUBLIC_SITE_URL: 'https://www.vivenciasazuis.com.br',
        STRIPE_PRICE_ID_APOIAR: 'price_apoiar',
        STRIPE_PRICE_ID_FORTALECER: 'price_fortalecer',
        STRIPE_PRICE_ID_SUSTENTAR: 'price_sustentar',
      } as NodeJS.ProcessEnv),
    ).toThrow()
  })

  it('rejects an invalid site URL', () => {
    expect(() =>
      getSupportPixEnv({
        NEXT_PUBLIC_SITE_URL: 'not-a-url',
        PIX_PROVIDER: 'abacate_pay',
        ABACATE_PAY_API_KEY: 'abacate_test_123',
      }),
    ).toThrow()
  })

  it('allows pix config without a public site url', () => {
    const env = getSupportPixEnv({
      MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR_test_123',
    })

    expect(env.NEXT_PUBLIC_SITE_URL).toBeUndefined()
    expect(env.PIX_PROVIDER).toBeUndefined()
  })
})
