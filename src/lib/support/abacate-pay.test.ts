import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const getSupportEnv = vi.hoisted(() => vi.fn())

vi.mock('@/lib/support/config', () => ({
  getSupportEnv,
}))

describe('abacate pay support client', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    getSupportEnv.mockReturnValue({
      ABACATE_PAY_API_KEY: 'abacate_test_123',
    })
  })

  it('sends the expected create request shape and validates the response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        error: null,
        data: {
          id: 'pix_char_123',
          status: 'PENDING',
          brCode: 'BRCODE',
          brCodeBase64: 'BASE64',
          expiresAt: '2026-04-04T12:00:00.000Z',
        },
      }),
    })

    vi.stubGlobal('fetch', fetchMock)

    const { createTransparentPixCharge } = await import('./abacate-pay')

    const payload = {
      method: 'PIX' as const,
      data: {
        amount: 5000,
        description: 'Doação para o projeto Vivências Azuis',
        expiresIn: 3600,
        metadata: {
          kind: 'donation' as const,
          source: 'support-page',
        },
      },
    }

    const response = await createTransparentPixCharge(payload)

    expect(response.data.id).toBe('pix_char_123')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.abacatepay.com/v2/transparents/create',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer abacate_test_123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      },
    )
  })

  it('throws for non-OK responses, provider-level failures, and invalid response JSON', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        json: vi.fn(),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: false,
          error: 'Pix creation rejected',
          data: {
            id: 'pix_char_123',
            status: 'PENDING',
            brCode: 'BRCODE',
            brCodeBase64: 'BASE64',
            expiresAt: '2026-04-04T12:00:00.000Z',
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          error: null,
          data: {
            id: 123,
            status: 'PENDING',
            brCode: 'BRCODE',
            brCodeBase64: 'BASE64',
            expiresAt: '2026-04-04T12:00:00.000Z',
          },
        }),
      })

    vi.stubGlobal('fetch', fetchMock)

    const { createTransparentPixCharge } = await import('./abacate-pay')

    await expect(
      createTransparentPixCharge({
        method: 'PIX',
        data: {
          amount: 5000,
          description: 'Doação para o projeto Vivências Azuis',
          expiresIn: 3600,
          metadata: {
            kind: 'donation',
            source: 'support-page',
          },
        },
      }),
    ).rejects.toThrow('Abacate Pay Pix create failed')

    await expect(
      createTransparentPixCharge({
        method: 'PIX',
        data: {
          amount: 5000,
          description: 'Doação para o projeto Vivências Azuis',
          expiresIn: 3600,
          metadata: {
            kind: 'donation',
            source: 'support-page',
          },
        },
      }),
    ).rejects.toThrow('Pix creation rejected')

    await expect(
      createTransparentPixCharge({
        method: 'PIX',
        data: {
          amount: 5000,
          description: 'Doação para o projeto Vivências Azuis',
          expiresIn: 3600,
          metadata: {
            kind: 'donation',
            source: 'support-page',
          },
        },
      }),
    ).rejects.toThrow()
  })

  it('encodes the charge id in the status URL and validates the response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        error: null,
        data: {
          id: 'pix_char_123',
          status: 'PAID',
          brCode: 'BRCODE',
          brCodeBase64: 'BASE64',
          expiresAt: '2026-04-04T12:00:00.000Z',
        },
      }),
    })

    vi.stubGlobal('fetch', fetchMock)

    const { checkTransparentPixCharge } = await import('./abacate-pay')

    const response = await checkTransparentPixCharge('pix char/123')

    expect(response.data.status).toBe('PAID')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.abacatepay.com/v2/transparents/check?id=pix%20char%2F123',
      {
        headers: {
          Authorization: 'Bearer abacate_test_123',
        },
        cache: 'no-store',
      },
    )
  })
})
