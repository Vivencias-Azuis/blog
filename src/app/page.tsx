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
  const hubCards = [
    {
      eyebrow: 'Decisão financeira',
      title: 'Planos de saúde e cobertura',
      description: 'Comparativos, cobertura ABA, reembolso, negativas e o que pedir por escrito antes de aceitar qualquer resposta.',
      href: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
      primaryLabel: 'Explorar hub de planos',
      secondaryHref: '/blog/qual-plano-de-saude-cobre-terapia-aba-autismo',
      secondaryLabel: 'Ver cobertura ABA',
      accent: 'from-blue-900 via-brand to-blue-800',
      stats: 'Conteúdo para comparar operadoras sem juridiquês',
    },
    {
      eyebrow: 'Cobrança prática',
      title: 'Direitos, benefícios e documentação',
      description: 'Lei Berenice Piana, BPC, CIPTEA, escola e documentos que ajudam a cobrar um direito sem se perder no processo.',
      href: '/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
      primaryLabel: 'Explorar hub de direitos',
      secondaryHref: '/blog/documentos-essenciais-familias-pessoas-autistas-laudos-relatorios-beneficios',
      secondaryLabel: 'Ver guia de documentos',
      accent: 'from-blue-800 via-blue-700 to-sky-700',
      stats: 'Organize laudos, protocolos e próximos passos',
    },
    {
      eyebrow: 'Escolha terapêutica',
      title: 'Terapias, comunicação e rotina',
      description: 'ABA, PECS, clínica, integração sensorial e rotina com foco em entender por onde começar e o que priorizar.',
      href: '/blog/aba-para-pais',
      primaryLabel: 'Explorar hub de terapias',
      secondaryHref: '/blog/como-escolher-clinica-de-autismo-criterios-sinais-alerta',
      secondaryLabel: 'Escolher clínica',
      accent: 'from-brand via-sky-700 to-blue-900',
      stats: 'Menos sobrecarga, mais clareza de prioridade',
    },
  ]

  const quickRoutes = [
    {
      label: 'Preciso decidir hoje',
      title: 'Qual plano realmente cobre autismo?',
      href: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
      cta: 'home_decision_planos',
    },
    {
      label: 'Preciso cobrar um direito',
      title: 'O que pedir para escola, SUS ou plano',
      href: '/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
      cta: 'home_decision_direitos',
    },
    {
      label: 'Preciso organizar a rotina',
      title: 'Checklist da primeira consulta e próximos passos',
      href: '/blog/checklist-primeira-consulta-autismo',
      cta: 'home_decision_rotina',
    },
    {
      label: 'Preciso entender terapias',
      title: 'ABA para pais sem linguagem técnica',
      href: '/blog/aba-para-pais',
      cta: 'home_decision_aba',
    },
  ]

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
        <div className="container-custom py-12 md:py-16 scroll-mt-24">
          <div className="rounded-block border border-sand-200 bg-surface/95 p-6 md:p-8 shadow-overlay relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand/10 to-transparent pointer-events-none" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-link mb-4">
                  Central de decisão
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-sand-900 leading-tight mb-4">
                  Comece pelo problema que você precisa resolver agora
                </h2>
                <p className="text-lg text-sand-700 max-w-2xl leading-relaxed">
                  A home deixa de ser só vitrine de posts. Ela passa a funcionar como mapa prático para decisões sobre cobertura, direitos, terapias e organização da rotina.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {quickRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      data-cta={route.cta}
                      className="group rounded-card border border-sand-200 bg-white px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-pop"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wide text-link mb-2">
                        {route.label}
                      </span>
                      <span className="block text-base font-bold text-sand-900 group-hover:text-link transition-colors">
                        {route.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div id="plano-semanal" className="rounded-block bg-gradient-to-br from-blue-900 via-brand to-blue-800 p-6 md:p-8 text-white shadow-pop">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100 mb-3">
                  Ritmo semanal
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Receba um plano semanal para organizar terapias e direitos
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Um e-mail por semana com checklist acionável, links prioritários e um próximo passo claro.
                </p>
                <NewsletterSignup origem="home-newsletter" />
                <div className="mt-6 rounded-card border border-white/15 bg-white/10 px-4 py-4">
                  <p className="text-sm text-blue-50">
                    “Em duas semanas já conseguimos organizar escola, terapias e documentação sem correria.”
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-blue-100">
                    Relato de leitora, São Paulo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturedPosts />
      <section className="bg-page">
        <div className="container-custom py-10 md:py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {hubCards.map((hub) => (
              <article
                key={hub.href}
                className="group relative overflow-hidden rounded-block border border-sand-200 bg-surface shadow-overlay"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${hub.accent}`} />
                <div className="p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-link mb-3">
                    {hub.eyebrow}
                  </p>
                  <h3 className="text-2xl font-bold text-sand-900 leading-tight mb-3 group-hover:text-link transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-sand-700 leading-relaxed mb-5">
                    {hub.description}
                  </p>
                  <div className="rounded-card border border-sand-200 bg-white px-4 py-3 text-sm text-sand-700 mb-5">
                    {hub.stats}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link
                      href={hub.href}
                      data-cta={`home_hub_primary_${hub.href.split('/').pop()}`}
                      className="btn-primary text-center"
                    >
                      {hub.primaryLabel}
                    </Link>
                    <Link
                      href={hub.secondaryHref}
                      data-cta={`home_hub_secondary_${hub.secondaryHref.split('/').pop()}`}
                      className="text-sm font-semibold text-link hover:text-link-hover transition-colors"
                    >
                      {hub.secondaryLabel}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-page">
        <div className="container-custom py-12 md:py-16">
          <div className="rounded-block border border-sand-200 bg-gradient-to-r from-sand-100 via-white to-sand-100 p-8 md:p-10 shadow-overlay">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-link mb-3">
                  Como usar o portal
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-sand-900 mb-4">
                  Menos leitura solta. Mais trilhas claras por tema.
                </h2>
                <p className="text-lg text-sand-700 leading-relaxed">
                  Cada hub foi desenhado para reduzir três fricções: decidir o que fazer primeiro, separar o que é urgente do que é importante e saber qual documento ou ação vem antes.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-card border border-sand-200 bg-white p-5 shadow-card">
                  <p className="text-sm font-semibold text-link mb-2">1. Identifique o tipo de problema</p>
                  <p className="text-sm text-sand-700">Plano, direito, terapia ou comunicação. A entrada certa reduz a sensação de caos.</p>
                </div>
                <div className="rounded-card border border-sand-200 bg-white p-5 shadow-card">
                  <p className="text-sm font-semibold text-link mb-2">2. Abra o guia pilar</p>
                  <p className="text-sm text-sand-700">O conteúdo principal concentra contexto, documentos e links satélite sem competir entre si.</p>
                </div>
                <div className="rounded-card border border-sand-200 bg-white p-5 shadow-card">
                  <p className="text-sm font-semibold text-link mb-2">3. Siga a trilha prática</p>
                  <p className="text-sm text-sand-700">Os CTAs passam a apontar para comparativo, checklist, documentos ou contato contextual.</p>
                </div>
                <div className="rounded-card border border-sand-200 bg-white p-5 shadow-card">
                  <p className="text-sm font-semibold text-link mb-2">4. Volte com contexto</p>
                  <p className="text-sm text-sand-700">Se precisar falar com a equipe, o formulário já sabe de qual artigo você veio.</p>
                </div>
              </div>
            </div>
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
