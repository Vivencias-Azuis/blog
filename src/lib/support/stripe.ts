import Stripe from 'stripe'
import { getSupportEnv } from '@/lib/support/config'

let stripeClient: Stripe | null = null
const stripeClientConfig = {
  apiVersion: '2025-08-27.basil' as const,
}

export function getStripeClient() {
  if (!stripeClient) {
    const env = getSupportEnv()
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, stripeClientConfig)
  }

  return stripeClient
}
