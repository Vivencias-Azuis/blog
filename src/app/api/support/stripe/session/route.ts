import { NextResponse } from 'next/server'
import {
  assertSupportSession,
  resolveSupportRouteError,
} from '@/lib/support/route-context'
import { getStripeClient } from '@/lib/support/stripe'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { message: 'session_id é obrigatório.' },
      { status: 400 },
    )
  }

  try {
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    assertSupportSession(session)

    return NextResponse.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
    })
  } catch (error) {
    const routeError = resolveSupportRouteError(error, {
      message: 'Não foi possível verificar o pagamento.',
      status: 502,
    })

    return NextResponse.json(
      { message: routeError.message },
      { status: routeError.status },
    )
  }
}
