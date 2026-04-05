# Design: Area do Usuario no VA_blog

## Contexto

O `VA_blog` e um app editorial em Next.js 15 com App Router, blog em MDX, captacao de leads e uma pagina `/apoie` com pagamentos via Stripe e Pix. Hoje o projeto ja possui Drizzle com SQLite/libSQL para persistencia de cobrancas Pix, mas nao possui autenticacao, area autenticada nem conceito de usuario final.

O objetivo desta feature e criar uma primeira versao de area do usuario com:

- cadastro e login abertos para qualquer pessoa
- perfil/conta com base em Clerk
- favoritos salvos
- materiais exclusivos para membros
- painel simples de assinatura/apoio

Decisoes ja validadas:

- autenticacao via Clerk
- qualquer pessoa pode criar conta
- apoiador ganha extras, mas a conta nao depende de assinatura
- liberacao de materiais exclusivos sera manual na V1
- materiais exclusivos comecam simples: mistura de paginas internas, links e downloads

## Objetivos da V1

- permitir que visitantes criem conta e entrem com seguranca
- exibir estado autenticado no header e dar acesso rapido a area do usuario
- permitir que usuarios salvem e removam posts favoritos
- oferecer uma area autenticada organizada em perfil, favoritos, materiais e assinatura
- exibir materiais exclusivos apenas para usuarios com permissao manual de membro
- reaproveitar o fluxo atual de apoio sem automatizar concessao de acesso nesta etapa

## Fora de escopo da V1

- sincronizacao automatica entre pagamento aprovado e permissao de membro
- migracao de conteudo editorial para posts privados em MDX
- sistema de comentarios, comunidade ou mensageria
- relatorios administrativos
- organizacoes, multiplos perfis por familia ou permissao granular por tipo de material
- automacao completa de billing dentro da area autenticada

## Abordagem recomendada

### Opcao escolhida

Usar o Clerk como fonte primaria de autenticacao e sessao, com permissao manual de membro no proprio Clerk, enquanto o banco do app armazena apenas dados funcionais do produto.

### Motivos

- reduz risco em login, sessao, troca de senha e seguranca basica
- encaixa bem no App Router ja existente
- evita modelar um sistema de identidade paralelo sem necessidade imediata
- preserva liberdade para evoluir permissao manual para automatica depois
- mantem o banco local focado no que e realmente do produto

## Arquitetura

### Identidade e sessao

- `@clerk/nextjs` sera instalado no projeto
- `proxy.ts` usara `clerkMiddleware()` conforme a direcao validada
- `ClerkProvider` ficara dentro de `<body>` em `src/app/layout.tsx`
- componentes do Clerk cuidarao de `sign in`, `sign up` e `user button`
- rotas autenticadas usarao verificacao por `auth()` no servidor

### Autorizacao de membro

O controle de acesso exclusivo sera feito manualmente no Clerk. A flag de membro sera lida a partir de uma propriedade controlada no painel do Clerk e exposta ao app por um helper unico de autorizacao.

Para a V1, o app tratara esse estado como booleano:

- `isMember = true`: pode acessar materiais exclusivos
- `isMember = false`: ve vitrine e CTA para apoiar

O app deve encapsular a leitura dessa permissao em um helper unico para evitar espalhar detalhes do Clerk pela base.

### Persistencia do app

O banco atual com Drizzle sera expandido com tabelas pequenas e objetivas:

- `user_favorites`
- opcionalmente `user_profiles` ou `user_preferences` apenas se surgir necessidade real na implementacao

`user_favorites` sera a persistencia minima obrigatoria da V1.

Campos esperados para `user_favorites`:

- `id`
- `clerkUserId`
- `postSlug`
- `createdAt`

Restricao unica recomendada:

- `(clerkUserId, postSlug)`

Isso garante idempotencia ao favoritar e simplifica a API.

### Catalogo de materiais

Para manter a V1 enxuta, os materiais nao serao um novo CMS. O catalogo inicial sera simples e controlado pelo app, com suporte a:

