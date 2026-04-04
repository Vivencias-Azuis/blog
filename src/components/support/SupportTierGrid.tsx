import type { SupportTier } from '@/lib/support/config'

function formatCurrency(amountInCents: number) {
  return (amountInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function SupportTierGrid({
  tiers,
  onCheckout,
  loadingSlug,
}: {
  tiers: readonly SupportTier[]
  onCheckout: (tierSlug: SupportTier['slug']) => void
  loadingSlug: SupportTier['slug'] | null
}) {
  return (
    <section className="mt-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-link">
        Apoio recorrente
      </p>
      <h2 className="mt-2 text-3xl font-bold text-sand-900">
        Ajude todos os meses
      </h2>
      <p className="mt-3 max-w-2xl text-sand-700">
        Assinatura mensal no cartão para quem quer sustentar a continuidade do
        projeto.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const isLoading = loadingSlug === tier.slug
          const isFeatured = tier.slug === 'fortalecer'

          return (
            <article
              key={tier.slug}
              className={`rounded-block border p-6 shadow-card transition-transform duration-300 ${
                isFeatured
                  ? 'border-brand bg-brand-soft/35 ring-1 ring-brand/30'
                  : 'border-sand-200 bg-white'
              }`}
            >
              {isFeatured ? (
                <span className="inline-flex rounded-pill bg-brand px-3 py-1 text-xs font-semibold text-white">
                  Mais escolhido
                </span>
              ) : null}
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-link">
                {tier.label}
              </p>
              <h3 className="mt-2 text-3xl font-bold text-sand-900">
                {formatCurrency(tier.amountInCents)}
                <span className="text-lg font-medium text-sand-600">/mês</span>
              </h3>
              <p className="mt-4 text-sand-700">{tier.description}</p>
              <p className="mt-6 text-sm text-sand-600">
                Assinatura mensal no cartão
              </p>
              <button
                type="button"
                className="btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-80"
                disabled={isLoading}
                onClick={() => onCheckout(tier.slug)}
              >
                {isLoading ? 'Abrindo checkout...' : 'Quero apoiar'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
