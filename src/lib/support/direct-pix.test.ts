import { describe, expect, it, vi } from 'vitest'

const findSupportPixChargeByProviderChargeId = vi.hoisted(() => vi.fn())
const updateSupportPixChargeStatus = vi.hoisted(() => vi.fn())
const toDataURL = vi.hoisted(() => vi.fn())

vi.mock('@/lib/support/support-payments-store', () => ({
  findSupportPixChargeByProviderChargeId,
  updateSupportPixChargeStatus,
}))

vi.mock('qrcode', () => ({
  default: {
    toDataURL,
  },
}))

describe('direct pix adapter', () => {
  it('creates a direct pix BR code and qr image from the local payload', async () => {
    toDataURL.mockResolvedValue('data:image/png;base64,fake')

    const { directPixAdapter } = await import('./direct-pix')
    const charge = await directPixAdapter.createCharge({
      amountInCents: 2500,
      payerEmail: 'pix@example.com',
      source: 'support-page',
    })

    expect(charge.chargeId).toMatch(/^direct_pix_/)
    expect(charge.status).toBe('PENDING')
    expect(charge.brCode).toContain('BR.GOV.BCB.PIX')
    expect(charge.brCode).toContain('24490987000138')
    expect(charge.brCode).toContain('540525.00')
    expect(charge.brCodeBase64).toBe('data:image/png;base64,fake')
  })

  it('returns the locally stored status for a direct pix charge', async () => {
    findSupportPixChargeByProviderChargeId.mockResolvedValue({
      providerChargeId: 'direct_pix_123',
      status: 'PENDING',
      expiresAt: '2099-04-05T12:00:00.000Z',
    })

    const { directPixAdapter } = await import('./direct-pix')
    const charge = await directPixAdapter.checkCharge('direct_pix_123')

    expect(charge).toEqual({
      chargeId: 'direct_pix_123',
      status: 'PENDING',
      expiresAt: '2099-04-05T12:00:00.000Z',
    })
  })

  it('expires stale direct pix charges from local storage', async () => {
    findSupportPixChargeByProviderChargeId.mockResolvedValue({
      providerChargeId: 'direct_pix_123',
      status: 'PENDING',
      expiresAt: '2020-04-05T12:00:00.000Z',
    })

    const { directPixAdapter } = await import('./direct-pix')
    const charge = await directPixAdapter.checkCharge('direct_pix_123')

    expect(charge).toEqual({
      chargeId: 'direct_pix_123',
      status: 'EXPIRED',
      expiresAt: '2020-04-05T12:00:00.000Z',
    })
    expect(updateSupportPixChargeStatus).toHaveBeenCalledWith({
      provider: 'direct_pix',
      providerChargeId: 'direct_pix_123',
      status: 'EXPIRED',
      expiresAt: '2020-04-05T12:00:00.000Z',
    })
  })
})
