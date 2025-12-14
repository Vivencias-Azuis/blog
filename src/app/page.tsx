import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'
import EbookLeadPopup from '@/components/EbookLeadPopup'

export const metadata: Metadata = generatePageMetadata({
  title: 'Vivências Azuis - Blog sobre Autismo e Inclusão',
  description: 'Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo. Artigos, dicas e experiências sobre TEA, inclusão e desenvolvimento.',
  path: '/',
  keywords: ['autismo', 'TEA', 'inclusão', 'blog', 'experiências', 'apoio', 'família', 'desenvolvimento', 'síndrome de asperger', 'transtorno do espectro autista', 'educação', 'direitos'],
})

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedPosts />
      <AboutSection />
      <EbookLeadPopup />
    </div>
  )
}
