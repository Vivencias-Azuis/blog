import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold">Vivências Azuis</span>
            </div>
            <p className="text-blue-200 leading-relaxed">
              Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte 
              do universo do autismo. Promovendo mais inclusão, respeito e empatia no dia a dia.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-blue-200 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-blue-200 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog?categoria=dicas" className="text-blue-200 hover:text-white transition-colors">
                  Dicas Práticas
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=relatos" className="text-blue-200 hover:text-white transition-colors">
                  Relatos
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=educacao" className="text-blue-200 hover:text-white transition-colors">
                  Educação
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=direitos" className="text-blue-200 hover:text-white transition-colors">
                  Direitos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-blue-200">
                © {new Date().getFullYear()} Vivências Azuis. Todos os direitos reservados.
              </p>
              <p className="text-blue-300 text-sm mt-2">
                Construindo um mundo mais azul, inclusivo e humano. 💙
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/termos-de-uso" className="text-blue-200 hover:text-white transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link href="/politica-de-privacidade" className="text-blue-200 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}