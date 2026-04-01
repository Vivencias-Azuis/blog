import type { Metadata } from 'next'
import Link from 'next/link'
import { getAffiliateProducts } from '@/lib/shop'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Lojinha - Vivências Azuis',
  description: 'Produtos e links indicados no blog Vivências Azuis, reunidos em uma única página para facilitar a busca por itens úteis para a rotina de famílias atípicas.',
  path: '/lojinha',
  keywords: ['lojinha', 'produtos autismo', 'links afiliados', 'brinquedos sensoriais', 'recursos para autismo'],
})

function getMerchantStyles(merchant: string) {
  if (merchant === 'Mercado Livre') {
    return 'bg-amber-100 text-amber-900 border border-amber-200'
  }

  if (merchant === 'Mundo Autista') {
    return 'bg-brand-soft text-link border border-brand/20'
  }

  if (merchant === 'Hotmart') {
    return 'bg-orange-100 text-orange-900 border border-orange-200'
  }

  return 'bg-sand-100 text-sand-800 border border-sand-200'
}

export default function LojinhaPage() {
  const products = getAffiliateProducts()

  return (
    <section className="bg-gradient-to-b from-brand-soft/40 via-surface to-surface">
      <div className="container-custom section-padding">
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
          <span className="tag-modern bg-white text-link border border-brand/20">Lojinha Vivências Azuis</span>
          <h1 className="mt-6 text-4xl font-bold text-sand-900 md:text-5xl">
            Produtos e links citados no blog, em um lugar só
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sand-700 md:text-xl">
            Reunimos aqui os itens mencionados nos artigos para facilitar sua busca. Quando um link for de afiliado,
            o site pode receber uma pequena comissão sem custo extra para você.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-sand-700">
            <span className="rounded-pill bg-white px-4 py-2 shadow-sm">{products.length} links reunidos</span>
            <span className="rounded-pill bg-white px-4 py-2 shadow-sm">Atualizado automaticamente a partir dos posts</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="card-modern flex h-full flex-col overflow-hidden border border-sand-200/80 bg-surface"
            >
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <span className={`inline-flex rounded-pill px-3 py-1 text-xs font-semibold ${getMerchantStyles(product.merchant)}`}>
                    {product.merchant}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-sand-900">{product.title}</h2>
                </div>
                <span className="rounded-pill bg-sand-100 px-3 py-1 text-xs font-semibold text-sand-700">
                  {product.category}
                </span>
              </div>

              <div className="px-6">
                <p className="line-clamp-4 text-base leading-relaxed text-sand-700">{product.description}</p>
              </div>

              <div className="mt-6 border-t border-sand-200/80 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-500">Origem</p>
                <Link
                  href={`/blog/${product.sourcePostSlug}`}
                  className="mt-2 block text-base font-semibold text-link transition-colors hover:text-link-hover"
                >
                  {product.sourcePostTitle}
                </Link>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-sand-600">{product.sourcePostExcerpt}</p>
              </div>

              <div className="mt-auto p-6 pt-0">
                <a
                  href={product.href}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  data-cta="lojinha_affiliate_click"
                  data-cta-location="shop_grid"
                  className="btn-primary flex w-full items-center justify-center text-center"
                >
                  Abrir oferta
                </a>
              </div>
            </article>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="mx-auto mt-14 max-w-2xl rounded-block border border-dashed border-sand-300 bg-white/80 p-10 text-center shadow-card">
            <h2 className="text-2xl font-semibold text-sand-900">Nenhum link disponível ainda</h2>
            <p className="mt-3 text-sand-700">
              Assim que novos links de produtos forem adicionados aos artigos, eles passam a aparecer aqui automaticamente.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
