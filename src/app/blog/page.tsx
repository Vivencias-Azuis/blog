import { auth } from '@clerk/nextjs/server'

import { listFavoriteSlugs, resolveFavoritePostSlugs } from '@/lib/account/favorites'
import { getAllPosts } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog - Vivências Azuis',
  description: 'Explore artigos, dicas e experiências sobre autismo, inclusão e desenvolvimento. Conteúdo especializado para famílias, educadores e profissionais.',
  path: '/blog',
  keywords: ['blog', 'artigos', 'autismo', 'TEA', 'inclusão', 'dicas', 'experiências', 'desenvolvimento', 'família', 'educação'],
})

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = getAllPosts()
  const { userId } = await auth()
  const favoriteItems = userId ? await listFavoriteSlugs(userId) : []
  const { canonicalSlugs } = resolveFavoritePostSlugs(favoriteItems)
  const resolvedSearchParams = await searchParams
  const categoriaParam = resolvedSearchParams.categoria
  const initialCategory = Array.isArray(categoriaParam) ? categoriaParam[0] : categoriaParam

  return (
    <BlogClient
      initialPosts={allPosts}
      initialCategory={initialCategory}
      initialFavoriteSlugs={canonicalSlugs}
    />
  )
}
