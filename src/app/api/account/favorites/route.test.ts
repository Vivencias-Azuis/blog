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

  it('returns 401 for unauthenticated GET without calling helpers', async () => {
    authMock.mockResolvedValue({ userId: null })

    const { GET } = await import('./route')
    const response = await GET()

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(listFavoriteSlugsMock).not.toHaveBeenCalled()
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

  it('returns 401 for unauthenticated POST without calling helpers', async () => {
    authMock.mockResolvedValue({ userId: null })

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/account/favorites', {
      method: 'POST',
      body: JSON.stringify({ postSlug: 'post-a' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(addFavoriteMock).not.toHaveBeenCalled()
  })

  it('returns 400 for malformed JSON', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/account/favorites', {
      method: 'POST',
      body: '{',
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'Malformed JSON' })
    expect(addFavoriteMock).not.toHaveBeenCalled()
  })

  it.each([
    ['missing postSlug', {}],
    ['wrong type', { postSlug: 123 }],
    ['whitespace slug', { postSlug: '   ' }],
    ['invalid slug', { postSlug: 'post slug' }],
  ])('returns 422 for %s', async (_label, payload) => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/account/favorites', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    const response = await POST(request)

    expect(response.status).toBe(422)
    await expect(response.json()).resolves.toMatchObject({ error: 'Invalid payload' })
    expect(addFavoriteMock).not.toHaveBeenCalled()
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

  it('trims surrounding spaces before deleting a favorite', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(
      new Request('http://localhost/api/account/favorites/%20post-a%20'),
      {
        params: Promise.resolve({ slug: '  post-a  ' }),
      },
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(removeFavoriteMock).toHaveBeenCalledWith('user_123', 'post-a')
  })

  it('returns 401 for unauthenticated DELETE without calling helpers', async () => {
    authMock.mockResolvedValue({ userId: null })

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(new Request('http://localhost/api/account/favorites/post-a'), {
      params: Promise.resolve({ slug: 'post-a' }),
    })

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(removeFavoriteMock).not.toHaveBeenCalled()
  })

  it('returns 422 for invalid DELETE slug', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(new Request('http://localhost/api/account/favorites/post%20a'), {
      params: Promise.resolve({ slug: 'post a' }),
    })

    expect(response.status).toBe(422)
    await expect(response.json()).resolves.toEqual({ error: 'Invalid slug' })
    expect(removeFavoriteMock).not.toHaveBeenCalled()
  })
})
