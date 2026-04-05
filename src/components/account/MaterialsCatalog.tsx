import Link from 'next/link'
import type { AccountMaterial } from '@/lib/account/materials-catalog'

interface MaterialsCatalogProps {
  items: AccountMaterial[]
  isMember: boolean
}

const typeLabelByMaterialType: Record<AccountMaterial['type'], string> = {
  'internal-page': 'Pagina interna',
  download: 'Download',
  'external-link': 'Link externo',
}

export default function MaterialsCatalog({
  items,
  isMember,
}: MaterialsCatalogProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => {
        const locked = item.membersOnly && !isMember

        return (
          <article
            key={item.id}
            className="rounded-block border border-sand-200 bg-surface p-5 shadow-card md:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {item.category ? (
                    <span className="inline-flex rounded-pill bg-brand-soft px-3 py-1 text-xs font-semibold text-sand-900">
                      {item.category}
                    </span>
                  ) : null}
                  <span className="inline-flex rounded-pill bg-sand-100 px-3 py-1 text-xs font-semibold text-sand-700">
                    {typeLabelByMaterialType[item.type]}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-sand-900">
                  {item.title}
                </h2>
              </div>

              <span
                className={`inline-flex rounded-pill px-3 py-1 text-xs font-semibold ${
                  locked
                    ? 'bg-sand-200 text-sand-700'
                    : 'bg-brand text-white'
                }`}
              >
                {locked ? 'Exclusivo' : 'Disponivel'}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-sand-700">
              {item.description}
            </p>

            {locked ? (
              <div className="mt-5 rounded-card border border-dashed border-brand/30 bg-brand-soft/40 p-4">
                <p className="text-sm font-semibold text-sand-900">
                  Disponivel para membros
                </p>
                <p className="mt-1 text-sm leading-relaxed text-sand-700">
                  Este material fica liberado apos a validacao manual do acesso.
                </p>
              </div>
            ) : (
              <Link
                href={item.url}
                className="mt-5 inline-flex rounded-pill bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Abrir material
              </Link>
            )}
          </article>
        )
      })}
    </div>
  )
}
