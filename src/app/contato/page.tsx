'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import FormField from '@/components/design-system/FormField'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xldqvepq'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitStatus('')

    try {
      const formEl = e.currentTarget
      const body = new FormData(formEl)
      body.set('_replyto', formData.email)
      body.set('_subject', `Contato - Vivências Azuis (${formData.assunto || 'sem assunto'})`)

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json'
        }
      })

      if (!res.ok) {
        setSubmitStatus('error')
        setSubmitMessage('Não foi possível enviar agora. Tente novamente em instantes.')
        return
      }

      const json = (await res.json()) as { ok?: boolean }
      if (!json.ok) {
        setSubmitStatus('error')
        setSubmitMessage('Não foi possível enviar agora. Verifique os campos e tente novamente.')
        return
      }

      setSubmitStatus('success')
      setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve. 💙')
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
      formEl.reset()
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Falha de conexão ao enviar. Verifique sua internet e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-secondary/10">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-azul-profundo text-white py-24 lg:py-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amarelo-quente/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float-slow"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              Entre em <span className="text-amarelo-quente drop-shadow-lg">Contato</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
              Estamos aqui para ouvir, apoiar e construir juntos uma comunidade mais inclusiva
            </p>
            <div className="mt-6 md:mt-8 flex justify-center">
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-amarelo-quente to-secondary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Formulário */}
          <div className="animate-slide-in-left">
            <div className="card-modern p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amarelo-quente/10 to-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-azul-profundo rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">
                    Envie sua mensagem
                  </h2>
                </div>
                
                {submitMessage && (
                  <div
                    className={`p-6 rounded-2xl mb-8 text-primary-dark border animate-scale-in ${
                      submitStatus === 'success'
                        ? 'bg-gradient-to-r from-secondary to-verde-menta border-secondary/20'
                        : 'bg-gradient-to-r from-red-100 to-orange-100 border-red-200'
                    }`}
                    role={submitStatus === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                  >
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-white/70 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-1 1v2a1 1 0 002 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <span className="font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  action={FORMSPREE_ENDPOINT}
                  method="POST"
                  className="space-y-6"
                >
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
                  <FormField
                    label="Nome *"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />

                  <FormField
                    label="E-mail *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />

                  <div className="group">
                    <label htmlFor="assunto" className="block text-sm font-semibold text-primary-dark mb-3 group-focus-within:text-primary transition-colors">
                      Assunto *
                    </label>
                    <div className="relative">
                      <select
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                        className="w-full rounded-input border border-sand-200 bg-surface px-3 py-2 text-sm text-sand-800 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 appearance-none cursor-pointer"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida geral</option>
                        <option value="sugestao">Sugestão de conteúdo</option>
                        <option value="colaboracao">Proposta de colaboração</option>
                        <option value="relato">Compartilhar relato</option>
                        <option value="feedback">Feedback sobre o site</option>
                        <option value="outro">Outro</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <FormField
                    label="Mensagem *"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    textarea
                    rows={6}
                    placeholder="Escreva sua mensagem aqui..."
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'btn-primary hover:scale-105 hover:shadow-2xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Enviar Mensagem
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="animate-slide-in-right space-y-6 md:space-y-8">
            <div className="card-modern p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-amarelo-quente/10 to-primary/10 rounded-full -translate-y-14 -translate-x-14"></div>
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-secondary/10 to-verde-menta/10 rounded-full translate-y-18 translate-x-18"></div>
              
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-verde-menta rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">
                    Como podemos ajudar?
                  </h2>
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  <div className="group flex items-start space-x-4 md:space-x-6 p-4 md:p-6 rounded-2xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-azul-profundo rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-dark mb-3 text-lg">Dúvidas</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Tem alguma pergunta sobre autismo, inclusão ou nosso conteúdo? 
                        Estamos aqui para ajudar!
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-4 md:space-x-6 p-4 md:p-6 rounded-2xl hover:bg-gradient-to-r hover:from-amarelo-quente/5 hover:to-primary/5 transition-all duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amarelo-quente to-orange-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-dark mb-3 text-lg">Sugestões</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Tem uma ideia de conteúdo ou sugestão para melhorar nosso espaço? 
                        Queremos ouvir você!
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-4 md:space-x-6 p-4 md:p-6 rounded-2xl hover:bg-gradient-to-r hover:from-secondary/5 hover:to-verde-menta/5 transition-all duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary to-verde-menta rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-dark mb-3 text-lg">Colaborações</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Quer compartilhar sua experiência ou colaborar conosco? 
                        Adoraríamos conhecer sua história!
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-4 md:space-x-6 p-4 md:p-6 rounded-2xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-azul-profundo/5 transition-all duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-azul-profundo to-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-dark mb-3 text-lg">Relatos</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Tem uma vivência que gostaria de compartilhar? 
                        Sua história pode inspirar e ajudar outras pessoas!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-secondary via-verde-menta to-secondary/80 rounded-3xl p-6 md:p-8 lg:p-10 text-primary-dark relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Nossa Promessa</h3>
                  </div>
                  
                  <p className="leading-relaxed text-white/90 mb-6 text-lg">
                    Respondemos todas as mensagens com carinho e atenção. 
                    Nosso compromisso é criar um espaço seguro e acolhedor para 
                    toda a comunidade do autismo.
                  </p>
                  
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-white">
                      Tempo de resposta: até 48 horas úteis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
