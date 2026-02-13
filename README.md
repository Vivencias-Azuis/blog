# Vivências Azuis - Blog

Um espaço digital dedicado a compartilhar, acolher e inspirar todos que fazem parte do universo do autismo.

## 🌟 Sobre o Projeto

**Vivências Azuis** é um blog construído com Next.js e MDX, focado em criar uma comunidade inclusiva e acolhedora para pessoas autistas, familiares, educadores e profissionais. Aqui, histórias reais, dicas práticas e conhecimento especializado se unem para promover mais inclusão, respeito e empatia no dia a dia.

### 🎯 Missão

Dar voz, visibilidade e suporte a cada trajetória dentro do espectro, celebrando a diversidade e promovendo um mundo mais azul, inclusivo e humano.

### 💙 Identidade Visual

Nossa paleta de cores foi escolhida para transmitir tranquilidade, acessibilidade e empatia:

- **Azul Suave (#7DB8E5)**: Cor principal, remete à campanha mundial do autismo
- **Azul Profundo (#335C81)**: Para títulos e contrastes importantes
- **Verde Menta (#83D0C9)**: Destaque e sensação de acolhimento
- **Amarelo Quente (#FFD066)**: Toques de alegria e otimismo
- **Cinza Claro (#E9E9E9)**: Neutro para áreas secundárias
- **Branco (#FFFFFF)**: Fundos e respiros para acessibilidade

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React para produção
- **TypeScript** - Tipagem estática
- **MDX** - Markdown com componentes React para posts
- **Tailwind CSS** - Estilização com classes utilitárias
- **Gray Matter** - Processamento de frontmatter dos posts
- **Reading Time** - Cálculo de tempo de leitura
- **Remark GFM** - Suporte a GitHub Flavored Markdown

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── blog/              # Páginas do blog
│   ├── sobre/             # Página sobre
│   ├── contato/           # Página de contato
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais
│   └── not-found.tsx      # Página 404
├── components/            # Componentes React reutilizáveis
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── Footer.tsx         # Rodapé
│   ├── Hero.tsx           # Seção hero da homepage
│   ├── AboutSection.tsx   # Seção sobre na homepage
│   ├── FeaturedPosts.tsx  # Posts em destaque
│   └── PostCard.tsx       # Card de post
├── content/
│   └── posts/             # Posts em MDX
├── lib/
│   └── posts.ts           # Funções para gerenciar posts
└── types/                 # Definições de tipos TypeScript
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/vivencias-azuis-blog.git
cd vivencias-azuis-blog
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse no navegador**
   - Abra [http://localhost:3000](http://localhost:3000)

### Variáveis de ambiente

Crie um arquivo `.env.local` para configurar integrações:

```bash
# Google Analytics 4 (opcional)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Formspree (opcional; usa fallback se não definir)
FORMSPREE_EBOOK_ENDPOINT=https://formspree.io/f/xxxxxxx
FORMSPREE_NEWSLETTER_ENDPOINT=https://formspree.io/f/xxxxxxx
```

## 📝 Criando Novos Posts

Para criar um novo post, adicione um arquivo `.mdx` na pasta `src/content/posts/` com o seguinte formato:

```mdx
---
title: "Título do seu post"
excerpt: "Breve descrição do conteúdo"
date: "2024-01-15"
author: "Seu Nome"
category: "Categoria" # Dicas, Relatos, Educacao, Direitos, Geral
tags: ["tag1", "tag2", "tag3"]
featured: false # true para posts em destaque
---

# Título do Post

Conteúdo do seu post em Markdown...

## Seções

Você pode usar todos os recursos do Markdown e MDX aqui.
```

### Categorias Disponíveis

- **Dicas**: Estratégias práticas e dicas úteis
- **Relatos**: Experiências pessoais e histórias
- **Educacao**: Conteúdo sobre educação inclusiva
- **Direitos**: Informações sobre direitos e legislação
- **Geral**: Conteúdo geral sobre autismo e inclusão

## 🎨 Personalização

### Cores do Tema

As cores estão definidas no `tailwind.config.ts` e podem ser personalizadas:

```typescript
colors: {
  'azul-suave': '#7DB8E5',
  'azul-profundo': '#335C81',
  'cinza-claro': '#E9E9E9',
  'amarelo-quente': '#FFD066',
  'verde-menta': '#83D0C9',
  // ...
}
```

### Componentes de Layout

- **Header**: Navegação principal com menu responsivo
- **Footer**: Links úteis e informações de contato
- **Hero**: Seção de destaque na homepage
- **PostCard**: Layout para exibir posts

## 📱 Recursos de Acessibilidade

- Design responsivo para todos os dispositivos
- Contraste adequado seguindo diretrizes WCAG
- Navegação por teclado
- Estrutura semântica HTML
- Texto alternativo para imagens

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 📄 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

## 🧰 Pasta `scripts/` (automação)

Automatizações para geração de arquivos e organização do conteúdo. Para detalhes completos, veja `scripts/README.md`.

### Sitemap (`scripts/generate-sitemap.js`)
- **O que faz**: Gera `sitemap.xml` com páginas estáticas, categorias e posts (filtra posts com data futura).
- **Usar**:
  - Gerar manualmente:
    ```bash
    npm run sitemap
    ```
  - Gerar e fazer build:
    ```bash
    npm run build:sitemap
    ```

### LLMs.txt (`scripts/generate-llms.js`)
- **O que faz**: Cria `llms.txt` (mapa para IAs) com descrição do site, categorias, destaques e tópicos.
- **Usar**:
  - Gerar manualmente:
    ```bash
    npm run llms
    ```
  - Gerar tudo e build:
    ```bash
    npm run build:full
    ```

### Normalização de nomes de arquivos (`scripts/normalize-filenames.js`)
- **O que faz**: Renomeia arquivos `.md/.mdx` em `src/content/posts/` para kebab-case, removendo acentos e caracteres especiais. Não sobrescreve arquivos existentes.
- **Usar**:
  - Pré-visualizar (dry-run, padrão):
    ```bash
    npm run normalize-filenames
    ```
  - Executar renomeações:
    ```bash
    npm run normalize-filenames:execute
    ```

### Conversão de MD para MDX (`scripts/convert-md-to-mdx.js`)
- **O que faz**: Converte `.md` para `.mdx` preservando conteúdo e frontmatter. Evita conflito se o `.mdx` já existir.
- **Usar**:
  - Pré-visualizar (dry-run, padrão):
    ```bash
    npm run convert-md-to-mdx
    ```
  - Executar conversões:
    ```bash
    npm run convert-md-to-mdx:execute
    ```

### Fluxo recomendado
1. Normalizar nomes dos arquivos
   ```bash
   npm run normalize-filenames:execute
   ```
2. Converter `.md` para `.mdx`
   ```bash
   npm run convert-md-to-mdx:execute
   ```
3. Regenerar sitemap e LLMs.txt
   ```bash
   npm run sitemap && npm run llms
   # ou tudo junto com build
   npm run build:full
   ```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas, sugestões ou colaborações, entre em contato através da página de contato do site.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Construindo um mundo mais azul, inclusivo e humano.** 💙
