import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SupportPageClient from '@/components/support/SupportPageClient'
import { supportTiers } from '@/lib/support/config'

describe('SupportPageClient', () => {
  it('shows recurring support first and allows pix selection for one-time donations', async () => {
    const user = userEvent.setup()

    render(
      createElement(SupportPageClient, {
        tiers: supportTiers,
        donationSuggestions: [1000, 2500, 5000],
      }),
    )

    expect(
      screen.getByRole('heading', { name: /apoie a continuidade do projeto/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/r\$ 20,00/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /prefere ajudar uma vez\?/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^pix$/i }))

    expect(
      screen.getByText(/doação avulsa por pix ou cartão/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/seu e-mail/i)).toBeInTheDocument()
  })

  it('renders pix payment state after a successful pix donation request', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        chargeId: 'pix_123',
        status: 'PENDING',
        brCode: '000201',
        brCodeBase64: 'data:image/png;base64,abc',
        expiresAt: '2026-04-05T12:00:00.000Z',
        ticketUrl: 'https://www.mercadopago.com.br/payments/123/ticket',
      }),
    })

    vi.stubGlobal('fetch', fetchMock)

    render(
      createElement(SupportPageClient, {
        tiers: supportTiers,
        donationSuggestions: [1000, 2500, 5000],
      }),
    )

    await user.type(screen.getByLabelText(/seu e-mail/i), 'pix@example.com')
    await user.click(screen.getByRole('button', { name: /quero doar uma vez/i }))

    expect(
      await screen.findByRole('heading', { name: /pagamento por pix/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /abrir no mercado pago/i }),
    ).toHaveAttribute('href', 'https://www.mercadopago.com.br/payments/123/ticket')
    expect(fetchMock).toHaveBeenCalledWith('/api/support/donate/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amountInCents: 2500,
        paymentMethod: 'pix',
        payerEmail: 'pix@example.com',
        source: 'support-page',
      }),
    })
  })

  it('uses the custom input amount as the source of truth for donation requests', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        chargeId: 'pix_123',
        status: 'PENDING',
        brCode: '000201',
        brCodeBase64: 'data:image/png;base64,abc',
        expiresAt: '2026-04-05T12:00:00.000Z',
      }),
    })

    vi.stubGlobal('fetch', fetchMock)

    render(
      createElement(SupportPageClient, {
        tiers: supportTiers,
        donationSuggestions: [1000, 2500, 5000],
      }),
    )

    const amountInput = screen.getByLabelText(/outro valor/i)

    await user.clear(amountInput)
    await user.type(amountInput, '3999')
    await user.type(screen.getByLabelText(/seu e-mail/i), 'pix@example.com')
    await user.click(screen.getByRole('button', { name: /quero doar uma vez/i }))

    expect(fetchMock).toHaveBeenCalledWith('/api/support/donate/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amountInCents: 3999,
        paymentMethod: 'pix',
        payerEmail: 'pix@example.com',
        source: 'support-page',
      }),
    })
  })

  it('fills the amount input when a preset suggestion is selected', async () => {
    const user = userEvent.setup()

    render(
      createElement(SupportPageClient, {
        tiers: supportTiers,
        donationSuggestions: [1000, 2500, 5000],
      }),
    )

    await user.click(screen.getByRole('button', { name: /50,00/i }))

    expect(screen.getByLabelText(/outro valor/i)).toHaveValue('R$ 50,00')
  })
})
