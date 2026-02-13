import { notFound, permanentRedirect } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts, normalizeSlug } from '@/lib/posts'
import { generateCanonicalUrl, generateImageUrl, generatePostMetadata, generatePostUrl } from '@/lib/metadata'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import PostTracking from '@/components/PostTracking'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function rewriteInlineJsonLdScripts(mdxSource: string) {
  return mdxSource.replace(
    /<script\s+type=(["'])application\/ld\+json\1>\s*\{`([\s\S]*?)`\}\s*<\/script>/g,
    (_match, _quote, json) =>
      `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${json}\` }} />`
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(normalizeSlug(slug))
  
  if (!post) {
    return {
      title: 'Post não encontrado | Vivências Azuis',
      description: 'O post solicitado não foi encontrado.',
    }
  }

  const publishedTime = new Date(post.datetime).toISOString()
  const modifiedTime = new Date(post.updated || post.datetime).toISOString()

  return generatePostMetadata({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    author: post.author,
    category: post.category,
    tags: post.tags,
    publishedTime,
    modifiedTime,
    coverImage: post.coverImage,
  })
}

const components = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl md:text-4xl font-bold text-sand-900 mb-6 mt-8 font-sans" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-sand-900 mb-4 mt-6 font-sans" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl md:text-2xl font-medium text-sand-900 mb-3 mt-5 font-sans" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-sand-800 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="text-sand-800 mb-4 ml-6 list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-sand-800 mb-4 ml-6 list-decimal" {...props}>
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
      className="text-link hover:text-link-hover transition-colors underline" 
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-brand/60 pl-4 italic text-sand-700 my-6" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-sand-200 px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  ),
  img: ({ alt, src, width, height, ...props }: any) => {
    if (typeof src !== 'string') return null

    const parsedWidth = typeof width === 'string' ? Number.parseInt(width, 10) : width
    const parsedHeight = typeof height === 'string' ? Number.parseInt(height, 10) : height
    const imageWidth = Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : 1200
    const imageHeight = Number.isFinite(parsedHeight) && parsedHeight > 0 ? parsedHeight : 800

    return (
      <Image
        src={src}
        alt={alt || ''}
        width={imageWidth}
        height={imageHeight}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full h-auto rounded-card shadow-card my-6"
        {...props}
      />
    )
  },
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(normalizeSlug(slug))

  if (!post) {
    notFound()
  }

  if (slug !== post.slug) {
    permanentRedirect(`/blog/${post.slug}`)
  }

  const postUrl = generatePostUrl(post.slug)
  const imageUrl = post.coverImage ? generateImageUrl(post.coverImage) : generateImageUrl('/logo-text.svg')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: new Date(post.datetime).toISOString(),
    dateModified: new Date(post.updated || post.datetime).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vivências Azuis',
      logo: {
        '@type': 'ImageObject',
        url: generateImageUrl('/logo-text.svg'),
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: generateCanonicalUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: generateCanonicalUrl('/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)
  const earlyRelated = relatedPosts.slice(0, 2)
  const remainingRelated = relatedPosts.slice(2)

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
      'dicas': 'bg-brand-soft text-brand-dark',
      'relatos': 'bg-sand-200 text-sand-800',
      'educacao': 'bg-brand text-white',
      'direitos': 'bg-blue-800 text-white',
      'geral': 'bg-sand-200 text-sand-700'
    }
    return colors[category.toLowerCase()] || colors['geral']
  }

  return (
    <article className="min-h-screen bg-page" data-post-article={post.slug}>
      <PostTracking slug={post.slug} title={post.title} category={post.category} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-16 left-8 w-48 h-48 bg-brand-soft/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-16 right-8 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Navigation */}
          <nav className="mb-8 animate-fade-in-up">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-pill hover:bg-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao Blog
            </Link>
          </nav>

          <div className="mb-6 text-sm text-blue-100/90 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span className="mx-2 text-blue-100/60">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="mx-2 text-blue-100/60">/</span>
            <span className="text-blue-100/80">{post.category}</span>
            <span className="mx-2 text-blue-100/60">/</span>
            <span className="text-blue-100/80">{post.title}</span>
          </div>
          
          {/* Category and Featured Badge */}
          <div className="mb-8 flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className={`px-4 py-2 rounded-pill text-sm font-semibold shadow-card backdrop-blur-sm ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            {post.featured && (
              <div className="bg-gradient-to-r from-brand-soft to-blue-200 text-blue-900 px-4 py-2 rounded-pill text-sm font-bold flex items-center gap-2 shadow-card">
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
                <span key={index} className="text-sm bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-pill hover:bg-white/30 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface/90 backdrop-blur-sm rounded-block shadow-overlay border border-sand-200 p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          {earlyRelated.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-brand rounded-full"></div>
                <p className="text-sm font-semibold text-sand-900 uppercase tracking-wide">Leia também</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earlyRelated.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block rounded-card border border-sand-200 bg-sand-100 px-4 py-3 hover:border-brand hover:bg-brand/5 transition-colors"
                  >
                    <p className="text-sm text-sand-900 font-semibold line-clamp-2">{item.title}</p>
                    <p className="text-xs text-sand-600 line-clamp-2 mt-1">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="prose prose-lg max-w-none prose-headings:text-sand-900 prose-a:text-link prose-a:no-underline hover:prose-a:underline prose-strong:text-sand-900 prose-blockquote:border-l-brand prose-blockquote:bg-sand-100 prose-blockquote:p-6 prose-blockquote:rounded-card">
            <MDXRemote
              source={rewriteInlineJsonLdScripts(post.content)}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-r from-blue-800 to-brand rounded-block p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block p-4 bg-white/10 rounded-card mb-6">
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
                  className="bg-white text-link font-semibold px-8 py-4 rounded-card hover:bg-brand-soft transition-colors inline-flex items-center gap-2"
                >
                  <span>Ver Mais Posts</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/contato" 
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-card hover:bg-white/30 transition-colors inline-flex items-center gap-2 border border-white/30"
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
        {(remainingRelated.length > 0 || relatedPosts.length > 0) && (
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-sand-900 mb-4">
                Posts Relacionados
              </h3>
              <p className="text-sand-700 text-lg">
                Continue explorando conteúdos que podem interessar você
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(remainingRelated.length > 0 ? remainingRelated : relatedPosts).map((relatedPost, index) => (
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
