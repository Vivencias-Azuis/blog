# Vivências Azuis

Blog editorial em Next.js voltado a famílias atípicas, com foco prático em autismo, direitos, terapias, rotina e decisões sobre planos de saúde. O projeto combina conteúdo em MDX, SEO técnico, captação de leads e automações para produção editorial.

## Visão geral

- Stack principal: Next.js 15, React 19, TypeScript, Tailwind CSS e MDX.
- Modelo de conteúdo: posts em `src/content/posts/*.mdx`, renderizados via App Router.
- Distribuição editorial: home orientada por jornadas, listagem de blog, páginas institucionais e páginas de autor.
- Aquisição e retenção: CTAs, newsletter, popup de e-book e endpoints próprios para envio via Formspree.
- Operação de conteúdo: scripts de geração, normalização de arquivos, auditoria de CTA e fábrica de conteúdo com OpenAI.
- SEO e confiança: metadata centralizada, JSON-LD, redirects canônicos, `llms.txt`, PWA e filtros para não publicar posts com data futura.

## Principais áreas do projeto

```text
src/
  app/
    api/
      content/generate/      Geração assistida de conteúdo em MDX
      ebook-lead/            Captura de leads do e-book
      newsletter-lead/       Captura de leads da newsletter
    blog/                    Listagem e detalhe de posts
    autores/[slug]/          Páginas de autor
    contato/                 Página e metadata de contato
    metodologia-editorial/   Transparência editorial
    politica-de-privacidade/ Página institucional
    sobre/                   Página institucional
    termos-de-uso/           Página institucional
  components/                UI de páginas, blog, tracking, CTA e PWA
  content/posts/             Base editorial publicada em MDX
  lib/                       Posts, metadata, taxonomia, editorial e analytics
  lib/content-factory/       Guardrails, prompts e schemas da geração por IA
public/                      Assets, manifest, service worker, robots, llms.txt
scripts/                     Automações editoriais e manutenção de conteúdo
```

Hoje o repositório tem 90 posts em `src/content/posts/`.

## Requisitos

- Node.js `>=20.19.0`
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O app sobe em `http://localhost:3000`.

Para expor na rede local:

```bash
npm run dev:external
```

## Scripts disponíveis

### Aplicação

- `npm run dev`: ambiente local com `NEXT_DIST_DIR=.next-dev`
- `npm run dev:external`: expõe o servidor em `0.0.0.0`
- `npm run build`: build de produção
- `npm run start`: sobe a aplicação buildada
- `npm run lint`: roda ESLint no projeto inteiro

### Conteúdo e operação editorial

- `npm run llms`: regenera `public/llms.txt`
- `npm run cta:audit`: audita CTAs dos posts
- `npm run content:generate`: executa a automação local de geração de conteúdo
- `npm run calendar:check`: valida regras de calendário/publicação
- `npm run normalize-filenames`: simula normalização de nomes para kebab-case
- `npm run normalize-filenames:execute`: aplica a normalização de nomes
- `npm run convert-md-to-mdx`: simula conversão de `.md` para `.mdx`
- `npm run convert-md-to-mdx:execute`: aplica a conversão
- `npm run download-external-images`: baixa imagens externas referenciadas nos posts
- `npm run fix-image-names`: corrige nomes de assets de imagem
- `npm run build:full`: gera `llms.txt` e roda o build

## Variáveis de ambiente

Crie um `.env.local` quando precisar dessas integrações:

```bash
# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Leads
FORMSPREE_EBOOK_ENDPOINT=https://formspree.io/f/xxxxxxx
FORMSPREE_NEWSLETTER_ENDPOINT=https://formspree.io/f/xxxxxxx

# Fábrica de conteúdo
OPENAI_API_KEY=sk-...
OPENAI_CONTENT_MODEL=gpt-4.1-mini
OPENAI_MAX_OUTPUT_TOKENS=3500

# Apoio e pagamentos
NEXT_PUBLIC_SITE_URL=https://www.vivenciasazuis.com.br
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID_APOIAR=price_xxx
STRIPE_PRICE_ID_FORTALECER=price_xxx
STRIPE_PRICE_ID_SUSTENTAR=price_xxx
ABACATE_PAY_API_KEY=abacate_test_xxx
```

