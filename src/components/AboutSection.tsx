export default function AboutSection() {
  const features = [
    {
      icon: '💙',
      title: 'Relatos Autênticos',
      description: 'Experiências reais que ajudam a construir uma comunidade de apoio mútuo'
    },
    {
      icon: '🛠️',
      title: 'Ferramentas Práticas',
      description: 'Recursos para tornar rotinas mais leves e previsíveis no dia a dia'
    },
    {
      icon: '📚',
      title: 'Informações Atualizadas',
      description: 'Conteúdo sobre direitos, saúde e educação no contexto do autismo'
    },
    {
      icon: '🤝',
      title: 'Espaço Interativo',
      description: 'Local para tirar dúvidas, sugerir temas e compartilhar vivências'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            O que você encontra aqui
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vivências Azuis nasceu para dar voz, visibilidade e suporte a cada trajetória 
            dentro do espectro, celebrando a diversidade e promovendo um mundo mais inclusivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                Nossa Missão
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Promover mais inclusão, respeito e empatia no dia a dia através de conteúdos 
                organizados e acessíveis. Oferecemos apoio tanto para pessoas autistas quanto 
                para familiares, educadores e profissionais.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Inclusão</span>
                <span className="tag">Respeito</span>
                <span className="tag">Empatia</span>
                <span className="tag">Apoio</span>
                <span className="tag">Diversidade</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block p-8 bg-gradient-to-br from-primary to-verde-menta rounded-full">
                <span className="text-6xl">🌟</span>
              </div>
              <p className="text-primary-dark font-medium mt-4">
                Celebrando cada trajetória no espectro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}