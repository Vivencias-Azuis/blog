import type { Metadata } from 'next'
import SupportPageClient from '@/components/support/SupportPageClient'
import { donationSuggestions, supportTiers } from '@/lib/support/config'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Apoie o projeto',
  description:
    'Apoie a continuidade do Vivências Azuis com assinatura mensal no cartão ou doação avulsa por Pix e cartão.',
  path: '/apoie',
  keywords: ['apoie', 'doação', 'assinatura', 'pix', 'cartão'],
})

export default function ApoiePage() {
  return (
    <section className="bg-page">
      <SupportPageClient
        tiers={supportTiers}
        donationSuggestions={donationSuggestions}
      />
    </section>
  )
}
