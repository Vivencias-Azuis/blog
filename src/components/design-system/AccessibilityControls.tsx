'use client'

import { useEffect, useState } from 'react'

const FONT_SCALE_KEY = 'va-font-scale'
const CONTRAST_KEY = 'va-contrast'

type FontScale = 'base' | 'lg' | 'xl'

type ContrastMode = 'default' | 'high'

type AccessibilityControlsProps = {
  fontScale?: FontScale
  contrastMode?: ContrastMode
  onFontScaleChange?: (scale: FontScale) => void
  onContrastModeChange?: (mode: ContrastMode) => void
}

export default function AccessibilityControls({
  fontScale,
  contrastMode,
  onFontScaleChange,
  onContrastModeChange,
}: AccessibilityControlsProps) {
  const [internalFontScale, setInternalFontScale] = useState<FontScale>('base')
  const [internalContrastMode, setInternalContrastMode] = useState<ContrastMode>('default')
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false)
  const isControlled = Boolean(
    fontScale !== undefined &&
      contrastMode !== undefined &&
      onFontScaleChange &&
      onContrastModeChange,
  )
  const activeFontScale = fontScale ?? internalFontScale
  const activeContrastMode = contrastMode ?? internalContrastMode

  useEffect(() => {
    if (isControlled) {
      setHasLoadedPreferences(true)
      return
    }

    const storedFontScale = localStorage.getItem(FONT_SCALE_KEY)
    const storedContrastMode = localStorage.getItem(CONTRAST_KEY)

    if (storedFontScale === 'lg' || storedFontScale === 'xl') {
      setInternalFontScale(storedFontScale)
    }

    if (storedContrastMode === 'high') {
      setInternalContrastMode(storedContrastMode)
    }

    setHasLoadedPreferences(true)
  }, [isControlled])

  useEffect(() => {
    if (isControlled || !hasLoadedPreferences) {
      return
    }

    document.documentElement.dataset.fontScale = activeFontScale
    localStorage.setItem(FONT_SCALE_KEY, activeFontScale)
  }, [activeFontScale, hasLoadedPreferences, isControlled])

  useEffect(() => {
    if (isControlled || !hasLoadedPreferences) {
      return
    }

    document.documentElement.dataset.contrast = activeContrastMode
    localStorage.setItem(CONTRAST_KEY, activeContrastMode)
  }, [activeContrastMode, hasLoadedPreferences, isControlled])

  return (
    <div className="flex items-center gap-3 rounded-pill border border-sand-200 bg-surface px-4 py-2 shadow-card">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-sand-700">Fonte</span>
        <div className="flex items-center gap-1">
          {(['base', 'lg', 'xl'] as FontScale[]).map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() => {
                if (isControlled) {
                  onFontScaleChange?.(scale)
                  return
                }

                setInternalFontScale(scale)
              }}
              className={`rounded-pill px-2 py-1 text-xs font-semibold transition-colors ${
                activeFontScale === scale
                  ? 'bg-brand text-white'
                  : 'bg-sand-100 text-sand-700 hover:bg-brand-soft'
              }`}
              aria-pressed={activeFontScale === scale}
            >
              {scale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-5 w-px bg-sand-200" aria-hidden="true" />

      <button
      type="button"
      onClick={() => {
        if (isControlled) {
          onContrastModeChange?.(activeContrastMode === 'high' ? 'default' : 'high')
          return
        }

          setInternalContrastMode(activeContrastMode === 'high' ? 'default' : 'high')
        }}
        className={`rounded-pill px-3 py-1 text-xs font-semibold transition-colors ${
          activeContrastMode === 'high'
            ? 'bg-brand text-white'
            : 'bg-sand-100 text-sand-700 hover:bg-brand-soft'
        }`}
        aria-pressed={activeContrastMode === 'high'}
      >
        Contraste
      </button>
    </div>
  )
}
