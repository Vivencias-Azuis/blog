import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

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

export const userFavorites = sqliteTable(
  'user_favorites',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    clerkUserId: text('clerk_user_id').notNull(),
    postSlug: text('post_slug').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => ({
    userSlugIdx: uniqueIndex('user_favorites_user_slug_idx').on(
      table.clerkUserId,
      table.postSlug,
    ),
    userIdx: index('user_favorites_user_idx').on(table.clerkUserId),
  }),
)

export type SupportPixChargeRow = typeof supportPixCharges.$inferSelect
export type NewSupportPixChargeRow = typeof supportPixCharges.$inferInsert
export type UserFavoriteRow = typeof userFavorites.$inferSelect
export type NewUserFavoriteRow = typeof userFavorites.$inferInsert
