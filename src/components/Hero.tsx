import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Hero() {
  const allPosts = getAllPosts()
  const postsCount = allPosts.length

  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.24em] text-blue-100/90 mb-5">
              Vivências Azuis
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight max-w-5xl mx-auto">
              Autismo na prática para famílias: direitos, terapias e planos de saúde
            </h1>
            <p className="text-lg md:text-2xl text-blue-200 font-medium max-w-4xl mx-auto">
              Conteúdo direto para decidir o próximo passo sem se perder em burocracia.
            </p>
            <div className="w-24 h-1 bg-blue-200 mx-auto rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Guias práticos para famílias no TEA tomarem decisões com mais segurança sobre{' '}
            <span className="text-blue-200 font-medium">direitos</span>,{' '}
            <span className="text-brand-soft font-medium">terapias</span> e{' '}
            <span className="text-blue-200 font-medium">planos de saúde</span>.
          </p>
          <p className="text-base md:text-lg text-blue-100/90 mb-10 max-w-3xl mx-auto">
            Sem promessas mágicas: conteúdo direto, atualizado para 2026 e aplicável na rotina.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <Link 
              href="#plano-semanal"
              data-cta="hero_cta_plano_semanal"
              className="group bg-surface text-link font-bold px-10 py-4 rounded-card hover:bg-brand-soft transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-lg"
            >
              <span className="flex items-center gap-2">
                Quero o plano semanal gratuito
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
          <p className="text-sm text-blue-100/85 mb-16">
            Em menos de 5 minutos você recebe o primeiro roteiro de ação por e-mail.
            {' '}
            <Link
              href="/blog/melhores-planos-de-saude-para-criancas-com-autismo"
              data-cta="hero_textlink_planos"
              className="underline underline-offset-4 hover:text-white"
            >
              Prefere começar pelo comparativo de planos?
            </Link>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">{postsCount}</div>
              <div className="text-blue-200 text-sm md:text-base">Guias publicados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-soft mb-2">2026</div>
              <div className="text-blue-200 text-sm md:text-base">Atualização editorial</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">3</div>
              <div className="text-blue-200 text-sm md:text-base">Temas-chave: direitos, terapias, planos</div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}
