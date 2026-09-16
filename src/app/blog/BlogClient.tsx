'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import EditorialPostRow from '@/components/EditorialPostRow'
import NewsletterSignup from '@/components/NewsletterSignup'
import { PostMeta } from '@/lib/posts'
import { normalizeTaxonomyValue } from '@/lib/taxonomy'

interface BlogClientProps {
  initialPosts: PostMeta[]
  initialCategory?: string
  initialFavoriteSlugs?: string[]
}

export default function BlogClient({
  initialPosts,
  initialCategory,
  initialFavoriteSlugs = [],
}: BlogClientProps) {
  const searchId = useId()
  const normalizedInitialCategory = initialCategory ? normalizeTaxonomyValue(initialCategory) : 'todos'
  const favoriteSlugs = useMemo(() => new Set(initialFavoriteSlugs), [initialFavoriteSlugs])
  const availableCategories = new Set(initialPosts.map((post) => normalizeTaxonomyValue(post.category)))
  const initialSelectedCategory =
    normalizedInitialCategory !== 'todos' && availableCategories.has(normalizedInitialCategory)
      ? normalizedInitialCategory
      : 'todos'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialSelectedCategory)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const categories = useMemo(() => {
    const uniqueCategories = new Map<string, string>()

    initialPosts.forEach((post) => {
      const normalizedCategory = normalizeTaxonomyValue(post.category)
      if (!uniqueCategories.has(normalizedCategory)) {
        uniqueCategories.set(normalizedCategory, post.category)
      }
    })

    return ['todos', ...Array.from(uniqueCategories.keys())]
  }, [initialPosts])

  const filteredPosts = useMemo(() => {
    let filtered = initialPosts

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(
        (post) => normalizeTaxonomyValue(post.category) === selectedCategory,
      )
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          (Array.isArray(post.tags) &&
            post.tags.some((tag) => tag.toLowerCase().includes(term))),
      )
    }

    return filtered
  }, [initialPosts, selectedCategory, searchTerm])

  const formatCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      todos: 'Todos',
      dicas: 'Dicas Práticas',
      relatos: 'Relatos',
      educacao: 'Educação',
      direitos: 'Direitos',
      geral: 'Geral',
      familia: 'Família',
      rotina: 'Rotina',
      saude: 'Saúde',
      produtos: 'Produtos',
    }

    return names[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  if (initialPosts.length === 0) {
    return (
      <div className="min-h-screen bg-paper">
        <section className="bg-paper">
          <div className="container-custom">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-4 pt-6">
              <p className="eyebrow">Índice de guias</p>
            </div>
            <div className="py-12 md:py-16">
              <h1 className="display text-4xl sm:text-5xl">Blog</h1>
              <p className="lede mt-6 max-w-[52ch]">
                Os primeiros guias estão em preparação. Volte em breve para o índice
                completo.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper">
      <section className="border-b border-rule bg-paper">
        <div className="container-custom">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-4 pt-6">
            <p className="eyebrow">Índice de guias</p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink-mute">
              {initialPosts.length} guias publicados
            </p>
          </div>

          <div className="py-12 md:py-16">
            <h1 className="display text-4xl sm:text-5xl">Blog</h1>
            <p className="lede mt-6 max-w-[52ch]">
              Experiências, direitos e prática para famílias no TEA, organizados por tema.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-paper-deep">
        <div className="container-custom py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:w-80">
              <label htmlFor={searchId} className="eyebrow block">
                Buscar
              </label>
              <input
                id={searchId}
                type="search"
                placeholder="Título, tag ou autor"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="mt-2 w-full border-0 border-b border-rule-strong bg-transparent px-0 py-2 font-sans text-base text-ink placeholder-ink-mute transition-colors duration-150 focus:border-azul"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`border-b px-0.5 pb-1 font-sans text-sm transition-colors duration-150 ${
                    selectedCategory === category
                      ? 'border-azul text-azul'
                      : 'border-transparent text-ink-soft hover:border-rule-strong hover:text-ink'
                  }`}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-paper">
        <div className="container-custom py-6">
          <div className="flex flex-col gap-3 border-l-2 border-clay pl-5 md:flex-row md:items-center md:justify-between">
            <p className="font-serif text-base leading-relaxed text-ink-soft">
              Comparação de planos de saúde para autismo com foco em cobertura e rede TEA.
            </p>
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              data-cta="blog_hub_planos"
              data-cta-location="blog_hub_banner"
              className="link-rule shrink-0"
            >
              Ver a comparação
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-custom py-10 md:py-12">
          <p className="border-b border-ink/15 pb-4 font-sans text-sm text-ink-mute">
            {filteredPosts.length === 1 ? '1 guia' : `${filteredPosts.length} guias`}
            {selectedCategory !== 'todos' &&
              ` em ${formatCategoryName(selectedCategory)}`}
            {searchTerm && ` para “${searchTerm}”`}
          </p>

          {filteredPosts.length > 0 ? (
            <div>
              {filteredPosts.map((post, index) => (
                <EditorialPostRow
                  key={post.slug}
                  post={post}
                  position={index}
                  initialFavorited={favoriteSlugs.has(post.slug)}
                  compact
                />
              ))}
            </div>
          ) : (
            <div className="py-16">
              <h2 className="display text-2xl">Nenhum guia encontrado</h2>
              <p className="mt-3 max-w-[48ch] font-serif text-base leading-relaxed text-ink-soft">
                Ajuste o termo de busca ou volte para todos os temas.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('todos')
                  setSearchTerm('')
                }}
                className="btn-line mt-6"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {filteredPosts.length > 0 && (
        <section className="border-t border-rule bg-azul-deep">
          <div className="container-custom py-14 md:py-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-azul-soft">
                  Ritmo semanal
                </p>
                <h2 className="display mt-4 text-2xl text-paper sm:text-3xl">
                  Um e-mail por semana com o próximo passo
                </h2>
                <p className="mt-4 max-w-[44ch] font-serif text-base leading-relaxed text-azul-soft">
                  Checklist acionável e links prioritários para organizar terapias e
                  direitos.
                </p>
              </div>
              <div className="self-center">
                <NewsletterSignup
                  origem="blog-cta"
                  ctaLocation="blog_newsletter"
                  pageType="blog_index"
                  trafficIntent="mixed"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
