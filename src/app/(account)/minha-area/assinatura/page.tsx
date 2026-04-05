import type { Metadata } from 'next'
import Link from 'next/link'
import AccountShell from '@/components/account/AccountShell'
import AccountStatusBadge from '@/components/account/AccountStatusBadge'
import { generatePageMetadata } from '@/lib/metadata'
import { getCurrentMemberAccess } from '@/lib/account/member-access'

export const metadata: Metadata = generatePageMetadata({
  title: 'Assinatura',
  description: 'Entenda o acesso atual e o caminho para apoiar o projeto.',
  path: '/minha-area/assinatura',
  keywords: ['assinatura', 'apoio', 'acesso'],
})

export default async function AssinaturaPage() {
  const { isMember } = await getCurrentMemberAccess()

  return (
    <AccountShell
      title="Assinatura"
      description="A primeira versao usa acesso manual. Esta pagina resume o estado atual e direciona para o apoio ao projeto."
    >
      <div className="space-y-6 rounded-block border border-sand-200 bg-surface p-6 shadow-card md:p-8">
        <AccountStatusBadge isMember={isMember} />
        <div className="space-y-4">
          <p className="max-w-3xl text-base leading-relaxed text-sand-700">
            {isMember
              ? 'Seu acesso de membro esta liberado e voce pode seguir navegando pela area autenticada.'
              : 'Sua conta segue gratuita. Para apoiar o projeto e solicitar acesso exclusivo, siga para a pagina de apoio.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apoie"
              className="rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Ir para Apoie
            </Link>
            <Link
              href="/contato"
              className="rounded-pill border border-sand-300 px-5 py-3 text-sm font-semibold text-sand-700 transition-colors hover:bg-brand-soft hover:text-link"
            >
              Preciso de ajuda
            </Link>
          </div>
        </div>
      </div>
    </AccountShell>
  )
}
