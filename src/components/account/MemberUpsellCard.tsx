import Link from 'next/link'

export default function MemberUpsellCard() {
  return (
    <section className="rounded-block border border-dashed border-brand/40 bg-brand-soft p-5 shadow-card md:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-link">
        Area de membros
      </p>
      <h2 className="mt-2 text-xl font-semibold text-sand-900">
        Quer os materiais exclusivos?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sand-700">
        Alguns materiais sao reservados para membros. O acesso e liberado
        manualmente na V1 depois do apoio ao projeto.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/apoie"
          className="inline-flex rounded-pill bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Apoiar o projeto
        </Link>
        <Link
          href="/minha-area/assinatura"
          className="inline-flex rounded-pill border border-sand-300 px-4 py-3 text-sm font-semibold text-sand-700 transition-colors hover:bg-white hover:text-link"
        >
          Ver status da assinatura
        </Link>
      </div>
    </section>
  )
}
