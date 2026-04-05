import type { Metadata } from 'next'
import AccountOverviewCards from '@/components/account/AccountOverviewCards'
import AccountShell from '@/components/account/AccountShell'
import AccountStatusBadge from '@/components/account/AccountStatusBadge'
import { generatePageMetadata } from '@/lib/metadata'
import { getCurrentMemberAccess } from '@/lib/account/member-access'

export const metadata: Metadata = generatePageMetadata({
  title: 'Minha area',
  description: 'Painel autenticado do Vivencias Azuis.',
  path: '/minha-area',
  keywords: ['minha area', 'conta', 'painel', 'acesso'],
})

export default async function MinhaAreaPage() {
  const { isMember } = await getCurrentMemberAccess()

  return (
    <AccountShell
      title="Minha area"
      description="Um espaco unico para conferir o estado do acesso, revisar seu perfil e seguir para a pagina de assinatura."
    >
      <div className="space-y-6">
        <AccountStatusBadge isMember={isMember} />
        <AccountOverviewCards />
      </div>
    </AccountShell>
  )
}
