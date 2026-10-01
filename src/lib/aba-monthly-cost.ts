export const ABA_WEEKS_PER_MONTH = 4.3

export function estimateAbaMonthlyCost(
  sessionReais: number,
  sessionsPerWeek: number,
): number | null {
  if (!Number.isFinite(sessionReais) || !Number.isFinite(sessionsPerWeek)) return null
  if (sessionReais <= 0 || sessionsPerWeek <= 0) return null
  return sessionReais * sessionsPerWeek * ABA_WEEKS_PER_MONTH
}

export function formatAbaMonthlyCost(value: number, locale = 'pt-BR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}
