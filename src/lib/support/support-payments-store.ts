import { and, eq } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { supportPixCharges } from '@/db/schema'
import type { PixProvider } from '@/lib/support/config'
import type { PixChargeResult } from '@/lib/support/pix-provider'

type SupportPixStatus = PixChargeResult['status']

export async function upsertSupportPixCharge(input: {
  provider: PixProvider
  providerChargeId: string
  source: string
  payerEmail?: string
  amountInCents: number
  status: SupportPixStatus
  brCode: string
  brCodeBase64: string
  ticketUrl?: string
  expiresAt: string
  externalReference?: string
}) {
  const now = new Date().toISOString()
  const db = getDb()

  await db
    .insert(supportPixCharges)
    .values({
      provider: input.provider,
      providerChargeId: input.providerChargeId,
      source: input.source,
      payerEmail: input.payerEmail ?? null,
      amountInCents: input.amountInCents,
      status: input.status,
      brCode: input.brCode,
      brCodeBase64: input.brCodeBase64,
      ticketUrl: input.ticketUrl ?? null,
      expiresAt: input.expiresAt,
      externalReference: input.externalReference ?? null,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [supportPixCharges.provider, supportPixCharges.providerChargeId],
      set: {
        payerEmail: input.payerEmail ?? null,
        amountInCents: input.amountInCents,
        status: input.status,
        brCode: input.brCode,
        brCodeBase64: input.brCodeBase64,
        ticketUrl: input.ticketUrl ?? null,
        expiresAt: input.expiresAt,
        externalReference: input.externalReference ?? null,
        updatedAt: now,
      },
    })
}

export async function updateSupportPixChargeStatus(input: {
  provider: PixProvider
  providerChargeId: string
  status: SupportPixStatus
  externalReference?: string | null
  expiresAt?: string
}) {
  const db = getDb()

  await db
    .update(supportPixCharges)
    .set({
      status: input.status,
      externalReference: input.externalReference ?? null,
      expiresAt: input.expiresAt ?? null,
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(supportPixCharges.provider, input.provider),
        eq(supportPixCharges.providerChargeId, input.providerChargeId),
      ),
    )
}

export async function findSupportPixChargeByProviderChargeId(
  provider: PixProvider,
  providerChargeId: string,
) {
  const db = getDb()

  const rows = await db
    .select()
    .from(supportPixCharges)
    .where(
      and(
        eq(supportPixCharges.provider, provider),
        eq(supportPixCharges.providerChargeId, providerChargeId),
      ),
    )
    .limit(1)

  return rows[0] ?? null
}
