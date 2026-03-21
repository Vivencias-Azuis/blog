import { Metadata } from 'next'

const baseUrl = 'https://www.vivenciasazuis.com.br'
const defaultSocialImage = '/og-image.png'

function inferImageType(imagePath: string): string {
  const normalizedPath = imagePath.toLowerCase()

  if (normalizedPath.endsWith('.png')) return 'image/png'
  if (normalizedPath.endsWith('.jpg') || normalizedPath.endsWith('.jpeg')) return 'image/jpeg'
  if (normalizedPath.endsWith('.webp')) return 'image/webp'

  return 'image/png'
}

export function generateCanonicalUrl(path: string): string {
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function generatePostUrl(slug: string): string {
  return generateCanonicalUrl(`/blog/${slug}`)
}

export function generateImageUrl(imagePath: string): string {
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
}

export function generateDefaultMetadata(): Partial<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Vivências Azuis',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vivenciasazuis',
      creator: '@vivenciasazuis',
    },
  }
}

export function generatePostMetadata({
  title,
  description,
  slug,
  author,
  category,
  tags,
  publishedTime,
  modifiedTime,
  coverImage,
}: {
  title: string
  description: string
  slug: string
  author: string
  category: string
  tags: string[]
  publishedTime: string
  modifiedTime?: string
  coverImage?: string
}): Metadata {
  const postUrl = generatePostUrl(slug)
  const socialImage = coverImage || defaultSocialImage
  const imageUrl = generateImageUrl(socialImage)
  const resolvedModifiedTime = modifiedTime || publishedTime

  return {
    ...generateDefaultMetadata(),
    title,
    description,
    authors: [{ name: author, url: baseUrl }],
    creator: author,
    publisher: 'Vivências Azuis',
    keywords: tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: postUrl,
      title,
      description,
      siteName: 'Vivências Azuis',
      publishedTime,
      modifiedTime: resolvedModifiedTime,
      authors: [author],
      section: category,
      tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: inferImageType(socialImage),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vivenciasazuis',
      creator: '@vivenciasazuis',
      title,
      description,
      images: [imageUrl],
    },
    other: {
      'article:author': author,
      'article:section': category,
      'article:tag': tags.join(', '),
      'article:published_time': publishedTime,
      'article:modified_time': resolvedModifiedTime,
    },
  }
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  const pageUrl = generateCanonicalUrl(path)
  const imageUrl = generateImageUrl(defaultSocialImage)

  return {
    ...generateDefaultMetadata(),
    title,
    description,
    keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', ...keywords],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: pageUrl,
      title,
      description,
      siteName: 'Vivências Azuis',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vivenciasazuis',
      creator: '@vivenciasazuis',
      title,
      description,
      images: [imageUrl],
    },
  }
}
