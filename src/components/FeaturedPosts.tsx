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
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-verde-menta/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="container-custom relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block p-6 bg-gradient-to-br from-primary to-verde-menta rounded-3xl mb-8 shadow-2xl">
            <span className="text-5xl">✨</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8 text-shadow">
            Posts em Destaque
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Conteúdos especiais selecionados para você, com informações valiosas sobre autismo, 
            inclusão e apoio às famílias
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-verde-menta mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Enhanced Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {featuredPosts.map((post, index) => (
            <div 
              key={post.slug} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-16 border border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-verde-menta rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amarelo-quente rounded-full"></div>
            </div>
            
            <div className="relative">
              <div className="inline-block p-8 bg-gradient-to-br from-amarelo-quente to-primary rounded-3xl mb-8 shadow-xl">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                Explore Mais Conteúdos
              </h3>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
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