Observações:

- `FORMSPREE_NEWSLETTER_ENDPOINT` faz fallback para `FORMSPREE_EBOOK_ENDPOINT`.
- Sem `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, o tracking fica desativado.
- O endpoint `/api/content/generate` exige `OPENAI_API_KEY`.
- A página `/apoie` exige as variáveis de Stripe, Abacate Pay e `NEXT_PUBLIC_SITE_URL`.
- O webhook do Stripe em `/api/support/stripe/webhook` exige `STRIPE_WEBHOOK_SECRET` e deve receber os eventos `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated` e `customer.subscription.deleted`.

## Fluxo editorial

### Publicar um novo post manualmente

1. Crie um arquivo `.mdx` em `src/content/posts/`.
2. Use filename em kebab-case, sem acentos.
3. Preencha o frontmatter mínimo.
4. Rode `npm run lint` e, idealmente, `npm run build`.

Exemplo:

```mdx
---
title: "Título do post"
excerpt: "Resumo curto e claro."
datetime: "2026-03-28T09:00:00-03:00"
author: "Equipe Vivências Azuis"
category: "Saúde"
tags: ["autismo", "rotina", "familia"]
featured: false
coverImage: "/images/posts/exemplo.png"
---

Conteúdo em MDX.
```

### Regras importantes de conteúdo

- `datetime` é o campo preferido no frontmatter.
- `date` ainda é aceito como legado.
- Posts com data futura não entram em listagens, rotas estáticas nem leitura normal.
- Slugs são derivados do nome do arquivo e normalizados.
- Alterou slug ou renomeou arquivo? revise `next.config.mjs` para manter redirects.

### Geração assistida por IA

O endpoint `POST /api/content/generate` recebe um payload estruturado, valida o pedido com `zod`, aplica guardrails e salva o resultado em `src/content/review-queue/`.

Categorias aceitas na request:

- `direitos`
- `educacao`
- `saude`
- `comunicacao`
- `geral`

Tipos aceitos:

- `comparativo`
- `guia-pratico`
- `pain-point`
- `explicativo`
- `lista`
- `tendencia`
- `local`

O conteúdo gerado não vai direto para publicação. Ele entra em fila de revisão.

## SEO, distribuição e produto

- Metadata centralizada em `src/lib/metadata.ts`.
- Artigos com JSON-LD de `BlogPosting` e breadcrumbs.
- Redirects permanentes para slugs antigos em `next.config.mjs`.
- `public/llms.txt` gerado por script para descoberta por LLMs.
- `robots.txt`, `ads.txt`, Open Graph e imagens institucionais em `public/`.
- PWA habilitado em produção com `next-pwa`.

## Endpoints internos

- `POST /api/ebook-lead`: envia leads do e-book para Formspree
- `POST /api/newsletter-lead`: envia leads da newsletter para Formspree
- `POST /api/content/generate`: gera rascunhos editoriais em MDX
- `POST /api/support/subscribe`: inicia checkout recorrente no Stripe
- `POST /api/support/stripe/webhook`: sincroniza eventos assinados do Stripe com o Clerk
- `POST /api/support/donate/card`: inicia checkout avulso no Stripe
- `POST /api/support/donate/pix`: gera cobrança Pix no Abacate Pay
- `GET /api/support/donate/pix/[chargeId]`: consulta status do Pix
- `GET /api/support/stripe/session`: consulta status mínimo da sessão Stripe

## Qualidade e validação

Antes de subir mudanças:

```bash
npm run lint
npm run build
```

Para mudanças editoriais, também vale validar manualmente:

- `/`
- `/blog`
- um post alterado em `/blog/[slug]`
- captação via newsletter/e-book, se a mudança tocar formulários

## Deploy

O projeto está preparado para deploy de aplicação Next.js com build padrão. Existe `amplify.yml` no repositório, então AWS Amplify já faz parte do fluxo previsto, mas o app também funciona em plataformas como Vercel se as variáveis de ambiente forem replicadas.
