'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'

export default function PoliticaDePrivacidadePage() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement
        const sectionTop = htmlSection.offsetTop
        const sectionHeight = htmlSection.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections = [
    { id: 'introducao', title: 'Introdução', icon: '🔍' },
    { id: 'coletamos', title: 'Informações que Coletamos', icon: '📊' },
    { id: 'utilizamos', title: 'Como Utilizamos', icon: '⚙️' },
    { id: 'compartilhamos', title: 'Compartilhamento', icon: '🤝' },
    { id: 'seguranca', title: 'Segurança dos Dados', icon: '🔒' },
    { id: 'direitos', title: 'Seus Direitos', icon: '⚖️' },
    { id: 'retencao', title: 'Retenção de Dados', icon: '📅' },
    { id: 'menores', title: 'Menores de Idade', icon: '👶' },
    { id: 'links', title: 'Links Externos', icon: '🔗' },
    { id: 'alteracoes', title: 'Alterações', icon: '📝' },
    { id: 'contato', title: 'Contato', icon: '📞' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-secondary/10">
      {/* Enhanced Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-azul-profundo to-primary-dark text-white py-24 lg:py-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amarelo-quente/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-verde-menta/20 rounded-full blur-xl animate-float"></div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="text-6xl">🛡️</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              Política de <span className="text-amarelo-quente drop-shadow-lg">Privacidade</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4">
              Como protegemos e utilizamos suas informações pessoais com transparência e segurança
            </p>
            <div className="mt-6 md:mt-8 flex justify-center">
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-amarelo-quente to-secondary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-white/80 backdrop-blur-sm border-b border-neutral-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-4">Índice de Conteúdo</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`group p-4 rounded-2xl transition-all duration-300 text-left ${
                  activeSection === section.id
                    ? 'bg-gradient-to-br from-primary to-azul-profundo text-white shadow-lg scale-105'
                    : 'bg-white/60 hover:bg-white/80 hover:shadow-md border border-neutral-light'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-sm leading-tight">
                      {section.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated Info */}
          <div className="card-modern p-6 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-azul-profundo rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-dark mb-1">Última Atualização</h3>
                <p className="text-gray-600">
                  <strong>{new Date().toLocaleDateString('pt-BR')}</strong> - Esta política é revisada regularmente para garantir transparência e conformidade.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Introdução */}
          <section id="introducao" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-azul-profundo/10 rounded-full -translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-azul-profundo rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">1. Introdução</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  O <strong className="text-primary">Vivências Azuis</strong> está comprometido em proteger sua privacidade e dados pessoais. 
                  Esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e 
                  protegemos suas informações quando você visita nosso site ou interage conosco.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Informações que Coletamos */}
          <section id="coletamos" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-verde-menta/10 rounded-full translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-verde-menta rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">2. Informações que Coletamos</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 2.1 Informações Fornecidas Voluntariamente */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-primary/5 to-azul-profundo/5 p-6 rounded-2xl border border-primary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-azul-profundo rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-primary-dark">Informações Voluntárias</h3>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Nome e endereço de e-mail
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Mensagens e comunicações
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Formulários de contato
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Comentários e interações
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 2.2 Informações Coletadas Automaticamente */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-secondary/5 to-verde-menta/5 p-6 rounded-2xl border border-secondary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-verde-menta rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-primary-dark">Coleta Automática</h3>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Endereço IP e localização
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Navegador e sistema operacional
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Páginas visitadas e tempo
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Data e hora de acesso
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 2.3 Cookies */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-amarelo-quente/5 to-orange-400/5 p-6 rounded-2xl border border-amarelo-quente/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amarelo-quente to-orange-400 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-primary-dark">Cookies</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                        analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas 
                        preferências através das configurações do seu navegador.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Como Utilizamos suas Informações */}
          <section id="utilizamos" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amarelo-quente/10 to-orange-400/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-amarelo-quente to-orange-400 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">3. Como Utilizamos suas Informações</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 3.1 Finalidades Principais */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-primary/5 to-azul-profundo/5 p-6 rounded-2xl border border-primary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-azul-profundo rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-dark">Finalidades Principais</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Responder às suas mensagens e solicitações de contato</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Melhorar o conteúdo e funcionalidades do site</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Analisar o uso do site para otimizar a experiência</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Garantir a segurança e prevenir atividades fraudulentas</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Cumprir obrigações legais e regulamentares</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 3.2 Comunicações */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-secondary/5 to-verde-menta/5 p-6 rounded-2xl border border-secondary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-verde-menta rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-dark">Comunicações</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Utilizamos seu e-mail apenas para responder às suas mensagens e, se você 
                        optar por receber, para enviar atualizações sobre nosso conteúdo. Você 
                        pode cancelar essas comunicações a qualquer momento.
                      </p>
                      <div className="mt-4 p-4 bg-white/50 rounded-xl">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-primary-dark">
                            Você tem controle total sobre suas comunicações
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Compartilhamento de Informações */}
          <section id="compartilhamos" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">4. Compartilhamento de Informações</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 4.1 Não Vendemos Dados */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Não Vendemos Dados</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Não vendemos, alugamos ou comercializamos suas informações pessoais para 
                        terceiros. Seus dados são utilizados exclusivamente para os fins descritos 
                        nesta política.
                      </p>
                      <div className="mt-4 p-4 bg-green-100 rounded-xl">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-green-800">
                            Seus dados são 100% seus
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4.2 Compartilhamento Limitado */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-primary/5 to-azul-profundo/5 p-6 rounded-2xl border border-primary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-azul-profundo rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-dark">Compartilhamento Limitado</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Podemos compartilhar informações apenas nas seguintes situações:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Com seu consentimento explícito</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Para cumprir obrigações legais ou ordens judiciais</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Para proteger nossos direitos, propriedade ou segurança</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Com prestadores de serviços (sob acordos de confidencialidade)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Segurança dos Dados */}
          <section id="seguranca" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full -translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">5. Segurança dos Dados</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 5.1 Medidas de Proteção */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-red-800">Medidas de Proteção</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Conexões seguras (HTTPS/SSL)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Armazenamento seguro com criptografia</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Acesso restrito às informações pessoais</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Monitoramento regular de segurança</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Atualizações constantes de sistemas</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 5.2 Limitações */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-yellow-800">Limitações</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Embora implementemos medidas rigorosas de segurança, nenhum método de 
                        transmissão ou armazenamento é 100% seguro. Não podemos garantir 
                        segurança absoluta, mas nos comprometemos a proteger suas informações 
                        da melhor forma possível.
                      </p>
                      <div className="mt-4 p-4 bg-yellow-100 rounded-xl">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span className="text-sm font-medium text-yellow-800">
                            Compromisso com a proteção máxima
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Seus Direitos */}
          <section id="direitos" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">6. Seus Direitos</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 6.1 Direitos Fundamentais */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-purple-800">Direitos Fundamentais (LGPD)</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-purple-700">Acesso:</strong>
                            <p className="text-gray-600 text-sm">Informações sobre seus dados</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-purple-700">Correção:</strong>
                            <p className="text-gray-600 text-sm">Corrigir dados incorretos</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-purple-700">Exclusão:</strong>
                            <p className="text-gray-600 text-sm">Remoção de seus dados</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-purple-700">Portabilidade:</strong>
                            <p className="text-gray-600 text-sm">Transferir dados</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-purple-700">Oposição:</strong>
                            <p className="text-gray-600 text-sm">Opor-se ao tratamento</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-purple-700">Informação:</strong>
                            <p className="text-gray-600 text-sm">Detalhes sobre uso</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6.2 Como Exercer seus Direitos */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-blue-800">Como Exercer seus Direitos</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Para exercer qualquer um desses direitos, entre em contato conosco através 
                        da nossa página de contato. Responderemos em até 15 dias úteis.
                      </p>
                      <div className="mt-4 p-4 bg-blue-100 rounded-xl">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-blue-800">
                            Resposta garantida em até 15 dias úteis
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Retenção de Dados */}
          <section id="retencao" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">7. Retenção de Dados</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                  as finalidades descritas nesta política ou conforme exigido por lei. Dados de 
                  contato são mantidos por até 2 anos após a última interação, a menos que você 
                  solicite a exclusão antecipada.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Menores de Idade */}
          <section id="menores" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">👶</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">8. Menores de Idade</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Nosso site não é direcionado a menores de 13 anos. Não coletamos 
                  intencionalmente informações pessoais de crianças. Se você é pai, mãe ou 
                  responsável e acredita que seu filho nos forneceu informações pessoais, 
                  entre em contato conosco para que possamos remover essas informações.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Links para Sites Externos */}
          <section id="links" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full -translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">9. Links para Sites Externos</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Nosso site pode conter links para outros sites. Esta política de privacidade 
                  se aplica apenas ao nosso site. Recomendamos que você leia as políticas de 
                  privacidade de qualquer site que visite através de nossos links.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Alterações nesta Política */}
          <section id="alteracoes" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-amber-100 to-yellow-100 rounded-full translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">10. Alterações nesta Política</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Podemos atualizar esta Política de Privacidade periodicamente. Quando isso 
                  acontecer, publicaremos a versão atualizada em nosso site com a nova data 
                  de "última atualização". Recomendamos que você revise esta política 
                  regularmente para se manter informado sobre como protegemos suas informações.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: Contato */}
          <section id="contato" className="mb-16">
            <div className="card-modern p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">11. Contato</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como 
                  tratamos suas informações pessoais, entre em contato conosco através da 
                  nossa página de contato ou envie um e-mail para nossa equipe.
                </p>
              </div>
            </div>
          </section>

          {/* Final Commitment Section */}
          <section className="mb-16">
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-primary via-azul-profundo to-primary-dark rounded-3xl p-8 md:p-12 text-white relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-amarelo-quente/20 rounded-full animate-float"></div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-secondary/20 rounded-full animate-float-delayed"></div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-float-slow"></div>
                
                <div className="relative text-center">
                  <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
                    <span className="text-6xl">💙</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    Nosso Compromisso com sua Privacidade
                  </h3>
                  <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
                    A privacidade e segurança de suas informações são fundamentais para nós. 
                    Trabalhamos continuamente para garantir que seus dados sejam tratados com 
                    o máximo cuidado e respeito, sempre em conformidade com as melhores 
                    práticas de proteção de dados e a legislação brasileira.
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
                    <p className="text-xl font-semibold text-white">
                      Sua confiança é essencial para construirmos juntos um espaço seguro e acolhedor.
                    </p>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="/contato" className="btn-primary bg-white text-primary-dark hover:bg-blue-100 transition-all duration-300">
                      Entre em Contato
                    </a>
                    <a href="/sobre" className="btn-secondary bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
                      Conheça Nossa Missão
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
