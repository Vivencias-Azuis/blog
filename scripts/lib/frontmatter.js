import YAML from 'yaml'

const FRONTMATTER_DELIMITER = '---'

export function parseFrontmatter(source) {
  if (!source.startsWith(`${FRONTMATTER_DELIMITER}\n`)) {
    return { data: {}, content: source }
  }

  const closingDelimiterIndex = source.indexOf(`\n${FRONTMATTER_DELIMITER}\n`, FRONTMATTER_DELIMITER.length + 1)

  if (closingDelimiterIndex === -1) {
    return { data: {}, content: source }
  }

  const rawYaml = source.slice(FRONTMATTER_DELIMITER.length + 1, closingDelimiterIndex)
  const content = source.slice(closingDelimiterIndex + `\n${FRONTMATTER_DELIMITER}\n`.length)
  const parsed = YAML.parse(rawYaml)

  return {
    data: parsed && typeof parsed === 'object' ? parsed : {},
    content,
  }
}

export function stringifyFrontmatter(content, data) {
  const serialized = YAML.stringify(data, {
    defaultStringType: 'QUOTE_DOUBLE',
    lineWidth: 0,
  }).trimEnd()

  return `${FRONTMATTER_DELIMITER}\n${serialized}\n${FRONTMATTER_DELIMITER}\n\n${content.replace(/^\n+/, '')}`
}
