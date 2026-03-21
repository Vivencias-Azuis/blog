import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import { getPostTrustSignals } from '@/lib/editorial'

interface EditorialTrustPanelProps {
  post: Pick<PostMeta, 'author' | 'category' | 'updated' | 'datetime'>
}

export default function EditorialTrustPanel({ post }: EditorialTrustPanelProps) {
  const trust = getPostTrustSignals(post)
  const reviewDate = new Date(post.updated || post.datetime).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <aside className="rounded-3xl border border-sand-200 bg-surface p-6 md:p-8 shadow-card">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="rounded-pill bg-blue-900 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Transparência editorial
        </span>
        {trust.isSensitiveTopic && (
          <span className="rounded-pill bg-brand-soft text-blue-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Tema sensível
          </span>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-sand-900 mb-1">Autoria</p>
          <p className="text-sand-700 leading-relaxed">
            <Link href={`/autores/${trust.author.slug}`} className="text-link hover:text-link-hover underline">
              {trust.author.name}
            </Link>{' '}
            • {trust.author.role}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-sand-900 mb-1">Revisão</p>
          <p className="text-sand-700 leading-relaxed">
            {trust.reviewLabel}. Última revisão editorial em {reviewDate}.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-sand-900 mb-1">Metodologia</p>
          <p className="text-sand-700 leading-relaxed">
            Conteúdo produzido com curadoria de fontes públicas, atualização periódica e linguagem voltada a famílias.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-sand-900 mb-1">Aviso importante</p>
          <p className="text-sand-700 leading-relaxed">{trust.disclaimer}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        <Link href={`/autores/${trust.author.slug}`} className="text-link hover:text-link-hover underline">
          Ver perfil editorial
        </Link>
        <Link href="/metodologia-editorial" className="text-link hover:text-link-hover underline">
          Como este conteúdo é produzido
        </Link>
      </div>
    </aside>
  )
}
