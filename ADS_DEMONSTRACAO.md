# 📢 Demonstração do Sistema de Anúncios

## 🎯 **Onde os Anúncios Aparecem**

### 1. **Página do Blog** (`/blog`)
```
┌─────────────────────────────────────────────────────────────┐
│                    Header do Blog                          │
├─────────────────────────────────────────────────────────────┤
│  🔍 Filtros e Busca                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │                     │  │                             │  │
│  │   📚 Posts Grid     │  │    📢 SIDEBAR ADS           │  │
│  │                     │  │                             │  │
│  │  ┌───────────────┐  │  │  ┌─────────────────────────┐ │  │
│  │  │  Post Card 1  │  │  │  │  🎓 Terapia Ocupacional │ │  │
│  │  └───────────────┘  │  │  │     Especializada       │ │  │
│  │                     │  │  │                         │ │  │
│  │  ┌───────────────┐  │  │  │  Atendimento para       │ │  │
│  │  │  Post Card 2  │  │  │  │  crianças autistas      │ │  │
│  │  └───────────────┘  │  │  │                         │ │  │
│  │                     │  │  │  [Agendar Consulta]     │ │  │
│  │  ┌───────────────┐  │  │  └─────────────────────────┘ │  │
│  │  │  Post Card 3  │  │  │                             │  │
│  │  └───────────────┘  │  │  ┌─────────────────────────┐ │  │
│  │                     │  │  │  📖 Curso Completo      │ │  │
│  │                     │  │  │     sobre TEA            │ │  │
│  │                     │  │  │                         │ │  │
│  │                     │  │  │  Aprenda com especialistas│ │  │
│  │                     │  │  │  R$ 199,90              │ │  │
│  │                     │  │  │  [Inscreva-se Agora]    │ │  │
│  │                     │  │  └─────────────────────────┘ │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. **Página Individual de Post** (`/blog/[slug]`)
```
┌─────────────────────────────────────────────────────────────┐
│                    Header do Post                          │
│              (Título, categoria, tags)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │                     │  │                             │  │
│  │   📝 Conteúdo do   │  │    📢 SIDEBAR ADS           │  │
│  │      Post           │  │                             │  │
│  │                     │  │  ┌─────────────────────────┐ │  │
│  │  ┌───────────────┐  │  │  │  🎓 Terapia Ocupacional │ │  │
│  │  │   Parágrafo 1 │  │  │  │     Especializada       │ │  │
│  │  └───────────────┘  │  │  │                         │ │  │
│  │                     │  │  │  Atendimento para       │ │  │
│  │  ┌───────────────┐  │  │  │  crianças autistas      │ │  │
│  │  │   Parágrafo 2 │  │  │  │                         │ │  │
│  │  └───────────────┘  │  │  │  [Agendar Consulta]     │ │  │
│  │                     │  │  └─────────────────────────┘ │  │
│  │  ┌───────────────┐  │  │                             │  │
│  │  │   Parágrafo 3 │  │  │  ┌─────────────────────────┐ │  │
│  │  └───────────────┘  │  │  │  📖 Curso Completo      │ │  │
│  │                     │  │  │     sobre TEA            │ │  │
│  │                     │  │  │                         │ │  │
│  │                     │  │  │  Aprenda com especialistas│ │  │
│  │                     │  │  │  R$ 199,90              │ │  │
│  │                     │  │  │  [Inscreva-se Agora]    │ │  │
│  │                     │  │  └─────────────────────────┘ │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            📢 ANÚNCIO CONTENT-BOTTOM                    │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  📚 Guia Completo do Autismo                       │ │ │
│  │  │                                                     │ │ │
│  │  │  O livro mais completo sobre TEA para pais e       │ │ │
│  │  │  profissionais                                      │ │ │
│  │  │                                                     │ │ │
│  │  │  [Ver Livro] →                                     │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                    Call to Action                           │
└─────────────────────────────────────────────────────────────┘
```

### 3. **Página Inicial** (`/`)
```
┌─────────────────────────────────────────────────────────────┐
│                    Hero Section                            │
│              (Vivências Azuis)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            📢 ANÚNCIO CONTENT-TOP                       │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  🎓 Curso Completo sobre TEA                        │ │ │
│  │  │                                                     │ │ │
│  │  │  Aprenda sobre Transtorno do Espectro Autista      │ │ │
│  │  │  com especialistas renomados                        │ │ │
│  │  │                                                     │ │ │
│  │  │  R$ 199,90              [Inscreva-se Agora]        │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                    Posts em Destaque                        │
│                    About Section                            │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 **Tipos de Banners**

