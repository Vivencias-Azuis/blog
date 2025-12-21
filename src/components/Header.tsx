'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import AccessibilityControls from '@/components/design-system/AccessibilityControls'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-surface/90 shadow-sm backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-16 w-auto group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo-text.svg"
                alt="Vivências Azuis"
                width={180}
                height={64}
                priority
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
                href="/contato" 
                className="group relative rounded-pill px-4 py-2 text-sm font-semibold text-sand-700 transition-all duration-300 hover:bg-brand-soft hover:text-link"
              >
                Contato
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-blue-800 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            </nav>
            <AccessibilityControls />
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
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`} id="mobile-navigation">
          <div className="border-t border-sand-200 bg-surface/95 backdrop-blur-md">
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
              <div className="pt-2">
                <AccessibilityControls />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
