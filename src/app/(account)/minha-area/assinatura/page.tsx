import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import AccountShell from '@/components/account/AccountShell'
import AccountStatusBadge from '@/components/account/AccountStatusBadge'
import { readSubscriptionMetadata } from '@/lib/account/subscription-status'
import { generatePageMetadata } from '@/lib/metadata'
import {
  formatSubscriptionStatus,
  formatSupportTier,
} from '@/app/(account)/minha-area/assinatura/view-model'

export const metadata: Metadata = generatePageMetadata({
  title: 'Assinatura',
  description: 'Entenda o acesso atual e o caminho para apoiar o projeto.',
  path: '/minha-area/assinatura',
  keywords: ['assinatura', 'apoio', 'acesso'],
})

type ClerkUserWithMetadata = {
  publicMetadata?: Record<string, unknown>
  privateMetadata?: Record<string, unknown>
}

export default async function AssinaturaPage() {
  const user = await currentUser()
  const metadataSource = user as ClerkUserWithMetadata | null
  const subscription = readSubscriptionMetadata({
    publicMetadata: metadataSource?.publicMetadata,
    privateMetadata: metadataSource?.privateMetadata,
  })
  const statusLabel = formatSubscriptionStatus(
    subscription.subscriptionStatus,
    subscription.isMember,
  )
  const tierLabel = formatSupportTier(
    subscription.supportTier,
    subscription.isMember,
  )

  return (
    <AccountShell
      title="Assinatura"
      description="Veja o estado sincronizado com Stripe e o caminho atual de acesso ao projeto."
    >
      <div className="space-y-6 rounded-block border border-sand-200 bg-surface p-6 shadow-card md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <AccountStatusBadge isMember={subscription.isMember} />
            <p className="max-w-3xl text-base leading-relaxed text-sand-700">
              {subscription.isMember
                ? 'Seu acesso esta liberado e segue a ultima sincronizacao com o Stripe.'
                : 'Sua conta ainda nao esta como membro. Quando a ativacao pelo Stripe for concluida, o acesso e liberado automaticamente.'}
            </p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-block border border-sand-200 bg-brand-soft/40 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
              Status
            </dt>
            <dd className="mt-2 text-lg font-semibold text-sand-900">
              {statusLabel}
            </dd>
          </div>
          <div className="rounded-block border border-sand-200 bg-brand-soft/40 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
              Plano
            </dt>
            <dd className="mt-2 text-lg font-semibold text-sand-900">
              {tierLabel}
            </dd>
          </div>
        </dl>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {subscription.isMember ? (
              <Link
                href="/minha-area/materiais"
                className="rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Ver materiais
              </Link>
            ) : (
              <Link
                href="/apoie"
                className="rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Ativar pela Stripe
              </Link>
            )}
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
