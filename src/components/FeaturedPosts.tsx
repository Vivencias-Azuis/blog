import { auth } from '@clerk/nextjs/server'

import { listFavoriteSlugs } from '@/lib/account/favorites'
import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import PostCard from './PostCard'

export default async function FeaturedPosts() {
  const featuredPosts = getFeaturedPosts()
  const { userId } = await auth()
  const favoriteItems = userId ? await listFavoriteSlugs(userId) : []
  const favoriteSlugs = new Set(favoriteItems.map((item) => item.postSlug))

  if (featuredPosts.length === 0) {
    return (
      <section className="section-padding bg-gradient-to-b from-surface to-page">
        <div className="container-custom">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-brand to-blue-300 rounded-full mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Posts em Destaque
            </h2>
            <p className="text-xl text-sand-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Em breve teremos conteúdos incríveis para compartilhar com você!
            </p>
            <Link 
              href="/blog" 
              className="btn-primary inline-flex items-center gap-2 text-lg"
            >
              <span>Ver Todos os Posts</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-page relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="container-custom relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block p-6 bg-gradient-to-br from-brand to-blue-300 rounded-3xl mb-8 shadow-2xl">
            <span className="text-5xl">✨</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8 text-shadow">
            Posts em Destaque
          </h2>
          <p className="text-xl md:text-2xl text-sand-700 max-w-4xl mx-auto leading-relaxed">
            Conteúdos especiais selecionados para você, com informações valiosas sobre autismo, 
            inclusão e apoio às famílias
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-brand to-blue-300 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Enhanced Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {featuredPosts.map((post, index) => (
            <div 
              key={post.slug} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <PostCard post={post} initialFavorited={favoriteSlugs.has(post.slug)} />
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-surface/90 backdrop-blur-lg rounded-block shadow-overlay p-8 md:p-16 border border-sand-200 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-brand rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-sand-300 rounded-full"></div>
            </div>
            
            <div className="relative">
              <div className="inline-block p-8 bg-gradient-to-br from-brand-soft to-brand rounded-3xl mb-8 shadow-xl">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-sand-900 mb-6">
                Explore Mais Conteúdos
              </h3>
              <p className="text-lg md:text-xl text-sand-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Descubra artigos, dicas práticas, relatos inspiradores e muito mais em nosso blog completo
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/blog" 
                  className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
                >
                  <span>Ver Todos os Posts</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/sobre" 
                  className="btn-secondary inline-flex items-center gap-3 text-lg px-8 py-4"
                >
                  <span>Conheça Nossa História</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
