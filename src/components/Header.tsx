'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import AccessibilityControls from '@/components/design-system/AccessibilityControls'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontScale, setFontScale] = useState<'base' | 'lg' | 'xl'>('base')
  const [contrastMode, setContrastMode] = useState<'default' | 'high'>('default')
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false)
  const sensoryGamesUrl = 'https://jogos.vivenciasazuis.com.br/'

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
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-surface/90 shadow-sm backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-16 w-auto group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/new_logo.png"
                alt="Vivências Azuis"
                width={220}
                height={121}
                priority
                sizes="(max-width: 640px) 203px, 220px"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center space-x-1">
              <Link 
                href="/" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Início
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <Link 
                href="/blog" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Blog
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <Link 
                href="/sobre" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Sobre
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <Link 
                href="/lojinha" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Lojinha
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <Link
                href={sensoryGamesUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Jogos sensoriais
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <Link 
                href="/apoie" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Apoie
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
              <Link 
                href="/contato" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Contato
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                  >
                    Entrar
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-800"
                  >
                    Criar conta
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/minha-area"
                  className="rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                >
                  Minha area
                </Link>
                <div className="flex items-center justify-center rounded-full border border-sand-200 bg-white p-0.5 shadow-sm">
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

          {/* Enhanced Mobile menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden rounded-pill p-3 text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link focus:outline-none"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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

        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden" id="mobile-navigation" hidden={!isMenuOpen}>
          <div className="border-t border-sand-200 bg-surface/95 backdrop-blur-md">
            <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
            <div className="px-4 pt-6 pb-8 space-y-4">
              <Link
                href="/"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Início</span>
                </span>
              </Link>
              <Link
                href="/blog"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Blog</span>
                </span>
              </Link>
              <Link
                href="/sobre"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Sobre</span>
                </span>
              </Link>
              <Link
                href="/contato"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Contato</span>
                </span>
              </Link>
              <Link
                href="/lojinha"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Lojinha</span>
                </span>
              </Link>
              <Link
                href={sensoryGamesUrl}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Jogos sensoriais</span>
                </span>
              </Link>
              <Link
                href="/apoie"
                className="group block rounded-card px-4 py-4 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>Apoie</span>
                </span>
              </Link>
              <div className="pt-2">
                <AccessibilityControls
                  fontScale={fontScale}
                  contrastMode={contrastMode}
                  onFontScaleChange={setFontScale}
                  onContrastModeChange={setContrastMode}
                />
              </div>
              <div className="border-t border-sand-200 pt-4">
                <Show when="signed-out">
                  <div className="flex flex-col gap-3">
                    <SignInButton mode="modal">
                      <button
                        type="button"
                        className="w-full rounded-pill border border-sand-300 px-4 py-3 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
                      >
                        Entrar
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button
                        type="button"
                        className="w-full rounded-pill bg-brand px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-800"
                      >
                        Criar conta
                      </button>
                    </SignUpButton>
                  </div>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center justify-between rounded-card bg-brand-soft p-4">
                    <Link
                      href="/minha-area"
                      className="text-sm font-semibold text-sand-700 transition-colors hover:text-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Minha area
                    </Link>
                    <div className="flex items-center justify-center rounded-full border border-white/70 bg-white p-0.5 shadow-sm">
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
