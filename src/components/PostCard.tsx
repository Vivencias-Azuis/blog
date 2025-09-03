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
    <article className="card p-6 h-full flex flex-col group relative">
      <div className="flex-grow">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={`tag ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
          {post.featured && (
            <span className="text-amarelo-quente text-sm font-medium flex items-center gap-1">
              <span className="animate-pulse">✨</span> Destaque
            </span>
          )}
        </div>

        {/* Enhanced Title */}
        <h3 className="text-xl font-bold text-primary-dark mb-4 hover:text-primary transition-colors group-hover:scale-105 transform duration-200">
          <Link href={`/blog/${post.slug}`} className="block">
            {post.title}
          </Link>
        </h3>

        {/* Enhanced Excerpt */}
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gradient-to-r from-neutral-light to-gray-100 text-gray-600 px-3 py-1 rounded-full hover:scale-105 transition-transform duration-200">
              #{tag}
            </span>
          ))}
          {Array.isArray(post.tags) && post.tags.length > 3 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="border-t border-neutral-light pt-4 mt-auto">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Por {post.author}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime}
          </span>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(post.datetime)}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-verde-menta/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </article>
  )
}