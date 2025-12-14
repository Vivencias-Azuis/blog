# Repository Guidelines

## Project Structure & Module Organization

- `src/app/`: Next.js App Router pages, layouts, and API routes (e.g., `src/app/api/*/route.ts`).
- `src/components/`: Reusable React components (UI + content blocks).
- `src/lib/`: Content and utility modules (e.g., `src/lib/posts.ts` for MDX loading/filtering).
- `src/content/posts/`: Blog posts in `.mdx` (filename becomes the post slug).
- `public/`: Static assets served at `/` (icons, `site.webmanifest`, `sw.js`, generated `llms.txt`).
- `scripts/`: Content/SEO automation (see `scripts/README.md`).
- `docs/`: Editorial/SEO playbooks and planning notes.

## Build, Test, and Development Commands

- `npm run dev`: Run locally at `http://localhost:3000`.
- `npm run build`: Production build (validates routes/content at build time).
- `npm run start`: Serve the built app.
- `npm run lint`: Run Next.js ESLint rules (`next/core-web-vitals`).
- `npm run build:full`: Generate `llms.txt` then build.
- `npm run llms`: Regenerate `public/llms.txt` from `src/content/posts/`.
- `npm run calendar:check`: Validate publication schedule rules (see `scripts/check-publication-calendar.js`).
- `npm run normalize-filenames`: Preview post filename normalization to kebab-case.
- `npm run normalize-filenames:execute`: Apply filename normalization (review slugs/redirects first).

## Coding Style & Naming Conventions

- TypeScript + React (Next.js 14). Prefer the `@/*` path alias for `src/*`.
- Match existing style: 2-space indentation, single quotes, no semicolons.
- Posts: keep filenames lowercase kebab-case (no accents), e.g. `src/content/posts/aba-para-pais.mdx`.
- MDX frontmatter: prefer `datetime` (ISO8601 with timezone). `date` is supported for legacy posts.

## Testing Guidelines

- No dedicated test runner is configured. Before opening a PR, run `npm run lint` and `npm run build`.
- For content changes, sanity-check key routes in `npm run dev` (home, `/blog`, and an edited post).

## Commit & Pull Request Guidelines

- Commit messages follow an imperative style (e.g., “Add…”, “Update…”, “Enhance…”). Keep subject lines concise.
- PRs should include: a clear description of intent, manual verification steps, and screenshots for UI changes.
- If a post slug/filename changes, add a redirect in `next.config.mjs` to preserve existing URLs.

## Security & Configuration Tips

- Form submissions use Formspree endpoints; set `FORMSPREE_EBOOK_ENDPOINT` and/or `FORMSPREE_NEWSLETTER_ENDPOINT` in `.env.local` for non-production testing.
