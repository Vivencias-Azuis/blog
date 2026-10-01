import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AbaMonthlyCostCalculator from '@/components/AbaMonthlyCostCalculator'
import { getPostBySlug } from '@/lib/posts'
import { FOOTER_GUIDE_LINKS } from '@/lib/search-hubs'

const ABA_VALOR = 'terapia-aba-valor-2026-preco-sessoes-e-reembolso'
const PLANOS_HREF = FOOTER_GUIDE_LINKS[1].href

describe('AbaMonthlyCostCalculator', () => {
  it('keeps the monthly estimate hidden until both values are valid', () => {
    render(<AbaMonthlyCostCalculator />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows the monthly estimate after session value and weekly sessions', () => {
    render(<AbaMonthlyCostCalculator />)

    fireEvent.change(screen.getByLabelText(/valor da sessão/i), { target: { value: '150' } })
    fireEvent.change(screen.getByLabelText(/sessões por semana/i), { target: { value: '8' } })

    expect(screen.getByRole('status')).toHaveTextContent(/R\$\s*5\.160/)
    expect(screen.getByRole('status')).toHaveTextContent(/por mês, estimativa/)
  })

  it('points the coverage shortcut at the plans hub', () => {
    render(<AbaMonthlyCostCalculator />)

    expect(screen.getByRole('link', { name: /meu plano cobre/i })).toHaveAttribute('href', PLANOS_HREF)
  })
})

describe('ABA valor post', () => {
  it('embeds the monthly cost calculator in the article body', () => {
    const post = getPostBySlug(ABA_VALOR)

    expect(post?.content).toContain('<AbaMonthlyCostCalculator')
  })
})
