import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre | Vivências Azuis',
  description: 'Conheça a missão e valores do Vivências Azuis, um espaço digital dedicado ao universo do autismo.',
}

export default function SobrePage() {
  const valores = [
    {
      titulo: 'Inclusão',
      descricao: 'Promovemos um ambiente acolhedor para todas as pessoas do espectro autista',
      icone: '🤝'
    },
    {
      titulo: 'Respeito',
      descricao: 'Valorizamos cada trajetória individual e respeitamos as diferenças',
      icone: '💙'
    },
    {
      titulo: 'Empatia',
      descricao: 'Construímos pontes de compreensão e apoio mútuo',
      icone: '❤️'
    },
    {
      titulo: 'Conhecimento',
      descricao: 'Compartilhamos informações baseadas em evidências e experiências reais',
      icone: '📚'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-azul-profundo text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre o <span className="text-amarelo-quente">Vivências Azuis</span>
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte 
            do universo do autismo
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
            Nossa História
          </h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6">
              O <strong>Vivências Azuis</strong> nasceu da necessidade de criar um espaço digital verdadeiramente 
              inclusivo e acolhedor para toda a comunidade do autismo. Reconhecemos que cada pessoa 
              no espectro tem uma trajetória única, repleta de desafios, conquistas e experiências 
              valiosas que merecem ser compartilhadas e celebradas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Aqui, histórias reais, dicas práticas e conhecimento especializado se unem para promover 
              mais inclusão, respeito e empatia no dia a dia. Nosso conteúdo é organizado e acessível, 
              abordando desde desafios cotidianos até conquistas, oferecendo apoio tanto para pessoas 
              autistas quanto para familiares, educadores e profissionais.
            </p>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-12 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{valor.icone}</div>
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {valor.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
            O que oferecemos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Relatos e Experiências Autênticas
              </h3>
              <p className="text-gray-600">
                Histórias reais que ajudam a construir uma comunidade de apoio mútuo, 
                onde cada vivência contribui para o crescimento coletivo.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Ferramentas e Recursos Práticos
              </h3>
              <p className="text-gray-600">
                Dicas e estratégias para tornar rotinas mais leves e previsíveis, 
                facilitando o dia a dia de pessoas autistas e suas famílias.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Informações Atualizadas
              </h3>
              <p className="text-gray-600">
                Conteúdo sobre direitos, saúde e educação no contexto do autismo, 
                baseado em evidências científicas e melhores práticas.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Espaço Interativo
              </h3>
              <p className="text-gray-600">
                Local para tirar dúvidas, sugerir temas e compartilhar suas próprias 
                vivências com nossa comunidade acolhedora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-16 bg-gradient-to-r from-verde-menta to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-dark mb-6">
            Nossa Missão
          </h2>
          <p className="text-xl text-primary-dark leading-relaxed mb-8">
            Dar voz, visibilidade e suporte a cada trajetória dentro do espectro, 
            celebrando a diversidade e promovendo um mundo mais azul, inclusivo e humano.
          </p>
          <div className="text-6xl mb-4">🌟</div>
          <p className="text-primary-dark font-medium">
            Cada história importa. Cada vivência tem valor. Cada pessoa merece ser acolhida.
          </p>
        </div>
      </section>
    </div>
  )
}