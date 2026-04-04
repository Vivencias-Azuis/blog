import { NextResponse } from 'next/server'
import {
  parseSubscriptionRequest,
  readJsonBody,
  resolveSupportRouteError,
} from '@/lib/support/route-context'
import { getStripeClient } from '@/lib/support/stripe'

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request)
    const { checkoutParams } = parseSubscriptionRequest(body)
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.create(checkoutParams)

    if (!session.url) {
      return NextResponse.json(
        { message: 'Checkout indisponível no momento.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const routeError = resolveSupportRouteError(error, {
      message: 'Não foi possível iniciar a assinatura.',
      status: 502,
    })

    return NextResponse.json(
      { message: routeError.message },
      { status: routeError.status },
    )
  }
}
