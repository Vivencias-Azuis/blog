import { describe, expect, it } from 'vitest'
import { estimateAbaMonthlyCost, formatAbaMonthlyCost } from '@/lib/aba-monthly-cost'

describe('estimateAbaMonthlyCost', () => {
  it('multiplies session value by weekly sessions and 4.3 weeks', () => {
    expect(estimateAbaMonthlyCost(150, 8)).toBe(5160)
  })

  it('returns null when a value is missing or not positive', () => {
    expect(estimateAbaMonthlyCost(0, 8)).toBeNull()
    expect(estimateAbaMonthlyCost(150, 0)).toBeNull()
    expect(estimateAbaMonthlyCost(-10, 4)).toBeNull()
    expect(estimateAbaMonthlyCost(Number.NaN, 4)).toBeNull()
  })
})

describe('formatAbaMonthlyCost', () => {
  it('formats the estimate in whole Brazilian reais', () => {
    expect(formatAbaMonthlyCost(425.7)).toBe('R$\u00a0426')
  })
})
