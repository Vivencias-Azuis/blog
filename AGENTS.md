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
- `src/lib/account/`, `src/lib/auth/`, `src/lib/support/`: domínios separados por responsabilidade. `lib/` não tem arquivo guarda-chuva nem `utils`.
- `public/`: assets públicos, PWA, imagens, `robots.txt`, `llms.txt`.
- `scripts/`: automações para geração, auditoria e manutenção editorial.
- Testes espelham o source: `src/lib/support/pix-provider.ts` ↔ `src/lib/support/pix-provider.test.ts`, `src/components/X.tsx` ↔ `src/components/X.test.tsx`.

## Comandos padrão

- `npm test`: suíte completa do Vitest — 24 arquivos, 123 testes, ~4s, headless, sem setup manual. É o único comando de teste.
- `npm run typecheck`: `tsc --noEmit` sobre `**/*.ts`, testes incluídos. O build do Next só checa o código do app, então rode este para pegar erro de tipo em teste.
- `npm run lint`: lint do projeto inteiro.
- `npm run build`: validação forte para rotas, MDX e metadata.
- `npm run dev`: desenvolvimento local (porta 3000).
- `npm run dev:external`: desenvolvimento com acesso externo.
- `npm run build:full`: regenera `llms.txt` antes do build.

Antes de entregar código, rode: `npm run lint && npm run typecheck && npm test && npm run build`.

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

## Orçamentos e regras de código

Em ordem de prioridade. Nenhum é imposto pelo ESLint — não há `max-lines` nem regra de complexidade configurada, então a disciplina é sua.

- Arquivos: alvo 200–300 linhas, teto 500. Nenhum arquivo passa do teto hoje; os maiores são `src/app/blog/[slug]/page.tsx` (492), `src/app/termos-de-uso/page.tsx` (451) e `src/app/page.tsx` (418) — quebre antes de crescer, não depois.
- Página grande vira composição, não um componente só: `src/app/politica-de-privacidade/` é o modelo — `page.tsx` apenas monta, conteúdo em `sections/`, primitivos visuais em `privacy-layout.tsx`.
- Funções: 4–20 linhas, uma responsabilidade cada.
- Nomes grep-únicos e de domínio. Sem `Manager`, `Service`, `util`, `helper` como nome principal. Se `rg <nome>` devolve lixo, renomeie.
- Tipos explícitos na fronteira pública; sem `any`. Exceção atual: o mapa de componentes MDX em `src/app/blog/[slug]/page.tsx` (13 ocorrências).
- Máximo 2 níveis de control flow; use guard clause com early return.
- Erros carregam o valor ofensor, não só o que falhou — status, id ou payload. Padrão a seguir em `src/lib/support/abacate-pay.ts`: `` `Abacate Pay Pix create failed: status ${response.status}` ``.
- I/O (cliente HTTP, DB, relógio) entra por parâmetro — nunca hardcoded no fundo do módulo.
- Logging de debug segue `console.error('mensagem', { ...campos })`; texto puro só na saída para o usuário.
- Comentários: mantenha WHY e proveniência; remova só o que repete o código.

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

- Mudanças de código: rode `npm run lint && npm test && npm run build`. Todo comportamento novo precisa de teste novo; todo bugfix precisa de teste de regressão.
- Prefira fakes nomeados a stubs inline quando a dependência for I/O.
- Mudanças de conteúdo: valide `/`, `/blog` e pelo menos um post afetado.
- Mudanças em formulários: teste `POST /api/ebook-lead` ou `POST /api/newsletter-lead` no fluxo real ou com inspeção local.
- Mudanças em slug/canonical/metadata: confira redirects, canonical e JSON-LD.

## O que evitar

- Não reintroduza texto genérico de template no README ou em páginas institucionais.
- Não assuma que `scripts/README.md` é a fonte da verdade; confira `package.json` e os scripts reais.
- Peça antes de: dropar tabela, force-push, mexer em CI/CD (`amplify.yml`, `.github/`) ou publicar conteúdo.
- Não edite nem versione artefatos gerados (`next-env.d.ts`, `llms.txt`, `.next-dev/`, `tsconfig.tsbuildinfo`); `next dev` / `next build` e `npm run llms` regeneram.
- Não introduza retry, circuit breaker ou rate limit por conta própria — o projeto não pediu essas categorias; trate como mudança explícita.
- Não remova comentários de intenção ou proveniência ao refatorar: eles são contexto para a próxima sessão.
- Não remova redirects antigos sem confirmar que a URL já não recebe tráfego.
- Não sobrescreva mudanças do usuário em `docs/` ou outras áreas fora do escopo sem pedido explícito.
