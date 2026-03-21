export const CANONICAL_POST_REDIRECTS: Record<string, string> = {
  'melhor-plano-de-saude-para-autismo-guia-completo': 'melhores-planos-de-saude-para-criancas-com-autismo',
  'melhor-plano-de-saude-para-crianca-autista-checklist-2026': 'melhores-planos-de-saude-para-criancas-com-autismo',
  'qual-plano-de-saude-cobre-terapia-aba-2026': 'qual-plano-de-saude-cobre-terapia-aba-autismo',
  'comunicacao-nao-verbal-autismo-o-que-fazer-guia-2026': 'crianca-autista-nao-fala-passo-a-passo-2026',
  'psicologia-aba-como-funciona-na-pratica-2026': 'aba-para-pais',
  'lei-berenice-piana-atualizada-2026-pdf-e-direitos': 'lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
  'como-conseguir-vaga-hospitais-clinicas-gratuitas-tea': 'hospitais-e-clinicas-gratuitas-para-autistas-no-br',
}

export function getCanonicalPostSlug(slug: string) {
  return CANONICAL_POST_REDIRECTS[slug]
}

export function isDeprecatedPostSlug(slug: string) {
  return slug in CANONICAL_POST_REDIRECTS
}
