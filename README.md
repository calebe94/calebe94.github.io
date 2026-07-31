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

A technical glossary lives at [`content/notes/glossario.md`](content/notes/glossario.md), published at [`/notes/glossario`](https://blog.calebe.dev.br/notes/glossario).

**All blog posts must link technical terms to the glossary.** When a post introduces a term that exists in the glossary, link to it on first mention:

```markdown
The [Plexi](/notes/glossario#Plexi) is a valve amp from the 60s...
```

Or use Quartz wikilinks (resolved via `shortest` link resolution):

```markdown
The [[notes/glossario#Plexi|Plexi]] is a valve amp...
```

For terms not yet in the glossary, add them to `content/notes/glossario.md` first, then link from the post.

A post template with this convention pre-filled is at [`content/templates/new-post.md`](content/templates/new-post.md). The `templates/` directory is in Quartz's `ignorePatterns` so it won't render as a page — it's a reference for writers only.

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
