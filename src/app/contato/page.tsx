import ContatoClient from './ContatoClient'

interface ContatoPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

export default async function ContatoPage({ searchParams }: ContatoPageProps) {
  const resolvedParams = (await searchParams) || {}

  return (
    <div className="min-h-screen bg-page">
      <ContatoClient
        origem={getSingleParam(resolvedParams.origem)}
        cluster={getSingleParam(resolvedParams.cluster)}
        slug={getSingleParam(resolvedParams.slug)}
        titulo={getSingleParam(resolvedParams.titulo)}
        assunto={getSingleParam(resolvedParams.assunto)}
      />
    </div>
  )
}
