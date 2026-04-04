import Link from 'next/link'

export default async function ApoieObrigadoPage({
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
            Obrigado pelo apoio
          </h1>
          <p className="mt-4 text-lg text-sand-700">
            {kind === 'subscription'
              ? 'Sua assinatura mensal foi iniciada com sucesso.'
              : 'Sua doação por cartão foi recebida com sucesso.'}
          </p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Voltar para a home
          </Link>
        </div>
      </div>
    </section>
  )
}
