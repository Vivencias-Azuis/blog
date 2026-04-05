import { describe, expect, beforeEach, it, vi } from 'vitest'

const authMock = vi.fn()
const listFavoriteSlugsMock = vi.fn()
const addFavoriteMock = vi.fn()
const removeFavoriteMock = vi.fn()

vi.mock('@clerk/nextjs/server', () => ({
  auth: authMock,
}))

vi.mock('@/lib/account/favorites', () => ({
  listFavoriteSlugs: listFavoriteSlugsMock,
  addFavorite: addFavoriteMock,
  removeFavorite: removeFavoriteMock,
}))

describe('favorites routes', () => {
  beforeEach(() => {
    authMock.mockReset()
    listFavoriteSlugsMock.mockReset()
    addFavoriteMock.mockReset()
    removeFavoriteMock.mockReset()
  })

  it('lists favorites for the signed-in user', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    listFavoriteSlugsMock.mockResolvedValue([
      { postSlug: 'post-a', createdAt: '2026-04-05T10:00:00.000Z' },
    ])

    const { GET } = await import('./route')
    const response = await GET()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      items: [{ postSlug: 'post-a', createdAt: '2026-04-05T10:00:00.000Z' }],
    })
    expect(listFavoriteSlugsMock).toHaveBeenCalledWith('user_123')
  })

  it('adds a favorite for the signed-in user', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/account/favorites', {
      method: 'POST',
      body: JSON.stringify({ postSlug: 'post-a' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(addFavoriteMock).toHaveBeenCalledWith('user_123', 'post-a')
  })

  it('removes a favorite for the signed-in user', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(new Request('http://localhost/api/account/favorites/post-a'), {
      params: Promise.resolve({ slug: 'post-a' }),
    })

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(removeFavoriteMock).toHaveBeenCalledWith('user_123', 'post-a')
  })
})
