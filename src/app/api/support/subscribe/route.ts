import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import {
  parseSubscriptionRequest,
  readJsonBody,
  resolveSupportRouteError,
} from '@/lib/support/route-context'
import { getStripeClient } from '@/lib/support/stripe'

export async function POST(request: Request) {
  try {
    const authSession = await auth()

    if (!authSession.userId) {
      return NextResponse.json(
        { message: 'Faça login para iniciar a assinatura.' },
        { status: 401 },
      )
    }

    const body = await readJsonBody(request)
    let customerEmail: string | undefined

    try {
      const user = await currentUser()
      customerEmail = user?.emailAddresses[0]?.emailAddress
    } catch {
      customerEmail = undefined
    }

    const { checkoutParams } = parseSubscriptionRequest(body, {
      clerkUserId: authSession.userId,
      customerEmail,
    })
    const stripe = getStripeClient()
    const checkoutSession = await stripe.checkout.sessions.create(checkoutParams)

    if (!checkoutSession.url) {
      return NextResponse.json(
        { message: 'Checkout indisponível no momento.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ url: checkoutSession.url })
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
