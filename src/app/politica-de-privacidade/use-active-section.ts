'use client'

import { useEffect, useState } from 'react'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement
        const sectionTop = htmlSection.offsetTop
        const sectionHeight = htmlSection.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}
