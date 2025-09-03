import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import PostCard from './PostCard'

export default function FeaturedPosts() {
  const featuredPosts = getFeaturedPosts()

  if (featuredPosts.length === 0) {
    return (
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-primary to-verde-menta rounded-full mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Posts em Destaque
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
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
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block p-4 bg-gradient-to-br from-primary to-verde-menta rounded-full mb-6">
            <span className="text-4xl">✨</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Posts em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conteúdos especiais selecionados para você, com informações valiosas sobre autismo, 
            inclusão e apoio às famílias
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-verde-menta mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Enhanced Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post, index) => (
            <div 
              key={post.slug} 
              className={`animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-light">
            <div className="inline-block p-6 bg-gradient-to-br from-amarelo-quente to-primary rounded-full mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
              Explore Mais Conteúdos
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubra artigos, dicas práticas, relatos inspiradores e muito mais em nosso blog completo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/blog" 
                className="btn-primary inline-flex items-center gap-2 text-lg"
              >
                <span>Ver Todos os Posts</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/sobre" 
                className="btn-secondary inline-flex items-center gap-2 text-lg"
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
    </section>
  )
}