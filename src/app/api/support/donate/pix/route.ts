import { NextResponse } from 'next/server'
import { getPixProviderAdapter } from '@/lib/support/pix-provider'
import { upsertSupportPixCharge } from '@/lib/support/support-payments-store'
import {
  parsePixDonationRequest,
  readJsonBody,
  resolveSupportRouteError,
} from '@/lib/support/route-context'

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request)
    const { providerInput } = parsePixDonationRequest(body)
    const adapter = getPixProviderAdapter()
    const charge = await adapter.createCharge(providerInput)
    await upsertSupportPixCharge({
      provider: adapter.provider,
      providerChargeId: charge.chargeId,
      source: providerInput.source,
      payerEmail: providerInput.payerEmail,
      amountInCents: providerInput.amountInCents,
      status: charge.status,
      brCode: charge.brCode,
      brCodeBase64: charge.brCodeBase64,
      ticketUrl: charge.ticketUrl,
      expiresAt: charge.expiresAt,
    })

    return NextResponse.json({
      chargeId: charge.chargeId,
      status: charge.status,
      brCode: charge.brCode,
      brCodeBase64: charge.brCodeBase64,
      expiresAt: charge.expiresAt,
      ticketUrl: charge.ticketUrl,
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
