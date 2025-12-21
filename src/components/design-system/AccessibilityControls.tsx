'use client'

import { useEffect, useState } from 'react'

const FONT_SCALE_KEY = 'va-font-scale'
const CONTRAST_KEY = 'va-contrast'

type FontScale = 'base' | 'lg' | 'xl'

type ContrastMode = 'default' | 'high'

export default function AccessibilityControls() {
  const [fontScale, setFontScale] = useState<FontScale>('base')
  const [contrastMode, setContrastMode] = useState<ContrastMode>('default')

  useEffect(() => {
    const storedScale = (localStorage.getItem(FONT_SCALE_KEY) as FontScale) || 'base'
    const storedContrast = (localStorage.getItem(CONTRAST_KEY) as ContrastMode) || 'default'
    setFontScale(storedScale)
    setContrastMode(storedContrast)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.fontScale = fontScale
    localStorage.setItem(FONT_SCALE_KEY, fontScale)
  }, [fontScale])

  useEffect(() => {
    document.documentElement.dataset.contrast = contrastMode
    localStorage.setItem(CONTRAST_KEY, contrastMode)
  }, [contrastMode])

  return (
    <div className="flex items-center gap-3 rounded-pill border border-sand-200 bg-surface px-4 py-2 shadow-card">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-sand-700">Fonte</span>
        <div className="flex items-center gap-1">
          {(['base', 'lg', 'xl'] as FontScale[]).map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() => setFontScale(scale)}
              className={`rounded-pill px-2 py-1 text-xs font-semibold transition-colors ${
                fontScale === scale
                  ? 'bg-brand text-white'
                  : 'bg-sand-100 text-sand-700 hover:bg-brand-soft'
              }`}
              aria-pressed={fontScale === scale}
            >
              {scale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-5 w-px bg-sand-200" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setContrastMode(contrastMode === 'high' ? 'default' : 'high')}
        className={`rounded-pill px-3 py-1 text-xs font-semibold transition-colors ${
          contrastMode === 'high'
            ? 'bg-brand text-white'
            : 'bg-sand-100 text-sand-700 hover:bg-brand-soft'
        }`}
        aria-pressed={contrastMode === 'high'}
      >
        Contraste
      </button>
    </div>
  )
}
