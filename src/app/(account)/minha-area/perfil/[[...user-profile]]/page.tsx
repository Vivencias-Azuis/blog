import { UserProfile } from '@clerk/nextjs'
import type { Metadata } from 'next'

import AccountShell from '@/components/account/AccountShell'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Perfil',
  description: 'Gerencie sua conta e seus dados de acesso.',
  path: '/minha-area/perfil',
  keywords: ['perfil', 'conta', 'acesso'],
})

export default function PerfilPage() {
  return (
    <AccountShell
      title="Perfil"
      description="Aqui voce revisa os dados da conta e usa a interface oficial do Clerk para atualizar informacoes pessoais."
    >
      <div className="rounded-block border border-sand-200 bg-surface p-4 shadow-card md:p-6">
        <UserProfile path="/minha-area/perfil" routing="path" />
      </div>
    </AccountShell>
  )
}
