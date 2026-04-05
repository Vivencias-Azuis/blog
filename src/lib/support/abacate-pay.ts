import { getSupportPixEnv } from '@/lib/support/config'
import type { AbacatePixPayload } from '@/lib/support/schema'
import { z } from 'zod'

const abacateTransparentChargeResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().nullable(),
  data: z.object({
    id: z.string(),
    status: z.enum(['PENDING', 'PAID', 'EXPIRED']),
    brCode: z.string(),
    brCodeBase64: z.string(),
    expiresAt: z.string(),
  }),
})

export type AbacateTransparentChargeResponse = z.infer<
  typeof abacateTransparentChargeResponseSchema
>

function parseAbacateTransparentChargeResponse(body: unknown) {
  const parsed = abacateTransparentChargeResponseSchema.parse(body)

  if (!parsed.success) {
    throw new Error(parsed.error ?? 'Abacate Pay request failed')
  }

  return parsed
}

export async function createTransparentPixCharge(payload: AbacatePixPayload) {
  const env = getSupportPixEnv()

  if (!env.ABACATE_PAY_API_KEY) {
    throw new Error('Abacate Pay Pix create failed')
  }

  const response = await fetch(
    'https://api.abacatepay.com/v2/transparents/create',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.ABACATE_PAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error('Abacate Pay Pix create failed')
  }

  return parseAbacateTransparentChargeResponse(await response.json())
}

export async function checkTransparentPixCharge(chargeId: string) {
  const env = getSupportPixEnv()

  if (!env.ABACATE_PAY_API_KEY) {
    throw new Error('Abacate Pay Pix status check failed')
  }

  const response = await fetch(
    `https://api.abacatepay.com/v2/transparents/check?id=${encodeURIComponent(chargeId)}`,
    {
      headers: {
        Authorization: `Bearer ${env.ABACATE_PAY_API_KEY}`,
      },
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error('Abacate Pay Pix status check failed')
  }

  return parseAbacateTransparentChargeResponse(await response.json())
}
