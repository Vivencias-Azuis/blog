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

export default function BlogPage() {
  const allPosts = getAllPosts()
  
  return <BlogClient initialPosts={allPosts} />
}