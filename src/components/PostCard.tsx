import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'dicas': 'bg-amarelo-quente text-primary-dark',
      'relatos': 'bg-verde-menta text-primary-dark',
      'educacao': 'bg-primary text-white',
      'direitos': 'bg-primary-dark text-white',
      'geral': 'bg-neutral-light text-gray-700'
    }
    return colors[category.toLowerCase()] || colors['geral']
  }

  return (
    <article className="card p-6 hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`tag ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
          {post.featured && (
            <span className="text-amarelo-quente text-sm font-medium">✨ Destaque</span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-primary-dark mb-3 hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-neutral-light text-gray-600 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
          {Array.isArray(post.tags) && post.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
          )}
        </div>
      </div>

      <div className="border-t border-neutral-light pt-4 mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Por {post.author}</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {formatDate(post.date)}
        </div>
      </div>
    </article>
  )
}