import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AccountShell from '@/components/account/AccountShell'
import MemberUpsellCard from '@/components/account/MemberUpsellCard'
import { getCurrentMemberAccess } from '@/lib/account/member-access'
import { accountMaterials } from '@/lib/account/materials-catalog'
import { generatePageMetadata } from '@/lib/metadata'

interface MaterialPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: MaterialPageProps): Promise<Metadata> {
  const { slug } = await params
  const material = accountMaterials.find((item) => item.id === slug)

  if (!material) {
    return generatePageMetadata({
      title: 'Material',
      description: 'Material nao encontrado.',
      path: `/minha-area/materiais/${slug}`,
    })
  }

  return generatePageMetadata({
    title: material.title,
    description: material.description,
    path: `/minha-area/materiais/${material.id}`,
    keywords: [material.title, 'materiais', 'area autenticada'],
  })
}

export default async function MaterialPage({ params }: MaterialPageProps) {
  const { slug } = await params
  const material = accountMaterials.find((item) => item.id === slug)

  if (!material) {
    notFound()
  }

  const { isMember } = await getCurrentMemberAccess()
  const locked = material.membersOnly && !isMember

  return (
    <AccountShell
      title={material.title}
      description={material.description}
    >
      <div className="space-y-6 rounded-block border border-sand-200 bg-surface p-6 shadow-card md:p-8">
        <div className="flex flex-wrap gap-2">
          {material.category ? (
            <span className="inline-flex rounded-pill bg-brand-soft px-3 py-1 text-xs font-semibold text-sand-900">
              {material.category}
            </span>
          ) : null}
          <span
            className={`inline-flex rounded-pill px-3 py-1 text-xs font-semibold ${
              locked ? 'bg-sand-200 text-sand-700' : 'bg-brand text-white'
            }`}
          >
            {locked ? 'Exclusivo para membros' : 'Disponivel para sua conta'}
          </span>
        </div>

        {locked ? (
          <div className="space-y-4">
            <p className="max-w-2xl text-base leading-relaxed text-sand-700">
              Este material esta protegido. O acesso completo e liberado apenas
              para membros com validacao manual.
            </p>
            <MemberUpsellCard />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="max-w-3xl text-base leading-relaxed text-sand-700">
              Este material fica em uma pagina autenticada da area do usuario.
              Use este espaco como ponto de entrada para a versao detalhada.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/minha-area/materiais"
                className="inline-flex rounded-pill border border-sand-300 px-4 py-3 text-sm font-semibold text-sand-700 transition-colors hover:bg-brand-soft hover:text-link"
              >
                Voltar ao catalogo
              </Link>
              <Link
                href="/minha-area/assinatura"
                className="inline-flex rounded-pill bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Ver assinatura
              </Link>
            </div>
          </div>
        )}
      </div>
    </AccountShell>
  )
}
