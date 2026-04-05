import Stripe from 'stripe'
import { getSupportStripeEnv } from '@/lib/support/config'

let stripeClient: Stripe | null = null
const stripeClientConfig = {
  apiVersion: '2025-08-27.basil' as const,
}

export function getStripeClient() {
  if (!stripeClient) {
    const env = getSupportStripeEnv()
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, stripeClientConfig)
  }

  return stripeClient
}
