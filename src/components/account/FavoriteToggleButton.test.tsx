import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import FavoriteToggleButton from '@/components/account/FavoriteToggleButton'

describe('FavoriteToggleButton', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('calls the API when the user toggles the favorite state', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)

    render(<FavoriteToggleButton postSlug="post-a" initialFavorited={false} />)

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }))

    expect(fetchMock).toHaveBeenCalled()
  })
})
