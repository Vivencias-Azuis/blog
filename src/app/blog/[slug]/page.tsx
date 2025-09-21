import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { Metadata } from 'next'
import PostCard from '@/components/PostCard'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado | Vivências Azuis'
    }
  }

  return {
    title: `${post.title} | Vivências Azuis`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    keywords: post.tags,
  }
}

const components = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6 mt-8" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-primary-dark mb-4 mt-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl md:text-2xl font-medium text-primary-dark mb-3 mt-5" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="text-gray-700 mb-4 ml-6 list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-gray-700 mb-4 ml-6 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-primary hover:text-primary-dark transition-colors underline" 
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-600 my-6" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-neutral-light px-2 py-1 rounded text-sm" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  ),
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 3)

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
    <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-azul-profundo to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-verde-menta/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Navigation */}
          <nav className="mb-8 animate-fade-in-up">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao Blog
            </Link>
          </nav>
          
          {/* Category and Featured Badge */}
          <div className="mb-8 flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            {post.featured && (
              <div className="bg-gradient-to-r from-amarelo-quente to-orange-400 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg">
                <span className="animate-pulse">✨</span>
                Post em Destaque
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-blue-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <span className="font-medium">Por {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(post.datetime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {post.tags.map((tag, index) => (
                <span key={index} className="text-sm bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="prose prose-lg max-w-none prose-headings:text-primary-dark prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-primary-dark prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl">
            <MDXRemote source={post.content} components={components} />
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-r from-primary to-azul-profundo rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                <span className="text-4xl">💙</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Gostou deste conteúdo?
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Explore mais artigos sobre autismo, inclusão e experiências que podem ajudar você e sua família.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/blog" 
                  className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <span>Ver Mais Posts</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/contato" 
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-colors inline-flex items-center gap-2 border border-white/30"
                >
                  <span>Entre em Contato</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary-dark mb-4">
                Posts Relacionados
              </h3>
              <p className="text-gray-600 text-lg">
                Continue explorando conteúdos que podem interessar você
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <div 
                  key={relatedPost.slug} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${1.5 + index * 0.1}s` }}
                >
                  <PostCard post={relatedPost} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}