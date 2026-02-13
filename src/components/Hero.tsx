import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Hero() {
  const allPosts = getAllPosts()
  const postsCount = allPosts.length
  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-brand to-blue-900 text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title with Enhanced Typography */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
              <span className="block">Vivências</span>
              <span className="block text-blue-200 drop-shadow-lg">Azuis</span>
            </h1>
            <div className="w-24 h-1 bg-blue-200 mx-auto rounded-full"></div>
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Um espaço digital dedicado a{' '}
            <span className="text-blue-200 font-medium">compartilhar</span>,{' '}
            <span className="text-brand-soft font-medium">acolher</span> e{' '}
            <span className="text-blue-200 font-medium">inspirar</span> todos que fazem parte 
            do universo do autismo
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              href="/blog" 
              data-cta="hero_explore_blog"
              className="group bg-surface text-link font-bold px-10 py-4 rounded-card hover:bg-brand-soft transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-lg"
            >
              <span className="flex items-center gap-2">
                📚 Explore o Blog
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              href="/sobre" 
              data-cta="hero_about_mission"
              className="group border-2 border-white text-white font-semibold px-10 py-4 rounded-card hover:bg-white hover:text-link transition-all duration-300 transform hover:scale-105 text-lg backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                💙 Conheça Nossa Missão
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">{postsCount}</div>
              <div className="text-blue-200 text-sm md:text-base">Artigos Publicados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-soft mb-2">1000+</div>
              <div className="text-blue-200 text-sm md:text-base">Famílias Apoiadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">24/7</div>
              <div className="text-blue-200 text-sm md:text-base">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-brand-soft rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-float-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-brand-soft rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-blue-200 rounded-full opacity-15 animate-float-delayed"></div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  )
}
