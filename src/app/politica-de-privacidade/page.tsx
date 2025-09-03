import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Vivências Azuis',
  description: 'Política de privacidade e proteção de dados do site Vivências Azuis.',
}

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-azul-profundo text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Política de <span className="text-amarelo-quente">Privacidade</span>
          </h1>
          <p className="text-xl text-blue-100">
            Como protegemos e utilizamos suas informações pessoais
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

            <h2 className="text-2xl font-bold text-primary-dark mb-4">1. Introdução</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              O Vivências Azuis está comprometido em proteger sua privacidade e dados pessoais. 
              Esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e 
              protegemos suas informações quando você visita nosso site ou interage conosco.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">2. Informações que Coletamos</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">2.1 Informações Fornecidas Voluntariamente</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Nome e endereço de e-mail (quando você entra em contato conosco)</li>
                <li>Mensagens e comunicações que você nos envia</li>
                <li>Informações fornecidas em formulários de contato</li>
                <li>Comentários e interações em nossos conteúdos</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-dark">2.2 Informações Coletadas Automaticamente</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Endereço IP e informações de localização aproximada</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Páginas visitadas e tempo de permanência no site</li>
                <li>Data e hora de acesso</li>
                <li>Referência do site que o direcionou para nós</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-dark">2.3 Cookies e Tecnologias Similares</h3>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas 
                preferências de cookies através das configurações do seu navegador.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">3. Como Utilizamos suas Informações</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">3.1 Finalidades Principais</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Responder às suas mensagens e solicitações de contato</li>
                <li>Melhorar o conteúdo e funcionalidades do site</li>
                <li>Analisar o uso do site para otimizar a experiência do usuário</li>
                <li>Garantir a segurança e prevenir atividades fraudulentas</li>
                <li>Cumprir obrigações legais e regulamentares</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-dark">3.2 Comunicações</h3>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos seu e-mail apenas para responder às suas mensagens e, se você 
                optar por receber, para enviar atualizações sobre nosso conteúdo. Você 
                pode cancelar essas comunicações a qualquer momento.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">4. Compartilhamento de Informações</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">4.1 Não Vendemos Dados</h3>
              <p className="text-gray-700 leading-relaxed">
                Não vendemos, alugamos ou comercializamos suas informações pessoais para 
                terceiros. Seus dados são utilizados exclusivamente para os fins descritos 
                nesta política.
              </p>

              <h3 className="text-xl font-semibold text-primary-dark">4.2 Compartilhamento Limitado</h3>
              <p className="text-gray-700 leading-relaxed">
                Podemos compartilhar informações apenas nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais ou ordens judiciais</li>
                <li>Para proteger nossos direitos, propriedade ou segurança</li>
                <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">5. Segurança dos Dados</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">5.1 Medidas de Proteção</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Utilização de conexões seguras (HTTPS/SSL)</li>
                <li>Armazenamento seguro de dados com criptografia</li>
                <li>Acesso restrito às informações pessoais</li>
                <li>Monitoramento regular de segurança</li>
                <li>Atualizações constantes de sistemas e protocolos</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-dark">5.2 Limitações</h3>
              <p className="text-gray-700 leading-relaxed">
                Embora implementemos medidas rigorosas de segurança, nenhum método de 
                transmissão ou armazenamento é 100% seguro. Não podemos garantir 
                segurança absoluta, mas nos comprometemos a proteger suas informações 
                da melhor forma possível.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">6. Seus Direitos</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary-dark">6.1 Direitos Fundamentais</h3>
              <p className="text-gray-700 leading-relaxed">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Acesso:</strong> Solicitar informações sobre seus dados pessoais</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados</li>
                <li><strong>Portabilidade:</strong> Transferir seus dados para outro serviço</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                <li><strong>Informação:</strong> Obter detalhes sobre o uso de seus dados</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-dark">6.2 Como Exercer seus Direitos</h3>
              <p className="text-gray-700 leading-relaxed">
                Para exercer qualquer um desses direitos, entre em contato conosco através 
                da nossa página de contato. Responderemos em até 15 dias úteis.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">7. Retenção de Dados</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
              as finalidades descritas nesta política ou conforme exigido por lei. Dados de 
              contato são mantidos por até 2 anos após a última interação, a menos que você 
              solicite a exclusão antecipada.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">8. Menores de Idade</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nosso site não é direcionado a menores de 13 anos. Não coletamos 
              intencionalmente informações pessoais de crianças. Se você é pai, mãe ou 
              responsável e acredita que seu filho nos forneceu informações pessoais, 
              entre em contato conosco para que possamos remover essas informações.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">9. Links para Sites Externos</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nosso site pode conter links para outros sites. Esta política de privacidade 
              se aplica apenas ao nosso site. Recomendamos que você leia as políticas de 
              privacidade de qualquer site que visite através de nossos links.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">10. Alterações nesta Política</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Podemos atualizar esta Política de Privacidade periodicamente. Quando isso 
              acontecer, publicaremos a versão atualizada em nosso site com a nova data 
              de "última atualização". Recomendamos que você revise esta política 
              regularmente para se manter informado sobre como protegemos suas informações.
            </p>

            <h2 className="text-2xl font-bold text-primary-dark mb-4">11. Contato</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como 
              tratamos suas informações pessoais, entre em contato conosco através da 
              nossa página de contato ou envie um e-mail para nossa equipe.
            </p>

            <div className="bg-gradient-to-r from-secondary to-verde-menta rounded-lg p-8 text-primary-dark mt-12">
              <h3 className="text-xl font-bold mb-4">💙 Nosso Compromisso com sua Privacidade</h3>
              <p className="leading-relaxed">
                A privacidade e segurança de suas informações são fundamentais para nós. 
                Trabalhamos continuamente para garantir que seus dados sejam tratados com 
                o máximo cuidado e respeito, sempre em conformidade com as melhores 
                práticas de proteção de dados e a legislação brasileira.
              </p>
              <p className="mt-4 font-medium">
                Sua confiança é essencial para construirmos juntos um espaço seguro e acolhedor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
