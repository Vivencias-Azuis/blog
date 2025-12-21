# Motion

## Objetivo
Animacoes discretas para orientacao e feedback, sem distrair a leitura.

## Duracoes
| Token | Value | Uso |
| --- | --- | --- |
| motion.fast | 120ms | hover e micro feedback |
| motion.base | 200ms | transicoes de estado |
| motion.slow | 320ms | modais e drawers |

## Easing
- ease.standard: cubic-bezier(0.2, 0, 0, 1)
- ease.decel: cubic-bezier(0, 0, 0, 1)
- ease.accel: cubic-bezier(0.3, 0, 1, 1)

## Regras de uso
- Evitar animar altura de texto longo
- Preferir opacity e transform
- Respeitar prefers-reduced-motion
