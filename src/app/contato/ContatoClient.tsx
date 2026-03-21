'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import FormField from '@/components/design-system/FormField'
import { trackEvent } from '@/lib/analytics'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xldqvepq'

interface ContatoClientProps {
  origem?: string
  cluster?: string
  slug?: string
  titulo?: string
  assunto?: string
}

export default function ContatoClient({
  origem = '',
  cluster = '',
  slug = '',
  titulo = '',
  assunto = '',
}: ContatoClientProps) {
  const contextualMessage =
    origem === 'post' && titulo
      ? `Olá, vim do artigo "${titulo}" e quero ajuda sobre este tema.`
      : ''

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto,
    mensagem: contextualMessage
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
      trackEvent('lead_submit', {
        lead_type: 'contact',
        origem: 'contato-page',
        source_origin: origem || 'direct',
        source_cluster: cluster || undefined,
        source_slug: slug || undefined,
        location: window.location.pathname,
      })
      setFormData({ nome: '', email: '', assunto, mensagem: contextualMessage })
      formEl.reset()
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Falha de conexão ao enviar. Verifique sua internet e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-page">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-soft/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              Entre em <span className="text-blue-200 drop-shadow-lg">Contato</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
              Estamos aqui para ouvir, apoiar e construir juntos uma comunidade mais inclusiva
            </p>
            <div className="mt-6 md:mt-8 flex justify-center">
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-200 to-brand-soft rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="animate-slide-in-left">
            <div className="card-modern p-6 md:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/10 to-blue-300/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sand-300/10 to-brand/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand to-blue-900 rounded-xl flex items-center justify-center mr-4">
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
                    className={`p-6 rounded-2xl mb-8 text-sand-900 border animate-scale-in ${
                      submitStatus === 'success'
                        ? 'bg-gradient-to-r from-brand-soft to-blue-200 border-brand/20'
                        : 'bg-gradient-to-r from-red-100 to-orange-100 border-red-200'
                    }`}
                    role={submitStatus === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                  >
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-sand-900" fill="currentColor" viewBox="0 0 20 20">
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

                <form onSubmit={handleSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="space-y-6">
                  <input type="hidden" name="origem" value={origem} />
                  <input type="hidden" name="cluster" value={cluster} />
                  <input type="hidden" name="slug_origem" value={slug} />
                  <input type="hidden" name="titulo_origem" value={titulo} />
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
                  {origem === 'post' && titulo && (
                    <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 text-sm text-sand-800">
                      Você chegou aqui a partir do artigo <strong>{titulo}</strong>.
                    </div>
                  )}
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
                    <label htmlFor="assunto" className="block text-sm font-semibold text-sand-900 mb-3 group-focus-within:text-link transition-colors">
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
                    data-cta="contact_submit"
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

          <div className="animate-slide-in-right">
            <div className="space-y-6">
              <div className="card-modern p-8">
                <h2 className="text-3xl font-bold gradient-text mb-4">Como podemos ajudar</h2>
                <p className="text-sand-700 leading-relaxed">
                  Use este canal para enviar dúvidas, sugerir conteúdos, apontar informações desatualizadas
                  ou compartilhar o contexto do seu caso para a equipe editorial entender melhor sua necessidade.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-3xl border border-sand-200 bg-surface p-6 shadow-card">
                  <h3 className="text-xl font-bold text-sand-900 mb-3">Temas que tratamos melhor</h3>
                  <ul className="space-y-2 text-sand-700">
                    <li>• direitos e benefícios</li>
                    <li>• planos de saúde e cobertura</li>
                    <li>• terapias e rotina</li>
                    <li>• comunicação e inclusão escolar</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-sand-200 bg-surface p-6 shadow-card">
                  <h3 className="text-xl font-bold text-sand-900 mb-3">Antes de enviar</h3>
                  <p className="text-sand-700 leading-relaxed">
                    Quanto mais contexto você trouxer, mais útil tende a ser a resposta. Se vier de um artigo,
                    nós já registramos essa origem automaticamente no formulário.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-blue-900 to-brand p-8 text-white shadow-card">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-100 mb-3">Transparência</p>
                <h3 className="text-2xl font-bold mb-4">Este canal não substitui orientação profissional</h3>
                <p className="text-blue-100 leading-relaxed">
                  Em temas médicos, terapêuticos e jurídicos, nosso conteúdo e respostas funcionam como apoio editorial.
                  Decisões individuais devem ser validadas com profissionais habilitados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
