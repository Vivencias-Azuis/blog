import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { AUTHOR_PROFILES, getAllAuthorProfiles } from '@/lib/editorial'
import { generatePageMetadata } from '@/lib/metadata'

interface AuthorPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllAuthorProfiles().map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = AUTHOR_PROFILES[slug]

  if (!author) {
    return generatePageMetadata({
      title: 'Autor não encontrado',
      description: 'O perfil editorial solicitado não foi encontrado.',
      path: `/autores/${slug}`,
    })
  }

  return generatePageMetadata({
    title: `${author.name} | Perfil editorial`,
    description: `${author.name}: ${author.role} no Vivências Azuis.`,
    path: `/autores/${author.slug}`,
    keywords: ['autor', 'perfil editorial', author.name, ...author.expertise],
  })
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = AUTHOR_PROFILES[slug]

  if (!author) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-page">
      <section className="bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/sobre" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-8">
            Voltar para Sobre
          </Link>
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100 mb-3">Perfil editorial</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{author.name}</h1>
            <p className="text-xl text-blue-100 mb-6">{author.role}</p>
            <p className="text-lg leading-relaxed text-blue-50 max-w-3xl">{author.bio}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
              <h2 className="text-2xl font-bold text-sand-900 mb-4">Áreas de atuação</h2>
              <ul className="space-y-3 text-sand-700">
                {author.expertise.map((topic) => (
                  <li key={topic}>• {topic}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
              <h2 className="text-2xl font-bold text-sand-900 mb-4">Compromisso editorial</h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                Este perfil existe para deixar claro quem assina, revisa e atualiza os conteúdos do portal.
              </p>
              <Link href="/metodologia-editorial" className="text-link hover:text-link-hover underline">
                Ler metodologia editorial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
