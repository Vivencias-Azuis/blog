import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { Metadata } from 'next'

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
    keywords: Array.isArray(post.tags) ? post.tags : [],
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
    <article className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-azul-profundo text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link 
              href="/blog" 
              className="text-blue-200 hover:text-white transition-colors"
            >
              ← Voltar ao Blog
            </Link>
          </nav>
          
          <div className="mb-6">
            <span className={`tag ${getCategoryColor(post.category)} mr-3`}>
              {post.category}
            </span>
            {post.featured && (
              <span className="text-amarelo-quente text-sm font-medium">✨ Post em Destaque</span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-blue-200">
            <span>Por {post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-white bg-opacity-20 text-white px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 rounded-lg p-8 mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              Gostou deste conteúdo?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore mais artigos sobre autismo, inclusão e experiências que podem ajudar você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn-primary">
                Ver Mais Posts
              </Link>
              <Link href="/contato" className="btn-secondary">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}