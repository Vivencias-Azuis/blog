import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-azul-profundo text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Vivências <span className="text-amarelo-quente">Azuis</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte 
            do universo do autismo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/blog" 
              className="bg-amarelo-quente text-primary-dark font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
            >
              Explore o Blog
            </Link>
            <Link 
              href="/sobre" 
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-all duration-200"
            >
              Conheça Nossa Missão
            </Link>
          </div>
        </div>
      </div>
      
      {/* Elementos visuais decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-verde-menta rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-amarelo-quente rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}