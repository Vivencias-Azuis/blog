'use client'

import { useState } from 'react'
import { Metadata } from 'next'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio (aqui você implementaria a integração real)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve. 💙')
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-azul-profundo text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Entre em <span className="text-amarelo-quente">Contato</span>
          </h1>
          <p className="text-xl text-blue-100">
            Estamos aqui para ouvir, apoiar e construir juntos uma comunidade mais inclusiva
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">
              Envie sua mensagem
            </h2>
            
            {submitMessage && (
              <div className="bg-secondary p-4 rounded-lg mb-6 text-primary-dark">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto *
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida geral</option>
                  <option value="sugestao">Sugestão de conteúdo</option>
                  <option value="colaboracao">Proposta de colaboração</option>
                  <option value="relato">Compartilhar relato</option>
                  <option value="feedback">Feedback sobre o site</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-white'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Informações */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary-dark mb-6">
                Como podemos ajudar?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">❓</div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-2">Dúvidas</h3>
                    <p className="text-gray-600">
                      Tem alguma pergunta sobre autismo, inclusão ou nosso conteúdo? 
                      Estamos aqui para ajudar!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-2">Sugestões</h3>
                    <p className="text-gray-600">
                      Tem uma ideia de conteúdo ou sugestão para melhorar nosso espaço? 
                      Queremos ouvir você!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🤝</div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-2">Colaborações</h3>
                    <p className="text-gray-600">
                      Quer compartilhar sua experiência ou colaborar conosco? 
                      Adoraríamos conhecer sua história!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📝</div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-2">Relatos</h3>
                    <p className="text-gray-600">
                      Tem uma vivência que gostaria de compartilhar? 
                      Sua história pode inspirar e ajudar outras pessoas!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary to-verde-menta rounded-lg p-8 text-primary-dark">
              <h3 className="text-xl font-bold mb-4">💙 Nossa Promessa</h3>
              <p className="leading-relaxed">
                Respondemos todas as mensagens com carinho e atenção. 
                Nosso compromisso é criar um espaço seguro e acolhedor para 
                toda a comunidade do autismo.
              </p>
              <p className="mt-4 font-medium">
                Tempo de resposta: até 48 horas úteis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}