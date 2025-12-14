# Roadmap de execução (a partir de `analise_artigos_vivencias_azuis.txt`)

Este documento transforma a análise/roadmap em um checklist executável dentro deste repositório (Next.js + MDX).

## Objetivo (90 dias)

- Subir CTR de `0,01%` para `0,5%–2%` com otimização on-page + snippets.
- Aumentar cliques/mês de ~`33` para `300–600` (com base na projeção do relatório).

## Pré-requisitos

- Acesso ao Google Search Console do domínio.
- Lista dos posts e slugs (arquivos em `src/content/posts/*.mdx`).
- Ambiente local:
  - `npm install`
  - `npm run dev`

## Como este blog funciona (o que você vai editar)

- Conteúdo e frontmatter dos posts: `src/content/posts/*.mdx`
  - Campos relevantes: `title`, `excerpt`, `datetime` (ou `date`), `author`, `category`, `tags`, `featured`, `coverImage`.
- SEO/metadata do post:
  - O `title` e `excerpt` do frontmatter alimentam o `generateMetadata` em `src/app/blog/[slug]/page.tsx`.
- Schema atual:
  - Já existe JSON-LD básico (Article/BlogPosting e Breadcrumb) em `src/app/blog/[slug]/page.tsx`.

## Fase 1 — Quick wins (2 semanas)

### 1) Reescrever títulos e meta descriptions (4–6h)

1. No Search Console, filtre:
   - Páginas com mais impressões (últimos 28 dias).
   - Posições médias ruins (página 2+).
2. Selecione 10 posts (os que já “aparecem” mais).
3. Para cada post selecionado:
   - Atualize `title` no frontmatter do `.mdx` correspondente.
   - Atualize `excerpt` (meta description) com:
     - benefício claro + CTA,
     - “âncora de ano” quando fizer sentido (`2025`),
     - termos de intenção (“como”, “quanto custa”, “guia”, “lista”, “passo a passo”).

Sugestões do relatório (substitua pelos slugs reais):

- `Qual Plano de Saúde Cobre Autismo [2025]? Cobertura Completa + Lei`
- `Melhor Plano de Saúde para Autismo: Cobertura Completa + Comparativo`
- `Autismo em Adultos: Diagnóstico Tardio, Trabalho e Direitos [2025]`
- `Lei Berenice Piana: Direitos Completos para Autistas no Brasil [2025]`
- `Gratuidades para Autismo: Lista Completa de Direitos 2025`
- `BPC para Autismo: Quanto Ganho + Como Solicitar no INSS [2025]`
- `Terapia ABA para Autismo: Como Funciona + Custo + Como Começar`
- `PECS para Autismo: Como Funciona + Fases + Exercícios [Guia 2025]`
- `TEACCH no Autismo: Princípios + Como Aplicar + Atividades Práticas`

Observação do relatório:

- Para `15 Hospitais para Autistas`, manter título e ajustar o `excerpt` para incluir `SUS + Convênios`.

### 2) Otimizar para featured snippets (2–3h)

Para cada um dos 5 posts com mais impressões:

- Adicione logo no início do MDX:
  - 1–2 parágrafos de “resposta direta” (estilo snippet),
  - uma lista numerada/“Top X” (quando aplicável),
  - uma tabela simples de comparação (quando aplicável).
- Finalize com uma seção `## Perguntas frequentes` contendo 4–8 perguntas objetivas.

### 3) Schema markup (2–3h)

Checklist do relatório:

- [ ] `BreadcrumbList` (já existe)
- [ ] `Article`/`BlogPosting` (já existe)
- [ ] `FAQPage` (adicionar quando houver seção de FAQ)

Execução sugerida no repositório:

1. Padronize a seção `## Perguntas frequentes` nos posts “top traffic”.
2. Depois, implemente `FAQPage` em `src/app/blog/[slug]/page.tsx` (gerando JSON-LD a partir de um bloco estruturado do MDX ou de frontmatter).

## Fase 2 — Gaps de conteúdo (2–4 semanas)

Meta do relatório: criar 15 novos artigos estratégicos (25–30h).

### A) Comparativos (5)

- `ABA vs DIR Floortime: Qual terapia escolher? [Comparativo 2025]`
- `Escola Regular vs Escola Especial para Autismo: Prós e Contras`
- `Diagnóstico Privado vs SUS: Tempo, Custo e Qualidade`
- `Terapia Online vs Presencial para Autismo`
- `Risperidona vs Fluoxetina vs Melatonina: Medicamentos para Autismo`

### B) Guias práticos (5)

- `Como começar PECS em casa: Guia passo a passo + Templates`
- `30 Atividades de Terapia Ocupacional em Casa [Com Vídeos]`
- `ABA em Casa: 10 Exercícios Práticos Para Fazer Agora`
- `Como explicar autismo para avós, tios e familiares`
- `Preparando autista para primeira consulta: Checklist`

### C) Pain points urgentes (5)

- `Filho autista bate em mim: Estratégias comprovadas`
- `Crises de agressividade em autismo: O que fazer no momento`
- `Autismo e ansiedade: Sinais, Causas e 20 Estratégias`
- `Sensibilidade ao barulho: 25 Soluções Práticas`
- `Autista no restaurante: Como preparar e não ter vergonha`

Execução no repositório:

1. Crie os arquivos em `src/content/posts/` em kebab-case (ex.: `aba-vs-dir-floortime-comparativo-2025.mdx`).
2. Garanta frontmatter completo (campos listados no topo deste doc).
3. Revise data (`datetime`) para não ficar no futuro (posts futuros são ignorados).

## Fase 3 — Backlinks e autoridade (1–3 meses)

Checklist do relatório:

- [ ] Contatar 10 influenciadoras/mães do nicho e 10 profissionais (TO, psicólogos, fono, neuroped).
- [ ] Produzir 1 ativo “linkável” (infográfico, pesquisa, checklist visual).
- [ ] Fazer 1 guest post/mês em portal relevante (saúde/educação/pais).

## Fase 4 — Otimização técnica (contínua)

Checklist do relatório:

- [ ] PageSpeed (mobile): < 2s
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1
- [ ] Sitemap XML enviado no Search Console
- [ ] `robots.txt` revisado
- [ ] Estratégia de links internos (hub and spoke)
- [ ] Imagens otimizadas (ALT, compressão, lazy loading)
- [ ] SSL/HTTPS ok
- [ ] Schema JSON-LD em todos os artigos

Comandos úteis no projeto:

- `npm run lint`
- `npm run build`
- `npm run build:full`

## Priorização (o que fazer primeiro)

- Semana 1–2:
  - [ ] Reescrever títulos dos 10 principais artigos
  - [ ] Melhorar `excerpt` com CTA + year
  - [ ] Adicionar lista/tabela/FAQ nos 5 artigos com mais impressões
- Semana 3–4:
  - [ ] Publicar 10 novos artigos (5 comparativos + 5 práticos)
- Semana 5–8:
  - [ ] Rodada de backlinks (contatos + 1 ativo linkável + 1 guest post)
- Mês 3:
  - [ ] Consolidar (PageSpeed + internal linking + schema completo)

## Referências internas

- Playbook: `docs/playbook-seo-ia.md`
- Calendário: `docs/publication-calendar.md`
