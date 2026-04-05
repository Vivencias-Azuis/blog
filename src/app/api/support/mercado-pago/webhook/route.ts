import { NextResponse } from 'next/server'
import { fetchMercadoPagoPayment } from '@/lib/support/mercado-pago'
import { updateSupportPixChargeStatus } from '@/lib/support/support-payments-store'

function getPaymentIdFromUrl(request: Request) {
  const url = new URL(request.url)
  const topic = url.searchParams.get('topic')
  const id = url.searchParams.get('id')

  if (topic === 'payment' && id) {
    return id
  }

  return null
}

function getTopicFromUrl(request: Request) {
  const url = new URL(request.url)
  return url.searchParams.get('topic')
}

export async function POST(request: Request) {
  try {
    const fallbackPaymentId = getPaymentIdFromUrl(request)
    const body = await request.json().catch(() => null)
    const type =
      typeof body?.type === 'string'
        ? body.type
        : typeof body?.topic === 'string'
          ? body.topic
          : getTopicFromUrl(request)
    const paymentId =
      typeof body?.data?.id === 'string' || typeof body?.data?.id === 'number'
        ? String(body.data.id)
        : fallbackPaymentId

    if (type !== 'payment' || !paymentId) {
      return NextResponse.json({ ok: true })
    }

    const payment = await fetchMercadoPagoPayment(paymentId)
    await updateSupportPixChargeStatus({
      provider: 'mercado_pago',
      providerChargeId: payment.id,
      status: payment.status,
      externalReference: payment.externalReference,
      expiresAt: payment.expiresAt,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
