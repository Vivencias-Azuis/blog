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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compartilhando experiências, conhecimento e apoio para toda a comunidade do autismo
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Categorias */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-neutral-light text-gray-700 hover:bg-primary hover:text-white'
                  }`}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredPosts.length === 1 
              ? '1 post encontrado' 
              : `${filteredPosts.length} posts encontrados`
            }
            {selectedCategory !== 'todos' && ` na categoria "${formatCategoryName(selectedCategory)}"`}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>

        {/* Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-semibold text-primary-dark mb-4">
              Nenhum post encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              Tente ajustar seus filtros ou termo de busca.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos')
                setSearchTerm('')
              }}
              className="btn-primary"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 