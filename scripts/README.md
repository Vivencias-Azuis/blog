# Site Generation Scripts

These scripts automatically generate SEO and AI-friendly files for the Vivências Azuis blog.

## 1. Sitemap Generation Script

This script automatically generates a sitemap.xml file for the Vivências Azuis blog.

## Features

- **Static Pages**: Automatically includes home, blog, about, and contact pages
- **Dynamic Content**: Scans all MDX blog posts in `src/content/posts/`
- **Categories**: Automatically detects and includes category pages
- **Smart Timestamps**: Uses actual file modification dates for `lastmod`
- **SEO Optimized**: Includes proper priority, changefreq, and lastmod values
- **Future-proof**: Filters out posts with future publication dates

## Usage

### Generate sitemap manually:
```bash
npm run sitemap
```

### Generate sitemap and build:
```bash
npm run build:sitemap
```

### Direct execution:
```bash
node scripts/generate-sitemap.js
```

## What gets included:

1. **Static pages** (priority 1.00-0.80):
   - `/` (homepage) - weekly updates
   - `/blog` - daily updates  
   - `/sobre` - monthly updates
   - `/contato` - monthly updates

2. **Category pages** (priority 0.70):
   - `/blog?categoria=educação`
   - `/blog?categoria=dicas` 
   - etc. (automatically detected from post frontmatter)

3. **Blog posts** (priority 0.80):
   - `/blog/[slug]` (all published posts)
   - Monthly update frequency
   - Uses actual file modification dates

## Configuration

To modify the base URL or other settings, edit the constants at the top of `generate-sitemap.js`:

```javascript
const BASE_URL = 'https://www.vivenciasazuis.com.br'
```

## Automation

Consider adding this script to your deployment pipeline:

```bash
# Before building
npm run sitemap
npm run build
```

The script respects the same post filtering logic as your blog (filtering future posts, etc).

## 2. LLMs.txt Generation Script

This script automatically generates an LLMs.txt file to help AI systems better understand your site content.

### What is LLMs.txt?

LLMs.txt is a proposed standard created to help AI systems (like ChatGPT, Gemini, Claude, etc.) understand and prioritize your website content. It serves as an "AI-optimized menu" of your site, placed at the root domain (e.g., https://vivenciasazuis.com.br/llms.txt).

### Features

- **Organized Content**: Groups posts by category with descriptions
- **Smart Descriptions**: Uses post excerpts and generates relevant descriptions
- **Featured Content**: Highlights important articles
- **Topic Organization**: Groups content by common themes
- **AI-Friendly Format**: Follows Markdown standard for optimal AI parsing
- **Automatic Updates**: Reflects current site content and structure

### Usage

#### Generate LLMs.txt manually:
```bash
npm run llms
```

#### Generate all files and build:
```bash
npm run build:full
```

#### Direct execution:
```bash
node scripts/generate-llms.js
```

### What gets included:

1. **Site Description**: Clear explanation of the site's purpose and mission
2. **Navigation Pages**: About, contact, blog sections
3. **Content by Category**: 
   - Educação (Educational resources)
   - Geral (General content)
   - Other categories as they appear
4. **Featured Content**: Posts marked as `featured: true`
5. **Topic Organization**: Common themes like Communication, Family, Diagnosis, etc.

### LLMs.txt Structure

The generated file follows this format:
```markdown
# Vivências Azuis

> Site description for AI context

## Category Name

> Category description

- [Post Title](URL) — Post description under 200 characters

## Featured Content

> Important articles section

- [Featured Post](URL) — Description
```

### Benefits for AI Systems

- Better understanding of site context and purpose
- Improved content recommendations
- More accurate responses about your content
- Enhanced discoverability of key resources

### Configuration

To modify the base URL or category descriptions, edit the constants in `generate-llms.js`:

```javascript
const BASE_URL = 'https://www.vivenciasazuis.com.br'
```

### Automation

Consider adding both scripts to your deployment pipeline:

```bash
# Generate both SEO files before building
npm run sitemap
npm run llms
npm run build
```

Both scripts respect the same post filtering logic as your blog (filtering future posts, etc).