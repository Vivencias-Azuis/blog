'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import NewsletterSignup from '@/components/NewsletterSignup'
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
      <div className="min-h-screen bg-page py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-sand-900 mb-8">Blog</h1>
            <div className="bg-surface rounded-card shadow-card p-12 border border-sand-200">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-semibold text-sand-900 mb-4">
                Em breve, novos conteúdos!
              </h2>
              <p className="text-sand-700 mb-8">
                Estamos preparando conteúdos incríveis sobre autismo, inclusão e vivências. 
                Volte em breve para conferir nossos primeiros artigos.
              </p>
              <div className="text-center">
                <span className="text-link font-medium">
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
    <div className="min-h-screen bg-page">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-brand to-blue-900">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-16 left-8 h-40 w-40 rounded-full bg-brand-soft/30 blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl animate-float-delayed"></div>
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
            <div className="w-32 h-1 bg-gradient-to-r from-brand-soft to-blue-200 mx-auto mt-8 rounded-full animate-fade-in-up" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Enhanced Filters */}
        <div className="bg-surface/95 backdrop-blur-lg rounded-block shadow-overlay border border-sand-200 p-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Enhanced Search */}
            <div className="w-full lg:w-96 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-sand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar posts, tags, autores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface border border-sand-200 rounded-card focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-300 text-lg placeholder-sand-500 text-sand-800"
              />
            </div>

            {/* Enhanced Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-card font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-brand to-blue-800 text-white shadow-pop'
                      : 'bg-surface text-sand-700 hover:bg-brand hover:text-white border border-sand-200 hover:border-brand'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface/95 backdrop-blur-lg rounded-block shadow-overlay border border-sand-200 p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sand-700 text-lg">
              Comparação de planos de saúde para autismo com foco em cobertura e rede TEA.
            </p>
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              className="text-link font-semibold hover:underline"
            >
              Comparação de planos de saúde para autismo
            </Link>
          </div>
        </div>

        {/* Enhanced Results Counter */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
              <p className="text-sand-700 text-lg">
                {filteredPosts.length === 1 
                  ? '1 post encontrado' 
                  : `${filteredPosts.length} posts encontrados`
                }
                {selectedCategory !== 'todos' && (
                  <span className="ml-2 px-3 py-1 bg-brand/10 text-brand-dark rounded-full text-sm font-medium">
                    {formatCategoryName(selectedCategory)}
                  </span>
                )}
                {searchTerm && (
                  <span className="ml-2 px-3 py-1 bg-brand-soft text-brand-dark rounded-full text-sm font-medium">
                    &quot;{searchTerm}&quot;
                  </span>
                )}
              </p>
            </div>
            {filteredPosts.length > 0 && (
              <div className="text-sm text-sand-600">
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
            <div className="bg-surface/90 backdrop-blur-sm rounded-block p-12 border border-sand-200 shadow-pop">
              <div className="text-8xl mb-8 animate-bounce">🔍</div>
              <h2 className="text-3xl font-bold text-sand-900 mb-6">
                Nenhum post encontrado
              </h2>
              <p className="text-lg text-sand-700 mb-8 max-w-md mx-auto">
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
          <div className="bg-gradient-to-r from-blue-800 to-brand rounded-block p-8 md:p-12 text-white text-center animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
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
              <div className="max-w-md mx-auto">
                <NewsletterSignup origem="blog-cta" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
