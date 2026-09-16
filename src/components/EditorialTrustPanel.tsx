import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import { getPostTrustSignals } from '@/lib/editorial'

interface EditorialTrustPanelProps {
  post: Pick<PostMeta, 'author' | 'category' | 'updated' | 'datetime'>
}

const entry = 'border-b border-rule py-3'
const term = 'font-sans text-xs uppercase tracking-[0.14em] text-ink-mute'
const detail = 'mt-1 font-serif text-sm leading-relaxed text-ink-soft'

export default function EditorialTrustPanel({ post }: EditorialTrustPanelProps) {
  const trust = getPostTrustSignals(post)
  const reviewDate = new Date(post.updated || post.datetime).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <aside className="border-t-2 border-azul pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
      <p className="eyebrow">Transparência editorial</p>
      {trust.isSensitiveTopic ? (
        <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-clay">
          Tema sensível
        </p>
      ) : null}

      <dl className="mt-5">
        <div className={entry}>
          <dt className={term}>Autoria</dt>
          <dd className={detail}>
            <Link
              href={`/autores/${trust.author.slug}`}
              className="text-azul underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:decoration-azul"
            >
              {trust.author.name}
            </Link>
            {' · '}
            {trust.author.role}
          </dd>
        </div>

        <div className={entry}>
          <dt className={term}>Revisão</dt>
          <dd className={detail}>
            {trust.reviewLabel}. Última revisão em {reviewDate}.
          </dd>
        </div>

        <div className={entry}>
          <dt className={term}>Metodologia</dt>
          <dd className={detail}>
            Curadoria de fontes públicas, atualização periódica e linguagem voltada a
            famílias.
          </dd>
        </div>

        <div className={entry}>
          <dt className={term}>Aviso</dt>
          <dd className={detail}>{trust.disclaimer}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col items-start gap-2">
        <Link href={`/autores/${trust.author.slug}`} className="link-rule">
          Ver perfil editorial
        </Link>
        <Link href="/metodologia-editorial" className="link-rule">
          Como este conteúdo é produzido
        </Link>
      </div>
    </aside>
  )
}
