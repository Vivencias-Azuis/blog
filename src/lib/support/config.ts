import { z } from 'zod'

export type SupportTierSlug = 'apoiar' | 'fortalecer' | 'sustentar'
export type PixProvider = 'abacate_pay' | 'mercado_pago'

export interface SupportTier {
  readonly slug: SupportTierSlug
  readonly label: string
  readonly amountInCents: number
  readonly description: string
  readonly priceIdEnvKey:
    | 'STRIPE_PRICE_ID_APOIAR'
    | 'STRIPE_PRICE_ID_FORTALECER'
    | 'STRIPE_PRICE_ID_SUSTENTAR'
}

export const supportTiers = [
  {
    slug: 'apoiar',
    label: 'Apoiar',
    amountInCents: 1000,
    description: 'Assinatura mensal para apoiar o projeto.',
    priceIdEnvKey: 'STRIPE_PRICE_ID_APOIAR',
  },
  {
    slug: 'fortalecer',
    label: 'Fortalecer',
    amountInCents: 2000,
    description: 'Assinatura mensal para fortalecer o projeto.',
    priceIdEnvKey: 'STRIPE_PRICE_ID_FORTALECER',
  },
  {
    slug: 'sustentar',
    label: 'Sustentar',
    amountInCents: 3500,
    description: 'Assinatura mensal para sustentar o projeto.',
    priceIdEnvKey: 'STRIPE_PRICE_ID_SUSTENTAR',
  },
] as const satisfies readonly SupportTier[]

export const donationSuggestions = [1000, 2500, 5000] as const

const supportStripeEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PRICE_ID_APOIAR: z.string().min(1),
  STRIPE_PRICE_ID_FORTALECER: z.string().min(1),
  STRIPE_PRICE_ID_SUSTENTAR: z.string().min(1),
})

const supportPixEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  PIX_PROVIDER: z.enum(['abacate_pay', 'mercado_pago']).default('abacate_pay'),
  ABACATE_PAY_API_KEY: z.string().min(1).optional(),
  MERCADO_PAGO_ACCESS_TOKEN: z.string().min(1).optional(),
})

export function getSupportStripeEnv(env: NodeJS.ProcessEnv = process.env) {
  return supportStripeEnvSchema.parse(env)
}

export function getSupportPixEnv(env: NodeJS.ProcessEnv = process.env) {
  return supportPixEnvSchema.parse(env)
}

export function getSupportTierBySlug(slug: SupportTierSlug) {
  return supportTiers.find((tier) => tier.slug === slug)
}
