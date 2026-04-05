import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Minha area',
  description: 'Area inicial da conta do Vivencias Azuis.',
  path: '/minha-area',
  keywords: ['minha area', 'conta', 'painel'],
})

export default function MinhaAreaPage() {
  return (
    <section className="bg-page">
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl rounded-card border border-sand-200 bg-surface p-8 shadow-card">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Area do usuario
          </p>
          <h1 className="text-3xl font-bold text-sand-900 md:text-4xl">
            Sua area pessoal esta em construcao
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand-700">
            Este endereco ja existe para o acesso autenticado. A proxima etapa vai adicionar o layout
            completo, perfil, favoritos, materiais e assinatura.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Voltar ao blog
            </Link>
            <Link
              href="/"
              className="rounded-pill border border-sand-300 px-5 py-3 text-sm font-semibold text-sand-700 transition-colors hover:bg-brand-soft hover:text-link"
            >
              Ir para inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
