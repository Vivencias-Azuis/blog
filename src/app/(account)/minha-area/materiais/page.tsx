import type { Metadata } from 'next'
import AccountShell from '@/components/account/AccountShell'
import MaterialsCatalog from '@/components/account/MaterialsCatalog'
import MemberUpsellCard from '@/components/account/MemberUpsellCard'
import { generatePageMetadata } from '@/lib/metadata'
import { getCurrentMemberAccess } from '@/lib/account/member-access'
import { accountMaterials } from '@/lib/account/materials-catalog'

export const metadata: Metadata = generatePageMetadata({
  title: 'Materiais',
  description: 'Catalogo de conteudos abertos e exclusivos da area autenticada.',
  path: '/minha-area/materiais',
  keywords: ['materiais', 'catalogo', 'membros', 'area autenticada'],
})

export default async function MateriaisPage() {
  const { isMember } = await getCurrentMemberAccess()

  return (
    <AccountShell
      title="Materiais"
      description="Aqui ficam os materiais abertos para a conta e os itens exclusivos para membros com acesso liberado manualmente."
    >
      <div className="space-y-6">
        {!isMember ? <MemberUpsellCard /> : null}
        <MaterialsCatalog items={accountMaterials} isMember={isMember} />
      </div>
    </AccountShell>
  )
}
