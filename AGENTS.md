# Repository Guidelines

Contributor quick-start for the Vivências Azuis blog. Keep changes focused, reversible, and aligned with the existing Next.js + MDX stack.

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages (`page.tsx` home, `blog/page.tsx`, `contato`, `sobre`, `politica-de-privacidade`, `termos-de-uso`, `not-found.tsx`, `sitemap.ts`) and global styles in `globals.css`.
- `src/components/`: Reusable UI (Header, Footer, Hero, AboutSection, FeaturedPosts, PostCard, PWAInstallPrompt, PWAStatus). Favor composition over new global styles.
- `src/content/posts/`: MDX articles; future-dated posts are ignored by `src/lib/posts.ts` (reading time + filtering). Use kebab-case filenames and include frontmatter: `title`, `excerpt`, `datetime` (or `date`), `author`, `category`, `tags`, optional `featured`, `coverImage`.
- `src/lib/`: `posts.ts` handles loading/filtering; `metadata.ts` centralizes SEO/OpenGraph helpers. Prefer these utilities before adding new ones.
- `public/`: Static assets (logos, icons). `scripts/`: automation for content normalization and `llms.txt` generation.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server (port 3000).
- `npm run build`: Production build; use before deploy. `npm run start`: Serve the build.
- `npm run lint`: ESLint with Next.js config; run before pushes.
- Content helpers: `npm run normalize-filenames` (dry-run) / `normalize-filenames:execute` (rename MD/MDX to kebab-case); `npm run convert-md-to-mdx` (dry-run) / `convert-md-to-mdx:execute`; `npm run llms` regenerates `public/llms.txt`; `npm run build:full` runs `llms` then `build`.

## Coding Style & Naming Conventions
- TypeScript + React function components; prefer server components unless client hooks are needed. Keep imports absolute via `@/`.
- Styling uses Tailwind utility classes in JSX; avoid new global CSS unless shared. Maintain semantic HTML and accessibility attributes.
- Naming: PascalCase components/files in `components`, camelCase helpers, kebab-case routes and content filenames, lower-case routes for slugs. Use single quotes and 2-space indentation to match existing code.

## Testing Guidelines
- No automated test suite yet; rely on `npm run lint` and manual QA. For UI changes, verify home, blog listing, and a sample post render without hydration errors.
- When adding new logic, prefer lightweight unit tests colocated with code (e.g., `*.test.ts`) if dependencies are added; otherwise include reproduction steps in the PR description.

## Commit & Pull Request Guidelines
- Recent history favors short, imperative titles in English (e.g., “Add new article on…”). Keep scope tight; group content edits by topic.
- PRs should include: summary of changes, affected pages/routes, screenshots for UI tweaks, and a checklist of commands run (`lint`, `build` if applicable). Link related issues or content requests when available.
