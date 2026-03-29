# AGENTS.md

## Escopo

Estas instruções valem para o projeto `VA_blog`, um app editorial em Next.js 15 com conteúdo MDX, captação de leads, SEO técnico e automações de operação de conteúdo.

## Estrutura que importa

- `src/app/`: App Router, páginas institucionais, blog e rotas API.
- `src/app/api/content/generate/route.ts`: geração assistida de conteúdo com OpenAI.
- `src/app/api/ebook-lead/route.ts` e `src/app/api/newsletter-lead/route.ts`: integração com Formspree.
- `src/content/posts/`: posts publicados em `.mdx`; filename define o slug.
- `src/lib/posts.ts`: leitura, ordenação, filtros, normalização de slug e bloqueio de posts futuros.
- `src/lib/metadata.ts`, `src/lib/editorial.ts`, `src/lib/taxonomy.ts`: SEO, autoria e taxonomia.
- `src/lib/content-factory/`: schemas, prompts e guardrails da fábrica de conteúdo.
- `public/`: assets públicos, PWA, imagens, `robots.txt`, `llms.txt`.
- `scripts/`: automações para geração, auditoria e manutenção editorial.

## Comandos padrão

- `npm run dev`: desenvolvimento local.
- `npm run dev:external`: desenvolvimento com acesso externo.
- `npm run lint`: validação mínima obrigatória.
- `npm run build`: validação forte para rotas, MDX e metadata.
- `npm run build:full`: regenera `llms.txt` antes do build.

Quando a tarefa mexer com conteúdo ou slugs, considere também:

- `npm run llms`
- `npm run calendar:check`
- `npm run normalize-filenames`

## Convenções do projeto

- Stack: Next.js App Router, React 19, TypeScript, Tailwind e MDX.
- Estilo atual: 2 espaços, aspas simples, sem ponto e vírgula.
- Use imports com alias `@/*` quando estiver em `src`.
- Não trate `date` como padrão novo. Prefira `datetime` no frontmatter.
- Categorias publicadas seguem capitalização editorial, como `Saúde`, `Educação`, `Direitos`, `Comunicação` e `Geral`.
- Slugs e filenames devem ser lowercase kebab-case, sem acentos.

## Regras editoriais e de conteúdo

- Nunca publique post com data futura sem entender o impacto: o app filtra esses posts em `getAllPosts()` e `getPostBySlug()`.
- Ao renomear post ou trocar slug, revise `next.config.mjs` para preservar redirects.
- Se a mudança tocar CTA, newsletter, e-book ou intenção comercial, revise componentes como `PostIntentCTA`, `NewsletterSignup` e `EbookLeadPopup`.
- Se a mudança tocar confiança editorial, revise `src/lib/editorial.ts` e a página `src/app/metodologia-editorial/page.tsx`.

## Regras para mudanças em IA

- O endpoint `/api/content/generate` depende de `OPENAI_API_KEY`.
- Requests são validadas com Zod e guardrails antes da chamada ao modelo.
- Conteúdo gerado deve ir para `src/content/review-queue/`, não para publicação automática.
- Se alterar schema, prompts ou validações, preserve compatibilidade entre:
  - `src/lib/content-factory/types.ts`
  - `src/lib/content-factory/guardrails.ts`
  - `src/lib/content-factory/validator.ts`
  - `src/app/api/content/generate/route.ts`

## Validação esperada

- Mudanças de código: rode `npm run lint` e `npm run build` quando viável.
- Mudanças de conteúdo: valide `/`, `/blog` e pelo menos um post afetado.
- Mudanças em formulários: teste `POST /api/ebook-lead` ou `POST /api/newsletter-lead` no fluxo real ou com inspeção local.
- Mudanças em slug/canonical/metadata: confira redirects, canonical e JSON-LD.

## O que evitar

- Não reintroduza texto genérico de template no README ou em páginas institucionais.
- Não assuma que `scripts/README.md` é a fonte da verdade; confira `package.json` e os scripts reais.
- Não remova redirects antigos sem confirmar que a URL já não recebe tráfego.
- Não sobrescreva mudanças do usuário em `docs/` ou outras áreas fora do escopo sem pedido explícito.
