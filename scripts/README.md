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

## 3. Filename Normalization Script

This script automatically normalizes blog post filenames to follow a consistent kebab-case naming convention.

### Features

- **Kebab-case Conversion**: Converts filenames to lowercase with hyphens (e.g., "My Post.mdx" → "my-post.mdx")
- **Space Removal**: Replaces spaces with hyphens
- **Accent Removal**: Removes diacritics and accents (e.g., "São Paulo" → "sao-paulo")
- **Special Character Cleanup**: Removes or converts special characters
- **Conflict Detection**: Prevents overwriting existing files
- **Dry-run Mode**: Preview changes before applying them
- **Safe Execution**: Only processes .md and .mdx files

### Usage

#### Preview changes (dry-run mode):
```bash
npm run normalize-filenames
```

#### Execute the renaming:
```bash
npm run normalize-filenames:execute
```

#### Direct execution:
```bash
# Dry-run mode (default)
node scripts/normalize-filenames.js --dry-run

# Execute the renaming
node scripts/normalize-filenames.js --execute
```

### What gets normalized:

- **Uppercase letters** → lowercase
- **Spaces** → hyphens
- **Accented characters** → unaccented equivalents
- **Special characters** → removed or converted
- **Multiple hyphens** → single hyphen

### Example transformations:

```
"Melhores Planos de Saúde para Crianças com Autismo.md"
→ "melhores-planos-de-saude-para-criancas-com-autismo.md"

"Gratuidades-Autistas-Garantidas-por-Lei-no-Brasil.mdx"
→ "gratuidades-autistas-garantidas-por-lei-no-brasil.mdx"

"O que é Ecolalia?.mdx"
→ "o-que-e-ecolalia.mdx"
```

### Safety Features

- **Dry-run by default**: Shows what would be renamed without making changes
- **Conflict detection**: Won't overwrite existing files
- **File type filtering**: Only processes markdown files (.md, .mdx)
- **Directory skipping**: Ignores subdirectories
- **Backup recommendation**: Always backup your files before bulk operations

### Best Practices

1. **Always run dry-run first** to preview changes
2. **Backup your content** before executing
3. **Update internal links** in your posts if they reference renamed files
4. **Run after adding new content** to maintain consistency

### Integration with Other Scripts

This script works well with the sitemap and LLMs.txt generators, as consistent filenames improve:
- SEO through clean URLs
- AI system understanding
- Development workflow efficiency

## 4. MD to MDX Conversion Script

This script automatically converts `.md` files to `.mdx` files in the posts directory.

### Features

- **File Extension Conversion**: Changes `.md` files to `.mdx` extension
- **Content Preservation**: Maintains all content exactly as-is (MDX is a superset of Markdown)
- **Frontmatter Support**: Handles YAML frontmatter correctly
- **Conflict Detection**: Won't overwrite existing `.mdx` files
- **Dry-run Mode**: Preview conversions before applying them
- **Safe Execution**: Only processes `.md` files, preserves existing `.mdx` files

### Usage

#### Preview conversions (dry-run mode):
```bash
npm run convert-md-to-mdx
```

#### Execute the conversion:
```bash
npm run convert-md-to-mdx:execute
```

#### Direct execution:
```bash
# Dry-run mode (default)
node scripts/convert-md-to-mdx.js --dry-run

# Execute the conversion
node scripts/convert-md-to-mdx.js --execute
```

### What happens during conversion:

1. **Scans** the posts directory for `.md` files
2. **Reads** the content of each `.md` file
3. **Creates** a new `.mdx` file with identical content
4. **Removes** the original `.md` file
5. **Preserves** all frontmatter, content, and formatting

### Example conversion:

```
"melhores-planos-de-saude-para-criancas-com-autismo.md"
→ "melhores-planos-de-saude-para-criancas-com-autismo.mdx"
```

### Why convert to MDX?

- **React Components**: Ability to use React components within your content
- **Interactive Elements**: Add dynamic functionality to your posts
- **Consistent Format**: Standardize on one file format across your blog
- **Future Flexibility**: MDX supports everything Markdown does, plus more

### Safety Features

- **Dry-run by default**: Shows what would be converted without making changes
- **Conflict prevention**: Won't overwrite existing `.mdx` files
- **Content integrity**: Preserves all content exactly as-is
- **File type filtering**: Only processes `.md` files
- **Error handling**: Reports any conversion failures

### Integration with Other Scripts

This script works well with the filename normalization script:

1. **First**: Run filename normalization to clean up file names
2. **Then**: Run MD to MDX conversion to standardize file format

```bash
npm run normalize-filenames:execute
npm run convert-md-to-mdx:execute
```