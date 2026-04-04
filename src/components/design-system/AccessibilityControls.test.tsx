import { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import AccessibilityControls from '@/components/design-system/AccessibilityControls'

describe('AccessibilityControls', () => {
  it('hydrates without mismatches when stored preferences exist', async () => {
    const storage = new Map<string, string>([
      ['va-font-scale', 'xl'],
      ['va-contrast', 'high'],
    ])

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage.set(key, value)
      }),
      removeItem: vi.fn((key: string) => {
        storage.delete(key)
      }),
      clear: vi.fn(() => {
        storage.clear()
      }),
    })

    const originalWindow = globalThis.window
    const originalDocument = globalThis.document
    const originalLocalStorage = globalThis.localStorage

    // Simulate the server render where browser globals do not exist.
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('document', undefined)
    vi.stubGlobal('localStorage', undefined)
    const serverHtml = renderToString(<AccessibilityControls />)
    vi.stubGlobal('window', originalWindow)
    vi.stubGlobal('document', originalDocument)
    vi.stubGlobal('localStorage', originalLocalStorage)
    const container = document.createElement('div')
    container.innerHTML = serverHtml
    document.body.appendChild(container)

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    await act(async () => {
      hydrateRoot(container, <AccessibilityControls />)
    })

    const hydrationErrors = consoleError.mock.calls.filter(([message]) =>
      typeof message === 'string' && message.includes("A tree hydrated but some attributes"),
    )

    expect(hydrationErrors).toHaveLength(0)
    expect(document.documentElement.dataset.fontScale).toBe('xl')
    expect(document.documentElement.dataset.contrast).toBe('high')

    consoleError.mockRestore()
    container.remove()
  })
})
