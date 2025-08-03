import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import PostCard from './PostCard'

export default function FeaturedPosts() {
  const featuredPosts = getFeaturedPosts()

  if (featuredPosts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              Posts em Destaque
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Em breve teremos conteúdos incríveis para compartilhar com você!
            </p>
            <Link 
              href="/blog" 
              className="btn-primary inline-block"
            >
              Ver Todos os Posts
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Posts em Destaque
          </h2>
          <p className="text-lg text-gray-600">
            Conteúdos especiais selecionados para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/blog" 
            className="btn-primary"
          >
            Ver Todos os Posts
          </Link>
        </div>
      </div>
    </section>
  )
}