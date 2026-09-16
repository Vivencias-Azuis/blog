import Link from 'next/link'

const navigateLinks = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/apoie', label: 'Apoie' },
  { href: '/contato', label: 'Contato' },
]

const themeLinks = [
  { href: '/blog?categoria=dicas', label: 'Dicas práticas' },
  { href: '/blog?categoria=relatos', label: 'Relatos' },
  { href: '/blog?categoria=educacao', label: 'Educação' },
  { href: '/blog?categoria=direitos', label: 'Direitos' },
]

const legalLinks = [
  { href: '/termos-de-uso', label: 'Termos de uso' },
  { href: '/politica-de-privacidade', label: 'Política de privacidade' },
  { href: '/metodologia-editorial', label: 'Metodologia editorial' },
]

const footerLink =
  'font-sans text-sm text-azul-soft transition-colors duration-150 hover:text-paper'
const footerHeading =
  'font-sans text-xs font-semibold uppercase tracking-[0.2em] text-azul-soft'

export default function Footer() {
  return (
    <footer className="bg-azul-deep text-paper">
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <p className="font-display text-2xl text-paper">Vivências Azuis</p>
            <p className="mt-4 max-w-[42ch] font-serif text-base leading-relaxed text-azul-soft">
              Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem
              parte do universo do autismo. Promovendo mais inclusão, respeito e empatia no
              dia a dia.
            </p>
          </div>

          <nav aria-labelledby="footer-navegar">
            <h2 id="footer-navegar" className={footerHeading}>
              Navegar
            </h2>
            <ul className="mt-5 space-y-3">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-temas">
            <h2 id="footer-temas" className={footerHeading}>
              Temas
            </h2>
            <ul className="mt-5 space-y-3">
              {themeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-sans text-sm text-azul-soft">
              © {new Date().getFullYear()} Vivências Azuis. Todos os direitos reservados.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
