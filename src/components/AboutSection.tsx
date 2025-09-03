export default function AboutSection() {
  const features = [
    {
      icon: '💙',
      title: 'Relatos Autênticos',
      description: 'Experiências reais que ajudam a construir uma comunidade de apoio mútuo',
      color: 'from-primary to-azul-profundo'
    },
    {
      icon: '🛠️',
      title: 'Ferramentas Práticas',
      description: 'Recursos para tornar rotinas mais leves e previsíveis no dia a dia',
      color: 'from-verde-menta to-primary'
    },
    {
      icon: '📚',
      title: 'Informações Atualizadas',
      description: 'Conteúdo sobre direitos, saúde e educação no contexto do autismo',
      color: 'from-amarelo-quente to-verde-menta'
    },
    {
      icon: '🤝',
      title: 'Espaço Interativo',
      description: 'Local para tirar dúvidas, sugerir temas e compartilhar vivências',
      color: 'from-primary-dark to-primary'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23335C81' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block p-4 bg-gradient-to-br from-primary to-verde-menta rounded-full mb-6">
            <span className="text-4xl">🎯</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            O que você encontra aqui
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Vivências Azuis nasceu para dar voz, visibilidade e suporte a cada trajetória 
            dentro do espectro, celebrando a diversidade e promovendo um mundo mais inclusivo.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-verde-menta mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6">
                <div className={`inline-block p-6 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl block">{feature.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amarelo-quente rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Mission Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-neutral-light relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-verde-menta/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amarelo-quente/10 to-primary/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            <div className="animate-slide-in-left">
              <div className="inline-block p-3 bg-gradient-to-br from-primary to-verde-menta rounded-full mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                Nossa Missão
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Promover mais inclusão, respeito e empatia no dia a dia através de conteúdos 
                organizados e acessíveis. Oferecemos apoio tanto para pessoas autistas quanto 
                para familiares, educadores e profissionais.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="tag bg-gradient-to-r from-primary to-azul-profundo text-white">Inclusão</span>
                <span className="tag bg-gradient-to-r from-verde-menta to-primary text-white">Respeito</span>
                <span className="tag bg-gradient-to-r from-amarelo-quente to-verde-menta text-primary-dark">Empatia</span>
                <span className="tag bg-gradient-to-r from-primary-dark to-primary text-white">Apoio</span>
                <span className="tag bg-gradient-to-r from-primary to-verde-menta text-white">Diversidade</span>
              </div>
            </div>
            <div className="text-center animate-slide-in-right">
              <div className="relative">
                <div className="inline-block p-12 bg-gradient-to-br from-primary via-verde-menta to-amarelo-quente rounded-full shadow-2xl">
                  <span className="text-8xl block">🌟</span>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-amarelo-quente rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-verde-menta rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <p className="text-primary-dark font-bold text-lg mt-6">
                Celebrando cada trajetória no espectro
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-verde-menta rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-amarelo-quente rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}