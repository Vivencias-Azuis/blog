import { describe, expect, beforeEach, it, vi } from 'vitest'

const authMock = vi.fn()
const listFavoriteSlugsMock = vi.fn()
const addFavoriteMock = vi.fn()
const removeFavoriteSlugsMock = vi.fn()
const canonicalizeFavoriteItemsMock = vi.fn()
const resolveRemovableFavoriteSlugsMock = vi.fn()
const normalizeSlugMock = vi.fn((slug: string) => slug)
const getCanonicalPostSlugMock = vi.fn(() => undefined)
const getPostBySlugMock = vi.fn()

vi.mock('@clerk/nextjs/server', () => ({
  auth: authMock,
}))

vi.mock('@/lib/account/favorites', () => ({
  listFavoriteSlugs: listFavoriteSlugsMock,
  addFavorite: addFavoriteMock,
  removeFavoriteSlugs: removeFavoriteSlugsMock,
  canonicalizeFavoriteItems: canonicalizeFavoriteItemsMock,
  resolveRemovableFavoriteSlugs: resolveRemovableFavoriteSlugsMock,
}))

vi.mock('@/lib/posts', () => ({
  normalizeSlug: normalizeSlugMock,
  getPostBySlug: getPostBySlugMock,
}))

vi.mock('@/lib/canonical-posts', () => ({
  getCanonicalPostSlug: getCanonicalPostSlugMock,
}))

describe('favorites routes', () => {
  beforeEach(() => {
    authMock.mockReset()
    listFavoriteSlugsMock.mockReset()
    addFavoriteMock.mockReset()
    removeFavoriteSlugsMock.mockReset()
    canonicalizeFavoriteItemsMock.mockReset()
    resolveRemovableFavoriteSlugsMock.mockReset()
    normalizeSlugMock.mockClear()
    normalizeSlugMock.mockImplementation((slug: string) => slug)
    getCanonicalPostSlugMock.mockReset()
    getCanonicalPostSlugMock.mockReturnValue(undefined)
    getPostBySlugMock.mockReset()
    getPostBySlugMock.mockReturnValue({
      slug: 'post-a',
    })
    canonicalizeFavoriteItemsMock.mockImplementation((items: unknown) => ({
      items,
      unresolvedCount: 0,
    }))
    resolveRemovableFavoriteSlugsMock.mockImplementation(
      (_items: unknown, targetSlug: string) => [targetSlug],
    )
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
      unresolvedCount: 0,
    })
    expect(listFavoriteSlugsMock).toHaveBeenCalledWith('user_123')
  })

  it('returns canonicalized favorite items for GET', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    listFavoriteSlugsMock.mockResolvedValue([
      {
        postSlug: 'post-antigo',
        createdAt: '2026-04-05T10:00:00.000Z',
      },
    ])
    canonicalizeFavoriteItemsMock.mockReturnValue({
      items: [{ postSlug: 'post-canonico', createdAt: '2026-04-05T10:00:00.000Z' }],
      unresolvedCount: 0,
    })

    const { GET } = await import('./route')
    const response = await GET()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      items: [{ postSlug: 'post-canonico', createdAt: '2026-04-05T10:00:00.000Z' }],
      unresolvedCount: 0,
    })
    expect(canonicalizeFavoriteItemsMock).toHaveBeenCalledWith([
      { postSlug: 'post-antigo', createdAt: '2026-04-05T10:00:00.000Z' },
    ])
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

  it('stores the canonical slug when the request matches a redirected post', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    getCanonicalPostSlugMock.mockReturnValue('post-canonico')
    getPostBySlugMock.mockReturnValue({
      slug: 'post-canonico',
    })

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/account/favorites', {
      method: 'POST',
      body: JSON.stringify({ postSlug: 'post-antigo' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(addFavoriteMock).toHaveBeenCalledWith('user_123', 'post-canonico')
  })

  it('rejects unknown favorite slugs before writing to the database', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    getPostBySlugMock.mockReturnValue(null)

    const { POST } = await import('./route')
    const request = new Request('http://localhost/api/account/favorites', {
      method: 'POST',
      body: JSON.stringify({ postSlug: 'post-inexistente' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({ error: 'Post not found' })
    expect(addFavoriteMock).not.toHaveBeenCalled()
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
    listFavoriteSlugsMock.mockResolvedValue([
      { postSlug: 'post-a', createdAt: '2026-04-05T10:00:00.000Z' },
    ])

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(new Request('http://localhost/api/account/favorites/post-a'), {
      params: Promise.resolve({ slug: 'post-a' }),
    })

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(removeFavoriteSlugsMock).toHaveBeenCalledWith('user_123', ['post-a'])
  })

  it('trims surrounding spaces before deleting a favorite', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    listFavoriteSlugsMock.mockResolvedValue([
      { postSlug: 'post-a', createdAt: '2026-04-05T10:00:00.000Z' },
    ])

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(
      new Request('http://localhost/api/account/favorites/%20post-a%20'),
      {
        params: Promise.resolve({ slug: '  post-a  ' }),
      },
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(removeFavoriteSlugsMock).toHaveBeenCalledWith('user_123', ['post-a'])
  })

  it('removes legacy alias rows when deleting a canonical favorite slug', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    listFavoriteSlugsMock.mockResolvedValue([
      {
        postSlug: 'post-antigo',
        createdAt: '2026-04-05T10:00:00.000Z',
      },
      {
        postSlug: 'post-canonico',
        createdAt: '2026-04-04T10:00:00.000Z',
      },
    ])
    resolveRemovableFavoriteSlugsMock.mockReturnValue([
      'post-antigo',
      'post-canonico',
    ])

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(
      new Request('http://localhost/api/account/favorites/post-canonico'),
      {
        params: Promise.resolve({ slug: 'post-canonico' }),
      },
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(resolveRemovableFavoriteSlugsMock).toHaveBeenCalledWith(
      [
        { postSlug: 'post-antigo', createdAt: '2026-04-05T10:00:00.000Z' },
        { postSlug: 'post-canonico', createdAt: '2026-04-04T10:00:00.000Z' },
      ],
      'post-canonico',
    )
    expect(removeFavoriteSlugsMock).toHaveBeenCalledWith('user_123', [
      'post-antigo',
      'post-canonico',
    ])
  })

  it('returns 401 for unauthenticated DELETE without calling helpers', async () => {
    authMock.mockResolvedValue({ userId: null })

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(new Request('http://localhost/api/account/favorites/post-a'), {
      params: Promise.resolve({ slug: 'post-a' }),
    })

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(removeFavoriteSlugsMock).not.toHaveBeenCalled()
  })

  it('returns 422 for invalid DELETE slug', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })

    const { DELETE } = await import('./[slug]/route')
    const response = await DELETE(new Request('http://localhost/api/account/favorites/post%20a'), {
      params: Promise.resolve({ slug: 'post a' }),
    })

    expect(response.status).toBe(422)
    await expect(response.json()).resolves.toEqual({ error: 'Invalid slug' })
    expect(removeFavoriteSlugsMock).not.toHaveBeenCalled()
  })
})
