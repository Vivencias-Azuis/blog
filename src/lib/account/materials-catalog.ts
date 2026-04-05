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
    type: 'download',
    url: '/downloads/guia-boas-vindas.pdf',
    membersOnly: false,
    category: 'Comeco',
  },
  {
    id: 'roteiro-consultas',
    title: 'Roteiro para consultas e terapias',
    description: 'Material exclusivo para organizar perguntas e acompanhamentos.',
    type: 'download',
    url: '/downloads/roteiro-consultas.pdf',
    membersOnly: true,
    category: 'Exclusivo',
  },
]
