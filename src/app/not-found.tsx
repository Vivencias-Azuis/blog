import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada | Vivências Azuis',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-surface rounded-card shadow-card p-12 border border-sand-200">
          {/* Ícone grande */}
          <div className="text-8xl mb-8">🧩</div>
          
          {/* Título */}
          <h1 className="text-4xl font-bold text-sand-900 mb-4">
            Página não encontrada
          </h1>
          
          {/* Descrição */}
          <p className="text-lg text-sand-700 mb-8">
            Ops! Parece que esta peça do quebra-cabeça se perdeu. 
            A página que você está procurando não existe ou foi movida.
          </p>
          
          {/* Sugestões */}
          <div className="bg-sand-100 rounded-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-sand-900 mb-4">
              O que você pode fazer:
            </h2>
            <ul className="text-left text-sand-700 space-y-2">
              <li className="flex items-center">
                <span className="text-link mr-2">•</span>
                Verifique se o endereço foi digitado corretamente
              </li>
              <li className="flex items-center">
                <span className="text-link mr-2">•</span>
                Volte à página inicial e navegue a partir de lá
              </li>
              <li className="flex items-center">
                <span className="text-link mr-2">•</span>
                Use o menu para encontrar o que procura
              </li>
              <li className="flex items-center">
                <span className="text-link mr-2">•</span>
                Entre em contato conosco se o problema persistir
              </li>
            </ul>
          </div>
          
          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="btn-primary"
            >
              Voltar ao Início
            </Link>
            <Link 
              href="/blog" 
              className="btn-secondary"
            >
              Ver Blog
            </Link>
            <Link 
              href="/contato" 
              className="border-2 border-brand text-link font-medium py-2 px-4 rounded-card hover:bg-brand hover:text-white transition-colors duration-200"
            >
              Falar Conosco
            </Link>
          </div>
          
          {/* Mensagem de apoio */}
          <div className="mt-8 p-4 bg-gradient-to-r from-brand-soft to-blue-200 rounded-card">
            <p className="text-sand-900 font-medium">
              💙 Lembre-se: cada jornada tem seus desvios, e isso faz parte do processo!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
