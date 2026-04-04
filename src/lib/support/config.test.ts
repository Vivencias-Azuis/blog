import { describe, expect, it } from 'vitest'
import {
  donationSuggestions,
  getSupportEnv,
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

  it('parses the payment environment variables', () => {
    const env = getSupportEnv({
      NEXT_PUBLIC_SITE_URL: 'https://www.vivenciasazuis.com.br',
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRICE_ID_APOIAR: 'price_apoiar',
      STRIPE_PRICE_ID_FORTALECER: 'price_fortalecer',
      STRIPE_PRICE_ID_SUSTENTAR: 'price_sustentar',
      ABACATE_PAY_API_KEY: 'abacate_test_123',
    })

    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://www.vivenciasazuis.com.br')
    expect(env.STRIPE_SECRET_KEY).toBe('sk_test_123')
  })

  it('rejects missing required payment environment variables', () => {
    expect(() =>
      getSupportEnv({
        NEXT_PUBLIC_SITE_URL: 'https://www.vivenciasazuis.com.br',
        STRIPE_PRICE_ID_APOIAR: 'price_apoiar',
        STRIPE_PRICE_ID_FORTALECER: 'price_fortalecer',
        STRIPE_PRICE_ID_SUSTENTAR: 'price_sustentar',
        ABACATE_PAY_API_KEY: 'abacate_test_123',
      } as NodeJS.ProcessEnv),
    ).toThrow()
  })

  it('rejects an invalid site URL', () => {
    expect(() =>
      getSupportEnv({
        NEXT_PUBLIC_SITE_URL: 'not-a-url',
        STRIPE_SECRET_KEY: 'sk_test_123',
        STRIPE_PRICE_ID_APOIAR: 'price_apoiar',
        STRIPE_PRICE_ID_FORTALECER: 'price_fortalecer',
        STRIPE_PRICE_ID_SUSTENTAR: 'price_sustentar',
        ABACATE_PAY_API_KEY: 'abacate_test_123',
      }),
    ).toThrow()
  })
})
