import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Política de Privacidade - Vivências Azuis',
  description: 'Conheça nossa política de privacidade e como protegemos suas informações pessoais. Transparência e segurança são nossos compromissos fundamentais.',
  path: '/politica-de-privacidade',
  keywords: ['política de privacidade', 'proteção de dados', 'LGPD', 'segurança', 'privacidade', 'transparência', 'dados pessoais'],
})
