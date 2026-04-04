import type Stripe from 'stripe'
import { getSupportEnv, getSupportTierBySlug } from '@/lib/support/config'
import {
  buildAbacatePixPayload,
  buildStripeDonationCheckoutParams,
  buildStripeSubscriptionCheckoutParams,
  donationRequestSchema,
  subscriptionRequestSchema,
} from '@/lib/support/schema'
import { ZodError } from 'zod'

const supportSessionKinds = new Set(['subscription', 'donation-card'])

export class SupportRouteError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'SupportRouteError'
    this.status = status
  }
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
    return getSupportEnv()
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

  return {
    input,
    payload: buildAbacatePixPayload({
      amountInCents: input.amountInCents,
      source: input.source,
    }),
  }
}

export function assertSupportSession(session: Pick<Stripe.Checkout.Session, 'metadata'>) {
  const kind = session.metadata?.kind

  if (!kind || !supportSessionKinds.has(kind)) {
    throw new SupportRouteError(404, 'Sessão não encontrada.')
  }
}

export function resolveSupportRouteError(
  error: unknown,
  fallback: {
    message: string
    status: number
  },
) {
  if (error instanceof SupportRouteError) {
    return {
      message: error.message,
      status: error.status,
    }
  }

  return fallback
}
