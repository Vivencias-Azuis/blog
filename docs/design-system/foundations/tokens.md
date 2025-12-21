# Tokens

## Convencao de naming
- namespace.categoria.role.modifier
- Exemplo: color.bg.brand.soft

## Hierarquia
1. Raw values: #1E6DB0
2. Primitives: color.blue.600
3. Semantic: color.bg.brand
4. Component: card.article.bg

## Tokens iniciais (exemplo)
| Categoria | Token | Valor | Uso |
| --- | --- | --- | --- |
| Color | color.bg.page | sand.100 | fundo geral |
| Color | color.text.primary | sand.900 | texto principal |
| Color | color.link.default | blue.700 | links |
| Typography | type.body.md | 16px/26px | corpo |
| Spacing | space.4 | 16px | padding padrao |
| Radius | radius.md | 10px | cards |
| Shadow | shadow.sm | 0 1px 2px rgba(11,35,66,0.08) | card leve |
| Motion | motion.base | 200ms | transicao padrao |

## Regras de uso
- Component tokens devem mapear para semantic tokens
- Nunca referenciar raw values diretamente no componente
