import { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sobre o Vivências Azuis',
  description: 'Conheça a missão e valores do Vivências Azuis, um espaço digital dedicado ao universo do autismo. Nossa história, valores e compromisso com a inclusão.',
  path: '/sobre',
  keywords: ['sobre', 'missão', 'valores', 'história', 'inclusão', 'comunidade', 'autismo'],
})

export default function SobrePage() {
  const valores = [
    {
      titulo: 'Inclusão',
      descricao: 'Promovemos um ambiente acolhedor para todas as pessoas do espectro autista',
      icone: '🤝',
      cor: 'from-brand to-blue-800'
    },
    {
      titulo: 'Respeito',
      descricao: 'Valorizamos cada trajetória individual e respeitamos as diferenças',
      icone: '💙',
      cor: 'from-brand-soft to-brand'
    },
    {
      titulo: 'Empatia',
      descricao: 'Construímos pontes de compreensão e apoio mútuo',
      icone: '❤️',
      cor: 'from-sand-300 to-blue-300'
    },
    {
      titulo: 'Conhecimento',
      descricao: 'Compartilhamos informações baseadas em evidências e experiências reais',
      icone: '📚',
      cor: 'from-blue-900 to-brand'
    }
  ]

  return (
    <div className="min-h-screen bg-page">
      {/* Enhanced Hero */}
      <section className="relative bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-brand-soft/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float-slow"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in-up">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="text-5xl">🌟</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Sobre o <span className="text-blue-200 animate-pulse">Vivências Azuis</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
              Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte 
              do universo do autismo
            </p>
            <div className="flex justify-center items-center gap-4 text-blue-200">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-blue-200 rounded-full"></div>
              <span className="text-sm font-medium">Celebrando a diversidade</span>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-blue-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Nossa História */}
      <section className="section-padding bg-gradient-to-b from-surface to-page relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand/10 to-blue-300/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sand-300/10 to-brand/10 rounded-full translate-y-40 -translate-x-40"></div>
        
        <div className="container-custom relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-brand to-blue-300 rounded-full mb-6">
              <span className="text-4xl">📖</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Nossa História
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand to-blue-300 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="bg-surface rounded-block shadow-overlay p-8 md:p-12 border border-sand-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/10 to-blue-300/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-sand-900 mb-6">
                    Nossa Origem
                  </h3>
                  <p className="text-sand-700 leading-relaxed mb-6">
                    O <strong className="text-link">Vivências Azuis</strong> nasceu da necessidade de criar um espaço digital verdadeiramente 
                    inclusivo e acolhedor para toda a comunidade do autismo. Reconhecemos que cada pessoa 
                    no espectro tem uma trajetória única, repleta de desafios, conquistas e experiências 
                    valiosas que merecem ser compartilhadas e celebradas.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="tag bg-gradient-to-r from-brand to-blue-800 text-white">Inclusão</span>
                    <span className="tag bg-gradient-to-r from-brand-soft to-brand text-white">Acolhimento</span>
                    <span className="tag bg-gradient-to-r from-sand-300 to-blue-300 text-sand-900">Comunidade</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="bg-surface rounded-block shadow-overlay p-8 md:p-12 border border-sand-200 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sand-300/10 to-brand/10 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-sand-900 mb-6">
                    Nossa Proposta
                  </h3>
                  <p className="text-sand-700 leading-relaxed mb-6">
                    Aqui, histórias reais, dicas práticas e conhecimento especializado se unem para promover 
                    mais inclusão, respeito e empatia no dia a dia. Nosso conteúdo é organizado e acessível, 
                    abordando desde desafios cotidianos até conquistas, oferecendo apoio tanto para pessoas 
                    autistas quanto para familiares, educadores e profissionais.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="tag bg-gradient-to-r from-blue-900 to-brand text-white">Conhecimento</span>
                    <span className="tag bg-gradient-to-r from-blue-300 to-sand-300 text-sand-900">Prático</span>
                    <span className="tag bg-gradient-to-r from-brand to-blue-300 text-white">Acessível</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Nossos Valores */}
      <section className="section-padding bg-gradient-to-b from-page to-surface relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23123A66' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container-custom relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-brand to-blue-300 rounded-full mb-6">
              <span className="text-4xl">💎</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Nossos Valores
            </h2>
            <p className="text-xl text-sand-700 max-w-3xl mx-auto leading-relaxed">
              Os princípios que guiam nossa missão e moldam nossa comunidade
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand to-blue-300 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div 
                key={index} 
                className="group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className={`inline-block p-6 bg-gradient-to-br ${valor.cor} rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl`}>
                    <span className="text-4xl block">{valor.icone}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-sand-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-sand-900 mb-4 group-hover:text-link transition-colors">
                  {valor.titulo}
                </h3>
                <p className="text-sand-700 leading-relaxed">
                  {valor.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced O que oferecemos */}
      <section className="section-padding bg-gradient-to-b from-surface to-page relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-soft/10 to-brand/10 rounded-full -translate-y-48 -translate-x-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-sand-300/10 to-blue-300/10 rounded-full translate-y-40 translate-x-40"></div>
        
        <div className="container-custom relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-brand to-blue-300 rounded-full mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              O que oferecemos
            </h2>
            <p className="text-xl text-sand-700 max-w-3xl mx-auto leading-relaxed">
              Recursos e ferramentas desenvolvidos especialmente para nossa comunidade
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand to-blue-300 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="card-modern p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand/10 to-blue-900/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative">
                  <div className="inline-block p-4 bg-gradient-to-br from-brand to-blue-900 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-sand-900 mb-4 group-hover:text-link transition-colors">
                    Relatos e Experiências Autênticas
                  </h3>
                  <p className="text-sand-700 leading-relaxed">
                    Histórias reais que ajudam a construir uma comunidade de apoio mútuo, 
                    onde cada vivência contribui para o crescimento coletivo.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="card-modern p-8 h-full relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-soft/10 to-brand/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative">
                  <div className="inline-block p-4 bg-gradient-to-br from-brand-soft to-brand rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🛠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-sand-900 mb-4 group-hover:text-link transition-colors">
                    Ferramentas e Recursos Práticos
                  </h3>
                  <p className="text-sand-700 leading-relaxed">
                    Dicas e estratégias para tornar rotinas mais leves e previsíveis, 
                    facilitando o dia a dia de pessoas autistas e suas famílias.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="card-modern p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sand-300/10 to-blue-300/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative">
                  <div className="inline-block p-4 bg-gradient-to-br from-sand-300 to-blue-300 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-sand-900 mb-4 group-hover:text-link transition-colors">
                    Informações Atualizadas
                  </h3>
                  <p className="text-sand-700 leading-relaxed">
                    Conteúdo sobre direitos, saúde e educação no contexto do autismo, 
                    baseado em evidências científicas e melhores práticas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="card-modern p-8 h-full relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-900/10 to-brand/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative">
                  <div className="inline-block p-4 bg-gradient-to-br from-blue-900 to-brand rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-sand-900 mb-4 group-hover:text-link transition-colors">
                    Espaço Interativo
                  </h3>
                  <p className="text-sand-700 leading-relaxed">
                    Local para tirar dúvidas, sugerir temas e compartilhar suas próprias 
                    vivências com nossa comunidade acolhedora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-page to-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Como construímos confiança
              </h2>
              <p className="text-xl text-sand-700 leading-relaxed">
                Informação sensível exige mais do que volume. Exige clareza sobre autoria, revisão e limites do conteúdo.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
                <h3 className="text-xl font-bold text-sand-900 mb-3">Autoria identificável</h3>
                <p className="text-sand-700 leading-relaxed">
                  Cada artigo passa a exibir quem assina e qual é o papel editorial desse autor dentro do portal.
                </p>
              </div>
              <div className="rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
                <h3 className="text-xl font-bold text-sand-900 mb-3">Revisão editorial</h3>
                <p className="text-sand-700 leading-relaxed">
                  Temas sobre direitos, saúde, terapias e cobertura recebem sinalização explícita de revisão e data de atualização.
                </p>
              </div>
              <div className="rounded-3xl border border-sand-200 bg-surface p-8 shadow-card">
                <h3 className="text-xl font-bold text-sand-900 mb-3">Metodologia pública</h3>
                <p className="text-sand-700 leading-relaxed">
                  Nossa política editorial deixa claro como apuramos fontes e onde o conteúdo deve parar para dar lugar à orientação profissional.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/metodologia-editorial" className="btn-primary">
                Ver metodologia editorial
              </Link>
              <Link href="/autores/equipe-vivencias-azuis" className="btn-secondary">
                Ver equipe editorial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Nossa Missão */}
      <section className="section-padding bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-blue-200/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-20 h-20 bg-brand-soft/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-blue-200/30 rounded-full animate-float"></div>
        
        <div className="container-custom relative">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="text-6xl">🌟</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Nossa Missão
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-12">
              Dar voz, visibilidade e suporte a cada trajetória dentro do espectro, 
              celebrando a diversidade e promovendo um mundo mais azul, inclusivo e humano.
            </p>
            
            {/* Mission Statement */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 max-w-4xl mx-auto">
              <div className="text-8xl mb-6 animate-pulse">🌟</div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                Cada história importa. Cada vivência tem valor. Cada pessoa merece ser acolhida.
              </p>
              <div className="flex justify-center items-center gap-4 text-blue-200">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-blue-200 rounded-full"></div>
                <span className="text-lg font-medium">Juntos somos mais fortes</span>
                <div className="w-20 h-1 bg-gradient-to-l from-transparent to-blue-200 rounded-full"></div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/blog" className="btn-primary bg-white text-link hover:bg-brand-soft transition-all duration-300">
                Explore Nossos Conteúdos
              </Link>
              <Link href="/contato" className="btn-secondary bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
