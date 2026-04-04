import { NextResponse } from 'next/server'
import { checkTransparentPixCharge } from '@/lib/support/abacate-pay'
import { resolveSupportRouteError } from '@/lib/support/route-context'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ chargeId: string }> },
) {
  try {
    const { chargeId } = await params
    const charge = await checkTransparentPixCharge(chargeId)

    return NextResponse.json({
      chargeId: charge.data.id,
      status: charge.data.status,
      expiresAt: charge.data.expiresAt,
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
