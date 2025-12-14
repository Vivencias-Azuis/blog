'use client'

import { useState, useMemo } from 'react'
import PostCard from '@/components/PostCard'
import { PostMeta } from '@/lib/posts'

interface BlogClientProps {
  initialPosts: PostMeta[]
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [searchTerm, setSearchTerm] = useState<string>('')
  
  const categories = useMemo(() => {
    const cats = ['todos', ...Array.from(new Set(initialPosts.map(post => post.category.toLowerCase())))]
    return cats
  }, [initialPosts])

  const filteredPosts = useMemo(() => {
    let filtered = initialPosts

    // Filtrar por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory
      )
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }

    return filtered
  }, [initialPosts, selectedCategory, searchTerm])

  const formatCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      'todos': 'Todos',
      'dicas': 'Dicas Práticas',
      'relatos': 'Relatos',
      'educacao': 'Educação',
      'direitos': 'Direitos',
      'geral': 'Geral'
    }
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  if (initialPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-dark mb-8">Blog</h1>
            <div className="bg-white rounded-lg shadow-md p-12">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">
                Em breve, novos conteúdos!
              </h2>
              <p className="text-gray-600 mb-8">
                Estamos preparando conteúdos incríveis sobre autismo, inclusão e vivências. 
                Volte em breve para conferir nossos primeiros artigos.
              </p>
              <div className="text-center">
                <span className="text-primary font-medium">
                  💙 Construindo um mundo mais azul, inclusivo e humano
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-azul-profundo to-primary-dark">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-verde-menta/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 animate-fade-in-up">
              <span className="text-5xl">📚</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Compartilhando experiências, conhecimento e apoio para toda a comunidade do autismo
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-verde-menta to-amarelo-quente mx-auto mt-8 rounded-full animate-fade-in-up" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Enhanced Filters */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Enhanced Search */}
            <div className="w-full lg:w-96 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar posts, tags, autores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-lg placeholder-gray-500"
              />
            </div>

            {/* Enhanced Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary to-azul-profundo text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-primary hover:text-white border border-gray-200 hover:border-primary'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Results Counter */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <p className="text-gray-600 text-lg">
                {filteredPosts.length === 1 
                  ? '1 post encontrado' 
                  : `${filteredPosts.length} posts encontrados`
                }
                {selectedCategory !== 'todos' && (
                  <span className="ml-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {formatCategoryName(selectedCategory)}
                  </span>
                )}
                {searchTerm && (
                  <span className="ml-2 px-3 py-1 bg-verde-menta/20 text-azul-profundo rounded-full text-sm font-medium">
                    &quot;{searchTerm}&quot;
                  </span>
                )}
              </p>
            </div>
            {filteredPosts.length > 0 && (
              <div className="text-sm text-gray-500">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.slug} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-xl">
              <div className="text-8xl mb-8 animate-bounce">🔍</div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">
                Nenhum post encontrado
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Tente ajustar seus filtros ou termo de busca para encontrar o conteúdo que procura.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos')
                  setSearchTerm('')
                }}
                className="btn-primary text-lg px-8 py-4"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        {filteredPosts.length > 0 && (
          <div className="bg-gradient-to-r from-primary to-azul-profundo rounded-3xl p-8 md:p-12 text-white text-center animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <div className="max-w-2xl mx-auto">
              <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                <span className="text-4xl">📧</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Fique por dentro das novidades
              </h3>
              <p className="text-xl text-blue-100 mb-8">
                Receba nossos melhores conteúdos sobre autismo e inclusão diretamente no seu e-mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
