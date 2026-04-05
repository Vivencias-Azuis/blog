export interface AccountMaterial {
  id: string
  title: string
  description: string
  type: 'internal-page' | 'download' | 'external-link'
  url: string
  membersOnly: boolean
  category?: string
}

export const accountMaterials: AccountMaterial[] = [
  {
    id: 'guia-boas-vindas',
    title: 'Guia de boas-vindas',
    description: 'Resumo pratico com links uteis para familias.',
    type: 'internal-page',
    url: '/minha-area/materiais/guia-boas-vindas',
    membersOnly: false,
    category: 'Comeco',
  },
  {
    id: 'roteiro-consultas',
    title: 'Roteiro para consultas e terapias',
    description: 'Material exclusivo para organizar perguntas e acompanhamentos.',
    type: 'internal-page',
    url: '/minha-area/materiais/roteiro-consultas',
    membersOnly: true,
    category: 'Exclusivo',
  },
]
