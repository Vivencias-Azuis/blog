import { NextResponse } from 'next/server'
import { getPixProviderAdapter } from '@/lib/support/pix-provider'
import { resolveSupportRouteError } from '@/lib/support/route-context'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ chargeId: string }> },
) {
  try {
    const { chargeId } = await params
    const adapter = getPixProviderAdapter()
    const charge = await adapter.checkCharge(chargeId)

    return NextResponse.json({
      chargeId: charge.chargeId,
      status: charge.status,
      expiresAt: charge.expiresAt,
    })
  } catch (error) {
    const routeError = resolveSupportRouteError(error, {
      message: 'Não foi possível consultar o Pix.',
      status: 502,
    })

    return NextResponse.json(
      { message: routeError.message },
      { status: routeError.status },
    )
  }
}
