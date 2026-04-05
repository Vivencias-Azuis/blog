import { beforeEach, describe, expect, it, vi } from 'vitest'

const getSupportPixEnv = vi.hoisted(() => vi.fn())
const createTransparentPixCharge = vi.hoisted(() => vi.fn())
const checkTransparentPixCharge = vi.hoisted(() => vi.fn())

vi.mock('@/lib/support/config', () => ({
  getSupportPixEnv,
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
    getSupportPixEnv.mockReturnValue({
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
    getSupportPixEnv.mockReturnValue({
      PIX_PROVIDER: 'mercado_pago',
      MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR_test_123',
    })

    const { getPixProviderAdapter } = await import('./pix-provider')
    const adapter = getPixProviderAdapter()

    expect(adapter.provider).toBe('mercado_pago')
  })

  it('falls back to Mercado Pago when provider is unset but token exists', async () => {
    getSupportPixEnv.mockReturnValue({
      MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR_test_123',
    })

    const { getPixProviderAdapter } = await import('./pix-provider')
    const adapter = getPixProviderAdapter()

    expect(adapter.provider).toBe('mercado_pago')
  })

  it('fails fast when the selected provider is missing required config', async () => {
    getSupportPixEnv.mockReturnValue({
      PIX_PROVIDER: 'abacate_pay',
    })

    const { getPixProviderAdapter } = await import('./pix-provider')

    expect(() => getPixProviderAdapter()).toThrow(
      'Abacate Pay não configurado para Pix.',
    )
  })
})
