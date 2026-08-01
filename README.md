# Calebe94's Blog

Personal blog and digital garden by **Edimar Calebe Castanho** — a computer engineer writing about embedded systems, mechanical keyboards, game development, C, Linux, and DevOps.

Built with [Quartz 4](https://quartz.jzhao.xyz/).

**Live at [blog.calebe.dev.br](https://blog.calebe.dev.br)**

## Requirements

- [Node.js](https://nodejs.org/) v22 or higher
- npm v10.9.2 or higher

## Quick Start

```bash
git clone https://github.com/Calebe94/blog.git
cd blog
make install
make start
```

The dev server starts at `http://localhost:3000` with live reload.

## Makefile

| Target         | Description                                  |
| :------------- | :------------------------------------------- |
| `make install` | Install dependencies (`npm install`)         |
| `make start`   | Build and serve locally (`npm run serve`)    |
| `make build`   | Production build to `./public/` (`npm run build`) |

## npm Scripts

If you prefer using npm directly:

| Script             | Description                                |
| :----------------- | :----------------------------------------- |
| `npm run serve`    | Build and start dev server on port 3000    |
| `npm run build`    | Build production site to `./public/`       |
| `npm run check`    | Run TypeScript type-check and Prettier     |
| `npm run format`   | Format all files with Prettier             |

## Content Structure

All content lives in the `content/` directory as Markdown files:

```
content/
├── index.md          # Homepage
├── posts/            # Blog posts (articles, tutorials)
├── notes/            # Short notes (includes glossario.md)
├── uses/             # Tools and tech I use
└── templates/        # Post templates (ignored by Quartz build)
```

Posts use YAML frontmatter for metadata:

```markdown
---
title: "Post Title"
description: "Brief description"
date: 2024-01-15
tags:
  - embedded
  - linux
draft: false
---
```

## Glossary Linking Convention

A technical glossary lives at [`content/pt/notes/glossary.md`](content/pt/notes/glossary.md) (pt-BR) and [`content/en/notes/glossary.md`](content/en/notes/glossary.md) (en-US), published at [`/pt/notes/glossary`](https://blog.calebe.dev.br/pt/notes/glossary) and [`/en/notes/glossary`](https://blog.calebe.dev.br/en/notes/glossary).

**All blog posts must link technical terms to the glossary.** When a post introduces a term that exists in the glossary, link to it on first mention:

```markdown
O [Plexi](/pt/notes/glossary#Plexi) é um amp valvulado dos anos 60...
```

For terms not yet in the glossary, add them to **both** `content/pt/notes/glossary.md` and `content/en/notes/glossary.md` (same `### Term` heading for consistent anchors), then link from the post.

A post template with this convention pre-filled is at [`content/pt/templates/new-post.md`](content/pt/templates/new-post.md). The `templates/` directory is in Quartz's `ignorePatterns` so it won't render as a page — it's a reference for writers only.

## Configuration

- **Site settings** (title, URL, theme, plugins): `quartz.config.ts`
- **Page layout** (sidebar, header, footer components): `quartz.layout.ts`
- **Static assets** (fonts, icons, images): `quartz/static/`

## Deployment

The site deploys automatically to **GitHub Pages** on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`).

To build manually:

```bash
make build
# Output in ./public/ — upload to any static host
```

## Tech Stack

- **Generator**: [Quartz 4](https://quartz.jzhao.xyz/) (Preact, unified/remark/rehype)
- **Search**: FlexSearch
- **Syntax highlighting**: Shiki
- **Math**: KaTeX
- **Fonts**: Courier Prime
- **Analytics**: Plausible
- **Hosting**: GitHub Pages

## License

MIT
