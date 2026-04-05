import { supportTiers } from '@/lib/support/config'

const subscriptionStatusLabels: Record<string, string> = {
  active: 'Ativo',
  trialing: 'Em teste',
  past_due: 'Pagamento pendente',
  canceled: 'Cancelado',
  incomplete: 'Incompleto',
  unpaid: 'Em aberto',
  paused: 'Pausado',
}

export function formatSubscriptionStatus(
  status: string | null,
  isMember: boolean,
) {
  if (status) {
    return subscriptionStatusLabels[status] ?? status
  }

  return isMember ? 'Acesso liberado' : 'Sem assinatura ativa'
}

export function formatSupportTier(slug: string | null, isMember: boolean) {
  const label = supportTiers.find((tier) => tier.slug === slug)?.label

  if (label) {
    return label
  }

  return isMember ? 'Acesso de membro' : 'Sem plano'
}
