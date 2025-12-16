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
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      {
        source: '/blog/CIPTEA-carteira-de-identificacao-da-pessoa-com-transtorno-do-espectro-autista',
        destination: '/blog/ciptea-carteira-de-identificacao-da-pessoa-com-transtorno-do-espectro-autista',
        permanent: true,
      },
      {
        source: '/blog/Guia-Completo-Tudo-que-os-Pais-de-Autistas-de-Primeira-Viagem-Precisam-Saber',
        destination: '/blog/guia-completo-tudo-que-os-pais-de-autistas-de-primeira-viagem-precisam-saber',
        permanent: true,
      },
      {
        source: '/blog/Testes-de-rastreamento-M-CHAT-e-Escala-CARS-Funcionamento-e-Aplicacao',
        destination: '/blog/testes-de-rastreamento-m-chat-e-escala-cars-funcionamento-e-aplicacao',
        permanent: true,
      },
      {
        source: '/blog/comunica%C3%A7%C3%A3o-aumentativa-e-alternativa-caa',
        destination: '/blog/comunicacao-aumentativa-e-alternativa-caa',
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
        source: '/blog/resumo-do-livro-SOS-Autismo-Dr-Gustavo-Teixeira-dra-Mayra-Gaiato',
        destination: '/blog/resumo-do-livro-sos-autismo-dr-gustavo-teixeira-dra-mayra-gaiato',
        permanent: true,
      },
      {
        source: '/blog/profissionais-de-saude-habilitados-para-diagnostico-de-autismo-no-brasil.mdx',
        destination: '/blog/profissionais-de-saude-habilitados-para-diagnostico-de-autismo-no-brasil',
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
