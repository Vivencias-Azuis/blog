import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const supportPixCharges = sqliteTable(
  'support_pix_charges',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    provider: text('provider').notNull(),
    providerChargeId: text('provider_charge_id').notNull(),
    source: text('source').notNull(),
    payerEmail: text('payer_email'),
    amountInCents: integer('amount_in_cents').notNull(),
    status: text('status').notNull(),
    brCode: text('br_code'),
    brCodeBase64: text('br_code_base64'),
    ticketUrl: text('ticket_url'),
    expiresAt: text('expires_at'),
    externalReference: text('external_reference'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => ({
    providerChargeIdx: uniqueIndex('support_pix_charges_provider_charge_idx').on(
      table.provider,
      table.providerChargeId,
    ),
  }),
)

export type SupportPixChargeRow = typeof supportPixCharges.$inferSelect
export type NewSupportPixChargeRow = typeof supportPixCharges.$inferInsert
