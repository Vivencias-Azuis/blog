import { DotPatternOverlay } from './privacy-layout'

export function PrivacyHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-dark text-white py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sand-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-soft/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-surface/10 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-float"></div>
      </div>

      <DotPatternOverlay />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-block p-6 bg-surface/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
            <span className="text-6xl">🛡️</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            Política de <span className="text-sand-300 drop-shadow-lg">Privacidade</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4">
            Como protegemos e utilizamos suas informações pessoais com transparência e segurança
          </p>
          <div className="mt-6 md:mt-8 flex justify-center">
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-sand-300 to-brand-soft rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
