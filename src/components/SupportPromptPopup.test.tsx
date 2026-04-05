import { act } from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('SupportPromptPopup', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('shows after one minute on non-home pages and stores the browser flag', async () => {
    mockUsePathname.mockReturnValue('/blog/post-teste')

    const storage = new Map<string, string>()
    const setItem = vi.fn((key: string, value: string) => {
      storage.set(key, value)
    })

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem,
    })

    const { default: SupportPromptPopup } = await import('@/components/SupportPromptPopup')

    render(<SupportPromptPopup />)

    expect(screen.queryByText(/apoie a continuidade do vivências azuis/i)).not.toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(60000)
    })

    expect(screen.getByText(/apoie a continuidade do vivências azuis/i)).toBeInTheDocument()
    expect(setItem).toHaveBeenCalledWith('va_support_popup_seen', '1')
  })

  it('does not show on home or support routes', async () => {
    const storage = new Map<string, string>()

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage.set(key, value)
      }),
    })

    const { default: SupportPromptPopup } = await import('@/components/SupportPromptPopup')

    mockUsePathname.mockReturnValue('/')
    const home = render(<SupportPromptPopup />)

    await act(async () => {
      vi.advanceTimersByTime(60000)
    })

    expect(screen.queryByText(/apoie a continuidade do vivências azuis/i)).not.toBeInTheDocument()

    home.unmount()

    mockUsePathname.mockReturnValue('/apoie')
    render(<SupportPromptPopup />)

    await act(async () => {
      vi.advanceTimersByTime(60000)
    })

    expect(screen.queryByText(/apoie a continuidade do vivências azuis/i)).not.toBeInTheDocument()
  })

  it('does not show again when the browser was already marked', async () => {
    mockUsePathname.mockReturnValue('/blog/post-teste')

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => (key === 'va_support_popup_seen' ? '1' : null)),
      setItem: vi.fn(),
    })

    const { default: SupportPromptPopup } = await import('@/components/SupportPromptPopup')

    render(<SupportPromptPopup />)

    await act(async () => {
      vi.advanceTimersByTime(60000)
    })

    expect(screen.queryByText(/apoie a continuidade do vivências azuis/i)).not.toBeInTheDocument()
  })

  it('closes when the user dismisses it', async () => {
    mockUsePathname.mockReturnValue('/blog/post-teste')

    const storage = new Map<string, string>()

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage.set(key, value)
      }),
    })

    const { default: SupportPromptPopup } = await import('@/components/SupportPromptPopup')

    render(<SupportPromptPopup />)

    await act(async () => {
      vi.advanceTimersByTime(60000)
    })

    fireEvent.click(screen.getByRole('button', { name: /agora não/i }))

    expect(screen.queryByText(/apoie a continuidade do vivências azuis/i)).not.toBeInTheDocument()
  })
})
