import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Hero() {
  const allPosts = getAllPosts()
  const postsCount = allPosts.length

  return (
    <section className="border-b border-rule bg-paper">
      <div className="container-custom">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-4 pt-6">
          <p className="eyebrow">Vivências Azuis · apoio a famílias no TEA</p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink-mute">
            Revisado em 2026
          </p>
        </div>

        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl">
              Autismo na prática: direitos, terapias e planos de saúde
            </h1>
            <p className="lede mt-8 max-w-[46ch]">
              Conteúdo direto para decidir o próximo passo sem se perder em
              burocracia. Sem promessa mágica e sem juridiquês.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href="#plano-semanal"
                data-cta="hero_cta_plano_semanal"
                data-cta-location="hero_primary"
                className="btn-ink"
              >
                Comece pelo plano semanal
              </Link>
              <Link
                href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
                data-cta="hero_textlink_planos"
                data-cta-location="hero_secondary"
                className="link-rule"
              >
                Ou veja o comparativo de planos
              </Link>
            </div>
          </div>

          <dl className="self-end border-t border-rule pt-2 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule py-4">
              <dt className="font-sans text-sm text-ink-mute">Guias publicados</dt>
              <dd className="font-display text-3xl text-ink">{postsCount}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-rule py-4">
              <dt className="font-sans text-sm text-ink-mute">Temas-chave</dt>
              <dd className="font-display text-3xl text-ink">3</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="font-sans text-sm text-ink-mute">Cobertura</dt>
              <dd className="font-display text-3xl text-ink">2026</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
