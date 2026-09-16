'use client'

import { PrivacyIcon } from './privacy-layout'
import { PrivacyCommitmentSection } from './privacy-commitment'
import { PrivacyHero } from './privacy-hero'
import { PrivacyTableOfContents } from './privacy-table-of-contents'
import {
  AlteracoesSection,
  ContatoSection,
  LinksExternosSection,
  MenoresSection,
  RetencaoSection,
} from './sections/closing-sections'
import {
  ColetaSection,
  IntroducaoSection,
  UtilizacaoSection,
} from './sections/data-collection-sections'
import {
  CompartilhamentoSection,
  DireitosSection,
  SegurancaSection,
} from './sections/rights-sections'
import { useActiveSection } from './use-active-section'

const ICON_CLOCK = 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'

export default function PoliticaDePrivacidadePage() {
  const activeSection = useActiveSection()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-brand-soft/10">
      <PrivacyHero />
      <PrivacyTableOfContents
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated Info */}
          <div className="card-modern p-6 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand/10 to-brand-soft/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-brand to-blue-900 rounded-xl flex items-center justify-center mr-4">
                <PrivacyIcon path={ICON_CLOCK} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-sand-900 mb-1">
                  Última Atualização
                </h3>
                <p className="text-sand-700">
                  <strong>{new Date().toLocaleDateString('pt-BR')}</strong> - Esta
                  política é revisada regularmente para garantir transparência e
                  conformidade.
                </p>
              </div>
            </div>
          </div>

          <IntroducaoSection />
          <ColetaSection />
          <UtilizacaoSection />
          <CompartilhamentoSection />
          <SegurancaSection />
          <DireitosSection />
          <RetencaoSection />
          <MenoresSection />
          <LinksExternosSection />
          <AlteracoesSection />
          <ContatoSection />

          <PrivacyCommitmentSection />
        </div>
      </section>
    </div>
  )
}
