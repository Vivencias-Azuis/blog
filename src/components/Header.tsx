'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import AccessibilityControls from '@/components/design-system/AccessibilityControls'

const navItems = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/lojinha', label: 'Lojinha' },
  { href: 'https://jogos.vivenciasazuis.com.br/', label: 'Jogos sensoriais', external: true },
  { href: '/apoie', label: 'Apoie' },
  { href: '/contato', label: 'Contato' },
]

const desktopNavLink =
  'border-b border-transparent px-3 pb-1 pt-2 font-sans text-sm text-ink-soft transition-colors duration-150 hover:border-azul hover:text-azul'
const quietButton =
  'border-b border-transparent px-3 pb-1 pt-2 font-sans text-sm text-ink-soft transition-colors duration-150 hover:border-azul hover:text-azul'
const solidButton =
  'inline-flex items-center justify-center rounded-sm border border-azul bg-azul px-4 py-2 font-sans text-sm font-semibold text-paper transition-colors duration-150 hover:border-azul-deep hover:bg-azul-deep'
const mobileNavLink =
  'block border-b border-rule px-4 py-4 font-sans text-sm text-ink-soft transition-colors duration-150 hover:text-azul'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontScale, setFontScale] = useState<'base' | 'lg' | 'xl'>('base')
  const [contrastMode, setContrastMode] = useState<'default' | 'high'>('default')
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const storedFontScale = localStorage.getItem('va-font-scale')
    const storedContrastMode = localStorage.getItem('va-contrast')

    if (storedFontScale === 'lg' || storedFontScale === 'xl') {
      setFontScale(storedFontScale)
    }

    if (storedContrastMode === 'high') {
      setContrastMode(storedContrastMode)
    }

    setHasLoadedPreferences(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedPreferences) {
      return
    }

    document.documentElement.dataset.fontScale = fontScale
    localStorage.setItem('va-font-scale', fontScale)
  }, [fontScale, hasLoadedPreferences])

  useEffect(() => {
    if (!hasLoadedPreferences) {
      return
    }

    document.documentElement.dataset.contrast = contrastMode
    localStorage.setItem('va-contrast', contrastMode)
  }, [contrastMode, hasLoadedPreferences])

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/new_logo.png"
              alt="Vivências Azuis"
              width={220}
              height={121}
              priority
              sizes="(max-width: 640px) 203px, 220px"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className={desktopNavLink}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-4">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button type="button" className={quietButton}>
                    Entrar
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button type="button" className={solidButton}>
                    Criar conta
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link href="/minha-area" className={quietButton}>
                  Minha área
                </Link>
                <div className="flex items-center justify-center rounded-full border border-rule bg-paper p-0.5">
                  <UserButton />
                </div>
              </Show>
            </div>

            <div className="shrink-0">
              <AccessibilityControls
                fontScale={fontScale}
                contrastMode={contrastMode}
                onFontScaleChange={setFontScale}
                onContrastModeChange={setContrastMode}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-sm p-3 text-ink-soft transition-colors duration-150 hover:bg-azul-wash hover:text-azul md:hidden"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="md:hidden" id="mobile-navigation" hidden={!isMenuOpen}>
          <div className="border-t border-rule bg-paper">
            <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
              <div className="px-4 pb-8 pt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className={mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-6">
                  <AccessibilityControls
                    fontScale={fontScale}
                    contrastMode={contrastMode}
                    onFontScaleChange={setFontScale}
                    onContrastModeChange={setContrastMode}
                  />
                </div>

                <div className="mt-6 border-t border-rule pt-6">
                  <Show when="signed-out">
                    <div className="flex flex-col gap-3">
                      <SignInButton mode="modal">
                        <button
                          type="button"
                          className="w-full rounded-sm border border-ink px-4 py-3 font-sans text-sm font-semibold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
                        >
                          Entrar
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button
                          type="button"
                          className="w-full rounded-sm border border-azul bg-azul px-4 py-3 font-sans text-sm font-semibold text-paper transition-colors duration-150 hover:border-azul-deep hover:bg-azul-deep"
                        >
                          Criar conta
                        </button>
                      </SignUpButton>
                    </div>
                  </Show>
                  <Show when="signed-in">
                    <div className="flex items-center justify-between rounded-sm border border-rule bg-paper-deep p-4">
                      <Link
                        href="/minha-area"
                        className="font-sans text-sm text-ink transition-colors duration-150 hover:text-azul"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Minha área
                      </Link>
                      <div className="flex items-center justify-center rounded-full border border-rule bg-paper p-0.5">
                        <UserButton />
                      </div>
                    </div>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
