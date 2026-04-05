'use client'

import { useState } from 'react'

interface FavoriteToggleButtonProps {
  postSlug: string
  initialFavorited?: boolean
}

export default function FavoriteToggleButton({
  postSlug,
  initialFavorited = false,
}: FavoriteToggleButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleToggle() {
    if (loading) {
      return
    }

    setLoading(true)
    setError(null)

    const nextFavorited = !favorited
    const request =
      favorited
        ? {
            url: `/api/account/favorites/${encodeURIComponent(postSlug)}`,
            options: {
              method: 'DELETE',
            },
          }
        : {
            url: '/api/account/favorites',
            options: {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ postSlug }),
            },
          }

    try {
      const response = await fetch(request.url, request.options)

      if (!response.ok) {
        setError(
          response.status === 401
            ? 'Entre na sua conta para salvar este post.'
            : 'Nao foi possivel atualizar seus favoritos.',
        )
        return
      }

      setFavorited(nextFavorited)
    } catch {
      setError('Nao foi possivel atualizar seus favoritos.')
    } finally {
      setLoading(false)
    }
  }

  const label = loading
    ? favorited
      ? 'Removendo...'
      : 'Salvando...'
    : favorited
      ? 'Salvo'
      : 'Salvar'

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        aria-label={favorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        aria-pressed={favorited}
        className={`inline-flex items-center gap-2 rounded-pill border px-3 py-2 text-sm font-semibold transition-colors ${
          favorited
            ? 'border-brand bg-brand-soft text-brand-dark'
            : 'border-sand-300 bg-surface text-sand-700 hover:border-brand/50 hover:text-link'
        } disabled:cursor-wait disabled:opacity-70`}
      >
        <span aria-hidden="true">{favorited ? '♥' : '♡'}</span>
        <span>{label}</span>
      </button>

      {error ? (
        <p className="text-sm text-red-700" role="status">
          {error}
        </p>
      ) : null}
    </div>
  )
}
