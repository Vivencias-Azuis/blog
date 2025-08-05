# Sitemap Generation Script

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