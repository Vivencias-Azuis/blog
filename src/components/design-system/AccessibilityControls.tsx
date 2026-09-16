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

const toggleBase =
  'rounded-sm px-2 py-1 font-sans text-xs font-semibold transition-colors duration-150'
const toggleActive = 'bg-azul text-paper'
const toggleIdle = 'text-ink-soft hover:bg-azul-wash hover:text-azul'

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
    <div className="flex items-center gap-3 rounded-sm border border-rule bg-paper px-3 py-1.5">
      <div className="flex items-center gap-2">
        <span className="font-sans text-xs text-ink-mute">Fonte</span>
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
              className={`${toggleBase} ${
                activeFontScale === scale ? toggleActive : toggleIdle
              }`}
              aria-pressed={activeFontScale === scale}
            >
              {scale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-5 w-px bg-rule" aria-hidden="true" />

      <button
        type="button"
        onClick={() => {
          if (isControlled) {
            onContrastModeChange?.(activeContrastMode === 'high' ? 'default' : 'high')
            return
          }

          setInternalContrastMode(activeContrastMode === 'high' ? 'default' : 'high')
        }}
        className={`${toggleBase} ${
          activeContrastMode === 'high' ? toggleActive : toggleIdle
        }`}
        aria-pressed={activeContrastMode === 'high'}
      >
        Contraste
      </button>
    </div>
  )
}
