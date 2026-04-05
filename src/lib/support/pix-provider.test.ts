import { beforeEach, describe, expect, it, vi } from 'vitest'

const getSupportEnv = vi.hoisted(() => vi.fn())
const createTransparentPixCharge = vi.hoisted(() => vi.fn())
const checkTransparentPixCharge = vi.hoisted(() => vi.fn())

vi.mock('@/lib/support/config', () => ({
  getSupportEnv,
}))

vi.mock('@/lib/support/abacate-pay', () => ({
  createTransparentPixCharge,
  checkTransparentPixCharge,
}))

describe('pix provider adapter selection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('selects Abacate Pay when PIX_PROVIDER=abacate_pay', async () => {
    getSupportEnv.mockReturnValue({
      PIX_PROVIDER: 'abacate_pay',
      ABACATE_PAY_API_KEY: 'abacate_test_123',
    })
    createTransparentPixCharge.mockResolvedValue({
      success: true,
      error: null,
      data: {
        id: 'pix_abacate_123',
        status: 'PENDING',
        brCode: '000201',
        brCodeBase64: 'data:image/png;base64,abc',
        expiresAt: '2026-04-05T12:00:00.000Z',
      },
    })

    const { getPixProviderAdapter } = await import('./pix-provider')
    const adapter = getPixProviderAdapter()
    const result = await adapter.createCharge({
      amountInCents: 2500,
      source: 'support-page',
    })

    expect(adapter.provider).toBe('abacate_pay')
    expect(result.chargeId).toBe('pix_abacate_123')
  })

  it('selects Mercado Pago when PIX_PROVIDER=mercado_pago', async () => {
    getSupportEnv.mockReturnValue({
      PIX_PROVIDER: 'mercado_pago',
      MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR_test_123',
      MERCADO_PAGO_PIX_PAYER_EMAIL: 'pix@testuser.com',
    })

    const { getPixProviderAdapter } = await import('./pix-provider')
    const adapter = getPixProviderAdapter()

    expect(adapter.provider).toBe('mercado_pago')
  })

  it('fails fast when the selected provider is missing required config', async () => {
    getSupportEnv.mockReturnValue({
      PIX_PROVIDER: 'abacate_pay',
    })

    const { getPixProviderAdapter } = await import('./pix-provider')

    expect(() => getPixProviderAdapter()).toThrow(
      'Abacate Pay não configurado para Pix.',
    )
  })
})
