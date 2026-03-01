import { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'
import CTA from '@/components/design-system/CTA'
import FeaturedBlock from '@/components/design-system/FeaturedBlock'
import EbookLeadPopup from '@/components/EbookLeadPopup'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = generatePageMetadata({
  title: 'Vivências Azuis - Blog sobre Autismo e Inclusão',
  description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
  path: '/',
  keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', 'família', 'desenvolvimento', 'síndrome de asperger', 'transtorno do espectro autista', 'educação', 'direitos'],
})

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <section className="bg-page">
        <div id="plano-semanal" className="container-custom py-10 md:py-12 scroll-mt-24">
          <div className="rounded-block border border-sand-200 bg-surface p-6 md:p-8 shadow-overlay">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-sand-900 mb-3">
                Receba o plano semanal para organizar terapias e direitos
              </h2>
              <p className="text-sand-700 mb-6">
                Um e-mail por semana com checklist acionável e links diretos para os guias mais úteis.
              </p>
              <NewsletterSignup origem="home-newsletter" />
              <p className="mt-4 text-sm text-sand-600">
                Sem spam. Resultado esperado: sair da indecisão e saber o próximo passo da semana.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturedPosts />
      <section className="bg-page">
        <div className="container-custom py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-block bg-surface border border-sand-200 shadow-overlay p-6">
            <h3 className="text-2xl font-bold text-sand-900">Artigos principais</h3>
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              data-cta="home_top_article_planos"
              className="text-link font-semibold hover:underline"
            >
              Melhor plano de saude para autismo
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
              Comece pelos temas que mais geram duvidas no dia a dia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              data-cta="home_shortcut_planos"
              className="rounded-block bg-surface border border-sand-200 shadow-overlay p-6 text-lg font-semibold text-sand-900 hover:-translate-y-1 transition-transform"
            >
              Plano de saude para autismo: comparativo rapido
              <span className="mt-2 block text-sm font-normal text-sand-600">
                Entenda cobertura, reembolso e limites em leitura de 8 minutos.
              </span>
            </Link>
            <Link
              href="/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil"
              data-cta="home_shortcut_lei"
              className="rounded-block bg-surface border border-sand-200 shadow-overlay p-6 text-lg font-semibold text-sand-900 hover:-translate-y-1 transition-transform"
            >
              Lei Berenice Piana: direitos explicados
              <span className="mt-2 block text-sm font-normal text-sand-600">
                Veja o que a escola e o plano nao podem negar.
              </span>
            </Link>
            <Link
              href="/blog/aba-para-pais"
              data-cta="home_shortcut_aba"
              className="rounded-block bg-surface border border-sand-200 shadow-overlay p-6 text-lg font-semibold text-sand-900 hover:-translate-y-1 transition-transform"
            >
              Terapia ABA para pais: por onde comecar
              <span className="mt-2 block text-sm font-normal text-sand-600">
                Guia direto para iniciar sem sobrecarga na rotina.
              </span>
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
