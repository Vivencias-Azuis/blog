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
        className={`inline-flex items-center gap-2 rounded-sm border px-3 py-2 font-sans text-sm font-semibold transition-colors duration-150 ${
          favorited
            ? 'border-azul bg-azul-wash text-azul'
            : 'border-rule bg-paper text-ink-soft hover:border-azul hover:text-azul'
        } disabled:cursor-wait disabled:opacity-70`}
      >
        <span aria-hidden="true">{favorited ? '♥' : '♡'}</span>
        <span>{label}</span>
      </button>

      {error ? (
        <p className="font-sans text-sm text-clay" role="status">
          {error}
        </p>
      ) : null}
    </div>
  )
}
