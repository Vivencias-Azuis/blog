import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import PostCard from '@/components/PostCard'

vi.mock('@/components/design-system/ArticleCard', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}))

vi.mock('@/components/account/FavoriteToggleButton', () => ({
  default: ({
    initialFavorited,
  }: {
    initialFavorited?: boolean
  }) => <div data-testid="favorite-toggle">{initialFavorited ? 'saved' : 'unsaved'}</div>,
}))

describe('PostCard', () => {
  it('passes the initial favorite state to the toggle control', () => {
    render(
      <PostCard
        post={{
          slug: 'post-a',
          title: 'Post A',
          excerpt: 'Resumo',
          datetime: '2026-04-05T10:00:00.000Z',
          author: 'Equipe',
          category: 'Geral',
          tags: [],
          readingTime: '5 min',
        }}
        initialFavorited
      />,
    )

    expect(screen.getByTestId('favorite-toggle')).toHaveTextContent('saved')
  })
})
