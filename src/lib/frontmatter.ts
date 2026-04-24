import YAML from 'yaml'

export interface FrontmatterResult<T extends Record<string, unknown> = Record<string, unknown>> {
  data: T
  content: string
}

const FRONTMATTER_DELIMITER = '---'

export function parseFrontmatter<T extends Record<string, unknown> = Record<string, unknown>>(
  source: string
): FrontmatterResult<T> {
  if (!source.startsWith(`${FRONTMATTER_DELIMITER}\n`)) {
    return { data: {} as T, content: source }
  }

  const closingDelimiterIndex = source.indexOf(`\n${FRONTMATTER_DELIMITER}\n`, FRONTMATTER_DELIMITER.length + 1)

  if (closingDelimiterIndex === -1) {
    return { data: {} as T, content: source }
  }

  const rawYaml = source.slice(FRONTMATTER_DELIMITER.length + 1, closingDelimiterIndex)
  const content = source.slice(closingDelimiterIndex + `\n${FRONTMATTER_DELIMITER}\n`.length)
  const parsed = YAML.parse(rawYaml)

  return {
    data: (parsed && typeof parsed === 'object' ? parsed : {}) as T,
    content,
  }
}

export function stringifyFrontmatter(
  content: string,
  data: Record<string, unknown>
): string {
  const serialized = YAML.stringify(data, {
    defaultStringType: 'QUOTE_DOUBLE',
    lineWidth: 0,
  }).trimEnd()

  return `${FRONTMATTER_DELIMITER}\n${serialized}\n${FRONTMATTER_DELIMITER}\n\n${content.replace(/^\n+/, '')}`
}
