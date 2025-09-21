import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Termos de Uso - Vivências Azuis',
  description: 'Conheça nossos termos de uso e condições para utilização do site Vivências Azuis. Diretrizes claras para uma experiência segura e respeitosa.',
  path: '/termos-de-uso',
  keywords: ['termos de uso', 'condições de uso', 'diretrizes', 'regras', 'responsabilidades', 'uso do site'],
})

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero */}
      <section className="relative bg-gradient-to-br from-primary via-azul-profundo to-primary-dark text-white py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amarelo-quente/20 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-verde-menta/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-amarelo-quente/30 rounded-full animate-float"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in-up">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="text-5xl">📋</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Termos de <span className="text-amarelo-quente animate-pulse">Uso</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
              Condições e diretrizes para utilização do nosso espaço digital
            </p>
            <div className="flex justify-center items-center gap-4 text-blue-200">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-amarelo-quente rounded-full"></div>
              <span className="text-sm font-medium">Transparência e confiança</span>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-amarelo-quente rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-verde-menta/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amarelo-quente/5 to-primary/5 rounded-full translate-y-40 -translate-x-40"></div>
        
        <div className="container-custom relative">
          {/* Last Updated Info */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-primary to-verde-menta rounded-full mb-6">
              <span className="text-4xl">📅</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/20 max-w-2xl mx-auto">
              <p className="text-gray-700 text-lg font-medium">
                <span className="text-primary font-bold">Última atualização:</span> {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-16 animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/20 max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-azul-profundo rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">📑</span>
                </div>
                <h3 className="text-2xl font-bold gradient-text">Índice</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a href="#aceitacao" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">1. Aceitação dos Termos</span>
                  </a>
                  <a href="#sobre-site" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">2. Sobre o Site</span>
                  </a>
                  <a href="#uso-conteudo" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">3. Uso do Conteúdo</span>
                  </a>
                  <a href="#comentarios" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">4. Comentários e Interações</span>
                  </a>
                  <a href="#privacidade" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">5. Privacidade e Dados</span>
                  </a>
                </div>
                <div className="space-y-2">
                  <a href="#limitacoes" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">6. Limitações de Responsabilidade</span>
                  </a>
                  <a href="#propriedade" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">7. Propriedade Intelectual</span>
                  </a>
                  <a href="#modificacoes" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">8. Modificações dos Termos</span>
                  </a>
                  <a href="#contato" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">9. Contato</span>
                  </a>
                  <a href="#lei-aplicavel" className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                    <span className="text-primary-dark group-hover:text-primary font-medium">10. Lei Aplicável</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="aceitacao" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-azul-profundo/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-azul-profundo rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">1. Aceitação dos Termos</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Ao acessar e utilizar o site Vivências Azuis, você concorda em cumprir e estar vinculado 
                    aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes 
                    termos, não deve utilizar nosso site.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="sobre-site" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-verde-menta/10 to-primary/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-verde-menta to-primary rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">2. Sobre o Site</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    O Vivências Azuis é um espaço digital dedicado a compartilhar informações, experiências 
                    e recursos relacionados ao autismo. Nosso objetivo é promover inclusão, respeito e 
                    empatia, oferecendo conteúdo educativo e de apoio para pessoas autistas, familiares, 
                    educadores e profissionais.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div id="uso-conteudo" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amarelo-quente/10 to-verde-menta/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-amarelo-quente to-verde-menta rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">3. Uso do Conteúdo</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-primary/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        3.1 Conteúdo Educativo
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Todo o conteúdo disponibilizado em nosso site tem caráter educativo e informativo. 
                        As informações compartilhadas não substituem orientações médicas, psicológicas ou 
                        terapêuticas profissionais.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-verde-menta/5 to-primary/5 p-6 rounded-2xl border border-verde-menta/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-verde-menta rounded-full mr-3"></span>
                        3.2 Uso Responsável
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Você concorda em utilizar o conteúdo de forma responsável, respeitando os direitos 
                        autorais e não reproduzindo materiais sem autorização expressa.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-amarelo-quente/5 to-verde-menta/5 p-6 rounded-2xl border border-amarelo-quente/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-amarelo-quente rounded-full mr-3"></span>
                        3.3 Compartilhamento
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Você pode compartilhar nossos conteúdos, desde que mantenha os créditos e links 
                        originais, e não altere o contexto ou significado das informações.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="comentarios" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-dark/10 to-primary/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-dark to-primary rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">💬</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">4. Comentários e Interações</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/5 to-azul-profundo/5 p-6 rounded-2xl border border-primary/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        4.1 Respeito e Inclusão
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Esperamos que todos os usuários mantenham um ambiente respeitoso e inclusivo. 
                        Comentários discriminatórios, ofensivos ou que promovam preconceito não serão tolerados.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-azul-profundo/5 to-primary/5 p-6 rounded-2xl border border-azul-profundo/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-azul-profundo rounded-full mr-3"></span>
                        4.2 Moderação
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Reservamo-nos o direito de moderar, editar ou remover comentários que violem 
                        nossas diretrizes de comunidade.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary-dark/5 to-azul-profundo/5 p-6 rounded-2xl border border-primary-dark/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-primary-dark rounded-full mr-3"></span>
                        4.3 Responsabilidade
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Você é responsável pelo conteúdo que compartilha em nossos canais de comunicação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div id="privacidade" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/10 to-verde-menta/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-verde-menta rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">5. Privacidade e Dados</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Respeitamos sua privacidade e nos comprometemos a proteger seus dados pessoais. 
                    Para informações detalhadas sobre como coletamos, utilizamos e protegemos suas 
                    informações, consulte nossa Política de Privacidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div id="limitacoes" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amarelo-quente/10 to-primary/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-amarelo-quente to-orange-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">6. Limitações de Responsabilidade</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-amarelo-quente/5 to-orange-400/5 p-6 rounded-2xl border border-amarelo-quente/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-amarelo-quente rounded-full mr-3"></span>
                        6.1 Informações Gerais
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        As informações disponibilizadas em nosso site são de caráter geral e educativo. 
                        Não nos responsabilizamos por decisões tomadas com base exclusivamente em nosso conteúdo.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-400/5 to-amarelo-quente/5 p-6 rounded-2xl border border-orange-400/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                        6.2 Links Externos
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Nosso site pode conter links para sites externos. Não nos responsabilizamos pelo 
                        conteúdo ou práticas desses sites terceiros.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-amarelo-quente/5 to-verde-menta/5 p-6 rounded-2xl border border-amarelo-quente/10">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                        <span className="w-2 h-2 bg-verde-menta rounded-full mr-3"></span>
                        6.3 Disponibilidade
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Embora nos esforcemos para manter o site sempre disponível, não garantimos 
                        funcionamento ininterrupto e não nos responsabilizamos por interrupções temporárias.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div id="propriedade" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-azul-profundo/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-azul-profundo rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">©️</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">7. Propriedade Intelectual</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Todo o conteúdo original do site, incluindo textos, imagens, logos e design, 
                    é propriedade do Vivências Azuis e está protegido por leis de direitos autorais. 
                    O uso não autorizado é expressamente proibido.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div id="modificacoes" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-verde-menta/10 to-secondary/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-verde-menta to-secondary rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">8. Modificações dos Termos</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                    As alterações entrarão em vigor imediatamente após sua publicação no site. 
                    É sua responsabilidade verificar periodicamente as atualizações.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div id="contato" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/10 to-verde-menta/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-verde-menta rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">📞</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">9. Contato</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco através 
                    da nossa página de contato ou envie um e-mail para nossa equipe.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 10 */}
            <div id="lei-aplicavel" className="group mb-12 animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
              <div className="card-modern p-8 md:p-10 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-dark/10 to-azul-profundo/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-dark to-azul-profundo rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">⚖️</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text group-hover:text-primary transition-colors duration-300">10. Lei Aplicável</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida 
                    nos tribunais competentes do Brasil.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Commitment Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-secondary via-verde-menta to-secondary/80 rounded-3xl p-8 md:p-12 text-primary-dark relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                        <span className="text-4xl">💙</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">Nosso Compromisso</h3>
                    </div>
                    
                    <p className="leading-relaxed text-white/90 text-lg md:text-xl mb-8">
                      Estes termos refletem nosso compromisso em manter um espaço seguro, respeitoso e 
                      inclusivo para toda a comunidade do autismo. Trabalhamos continuamente para 
                      melhorar nossa plataforma e garantir que ela sirva como um ambiente acolhedor 
                      para compartilhamento de experiências e conhecimento.
                    </p>
                    
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-semibold text-white text-lg">
                        Juntos construímos um mundo mais inclusivo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
