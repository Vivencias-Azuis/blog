# Checklist Operacional GA4 + Looker (SEO e Conversão)

## Objetivo
Padronizar medição do funil `view_post -> click_cta -> lead_submit` e cliques de afiliado (`affiliate_click`) para tomada de decisão semanal.

## 1) Pré-requisitos
- [ ] `NEXT_PUBLIC_GA4_MEASUREMENT_ID` configurado em produção.
- [ ] Eventos já enviados pelo site: `view_post`, `click_cta`, `lead_submit`, `affiliate_click`.
- [ ] Acesso ao GA4 e ao Looker Studio.

## 2) Configuração no GA4 (uma vez)
Criar dimensões personalizadas (escopo **Evento**):
- [ ] `slug`
- [ ] `category`
- [ ] `cta_name`
- [ ] `lead_type`
- [ ] `origem`
- [ ] `location`
- [ ] `target_url`
- [ ] `link_url`

Marcar conversões:
- [ ] `lead_submit`
- [ ] `affiliate_click`

## 3) Estrutura mínima do dashboard (Looker)
### Aba 1 — Visão geral
- [ ] Cliques (GSC)
- [ ] Impressões (GSC)
- [ ] CTR (GSC)
- [ ] Posição média (GSC)
- [ ] `lead_submit` (GA4)
- [ ] `affiliate_click` (GA4)

### Aba 2 — SEO por página
- [ ] Tabela por URL/slug com impressões, cliques, CTR e posição.
- [ ] Filtro para páginas com `impressões >= 20` e `CTR = 0`.

### Aba 3 — Funil por slug
- [ ] `view_post` por slug
- [ ] `click_cta` por slug
- [ ] `lead_submit` por slug
- [ ] Taxas calculadas:
  - [ ] `click_cta / view_post`
  - [ ] `lead_submit / view_post`

### Aba 4 — Afiliado
- [ ] `affiliate_click` por `link_url`
- [ ] `affiliate_click` por página de origem (`location`)

## 4) Rotina semanal (45 min)
1. [ ] Abrir aba SEO e listar 3 páginas com mais impressões e CTR baixo.
2. [ ] Abrir funil por slug e identificar 3 páginas com muito `view_post` e baixo `click_cta`.
3. [ ] Definir ações da semana (1-2 otimizações de title/excerpt + 1 melhoria de CTA).
4. [ ] Registrar decisões no arquivo de acompanhamento quinzenal.

## 5) Critério de sucesso (90 dias)
- [ ] CTR médio >= 2,0%
- [ ] Pelo menos 7 páginas quick win com CTR > 1,5%
- [ ] `lead_submit / view_post` >= 2,5% nas páginas foco