- titulo
- descricao curta
- tipo (`internal-page`, `download`, `external-link`)
- url
- `membersOnly`
- categoria opcional

Implementacao recomendada para V1:

- catalogo em modulo TypeScript versionado no repositorio

Implementacao futura possivel:

- mover catalogo para banco ou CMS quando houver volume suficiente

## Superficie do produto

### Header

O header atual ganhara estado autenticado:

- visitante: botoes de entrar e criar conta
- autenticado: link para `Minha area` e `UserButton`

No mobile, a mesma capacidade deve existir no menu recolhido.

### Rotas novas

Estrutura sugerida:

- `/minha-area`
- `/minha-area/perfil`
- `/minha-area/favoritos`
- `/minha-area/materiais`
- `/minha-area/assinatura`

Rotas auxiliares esperadas:

- pagina(s) de sign in / sign up do Clerk conforme integracao escolhida
- endpoint(s) internos para listar/adicionar/remover favoritos

### Pagina raiz da area

`/minha-area` funciona como dashboard simples com quatro cards:

- conta/perfil
- favoritos
- materiais
- assinatura

Tambem deve mostrar um resumo de acesso:

- usuario comum
- membro com acesso exclusivo

### Perfil

A area de perfil deve priorizar simplicidade:

- nome e email vindos do Clerk
- acesso a gerenciamento basico da conta via Clerk
- explicacao curta sobre status de membro

Nao ha necessidade de formulario de perfil complexo na V1.

### Favoritos

O usuario autenticado podera salvar posts do blog e rever essa lista em `/minha-area/favoritos`.

Requisitos:

- acao de favoritar/desfavoritar diretamente no card ou no post
- lista ordenada do mais recente para o mais antigo salvo
- resiliencia quando um slug deixar de existir

Comportamento para posts indisponiveis:

- remover do resultado ao listar, ou
- exibir item como indisponivel

Recomendacao: remover do resultado da listagem final para nao poluir a experiencia.

### Materiais

`/minha-area/materiais` mostrara um catalogo misto:

- materiais abertos para qualquer usuario logado
- materiais exclusivos para membros

Comportamento:

- membro: acessa tudo
- nao membro: acessa apenas materiais abertos e ve CTA nos exclusivos

Tipos de material:

- pagina interna com conteudo estatico
- arquivo para download
- link externo curado

### Assinatura

`/minha-area/assinatura` sera um painel simples, nao um billing center completo.

Deve mostrar:

- status atual de membro no produto
- explicacao de que a liberacao e manual na V1
- CTA para `/apoie`
- mensagem clara de suporte caso a pessoa ja tenha apoiado e ainda nao tenha acesso

Nao deve prometer sincronizacao automatica que ainda nao existe.

## Fluxos principais

### Fluxo 1: visitante cria conta

1. Visitante clica em entrar ou criar conta no header
2. Clerk conduz cadastro/login
3. Usuario volta autenticado
4. Header muda para estado autenticado
5. Usuario pode acessar `/minha-area`

### Fluxo 2: usuario salva favorito

1. Usuario autenticado abre um post ou card
2. Clica em salvar
3. App persiste favorito por `clerkUserId + postSlug`
4. Estado visual confirma sucesso
5. Item aparece em `/minha-area/favoritos`

Se o usuario nao estiver autenticado:

1. clica em salvar
2. app solicita login/cadastro
3. apos autenticacao, o usuario pode repetir a acao

### Fluxo 3: usuario acessa materiais

1. Usuario autenticado entra em `/minha-area/materiais`
2. App identifica se e membro
3. Renderiza materiais liberados
4. Itens exclusivos sem acesso mostram bloqueio e CTA

### Fluxo 4: membro acessa material exclusivo

1. Usuario autenticado com permissao manual de membro abre catalogo
2. App identifica `isMember = true`
3. Material exclusivo aparece desbloqueado
4. Usuario acessa a pagina, download ou link normalmente

## Componentes e modulos

### Modulos novos esperados

