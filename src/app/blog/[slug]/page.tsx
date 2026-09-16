import { notFound, permanentRedirect } from 'next/navigation'
import type { ComponentPropsWithoutRef } from 'react'
import { getAllPosts, getPostBySlug, getRelatedPosts, normalizeSlug } from '@/lib/posts'
import { generateCanonicalUrl, generateImageUrl, generatePostMetadata, generatePostUrl } from '@/lib/metadata'
import { getCanonicalPostSlug } from '@/lib/canonical-posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'

import FavoriteToggleButton from '@/components/account/FavoriteToggleButton'
import EditorialPostRow from '@/components/EditorialPostRow'
import PostTracking from '@/components/PostTracking'
import PostIntentCTA from '@/components/PostIntentCTA'
import EditorialTrustPanel from '@/components/EditorialTrustPanel'
import { getPostTrustSignals } from '@/lib/editorial'
import { detectOperationalCluster } from '@/lib/analytics-contract'
import { listFavoriteSlugs, resolveFavoritePostSlugs } from '@/lib/account/favorites'
import { formatReadingTime } from '@/lib/reading-time-label'

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

function stripLeadingMarkdownH1(mdxSource: string) {
  return mdxSource.replace(/^\s*#\s+.+\n+/, '')
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const normalizedSlug = normalizeSlug(slug)
  const canonicalSlug = getCanonicalPostSlug(normalizedSlug)
  const post = getPostBySlug(canonicalSlug || normalizedSlug)

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
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="mb-6 mt-10 font-display text-3xl font-semibold leading-tight text-ink" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="mb-4 mt-12 font-display text-2xl font-semibold leading-tight text-ink" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mb-3 mt-8 font-display text-xl font-semibold leading-tight text-ink" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-5 leading-relaxed text-ink-soft" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-5 ml-6 list-disc text-ink-soft" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-5 ml-6 list-decimal text-ink-soft" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a
      href={href}
      className="text-azul underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:decoration-azul"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="my-8 border-l-2 border-clay pl-5 italic text-ink-soft" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded-sm bg-paper-deep px-1.5 py-0.5 font-mono text-sm text-ink" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="my-8 overflow-x-auto rounded-sm bg-ink p-5 text-paper" {...props}>
      {children}
    </pre>
  ),
  img: ({ alt, src, width, height, ...props }: ComponentPropsWithoutRef<'img'>) => {
    if (typeof src !== 'string') return null

    const parsedWidth = typeof width === 'string' ? Number.parseInt(width, 10) : width
    const parsedHeight = typeof height === 'string' ? Number.parseInt(height, 10) : height
    const imageWidth = typeof parsedWidth === 'number' && parsedWidth > 0 ? parsedWidth : 1200
    const imageHeight = typeof parsedHeight === 'number' && parsedHeight > 0 ? parsedHeight : 800

    return (
      <Image
        src={src}
        alt={alt || ''}
        width={imageWidth}
        height={imageHeight}
        sizes="(max-width: 768px) 100vw, 768px"
        className="my-8 h-auto w-full rounded-sm"
        {...props}
      />
    )
  },
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const normalizedSlug = normalizeSlug(slug)
  const canonicalSlug = getCanonicalPostSlug(normalizedSlug)

  if (canonicalSlug) {
    permanentRedirect(`/blog/${canonicalSlug}`)
  }

  const post = getPostBySlug(normalizedSlug)

  if (!post) {
    notFound()
  }

  if (slug !== post.slug) {
    permanentRedirect(`/blog/${post.slug}`)
  }

  const postUrl = generatePostUrl(post.slug)
  const imageUrl = post.coverImage ? generateImageUrl(post.coverImage) : generateImageUrl('/og-image.png')
  const trustSignals = getPostTrustSignals(post)
  const { userId } = await auth()
  const favoriteItems = userId ? await listFavoriteSlugs(userId) : []
  const favoriteSlugs = new Set(resolveFavoritePostSlugs(favoriteItems).canonicalSlugs)

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
    author:
      trustSignals.author.kind === 'person'
        ? {
            '@type': 'Person',
            name: trustSignals.author.name,
            url: trustSignals.authorUrl,
            description: trustSignals.author.role,
          }
        : {
            '@type': 'Organization',
            name: trustSignals.author.name,
            url: trustSignals.authorUrl,
          },
    editor: {
      '@type': 'Organization',
      name: trustSignals.reviewedBy,
      url: trustSignals.methodologyUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vivências Azuis',
      logo: {
        '@type': 'ImageObject',
        url: generateImageUrl('/new_logo.png'),
      },
    },
    isAccessibleForFree: true,
    about: post.tags,
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
  const relatedToRender = remainingRelated.length > 0 ? remainingRelated : relatedPosts
  const commercialSignals = ['plano', 'cobertura', 'unimed', 'valor', 'preco', 'preço', 'comparativo', 'clinica', 'clínica']
  const normalizedTags = post.tags.map((tag) => tag.toLowerCase())
  const isCommercialIntent =
    commercialSignals.some((signal) => post.slug.includes(signal)) ||
    commercialSignals.some((signal) => normalizedTags.some((tag) => tag.includes(signal)))
  const intent = isCommercialIntent ? 'commercial' : 'informational'
  const operationalCluster = detectOperationalCluster(post)
  const readingLabel = formatReadingTime(post.readingTime || '')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article
      className="min-h-screen bg-paper"
      data-post-article={post.slug}
      data-post-category={post.category}
      data-traffic-intent={intent}
      data-content-cluster={operationalCluster}
    >
      <PostTracking slug={post.slug} title={post.title} category={post.category} intent={intent} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <header className="border-b border-rule bg-paper">
        <div className="container-custom">
          <nav aria-label="Trilha de navegação" className="border-b border-rule py-4 pt-6">
            <ol className="flex flex-wrap items-center gap-x-2 font-sans text-xs uppercase tracking-[0.2em] text-ink-mute">
              <li>
                <Link href="/" className="transition-colors duration-150 hover:text-azul">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-colors duration-150 hover:text-azul">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{post.category}</li>
            </ol>
          </nav>

          <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16 lg:py-16">
            <div>
              <p className="eyebrow">
                {post.category}
                {post.featured ? ' · Destaque' : ''}
              </p>

              <h1 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl">{post.title}</h1>

              <p className="lede mt-6 max-w-[58ch]">{post.excerpt}</p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-5">
                <div>
                  <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
                    Autor
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">{post.author}</dd>
                </div>
                <div>
                  <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
                    Publicado
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">{formatDate(post.datetime)}</dd>
                </div>
                {readingLabel ? (
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
                      Leitura
                    </dt>
                    <dd className="mt-1 font-sans text-sm text-ink">{readingLabel}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <FavoriteToggleButton
                  postSlug={post.slug}
                  initialFavorited={favoriteSlugs.has(post.slug)}
                />
                {post.tags.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-sans text-xs uppercase tracking-[0.14em] text-ink-mute"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <EditorialTrustPanel post={post} />
          </div>
        </div>
      </header>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-[68ch]">
          {earlyRelated.length > 0 && (
            <section className="mb-10 border-y border-rule py-6">
              <p className="eyebrow">Leia também</p>
              <ul className="mt-4 grid gap-x-8">
                {earlyRelated.map((item) => (
                  <li key={item.slug} className="border-b border-rule py-3 last:border-b-0">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="font-display text-base text-ink transition-colors duration-150 hover:text-azul"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-10 border-l-2 border-clay pl-5">
            <p className="eyebrow text-clay">Próximo passo</p>
            <div className="mt-4">
              <PostIntentCTA intent={intent} placement="mid" tone="light" post={post} />
            </div>
          </section>

          <div className="prose">
            <MDXRemote
              source={rewriteInlineJsonLdScripts(stripLeadingMarkdownH1(post.content))}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </div>
      </div>

      <section className="border-y border-rule bg-azul-deep">
        <div className="container-custom py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-azul-soft">
                Continue
              </p>
              <h2 className="display mt-4 text-2xl text-paper sm:text-3xl">
                Gostou deste conteúdo?
              </h2>
              <p className="mt-4 max-w-[46ch] font-serif text-base leading-relaxed text-azul-soft">
                Explore mais guias sobre autismo, inclusão e direitos que podem ajudar você e
                sua família.
              </p>
            </div>
            <div className="self-center">
              <PostIntentCTA intent={intent} placement="end" tone="dark" post={post} />
            </div>
          </div>
        </div>
      </section>

      {relatedToRender.length > 0 && (
        <section className="border-b border-rule bg-paper">
          <div className="container-custom py-14 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-ink/15 pb-6">
              <div>
                <p className="eyebrow">Continue lendo</p>
                <h2 className="display mt-3 text-2xl sm:text-3xl">Guias relacionados</h2>
              </div>
              <Link href="/blog" className="link-rule">
                Ver todos os guias
              </Link>
            </div>

            <div>
              {relatedToRender.map((relatedPost, index) => (
                <EditorialPostRow
                  key={relatedPost.slug}
                  post={relatedPost}
                  position={index}
                  initialFavorited={favoriteSlugs.has(relatedPost.slug)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
