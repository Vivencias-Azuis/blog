import Link from 'next/link'

export default async function ApoieCanceladoPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>
}) {
  const { kind } = await searchParams

  return (
    <section className="bg-page">
      <div className="container-custom py-16">
        <div className="mx-auto max-w-2xl rounded-block border border-sand-200 bg-white p-10 text-center shadow-card">
          <h1 className="text-4xl font-bold text-sand-900">
            Pagamento não concluído
          </h1>
          <p className="mt-4 text-lg text-sand-700">
            {kind === 'subscription'
              ? 'Sua assinatura não foi concluída desta vez.'
              : 'Sua doação avulsa não foi concluída desta vez.'}
          </p>
          <Link href="/apoie" className="btn-primary mt-8 inline-flex">
            Tentar novamente
          </Link>
        </div>
      </div>
    </section>
  )
}
