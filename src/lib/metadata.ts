import { Metadata } from 'next'

const baseUrl = 'https://vivenciasazuis.com'

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
  coverImage,
}: {
  title: string
  description: string
  slug: string
  author: string
  category: string
  tags: string[]
  publishedTime: string
  coverImage?: string
}): Metadata {
  const postUrl = generatePostUrl(slug)
  const imageUrl = coverImage ? generateImageUrl(coverImage) : generateImageUrl('/logo-text.svg')

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
      modifiedTime: publishedTime,
      authors: [author],
      section: category,
      tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: coverImage && coverImage.endsWith('.png') ? 'image/png' : coverImage && coverImage.endsWith('.jpg') ? 'image/jpeg' : 'image/svg+xml',
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
      'article:modified_time': publishedTime,
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
          url: generateImageUrl('/logo-text.svg'),
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/svg+xml',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vivenciasazuis',
      creator: '@vivenciasazuis',
      title,
      description,
      images: [generateImageUrl('/logo-text.svg')],
    },
  }
}