### 1. **Banner de Imagem** (Terapia Ocupacional)
```
┌─────────────────────────────┐
│  [Imagem: Ícone de terapia] │
│                             │
│  🎯 Terapia Ocupacional     │
│     Especializada           │
│                             │
│  Atendimento especializado  │
│  para crianças autistas     │
│                             │
│  [Agendar Consulta]         │
└─────────────────────────────┘
```

### 2. **Banner de Card** (Curso)
```
┌─────────────────────────────┐
│  [Imagem: Livro/Aprender]   │
│                             │
│  📚 Curso Completo sobre TEA │  R$ 199,90
│                             │
│  Aprenda sobre Transtorno   │
│  do Espectro Autista com    │
│  especialistas renomados    │
│                             │
│  [Inscreva-se Agora]        │
└─────────────────────────────┘
```

### 3. **Banner de Texto** (Livro)
```
┌─────────────────────────────┐
│  📖 Guia Completo do        │
│     Autismo                 │
│                             │
│  O livro mais completo      │
│  sobre TEA para pais e      │
│  profissionais              │
│                             │
│  [Ver Livro] →             │
└─────────────────────────────┘
```

## 🎯 **Sistema de Targeting**

### **Por Categoria:**
- **Dicas**: Produtos inclusivos, ferramentas
- **Educação**: Cursos, livros, materiais
- **Relatos**: Serviços de apoio, comunidades
- **Direitos**: Advogados, consultorias

### **Por Tags:**
- **terapia**: Anúncios de terapias específicas
- **curso**: Cursos e materiais educativos
- **produto**: Produtos inclusivos
- **livro**: Livros e materiais de leitura

### **Por Página:**
- **home**: Anúncios gerais, apresentação
- **blog**: Anúncios relacionados ao conteúdo
- **sobre**: Parcerias, colaborações
- **contato**: Serviços locais

## 🎨 **Temas Disponíveis**

### **Tema Light** (Padrão)
- Fundo: Branco
- Texto: Cinza escuro
- Botão: Azul primário

### **Tema Primary**
- Fundo: Azul claro
- Texto: Azul escuro
- Botão: Amarelo

### **Tema Custom**
- Cores personalizáveis por banner
- Total controle sobre aparência

## 📱 **Responsividade**

### **Desktop (1200px+)**
- Sidebar visível com anúncios
- Layout em grid 4 colunas
- Banners completos com imagens

### **Tablet (768px - 1199px)**
- Sidebar oculta
- Layout em grid 2 colunas
- Banners adaptados

### **Mobile (< 768px)**
- Layout em coluna única
- Banners simplificados
- Texto redimensionado

## ⚙️ **Como Personalizar**

### **1. Adicionar Novo Banner**
```json
{
  "id": "banner-novo",
  "name": "Meu Novo Anúncio",
  "type": "image",
  "content": {
    "image": "/ads/meu-anuncio.jpg",
    "title": "Título do Anúncio",
    "description": "Descrição do anúncio",
    "cta": "Botão de Ação",
    "url": "https://exemplo.com"
  },
  "targeting": {
    "positions": ["sidebar"],
    "categories": ["dicas"],
    "tags": ["produto"],
    "pages": ["blog"]
  },
  "schedule": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "enabled": true
  },
  "styling": {
    "theme": "light"
  }
}
```

### **2. Configurar Targeting**
- **positions**: Onde o anúncio aparece
- **categories**: Categorias de posts
- **tags**: Tags específicas
- **pages**: Páginas do site

### **3. Personalizar Cores**
```json
"styling": {
  "theme": "custom",
  "customColors": {
    "background": "#F8F9FA",
    "text": "#335C81",
    "button": "#7DB8E5"
  }
}
```

## 🚀 **Vantagens do Sistema**

✅ **Sem Backend**: Tudo funciona no frontend
✅ **Sem Analytics**: Sistema simples e leve
✅ **Sem Controle de Cliques**: Sem complexidade desnecessária
✅ **Targeting Inteligente**: Anúncios relevantes
✅ **Totalmente Customizável**: Cores, posições, conteúdo
✅ **Responsivo**: Funciona em todos os dispositivos
✅ **Integrado**: Harmoniza com o design do blog
✅ **Fácil de Manter**: Apenas editar JSON

---

**O sistema está 100% funcional e pronto para uso!** 🎉
