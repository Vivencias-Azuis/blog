import { PostMeta } from '@/lib/posts'
import ArticleCard from '@/components/design-system/ArticleCard'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) {
      return ''
    }
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formattedDate = formatDate(post.datetime || '')

  return (
    <ArticleCard
      title={post.title}
      excerpt={post.excerpt}
      href={`/blog/${post.slug}`}
      category={post.category}
      author={post.author}
      datetime={formattedDate || undefined}
      readingTime={post.readingTime}
      tags={Array.isArray(post.tags) ? post.tags : []}
      featured={post.featured}
      variant={post.featured ? 'featured' : 'default'}
    />
  )
}
