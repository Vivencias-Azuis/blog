import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import withPWA from 'next-pwa'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ppl-ai-code-interpreter-files.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'pplx-res.cloudinary.com',
      },
    ],
  },
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      {
        source: '/blog/CIPTEA-carteira-de-identificacao-da-pessoa-com-transtorno-do-espectro-autista',
        destination: '/blog/ciptea-carteira-identificacao-pessoa-tea',
        permanent: true,
      },
      {
        source: '/blog/ciptea-carteira-de-identificacao-da-pessoa-com-transtorno-do-espectro-autista',
        destination: '/blog/ciptea-carteira-identificacao-pessoa-tea',
        permanent: true,
      },
      {
        source: '/blog/ciptea-carteira-de-identificacao-pessoa-tea',
        destination: '/blog/ciptea-carteira-identificacao-pessoa-tea',
        permanent: true,
      },
      {
        source: '/blog/Guia-Completo-Tudo-que-os-Pais-de-Autistas-de-Primeira-Viagem-Precisam-Saber',
        destination: '/blog/guia-completo-pais-autistas-primeira-viagem',
        permanent: true,
      },
      {
        source: '/blog/Guia-Computistas-de-Primeira-Viagem-Precisam-Saber',
        destination: '/blog/guia-completo-pais-autistas-primeira-viagem',
        permanent: true,
      },
      {
        source: '/blog/guia-completo-tudo-que-os-pais-de-autistas-de-primeira-viagem-precisam-saber',
        destination: '/blog/guia-completo-pais-autistas-primeira-viagem',
        permanent: true,
      },
      {
        source: '/blog/Gratuidades-Autistas-Garantidas-por-Lei-no-Brasil',
        destination: '/blog/gratuidades-autistas-garantidas-lei-brasil',
        permanent: true,
      },
      {
        source: '/blog/gratuidades-autistas-garantidas-por-lei-no-brasil',
        destination: '/blog/gratuidades-autistas-garantidas-lei-brasil',
        permanent: true,
      },
      {
        source: '/blog/comunicação-aumentativa-e-alternativa-caa',
        destination: '/blog/comunicacao-aumentativa-e-alternativa-caa',
        permanent: true,
      },
      {
        source: '/blog/comunica%C3%A7%C3%A3o-aumentativa-e-alternativa-caa',
        destination: '/blog/comunicacao-aumentativa-e-alternativa-caa',
        permanent: true,
      },
      {
        source: '/blog/autism',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/o-que-%C3%A9-s%C3%ADndrome-de-asperger',
        destination: '/blog/o-que-e-sindrome-de-asperger',
        permanent: true,
      },
      {
        source: '/blog/o-que-%C3%A9-transtorno-no-processamento-sensorial-tps',
        destination: '/blog/o-que-e-transtorno-no-processamento-sensorial-tps',
        permanent: true,
      },
      {
        source: '/blog/profissionais-de-saude-habilitados-para-diagnostico-de-autismo-no-brasil.mdx',
        destination: '/blog/profissionais-de-saude-habilitados-para-diagnostico-de-autismo-no-brasil',
        permanent: true,
      },
      {
        source: '/blog/qual-plano-de-saude-cobre-tratamento-para-autismo',
        destination: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
        permanent: true,
      },
      {
        source: '/blog/melhor-plano-de-saude-para-autismo-guia-completo',
        destination: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
        permanent: true,
      },
      {
        source: '/blog/melhor-plano-de-saude-para-crianca-autista-checklist-2026',
        destination: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
        permanent: true,
      },
      {
        source: '/blog/qual-plano-de-saude-cobre-terapia-aba-2026',
        destination: '/blog/qual-plano-de-saude-cobre-terapia-aba-autismo',
        permanent: true,
      },
      {
        source: '/blog/comunicacao-nao-verbal-autismo-o-que-fazer-guia-2026',
        destination: '/blog/crianca-autista-nao-fala-passo-a-passo-2026',
        permanent: true,
      },
      {
        source: '/blog/psicologia-aba-como-funciona-na-pratica-2026',
        destination: '/blog/aba-para-pais',
        permanent: true,
      },
      {
        source: '/blog/lei-berenice-piana-atualizada-2026-pdf-e-direitos',
        destination: '/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
        permanent: true,
      },
      {
        source: '/blog/como-conseguir-vaga-hospitais-clinicas-gratuitas-tea',
        destination: '/blog/hospitais-e-clinicas-gratuitas-para-autistas-no-br',
        permanent: true,
      },
    ]
  },
}

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
  ],
})

export default withMDX(pwaConfig(nextConfig))
