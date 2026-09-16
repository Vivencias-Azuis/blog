// `reading-time` devolve "8 min read" (ingles). O site e pt-BR, entao o numeral e
// extraido e a unidade e escrita aqui. Modulo puro de proposito: entra no bundle do
// cliente sem arrastar lib/posts, que usa fs.
export function formatReadingTime(value: string): string {
  const minutes = value.match(/\d+/)?.[0]

  return minutes ? `${minutes} min de leitura` : ''
}
