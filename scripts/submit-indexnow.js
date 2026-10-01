const KEY = '8f3c2a91b7d04e16b4c9e2a7f1d0c835'
const HOST = 'www.vivenciasazuis.com.br'
const BASE = `https://${HOST}`

const paths = [
  '/',
  '/blog',
  '/blog/terapia-aba-valor-2026-preco-sessoes-e-reembolso',
  '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
  '/blog/como-funciona-picture-exchange-communication-system-pecs',
  '/blog/dicionario-para-pais-de-criancas-autistas',
  '/blog/niveis-de-suporte-no-tea-e-seu-papel-no-diagnostic',
  '/blog/checklist-primeira-consulta-autismo',
  '/blog/hospitais-e-clinicas-gratuitas-para-autistas-no-br',
  '/blog/aba-para-pais',
  '/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
]

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${BASE}/${KEY}.txt`,
  urlList: paths.map((path) => `${BASE}${path}`),
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

const text = await response.text()
if (!response.ok) {
  throw new Error(`IndexNow failed: ${response.status} ${text}`)
}

console.log(`IndexNow ${response.status} ${body.urlList.length} urls`)
