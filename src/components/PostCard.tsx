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
    <article className="group relative h-full">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-amarelo-quente to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <span className="animate-pulse">✨</span>
              Destaque
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-8 pt-16 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="text-2xl font-bold text-primary-dark mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
            <Link href={`/blog/${post.slug}`} className="block">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full hover:from-primary/10 hover:to-verde-menta/10 hover:text-primary transition-all duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {Array.isArray(post.tags) && post.tags.length > 3 && (
              <span className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-azul-profundo rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{post.readingTime}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.datetime)}</span>
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-primary hover:text-azul-profundo font-semibold flex items-center gap-1 transition-colors duration-300"
                aria-label={`Ler mais: ${post.title}`}
              >
                Ler mais
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-verde-menta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </article>
  )
}
