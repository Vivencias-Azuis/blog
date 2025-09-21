import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Entre em Contato - Vivências Azuis',
  description: 'Entre em contato conosco! Estamos aqui para ouvir, apoiar e construir juntos uma comunidade mais inclusiva. Dúvidas, sugestões, colaborações e relatos são sempre bem-vindos.',
  path: '/contato',
  keywords: ['contato', 'fale conosco', 'dúvidas', 'sugestões', 'colaboração', 'relatos', 'comunidade', 'apoio'],
})
