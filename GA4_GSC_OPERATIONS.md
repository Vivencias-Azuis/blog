# GA4 + GSC Operations

Runbook operacional para o Vivências Azuis, cobrindo o que foi implementado no código e o que ainda precisa ser configurado manualmente no GA4.

## Propriedade alvo

- GA4: `properties/524650995`
- Nome atual da propriedade: `Vivencias Azuil`
- Search Console: `sc-domain:vivenciasazuis.com.br`

## Ritual GSC pós-otimização SEO (Performance)

**Filtros padrão de análise:** Pesquisa Web · **Brasil** · últimos 28 dias · comparar com 28 anteriores.

Baseline de referência (export 20/04–19/07/2026, global Web):

| Métrica | Baseline 3m | Meta 30d | Meta 90d |
|---------|------------:|---------:|---------:|
| Cliques | 191 | 260 | 400–500 |
| CTR (BR) | ~1,5% | ≥2,0% | ≥2,5% |
| Páginas com ≥10 cliques | ~6 | 8 | ≥12 |
| Pos. média top 3 páginas | 6–9 | ≤7 | ≤6 |

### Calendário

1. **Dia 0 (deploy):** anotar data no GA4; no GSC, inspecionar e solicitar indexação das URLs prioritárias (ABA valor, planos, níveis, PECS, dicionário, aba-para-pais, Berenice).
2. **Dia 7:** CTR e impressões das 6 URLs top (sem esperar posição).
3. **Dia 28:** cliques totais BR, CTR, contagem de páginas ≥10 cliques.
4. **Dia 90:** validar metas da tabela.

### Alertas

- **Sucesso parcial:** CTR de níveis / aba-para-pais sobe sem queda forte de impressões; Berenice sai de 0 cliques; impressões de ABA valor estáveis com mais cliques.
- **Problema:** queda >30% de impr em hub após rewrite → reverter title; duas URLs ABA competindo nas mesmas queries → reforçar descanibalização.

### Higiene de subdomínios (impressões sem valor)

- `clerk.vivenciasazuis.com.br` — auth; não deve rankear (configurar noindex no Clerk Dashboard / hosting se aparecer no GSC).
- `jogos.vivenciasazuis.com.br` — app de jogos; preferir `noindex` se o SEO do domínio principal for prioridade (repo `autism-games`).
- Analisar KPIs com filtro **Brasil** para reduzir ruído de impressões EUA (~0% CTR).

## Contrato de eventos implementado

Eventos principais:

- `view_post`
- `click_cta`
- `form_start`
- `lead_submit`

Eventos auxiliares:

- `contact_submit`
- `affiliate_click`

Parâmetros enviados pelos eventos principais:

- `page_type`
- `post_slug`
- `post_category`
- `cta_id`
- `cta_location`
- `lead_type`
- `traffic_intent`
- `content_cluster`

Taxonomia operacional:

- `planos`
- `direitos`
- `terapias`
- `comunicacao`
- `rotina`

## Configuração manual pendente no GA4

Esses passos não são automatizados pelo repositório.

### 1. Marcar key event

Marcar apenas:

- `lead_submit`

Não marcar como key events:

- `form_start`
- `click_cta`
- `view_post`
- `contact_submit`

### 2. Registrar custom dimensions

Criar dimensões personalizadas de evento para:

- `page_type`
- `post_slug`
- `post_category`
- `cta_id`
- `cta_location`
- `lead_type`
- `traffic_intent`
- `content_cluster`

### 3. Ajustes de governança

- Corrigir a moeda da propriedade, hoje em `USD`, para a moeda operacional correta.
- Adicionar anotações sempre que houver:
  - mudança importante de tracking
  - mudança relevante de SEO
  - publicação/atualização das páginas prioritárias

## Páginas prioritárias

- `/blog/melhores-planos-de-saude-para-criancas-com-autismo`
- `/blog/aba-para-pais`
- `/blog/niveis-de-suporte-no-tea-e-seu-papel-no-diagnostic`
- `/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil`
- `/blog/como-funciona-picture-exchange-communication-system-pecs`

## Leitura semanal recomendada

Cruzar GSC e GA4 por landing page.

Perguntas mínimas:

1. Quais 5 páginas ganharam mais impressões?
2. Quais 5 páginas perderam CTR?
3. Quais páginas geraram `click_cta`?
4. Quais páginas geraram `lead_submit`?
5. Quais queries novas justificam novos artigos ou páginas satélite?

Regras de leitura:

- muita impressão + baixa CTR = problema de snippet e promessa
- boa entrada + pouco `click_cta` = problema de CTA ou estrutura
- bom `click_cta` + pouco `lead_submit` = problema de oferta ou formulário
- tráfego alto + `(not set)` em landing page = problema de instrumentação

## Observações atuais

- O dado agregado do sitemap no GSC apareceu inconsistente (`submitted > indexed = 0`), mas inspeções de URL mostraram páginas como enviadas e indexadas.
- Há bucket `(not set)` em `landingPagePlusQueryString`; isso deve ser monitorado após a nova instrumentação.
