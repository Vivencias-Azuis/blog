'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
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
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5"
            >
              Início
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-azul-profundo transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
            <Link 
              href="/blog" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5"
            >
              Blog
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-azul-profundo transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
            <Link 
              href="/sobre" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5"
            >
              Sobre
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-azul-profundo transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
            <Link 
              href="/contato" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5"
            >
              Contato
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-azul-profundo transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
          </nav>

          {/* Enhanced Mobile menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 focus:outline-none transition-all duration-300"
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
          <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 pt-6 pb-8 space-y-1">
              <Link
                href="/"
                className="block px-4 py-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-xl font-medium group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Início</span>
                </span>
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-xl font-medium group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Blog</span>
                </span>
              </Link>
              <Link
                href="/sobre"
                className="block px-4 py-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-xl font-medium group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Sobre</span>
                </span>
              </Link>
              <Link
                href="/contato"
                className="block px-4 py-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-xl font-medium group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Contato</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
