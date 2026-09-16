import { DotPatternOverlay } from './privacy-layout'

export function PrivacyCommitmentSection() {
  return (
    <section className="mb-16">
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-brand via-brand to-brand-dark rounded-3xl p-8 md:p-12 text-white relative">
          <DotPatternOverlay />

          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-sand-300/20 rounded-full animate-float"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-brand-soft/20 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-surface/10 rounded-full animate-float-slow"></div>

          <div className="relative text-center">
            <div className="inline-block p-6 bg-surface/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="text-6xl">💙</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Nosso Compromisso com sua Privacidade
            </h3>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
              A privacidade e segurança de suas informações são fundamentais para nós.
              Trabalhamos continuamente para garantir que seus dados sejam tratados com o
              máximo cuidado e respeito, sempre em conformidade com as melhores práticas de
              proteção de dados e a legislação brasileira.
            </p>
            <div className="bg-surface/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
              <p className="text-xl font-semibold text-white">
                Sua confiança é essencial para construirmos juntos um espaço seguro e
                acolhedor.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contato"
                className="btn-primary bg-surface text-sand-900 hover:bg-brand-soft transition-all duration-300"
              >
                Entre em Contato
              </a>
              <a
                href="/sobre"
                className="btn-brand-soft bg-surface/10 text-white border border-white/20 hover:bg-surface/20 transition-all duration-300"
              >
                Conheça Nossa Missão
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
