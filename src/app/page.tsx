import { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'
import CTA from '@/components/design-system/CTA'
import FeaturedBlock from '@/components/design-system/FeaturedBlock'
import EbookLeadPopup from '@/components/EbookLeadPopup'

export const metadata: Metadata = generatePageMetadata({
  title: 'Vivências Azuis - Blog sobre Autismo e Inclusão',
  description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo. Artigos, dicas e experiências sobre TEA, inclusão e desenvolvimento.',
  path: '/',
  keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', 'família', 'desenvolvimento', 'síndrome de asperger', 'transtorno do espectro autista', 'educação', 'direitos'],
})

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedPosts />
      <section className="bg-page">
        <div className="container-custom py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-block bg-surface border border-sand-200 shadow-overlay p-6">
            <h3 className="text-2xl font-bold text-sand-900">Artigos principais</h3>
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              className="text-link font-semibold hover:underline"
            >
              🏆 Melhor plano de saude para autismo
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-page">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-sand-900 mb-4">
              Atalhos essenciais para familias
            </h2>
            <p className="text-lg text-sand-700 max-w-3xl mx-auto">
              Links diretos para os conteudos mais buscados sobre direitos, terapias e escolhas de plano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              className="rounded-block bg-surface border border-sand-200 shadow-overlay p-6 text-lg font-semibold text-sand-900 hover:-translate-y-1 transition-transform"
            >
              Descubra o melhor plano de saude para autismo
            </Link>
            <Link
              href="/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil"
              className="rounded-block bg-surface border border-sand-200 shadow-overlay p-6 text-lg font-semibold text-sand-900 hover:-translate-y-1 transition-transform"
            >
              Entenda a Lei Berenice Piana e direitos do autismo
            </Link>
            <Link
              href="/blog/aba-para-pais"
              className="rounded-block bg-surface border border-sand-200 shadow-overlay p-6 text-lg font-semibold text-sand-900 hover:-translate-y-1 transition-transform"
            >
              Guia de terapia ABA para pais
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-page">
        <div className="container-custom py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeaturedBlock
              label="Guia essencial"
              title="Conheca o Vivencias Azuis e nossa missao"
              description="Entenda por que criamos este espaco e como queremos apoiar familias e profissionais com informacao confiavel."
              href="/sobre"
            />
            <CTA
              title="Fale com a equipe"
              description="Tem uma duvida ou sugestao? Estamos prontos para ouvir voce."
              actionLabel="Entrar em contato"
              href="/contato"
            />
          </div>
        </div>
      </section>
      <AboutSection />
      <EbookLeadPopup />
    </div>
  )
}
