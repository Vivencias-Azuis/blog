import { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'
import EbookLeadPopup from '@/components/EbookLeadPopup'
import NewsletterSignup from '@/components/NewsletterSignup'

const homeMetadata = generatePageMetadata({
  title: 'Autismo na prática: direitos, terapias e planos',
  description:
    'Portal Vivências Azuis: guias práticos sobre autismo para famílias — direitos, terapias ABA, planos de saúde e rotina, em linguagem simples.',
  path: '/',
  keywords: [
    'vivências azuis',
    'autismo',
    'TEA',
    'inclusão',
    'blog',
    'apoio',
    'família',
    'terapia ABA',
    'planos de saúde',
    'direitos',
    'transtorno do espectro autista',
  ],
})

// absolute evita " | Vivências Azuis" duplicado (template do layout)
export const metadata: Metadata = {
  ...homeMetadata,
  title: {
    absolute: 'Vivências Azuis | Autismo na prática: direitos, terapias e planos',
  },
  openGraph: {
    ...homeMetadata.openGraph,
    title: 'Vivências Azuis | Autismo na prática: direitos, terapias e planos',
  },
  twitter: {
    ...homeMetadata.twitter,
    title: 'Vivências Azuis | Autismo na prática: direitos, terapias e planos',
  },
}

export const revalidate = 3600

const SITE_URL = 'https://www.vivenciasazuis.com.br'

const homeFaqs = [
  {
    question: 'O que é o Vivências Azuis?',
    answer: 'É um portal editorial com guias práticos sobre autismo para famílias, cobrindo direitos, terapias, planos de saúde, escola e rotina, com linguagem simples e fontes públicas.',
  },
  {
    question: 'Para quem o conteúdo foi feito?',
    answer: 'Para pais, cuidadores, educadores e profissionais que precisam tomar decisões práticas sobre autismo no dia a dia, sem juridiquês ou linguagem técnica excessiva.',
  },
  {
    question: 'Os artigos substituem orientação médica ou jurídica?',
    answer: 'Não. O portal organiza informação de utilidade prática, mas cada caso exige avaliação individual com profissionais de saúde, educação ou advocacia quando necessário.',
  },
  {
    question: 'Como encontrar o guia certo para o meu problema?',
    answer: 'Use os hubs da homepage por tema — planos de saúde, direitos e terapias — ou navegue pelo blog por categoria. Cada hub concentra o guia principal e links para checklists e próximos passos.',
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

const hubCards = [
  {
    eyebrow: 'Decisão financeira',
    title: 'Planos de saúde e cobertura',
    description:
      'Comparativos, cobertura ABA, reembolso, negativas e o que pedir por escrito antes de aceitar qualquer resposta.',
    href: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
    primaryLabel: 'Explorar hub de planos',
    secondaryHref: '/blog/qual-plano-de-saude-cobre-terapia-aba-autismo',
    secondaryLabel: 'Ver cobertura ABA',
    stats: 'Para comparar operadoras sem juridiquês',
  },
  {
    eyebrow: 'Cobrança prática',
    title: 'Direitos, benefícios e documentação',
    description:
      'Lei Berenice Piana, BPC, CIPTEA, escola e documentos que ajudam a cobrar um direito sem se perder no processo.',
    href: '/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
    primaryLabel: 'Explorar hub de direitos',
    secondaryHref: '/blog/documentos-essenciais-familias-pessoas-autistas-laudos-relatorios-beneficios',
    secondaryLabel: 'Ver guia de documentos',
    stats: 'Laudos, protocolos e próximos passos',
  },
  {
    eyebrow: 'Escolha terapêutica',
    title: 'Terapias, comunicação e rotina',
    description:
      'ABA, PECS, clínica, integração sensorial e rotina com foco em entender por onde começar e o que priorizar.',
    href: '/blog/aba-para-pais',
    primaryLabel: 'Explorar hub de terapias',
    secondaryHref: '/blog/como-escolher-clinica-de-autismo-criterios-sinais-alerta',
    secondaryLabel: 'Escolher clínica',
    stats: 'Menos sobrecarga, mais clareza',
  },
]

const portalSteps = [
  {
    title: 'Identifique o tipo de problema',
    description:
      'Plano, direito, terapia ou comunicação. A entrada certa reduz a sensação de caos.',
  },
  {
    title: 'Abra o guia pilar',
    description:
      'O conteúdo principal concentra contexto, documentos e links satélite sem competir entre si.',
  },
  {
    title: 'Siga a trilha prática',
    description:
      'Os caminhos levam para comparativo, checklist, documentos ou contato contextual.',
  },
  {
    title: 'Volte com contexto',
    description:
      'Se precisar falar com a equipe, o formulário já sabe de qual artigo você veio.',
  },
]

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vivências Azuis',
  url: SITE_URL,
  logo: `${SITE_URL}/new_logo.png`,
  description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vivências Azuis',
  url: SITE_URL,
  inLanguage: 'pt-BR',
  description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
  publisher: {
    '@type': 'Organization',
    name: 'Vivências Azuis',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: 'Autismo na prática: direitos, terapias e planos de saúde',
  description: 'Guias práticos sobre autismo para famílias: direitos, terapias e planos de saúde com conteúdo atualizado e linguagem simples.',
  inLanguage: 'pt-BR',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Vivências Azuis',
    url: SITE_URL,
  },
  about: ['autismo', 'direitos', 'terapias', 'planos de saúde', 'educação inclusiva'],
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const jsonLdScripts = [organizationJsonLd, websiteJsonLd, webPageJsonLd, faqJsonLd]

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-paper">
      {jsonLdScripts.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}

      <Hero />

      {/* Central de decisão */}
      <section className="border-b border-rule bg-paper">
        <div className="container-custom py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="eyebrow">Central de decisão</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">
                Comece pelo problema que você precisa resolver agora
              </h2>
              <p className="lede mt-6 max-w-[44ch]">
                A home não é vitrine. É um mapa prático para decidir sobre cobertura,
                direitos, terapias e organização da rotina.
              </p>
            </div>

            <ol>
              {quickRoutes.map((route, index) => (
                <li key={route.href} className="border-b border-rule first:border-t first:border-t-rule">
                  <Link
                    href={route.href}
                    data-cta={route.cta}
                    data-cta-location="home_decision_grid"
                    className="group -mx-3 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 px-3 py-5 transition-colors duration-150 hover:bg-azul-wash"
                  >
                    <span aria-hidden="true" className="font-display text-base text-azul-mid">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
                        {route.label}
                      </span>
                      <span className="mt-1 block font-display text-lg text-ink transition-colors duration-150 group-hover:text-azul sm:text-xl">
                        {route.title}
                      </span>
                    </span>
                    <span aria-hidden="true" className="font-sans text-sm text-azul-mid">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Plano semanal — faixa de marca */}
      <section id="plano-semanal" className="scroll-mt-24 border-b border-rule bg-azul-deep">
        <div className="container-custom py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-azul-soft">
                Ritmo semanal
              </p>
              <h2 className="display mt-4 text-3xl text-paper sm:text-4xl">
                Um plano semanal para organizar terapias e direitos
              </h2>
              <p className="mt-5 max-w-[46ch] font-serif text-lg leading-relaxed text-azul-soft">
                Um e-mail por semana com checklist acionável, links prioritários e um
                próximo passo claro.
              </p>
              <blockquote className="mt-8 border-l-2 border-clay pl-5">
                <p className="font-serif text-base italic text-paper/90">
                  “Em duas semanas já conseguimos organizar escola, terapias e
                  documentação sem correria.”
                </p>
                <footer className="mt-2 font-sans text-xs uppercase tracking-[0.14em] text-azul-soft">
                  Relato de leitora, São Paulo
                </footer>
              </blockquote>
            </div>

            <div className="self-center">
              <NewsletterSignup
                origem="home-newsletter"
                ctaLocation="home_newsletter"
                pageType="home"
                trafficIntent="mixed"
              />
            </div>
          </div>
        </div>
      </section>

      <FeaturedPosts />

      {/* Trilhas por tema */}
      <section className="border-b border-rule bg-paper-deep">
        <div className="container-custom py-16 md:py-20">
          <div className="border-b border-ink/15 pb-6">
            <p className="eyebrow">Trilhas por tema</p>
            <h2 className="display mt-3 max-w-[26ch] text-3xl sm:text-4xl">
              Três entradas para o que você precisa resolver
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-12 pt-10 md:grid-cols-3">
            {hubCards.map((hub, index) => (
              <article key={hub.href} className="flex flex-col border-t-2 border-azul pt-6">
                <span aria-hidden="true" className="font-display text-sm text-azul-mid">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="eyebrow mt-3">{hub.eyebrow}</p>
                <h3 className="display mt-3 text-2xl">{hub.title}</h3>
                <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-ink-soft">
                  {hub.description}
                </p>
                <p className="mt-5 border-t border-rule pt-4 font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
                  {hub.stats}
                </p>
                <div className="mt-6 flex flex-col items-start gap-4">
                  <Link
                    href={hub.href}
                    data-cta={`home_hub_primary_${hub.href.split('/').pop()}`}
                    data-cta-location="home_hub_primary"
                    className="btn-ink"
                  >
                    {hub.primaryLabel}
                  </Link>
                  <Link
                    href={hub.secondaryHref}
                    data-cta={`home_hub_secondary_${hub.secondaryHref.split('/').pop()}`}
                    data-cta-location="home_hub_secondary"
                    className="link-rule"
                  >
                    {hub.secondaryLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Apoie o projeto */}
      <section className="border-b border-rule bg-paper">
        <div className="container-custom py-12 md:py-14">
          <div className="flex flex-col gap-6 border-t-2 border-clay pt-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[46ch]">
              <p className="eyebrow text-clay">Apoie o projeto</p>
              <h2 className="display mt-3 text-2xl">
                Ajude a manter este trabalho vivo e independente
              </h2>
              <p className="mt-3 font-serif text-base leading-relaxed text-ink-soft">
                Apoie mensalmente no cartão ou faça uma contribuição única por Pix ou
                cartão.
              </p>
            </div>
            <Link href="/apoie" className="btn-ink shrink-0">
              Quero apoiar
            </Link>
          </div>
        </div>
      </section>

      {/* Como usar o portal */}
      <section className="border-b border-rule bg-paper">
        <div className="container-custom py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Como usar o portal</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">
                Menos leitura solta, mais trilha clara
              </h2>
              <p className="lede mt-6 max-w-[42ch]">
                Cada hub existe para reduzir três fricções: decidir o que vem primeiro,
                separar o urgente do importante e saber qual documento ou ação precede o
                resto.
              </p>
            </div>

            <ol>
              {portalSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-rule py-5 first:border-t first:border-t-rule"
                >
                  <span aria-hidden="true" className="font-display text-lg text-azul-mid">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="display text-lg">{step.title}</h3>
                    <p className="mt-1 max-w-[52ch] font-serif text-base leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Sobre e contato */}
      <section className="border-b border-rule bg-paper">
        <div className="container-custom py-16 md:py-20">
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            <div className="border-t-2 border-azul pt-6">
              <p className="eyebrow">Guia essencial</p>
              <h2 className="display mt-3 text-2xl sm:text-3xl">
                Conheça o Vivências Azuis e nossa missão
              </h2>
              <p className="mt-3 max-w-[46ch] font-serif text-base leading-relaxed text-ink-soft">
                Entenda por que criamos este espaço e como queremos apoiar famílias e
                profissionais com informação confiável.
              </p>
              <Link href="/sobre" className="link-rule mt-5 inline-block">
                Conhecer a missão
              </Link>
            </div>

            <div className="border-t-2 border-clay pt-6">
              <p className="eyebrow text-clay">Fale com a equipe</p>
              <h2 className="display mt-3 text-2xl sm:text-3xl">
                Tem uma dúvida ou sugestão?
              </h2>
              <p className="mt-3 max-w-[46ch] font-serif text-base leading-relaxed text-ink-soft">
                Escreva para a equipe. Se a dúvida vier de um artigo, o formulário já leva
                esse contexto junto.
              </p>
              <Link href="/contato" className="btn-line mt-5">
                Entrar em contato
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="border-b border-rule bg-paper-deep">
        <div className="container-custom py-16 md:py-20">
          <div className="border-b border-ink/15 pb-6">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Dúvidas comuns sobre o portal
            </h2>
          </div>

          <dl className="grid gap-x-12 md:grid-cols-2">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="border-b border-rule py-6">
                <dt className="display text-lg">{faq.question}</dt>
                <dd className="mt-2 max-w-[52ch] font-serif text-base leading-relaxed text-ink-soft">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <AboutSection />
      <EbookLeadPopup />
    </div>
  )
}
