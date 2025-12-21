import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'
import CTA from '@/components/design-system/CTA'
import FeaturedBlock from '@/components/design-system/FeaturedBlock'

const EbookLeadPopup = dynamic(() => import('@/components/EbookLeadPopup'), { ssr: false })

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
      <section className="bg-page">
        <div className="container-custom py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeaturedBlock
              label="Guia essencial"
              title="Conheca o Vivencias Azuis e nossa missao"
              description="Entenda por que criamos este espaco e como queremos apoiar familias e profissionais com informacao confiavel."
              href="/sobre"
            />
            <CTA
              title="Fale com a equipe"
              description="Tem uma duvida ou sugestao? Estamos prontos para ouvir voce."
              actionLabel="Entrar em contato"
              href="/contato"
            />
          </div>
        </div>
      </section>
      <AboutSection />
      <EbookLeadPopup />
    </div>
  )
}