- `src/lib/auth/*` para helpers de sessao e permissao
- `src/lib/memberships/*` ou helper equivalente para resolver `isMember`
- `src/lib/account/materials-catalog.ts` para o catalogo inicial
- `src/lib/account/favorites.ts` para acesso aos favoritos

### UI nova esperada

- componente de estado autenticado no header
- botao de favorito reutilizavel
- layout da area do usuario
- cards de resumo da conta
- lista de materiais
- estado bloqueado para item exclusivo

## Modelo de dados inicial

### user_favorites

Tabela proposta:

- `id` integer primary key
- `clerk_user_id` text not null
- `post_slug` text not null
- `created_at` text not null

Indices:

- unique index em `clerk_user_id + post_slug`
- index simples em `clerk_user_id`

Racional:

- leitura por usuario
- escrita simples
- nenhuma dependencia de tabela local de usuarios

## Protecao de rota

### Area autenticada

Todas as rotas em `/minha-area/*` exigem sessao valida.

Se nao houver sessao:

- redirecionar para sign in

### Conteudo exclusivo

Itens e rotas exclusivas exigem:

- sessao valida
- permissao manual de membro

Se a sessao existir mas a permissao faltar:

- renderizar estado de acesso negado com CTA para `/apoie`

Nao usar erro tecnico generico para esse caso.

## Conteudo e UX

### Tom da experiencia

A area do usuario precisa manter a linguagem acolhedora e pratica do site, sem cara de painel corporativo. O design deve conversar com a identidade editorial existente.

### Navegacao

O nome recomendado para a feature no produto e `Minha area`. Evita termos frios como `dashboard` para esse contexto.

### Mensagens importantes

- para nao membros: explicar que a conta e gratuita, mas alguns materiais sao reservados para membros
- para membros: deixar claro que o acesso exclusivo esta liberado
- para apoiadores sem acesso liberado ainda: orientar contato ou canal de suporte

## Erros e resiliencia

- favorito duplicado nao deve quebrar a experiencia
- slug inexistente em favorito nao deve causar erro 500
- falha em leitura da permissao de membro deve cair em modo conservador: usuario autenticado sem acesso exclusivo
- falha em endpoint de favoritos deve mostrar mensagem curta e acionavel

## Testes esperados

### Automatizados

- helper de permissao de membro
- operacoes de favoritos
- protecao de rotas autenticadas
- bloqueio/liberacao de materiais exclusivos

### Manuais

- cadastro e login
- header desktop autenticado
- menu mobile autenticado
- favoritar e desfavoritar post
- visualizacao da lista de favoritos
- acesso de nao membro e membro em `/minha-area/materiais`
- CTA de assinatura levando para `/apoie`

## Evolucao prevista depois da V1

- sincronizar assinatura/pagamento com permissao de membro
- transformar materiais exclusivos em conteudo administravel
- historico de apoio/assinatura na area do usuario
- preferncias de conteudo e notificacoes
- biblioteca privada de posts ou series exclusivas

## Riscos e mitigacoes

### Dependencia de autorizacao manual

Risco:

- usuarios apoiam e esperam liberacao imediata

Mitigacao:

- comunicar claramente na UX que a liberacao inicial e manual
- expor canal de suporte na pagina de assinatura

### Acoplamento ao Clerk

Risco:

- detalhes de permissao ficam espalhados pela base

Mitigacao:

- centralizar auth e membership em helpers pequenos

### Escopo crescer demais

Risco:

- tentar resolver billing, CMS privado e perfil completo na mesma entrega

Mitigacao:

- manter V1 em quatro pilares: auth, favoritos, materiais, assinatura simples

## Criterios de aceite

- usuario consegue criar conta e entrar no site
- header reflete corretamente estados autenticado e visitante
- usuario autenticado consegue acessar `/minha-area`
- usuario autenticado consegue favoritar e desfavoritar posts
- usuario ve seus favoritos salvos em uma pagina dedicada
- materiais exclusivos aparecem bloqueados para nao membros
- materiais exclusivos ficam disponiveis para membros com permissao manual
- pagina de assinatura orienta para o fluxo atual de apoio sem prometer automacao inexistente
