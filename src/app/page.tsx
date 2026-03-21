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
  title: 'Autismo na prática: direitos, terapias e planos de saúde',
  description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
  path: '/',
  keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', 'família', 'desenvolvimento', 'síndrome de asperger', 'transtorno do espectro autista', 'educação', 'direitos'],
})

export default function Home() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vivências Azuis',
    url: 'https://www.vivenciasazuis.com.br',
    logo: 'https://www.vivenciasazuis.com.br/new_logo.png',
    description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vivências Azuis',
    url: 'https://www.vivenciasazuis.com.br',
    inLanguage: 'pt-BR',
    description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
    publisher: {
      '@type': 'Organization',
      name: 'Vivências Azuis',
    },
  }

  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <section className="bg-page">
        <div id="plano-semanal" className="container-custom py-10 md:py-12 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link
              href="/blog/checklist-primeira-consulta-autismo"
              data-cta="home_route_agir_hoje"
              className="rounded-card border border-sand-200 bg-white p-5 shadow-overlay hover:-translate-y-0.5 transition-transform"
            >
              <span className="block text-sm font-semibold text-link mb-1">Preciso agir hoje</span>
              <span className="block text-lg font-bold text-sand-900">Checklist da primeira consulta</span>
              <span className="block text-sm text-sand-600 mt-2">Saia com um plano objetivo para os próximos 7 dias.</span>
            </Link>
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              data-cta="home_route_decidir_plano"
              className="rounded-card border border-sand-200 bg-white p-5 shadow-overlay hover:-translate-y-0.5 transition-transform"
            >
              <span className="block text-sm font-semibold text-link mb-1">Quero decidir plano</span>
              <span className="block text-lg font-bold text-sand-900">Comparativo de planos para autismo</span>
              <span className="block text-sm text-sand-600 mt-2">Veja cobertura, reembolso e limites sem linguagem técnica.</span>
            </Link>
          </div>
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
              <div className="mt-6 rounded-card border border-sand-200 bg-white px-4 py-3 text-left">
                <p className="text-sm text-sand-700">
                  “Em duas semanas já conseguimos organizar escola, terapias e documentação sem correria.”
                </p>
                <p className="mt-1 text-xs font-semibold text-sand-600">Mãe de criança autista, São Paulo</p>
              </div>
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
              Resolva as 3 dúvidas mais comuns em 15 minutos
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
