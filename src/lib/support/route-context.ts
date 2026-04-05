import type Stripe from 'stripe'
import { getSupportStripeEnv, getSupportTierBySlug } from '@/lib/support/config'
import {
  MIN_DONATION_AMOUNT_IN_CENTS,
  buildStripeDonationCheckoutParams,
  buildStripeSubscriptionCheckoutParams,
  donationRequestSchema,
  subscriptionRequestSchema,
} from '@/lib/support/schema'
import { SupportRouteError, resolveSupportRouteError } from '@/lib/support/errors'
import { ZodError } from 'zod'

export { SupportRouteError, resolveSupportRouteError } from '@/lib/support/errors'

const supportSessionKinds = new Set(['subscription', 'donation-card'])

function formatMinDonationAmount() {
  return (MIN_DONATION_AMOUNT_IN_CENTS / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export async function readJsonBody(request: Request) {
  try {
    return await request.json()
  } catch {
    throw new SupportRouteError(400, 'Dados inválidos.')
  }
}

function parseSupportEnv() {
  try {
    return getSupportStripeEnv()
  } catch (error) {
    if (error instanceof ZodError) {
      throw new SupportRouteError(500, 'Configuração indisponível.')
    }

    throw error
  }
}

function requirePaymentMethod(
  paymentMethod: 'card' | 'pix',
  expected: 'card' | 'pix',
) {
  if (paymentMethod !== expected) {
    throw new SupportRouteError(400, 'Dados inválidos.')
  }
}

export function parseSubscriptionRequest(body: unknown) {
  let input: ReturnType<typeof subscriptionRequestSchema.parse>

  try {
    input = subscriptionRequestSchema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new SupportRouteError(400, 'Dados inválidos.')
    }

    throw error
  }

  const tier = getSupportTierBySlug(input.tierSlug)

  if (!tier) {
    throw new SupportRouteError(400, 'Dados inválidos.')
  }

  const env = parseSupportEnv()

  return {
    input,
    tier,
    checkoutParams: buildStripeSubscriptionCheckoutParams({
      priceId: env[tier.priceIdEnvKey],
      siteUrl: env.NEXT_PUBLIC_SITE_URL,
      tierSlug: input.tierSlug,
      source: input.source,
    }),
  }
}

export function parseCardDonationRequest(body: unknown) {
  let input: ReturnType<typeof donationRequestSchema.parse>

  try {
    input = donationRequestSchema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      const amountTooLow = error.issues.some(
        (issue) =>
          issue.path[0] === 'amountInCents' &&
          issue.code === 'too_small' &&
          issue.minimum === MIN_DONATION_AMOUNT_IN_CENTS,
      )

      if (amountTooLow) {
        throw new SupportRouteError(
          400,
          `O valor mínimo para doar por cartão é ${formatMinDonationAmount()}.`,
        )
      }

      throw new SupportRouteError(400, 'Dados inválidos.')
    }

    throw error
  }

  requirePaymentMethod(input.paymentMethod, 'card')

  const env = parseSupportEnv()

  return {
    input,
    checkoutParams: buildStripeDonationCheckoutParams({
      amountInCents: input.amountInCents,
      siteUrl: env.NEXT_PUBLIC_SITE_URL,
      source: input.source,
    }),
  }
}

export function parsePixDonationRequest(body: unknown) {
  let input: ReturnType<typeof donationRequestSchema.parse>

  try {
    input = donationRequestSchema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new SupportRouteError(400, 'Dados inválidos.')
    }

    throw error
  }

  requirePaymentMethod(input.paymentMethod, 'pix')

  if (!input.payerEmail) {
    throw new SupportRouteError(400, 'Informe um e-mail válido para gerar o Pix.')
  }

  return {
    input,
    providerInput: {
      amountInCents: input.amountInCents,
      payerEmail: input.payerEmail,
      source: input.source,
    },
  }
}

export function assertSupportSession(session: Pick<Stripe.Checkout.Session, 'metadata'>) {
  const kind = session.metadata?.kind

  if (!kind || !supportSessionKinds.has(kind)) {
    throw new SupportRouteError(404, 'Sessão não encontrada.')
  }
}
