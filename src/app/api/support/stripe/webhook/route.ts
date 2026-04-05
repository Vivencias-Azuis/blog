import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import {
  getClerkUserIdFromStripeObject,
  updateClerkMembershipMetadata,
} from '@/lib/support/stripe-webhook'
import { getStripeClient } from '@/lib/support/stripe'
import { getSupportTierBySlug } from '@/lib/support/config'

const handledEventTypes = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

function readSupportTierSlug(metadata: Record<string, unknown> | null | undefined) {
  if (typeof metadata?.tierSlug !== 'string') {
    return null
  }

  return getSupportTierBySlug(metadata.tierSlug as Parameters<
    typeof getSupportTierBySlug
  >[0])
    ? (metadata.tierSlug as Parameters<typeof getSupportTierBySlug>[0])
    : null
}

function readStripeObjectId(value: string | Stripe.Customer | null | undefined) {
  return typeof value === 'string' ? value : null
}

async function syncClerkMembershipFromCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  if (session.mode !== 'subscription') {
    return
  }

  const clerkUserId = getClerkUserIdFromStripeObject(session)

  if (!clerkUserId) {
    return
  }

  await updateClerkMembershipMetadata({
    clerkUserId,
    stripeCustomerId: readStripeObjectId(session.customer),
    stripeSubscriptionId: readStripeObjectId(session.subscription),
    subscriptionStatus: 'active',
    tierSlug: readSupportTierSlug(session.metadata),
  })
}

async function syncClerkMembershipFromSubscription(
  subscription: Stripe.Subscription,
) {
  const clerkUserId = getClerkUserIdFromStripeObject(subscription)

  if (!clerkUserId) {
    return
  }

  await updateClerkMembershipMetadata({
    clerkUserId,
    stripeCustomerId: readStripeObjectId(subscription.customer),
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    tierSlug: readSupportTierSlug(subscription.metadata),
  })
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json(
      { message: 'Configuração indisponível.' },
      { status: 500 },
    )
  }

  const stripe = getStripeClient()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { message: 'Assinatura inválida.' },
      { status: 400 },
    )
  }

  let event: Stripe.Event

  try {
    const rawBody = await request.text()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch {
    return NextResponse.json(
      { message: 'Assinatura inválida.' },
      { status: 400 },
    )
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await syncClerkMembershipFromCheckoutSession(
        event.data.object as Stripe.Checkout.Session,
      )
    } else if (
      handledEventTypes.has(event.type) &&
      event.type.startsWith('customer.subscription.')
    ) {
      await syncClerkMembershipFromSubscription(
        event.data.object as Stripe.Subscription,
      )
    }

    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json(
      { message: 'Não foi possível processar o webhook.' },
      { status: 502 },
    )
  }
}
