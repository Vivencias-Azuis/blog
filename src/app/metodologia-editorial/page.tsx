import { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Metodologia editorial',
  description: 'Veja como o Vivências Azuis pauta, apura, revisa e atualiza conteúdos sobre autismo, direitos, terapias e planos de saúde.',
  path: '/metodologia-editorial',
  keywords: ['metodologia editorial', 'transparência', 'fontes', 'revisão de conteúdo', 'autismo'],
})

const principles = [
  {
    title: 'Fontes públicas e verificáveis',
    description: 'Priorizamos leis, sites oficiais, publicações institucionais, pesquisas e materiais de referência acessíveis ao público.',
  },
  {
    title: 'Linguagem clara para famílias',
    description: 'Traduzimos temas técnicos para uma linguagem prática, sem perder precisão e sem inflar promessas.',
  },
  {
    title: 'Revisão editorial antes da publicação',
    description: 'Todo conteúdo passa por checagem de estrutura, consistência interna, links, datas e aderência à proposta do portal.',
  },
  {
    title: 'Atualização quando o contexto muda',
    description: 'Guias de direitos, preços, cobertura e políticas são revisitados para evitar informação desatualizada.',
  },
]

export default function MetodologiaEditorialPage() {
  return (
    <div className="min-h-screen bg-page">
      <section className="bg-gradient-to-br from-blue-900 via-brand to-blue-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-100 mb-4">Transparência</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Metodologia editorial</h1>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Esta página explica como o Vivências Azuis produz, revisa e atualiza conteúdo para reduzir ruído, deixar limites claros e aumentar confiança.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((item) => (
              <div key={item.title} className="rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
                <h2 className="text-2xl font-bold text-sand-900 mb-3">{item.title}</h2>
                <p className="text-sand-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
            <h2 className="text-2xl font-bold text-sand-900 mb-4">O que este conteúdo não faz</h2>
            <p className="text-sand-700 leading-relaxed mb-4">
              O portal não substitui consulta médica, terapêutica ou jurídica individual. Quando um tema exige decisão clínica, documental ou contratual, o conteúdo deve ser usado como ponto de partida, não como parecer final.
            </p>
            <p className="text-sand-700 leading-relaxed">
              Se você identificar informação desatualizada, pode nos avisar pela página de <Link href="/contato" className="text-link hover:text-link-hover underline">contato</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
