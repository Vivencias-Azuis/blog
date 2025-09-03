import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso | Vivências Azuis',
  description: 'Termos de uso e condições para utilização do site Vivências Azuis.',
}

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-azul-profundo text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Termos de <span className="text-amarelo-quente">Uso</span>
          </h1>
          <p className="text-xl text-blue-100">
            Condições e diretrizes para utilização do nosso espaço digital
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-0">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ao acessar e utilizar o site Vivências Azuis, você concorda em cumprir e estar vinculado 
              aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes 
              termos, não deve utilizar nosso site.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">2. Sobre o Site</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              O Vivências Azuis é um espaço digital dedicado a compartilhar informações, experiências 
              e recursos relacionados ao autismo. Nosso objetivo é promover inclusão, respeito e 
              empatia, oferecendo conteúdo educativo e de apoio para pessoas autistas, familiares, 
              educadores e profissionais.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">3. Uso do Conteúdo</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">3.1 Conteúdo Educativo</h3>
              <p className="text-gray-700 leading-relaxed">
                Todo o conteúdo disponibilizado em nosso site tem caráter educativo e informativo. 
                As informações compartilhadas não substituem orientações médicas, psicológicas ou 
                terapêuticas profissionais.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">3.2 Uso Responsável</h3>
              <p className="text-gray-700 leading-relaxed">
                Você concorda em utilizar o conteúdo de forma responsável, respeitando os direitos 
                autorais e não reproduzindo materiais sem autorização expressa.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">3.3 Compartilhamento</h3>
              <p className="text-gray-700 leading-relaxed">
                Você pode compartilhar nossos conteúdos, desde que mantenha os créditos e links 
                originais, e não altere o contexto ou significado das informações.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">4. Comentários e Interações</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">4.1 Respeito e Inclusão</h3>
              <p className="text-gray-700 leading-relaxed">
                Esperamos que todos os usuários mantenham um ambiente respeitoso e inclusivo. 
                Comentários discriminatórios, ofensivos ou que promovam preconceito não serão tolerados.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">4.2 Moderação</h3>
              <p className="text-gray-700 leading-relaxed">
                Reservamo-nos o direito de moderar, editar ou remover comentários que violem 
                nossas diretrizes de comunidade.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">4.3 Responsabilidade</h3>
              <p className="text-gray-700 leading-relaxed">
                Você é responsável pelo conteúdo que compartilha em nossos canais de comunicação.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">5. Privacidade e Dados</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Respeitamos sua privacidade e nos comprometemos a proteger seus dados pessoais. 
              Para informações detalhadas sobre como coletamos, utilizamos e protegemos suas 
              informações, consulte nossa Política de Privacidade.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">6. Limitações de Responsabilidade</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">6.1 Informações Gerais</h3>
              <p className="text-gray-700 leading-relaxed">
                As informações disponibilizadas em nosso site são de caráter geral e educativo. 
                Não nos responsabilizamos por decisões tomadas com base exclusivamente em nosso conteúdo.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">6.2 Links Externos</h3>
              <p className="text-gray-700 leading-relaxed">
                Nosso site pode conter links para sites externos. Não nos responsabilizamos pelo 
                conteúdo ou práticas desses sites terceiros.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">6.3 Disponibilidade</h3>
              <p className="text-gray-700 leading-relaxed">
                Embora nos esforcemos para manter o site sempre disponível, não garantimos 
                funcionamento ininterrupto e não nos responsabilizamos por interrupções temporárias.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">7. Propriedade Intelectual</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Todo o conteúdo original do site, incluindo textos, imagens, logos e design, 
              é propriedade do Vivências Azuis e está protegido por leis de direitos autorais. 
              O uso não autorizado é expressamente proibido.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">8. Modificações dos Termos</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após sua publicação no site. 
              É sua responsabilidade verificar periodicamente as atualizações.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">9. Contato</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco através 
              da nossa página de contato ou envie um e-mail para nossa equipe.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">10. Lei Aplicável</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida 
              nos tribunais competentes do Brasil.
            </p>

            <div className="bg-gradient-to-r from-secondary to-verde-menta rounded-lg p-8 text-primary-dark mt-12">
              <h3 className="text-xl font-bold mb-4">💙 Nosso Compromisso</h3>
              <p className="leading-relaxed">
                Estes termos refletem nosso compromisso em manter um espaço seguro, respeitoso e 
                inclusivo para toda a comunidade do autismo. Trabalhamos continuamente para 
                melhorar nossa plataforma e garantir que ela sirva como um ambiente acolhedor 
                para compartilhamento de experiências e conhecimento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
