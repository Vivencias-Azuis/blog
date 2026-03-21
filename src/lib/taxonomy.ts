export function normalizeTaxonomyValue(rawValue: string): string {
  return rawValue
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
