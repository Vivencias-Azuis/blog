import { NextResponse } from 'next/server'
import { createTransparentPixCharge } from '@/lib/support/abacate-pay'
import {
  parsePixDonationRequest,
  readJsonBody,
  resolveSupportRouteError,
} from '@/lib/support/route-context'

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request)
    const { payload } = parsePixDonationRequest(body)
    const charge = await createTransparentPixCharge(payload)

    return NextResponse.json({
      chargeId: charge.data.id,
      status: charge.data.status,
      brCode: charge.data.brCode,
      brCodeBase64: charge.data.brCodeBase64,
      expiresAt: charge.data.expiresAt,
    })
  } catch (error) {
    const routeError = resolveSupportRouteError(error, {
      message: 'Não foi possível gerar o Pix agora.',
      status: 502,
    })

    return NextResponse.json(
      { message: routeError.message },
      { status: routeError.status },
    )
  }
}
