import { describe, expect, it } from 'vitest'
import {
  formatSubscriptionStatus,
  formatSupportTier,
} from '@/app/(account)/minha-area/assinatura/view-model'

describe('formatSubscriptionStatus', () => {
  it('formats mapped Stripe statuses', () => {
    expect(formatSubscriptionStatus('active', true)).toBe('Ativo')
  })

  it('avoids contradictory fallback for legacy member access', () => {
    expect(formatSubscriptionStatus(null, true)).toBe('Acesso liberado')
  })

  it('shows no active subscription for non-members without Stripe state', () => {
    expect(formatSubscriptionStatus(null, false)).toBe('Sem assinatura ativa')
  })
})

describe('formatSupportTier', () => {
  it('formats known support tiers', () => {
    expect(formatSupportTier('fortalecer', true)).toBe('Fortalecer')
  })

  it('avoids empty plan labels for legacy member access', () => {
    expect(formatSupportTier(null, true)).toBe('Acesso de membro')
  })

  it('shows no plan for non-members without tier data', () => {
    expect(formatSupportTier(null, false)).toBe('Sem plano')
  })
})
