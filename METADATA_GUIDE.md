# Guia de Metatags para Pré-visualização de Links

Este guia explica como o sistema de metatags foi implementado no blog Vivências Azuis para criar pré-visualizações ricas de links em redes sociais e plataformas de mensagem.

## 🎯 O que foi implementado

### 1. Metatags Open Graph
- **og:title**: Título da página/post
- **og:description**: Descrição do conteúdo
- **og:image**: Imagem de capa (1200x630px recomendado)
- **og:url**: URL canônica da página
- **og:type**: Tipo de conteúdo (website/article)
- **og:site_name**: Nome do site
- **og:locale**: Idioma (pt_BR)

### 2. Twitter Cards
- **twitter:card**: Tipo de card (summary_large_image)
- **twitter:site**: @vivenciasazuis
- **twitter:creator**: @vivenciasazuis
- **twitter:title**: Título do conteúdo
- **twitter:description**: Descrição do conteúdo
- **twitter:image**: Imagem de capa

### 3. Metatags de Artigos
- **article:author**: Autor do post
- **article:section**: Categoria do post
- **article:tag**: Tags do post
- **article:published_time**: Data de publicação
- **article:modified_time**: Data de modificação

### 4. Metatags SEO
- **title**: Título da página
- **description**: Descrição da página
- **keywords**: Palavras-chave relevantes
- **canonical**: URL canônica
- **robots**: Instruções para crawlers

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   └── metadata.ts          # Funções utilitárias para metatags
├── app/
│   ├── layout.tsx           # Metatags globais
│   ├── page.tsx             # Metatags da página inicial
│   ├── blog/
│   │   ├── page.tsx         # Metatags da página do blog
│   │   └── [slug]/
│   │       └── page.tsx     # Metatags dinâmicas dos posts
│   ├── sobre/
│   │   ├── page.tsx         # Página sobre
│   │   └── layout.tsx       # Metatags da página sobre
│   ├── contato/
│   │   ├── page.tsx         # Página de contato
│   │   ├── layout.tsx       # Metatags da página de contato
│   │   └── metadata.ts      # Definição das metatags
│   └── politica-de-privacidade/
│       ├── page.tsx         # Página de política
│       ├── layout.tsx       # Metatags da política
│       └── metadata.ts      # Definição das metatags
```

## 🚀 Como usar

### Para Posts do Blog

As metatags dos posts são geradas automaticamente baseadas nos metadados do arquivo MDX:

```mdx
---
title: "Título do Post"
excerpt: "Descrição do post para SEO e redes sociais"
datetime: "2025-01-15T10:00:00-03:00"
author: "Nome do Autor"
category: "Categoria"
tags: ["tag1", "tag2", "tag3"]
featured: true
coverImage: "/images/posts/nome-da-imagem.jpg"  # Opcional
---
```

### Para Páginas Estáticas

Use a função `generatePageMetadata`:

```typescript
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Título da Página',
  description: 'Descrição da página',
  path: '/caminho-da-pagina',
  keywords: ['palavra1', 'palavra2', 'palavra3'],
})
```

### Para Posts Individuais

Use a função `generatePostMetadata`:

```typescript
import { generatePostMetadata } from '@/lib/metadata'

export const metadata = generatePostMetadata({
  title: 'Título do Post',
  description: 'Descrição do post',
  slug: 'slug-do-post',
  author: 'Nome do Autor',
  category: 'Categoria',
  tags: ['tag1', 'tag2'],
  publishedTime: '2025-01-15T10:00:00.000Z',
  coverImage: '/images/posts/imagem.jpg', // Opcional
})
```

## 🖼️ Imagens de Capa

### Especificações Recomendadas
- **Dimensões**: 1200x630 pixels
- **Formato**: JPG ou PNG
- **Tamanho**: Máximo 5MB
- **Localização**: `/public/images/posts/`

### Como adicionar
1. Coloque a imagem na pasta `/public/images/posts/`
2. Adicione o campo `coverImage` no frontmatter do MDX:
   ```yaml
   coverImage: "/images/posts/nome-da-imagem.jpg"
   ```

## 🔧 Configurações Importantes

### URLs Canônicas
Todas as URLs são geradas automaticamente usando a base URL configurada em `metadata.ts`:
```typescript
const baseUrl = 'https://vivenciasazuis.com'
```

### Verificação de Metatags
Use estas ferramentas para testar as metatags:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Open Graph Preview](https://www.opengraph.xyz/)

## 📱 Exemplos de Pré-visualização

### Facebook/LinkedIn
- Título grande
- Descrição em 2-3 linhas
- Imagem 1200x630px
- URL do site

### Twitter
- Título
- Descrição
- Imagem grande
- @vivenciasazuis

### WhatsApp/Telegram
- Título
- Descrição
- Imagem pequena
- URL

## 🎨 Personalização

### Cores e Tema
As cores são definidas no layout principal:
```typescript
themeColor: '#4b7aa1',
colorScheme: 'light',
```

### Ícones
Os ícones são configurados no layout:
```typescript
icons: {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
}
```

## 🔍 SEO e Acessibilidade

### Meta Robots
```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
```

### Estrutura de Dados
As metatags incluem informações estruturadas para:
- Artigos de blog
- Informações do autor
- Categorias e tags
- Datas de publicação

## 🚨 Troubleshooting

### Imagens não aparecem
1. Verifique se o caminho está correto
2. Confirme se a imagem existe em `/public/`
3. Teste com uma URL absoluta

### Metatags não atualizam
1. Limpe o cache do navegador
2. Use as ferramentas de debug das redes sociais
3. Verifique se o build foi feito corretamente

### Títulos muito longos
- Facebook: máximo 60 caracteres
- Twitter: máximo 70 caracteres
- Google: máximo 60 caracteres

## 📊 Monitoramento

### Google Search Console
- Monitore como as páginas aparecem nos resultados
- Verifique se as metatags estão sendo lidas corretamente

### Analytics
- Acompanhe o tráfego vindo de redes sociais
- Monitore o CTR (Click Through Rate) dos links compartilhados

---

**Nota**: Este sistema foi implementado seguindo as melhores práticas de SEO e redes sociais, garantindo que os links do blog tenham pré-visualizações ricas e atrativas em todas as plataformas.
