# Calebe94's Blog

A digital garden and blog built with [Quartz 4](https://quartz.jzhao.xyz/) - a fast, batteries-included static site generator designed for networked thought.

## Table Of Contents

1. [Key Features](#key-features)
2. [Demo](#demo)
3. [Quick Start](#quick-start)
4. [Commands](#commands)
5. [Configure](#configure)
6. [Adding Content](#adding-content)
   - [Frontmatter](#frontmatter)
   - [Content Structure](#content-structure)
7. [Development](#development)
8. [Deploy](#deploy)

## Key Features

- ⚡ **Fast** - Built with Quartz 4 for incredibly fast page loads and tiny bundle sizes
- 🌙 **Dark / Light mode** - Automatic theme switching with CSS variables
- 🔍 **Full-text search** - Powered by FlexSearch for instant content discovery
- 🔗 **Graph view** - Visual representation of connections between your notes
- 📝 **Markdown support** - GitHub Flavored Markdown + Obsidian Flavored Markdown
- 🏷️ **Syntax highlighting** - Powered by Shiki with beautiful themes
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🌐 **SEO-friendly** - Automatic sitemaps, RSS feeds, and meta tags
- 📄 **Tag and Folder listings** - Auto-generated pages for organizing content
- 🔙 **Backlinks** - See which pages link to each other

## Demo

Visit the live site at [blog.calebe.dev.br](https://blog.calebe.dev.br)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Calebe94/blog.git
cd blog

# Install dependencies (requires Node 22+)
npm install

# Start development server
npm run serve

# Build for production
npm run build
```

### Requirements

- **Node.js**: v22 or higher
- **npm**: v10.9.2 or higher

## Commands

| Command | Action |
| :--------------- | :------------------------------------------------------------- |
| `npm install` | Install dependencies |
| `npm run build` | Build your production site to `./public/` |
| `npm run serve` | Build and start local dev server at `http://localhost:3000` |
| `npm run check` | Type check and lint with Prettier |
| `npm run format` | Format all files with Prettier |

## Configure

Quartz configuration is split between two main files:

### `quartz.config.ts`

Edit this file for global site settings:

- `pageTitle`: Title of your site (e.g., "Calebe94")
- `pageTitleSuffix`: String added to end of page titles
- `baseUrl`: Your deployed URL (e.g., "blog.calebe.dev.br")
- `enableSPA`: Enable/disable SPA routing
- `enablePopovers`: Enable/disable link previews
- `locale`: Used for i18n and date formatting (e.g., "en-GB")
- `ignorePatterns`: Glob patterns to ignore (e.g., ["private", "templates"])
- `theme`: Configure colors and fonts
  - `typography`: Font choices (Google Fonts)
  - `colors`: Light and dark mode color palettes

### `quartz.layout.ts`

Edit this file to customize page layout:

Components can be placed in these sections:
- `head`: Metadata and scripts
- `header`: Top horizontal bar
- `beforeBody`: Content above main body (breadcrumbs, title, tags)
- `left`: Left sidebar (explorer, search)
- `right`: Right sidebar (graph, TOC, backlinks)
- `afterBody`: Content below main body
- `footer`: Bottom of page

### Static Assets

Place static files in the `quartz/static/` folder:
- Images, fonts, and other assets are automatically copied to `public/static/`
- Example: `quartz/static/icon.svg` → `/static/icon.svg`

## Adding Content

All content should go in the `/content` folder. The homepage lives at `content/index.md`.

### Content Structure

```
content/
├── index.md              # Homepage
├── posts/               # Blog posts
│   ├── post-1.md
│   └── post-2.md
├── notes/               # Shorter notes
│   ├── note-1.md
│   └── note-2.md
└── uses/                # Uses / equipment page
    └── uses.md
```

### Frontmatter

Quartz supports the following frontmatter fields:

| Property | Description |
|-----------|-------------|
| `title` | Page title (defaults to filename) |
| `description` | SEO description for link previews |
| `date` | Publication date (ISO 8601 or string format) |
| `tags` | Array of tags (e.g., `["javascript", "web"]) |
| `aliases` | Alternative names for this note |
| `draft` | Boolean to hide page from production builds |
| `socialImage` | Custom image for OpenGraph/Twitter cards |
| `enableToc` | Boolean to enable/disable Table of Contents |
| `cssclasses` | Custom CSS classes for the page body |
| `lang` | Page language (overrides site default) |

**Example:**

```markdown
---
title: "My Post Title"
description: "A brief description of this post"
date: 2024-01-15
tags:
  - javascript
  - web-development
draft: false
---

# My Post Title

Content goes here...
```

### Markdown Syntax

Quartz supports:

- **GitHub Flavored Markdown** - Tables, footnotes, strikethrough, task lists
- **Obsidian Flavored Markdown** - Wikilinks `[[link]]`, callouts `> [!info]`, embeds
- **Syntax highlighting** - Automatic with Shiki
- **Math/Latex** - KaTeX or MathJax support
- **Diagrams** - Mermaid diagram support

## Development

### Local Development

Start the development server with hot-reload:

```bash
npm run serve
```

This builds your site and starts a server at `http://localhost:3000`.

### Type Checking & Linting

```bash
npm run check
```

This runs TypeScript compiler and Prettier checks.

### Formatting

```bash
npm run format
```

This formats all files with Prettier.

## Deploy

This blog is deployed to GitHub Pages via GitHub Actions.

### GitHub Actions

The workflow is defined in `.github/workflows/deploy.yml`:

1. **Build job**:
   - Checks out code
   - Sets up Node.js v22
   - Installs dependencies with npm
   - Builds the site: `npm run build`
   - Uploads `public/` as artifact

2. **Deploy job**:
   - Deploys the artifact to GitHub Pages

### Manual Deployment

You can also build and deploy manually:

```bash
# Build the site
npm run build

# The output will be in the `public/` directory
# Upload the contents of `public/` to your hosting provider
```

### GitHub Pages Settings

Ensure your repository settings are configured:

1. Go to **Settings** > **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `quartz`
4. **Folder**: `/ (root) or `public/`

### Other Platforms

Quartz can be deployed to any static hosting:

- **Netlify**: Build command: `npm run build`, Publish directory: `public`
- **Vercel**: Build command: `npm run build`, Output directory: `public`
- **Cloudflare Pages**: Build command: `npm run build`, Output directory: `public`
- **GitHub Pages**: As described above

## Customization

### Theme Colors

Edit `theme.colors` in `quartz.config.ts` to customize colors:

```typescript
theme: {
  colors: {
    lightMode: {
      light: "#faf8f8",      // Background
      lightgray: "#e5e5e5", // Borders
      gray: "#b8b8b8",         // Graph links
      darkgray: "#4e4e4e",    // Body text
      dark: "#2b2b2b",        // Headers
      secondary: "#284b63",    // Links
      tertiary: "#84a59d",     // Visited links
      highlight: "rgba(143, 159, 169, 0.15)", // Highlighted text
      textHighlight: "#fff23688", // Markdown highlight
    },
    darkMode: {
      // ... similar structure for dark mode
    },
  },
}
```

### Typography

Use any Google Font by specifying in `theme.typography`:

```typescript
theme: {
  typography: {
    header: "Schibsted Grotesk",
    body: "Source Sans Pro",
    code: "IBM Plex Mono",
  },
}
```

### Plugins

Quartz uses a plugin system for transformers, filters, and emitters.

**Common plugins in `quartz.config.ts`:**

- `Plugin.FrontMatter()` - Parse frontmatter
- `Plugin.SyntaxHighlighting()` - Code highlighting
- `Plugin.GitHubFlavoredMarkdown()` - GFM support
- `Plugin.ObsidianFlavoredMarkdown()` - Wikilinks, callouts
- `Plugin.TableOfContents()` - Auto-generate TOC
- `Plugin.ContentPage()` - Generate content pages
- `Plugin.TagPage()` - Generate tag listing pages
- `Plugin.FolderPage()` - Generate folder listing pages
- `Plugin.Assets()` - Copy static assets
- `Plugin.Static()` - Copy additional static files
- `Plugin.Favicon()` - Generate favicons

### Components

Create custom components in `quartz/components/` and add them to `quartz.layout.ts`.

See the [Quartz documentation](https://quartz.jzhao.xyz/advanced/creating-components) for details.

## Migration from Astro

This blog was migrated from [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) to Quartz 4.

### Key Changes:

| Aspect | Astro Cactus | Quartz 4 |
|--------|--------------|-----------|
| Framework | Astro v5 | Quartz 4.5.2 |
| Content folder | `src/content/` | `content/` |
| Date field | `publishDate` | `date` |
| Build output | `dist/` | `public/` |
| Components | `.astro` files | JSX/TSX components |
| Build command | `pnpm build` | `npm run build` |
| Node version | v20 | v22 |
| Package manager | pnpm | npm |

### Assets

All assets (fonts, images, game files) are now in `quartz/static/`:

- Fonts: `/static/fonts/`
- Tetris game: `/static/tetris.wasm`, `/static/tetris.js`, `/static/tetris.data`
- Icons: `/static/icon.svg`, `/static/icon1.svg`

## Troubleshooting

### Build Fails

If the build fails, check:

1. Node.js version is v22 or higher: `node --version`
2. npm version is v10.9.2 or higher: `npm --version`
3. Dependencies are installed: `npm install`
4. Run type check: `npm run check`

### Content Not Appearing

If content doesn't appear:

1. Check file is in `content/` folder
2. Check frontmatter is valid YAML
3. Check `draft: false` is set (or omit draft field)
4. Check file isn't in `ignorePatterns` in config

### Search Not Working

If search doesn't find content:

1. Ensure build completed successfully
2. Check browser console for errors
3. Verify `index.html` is loading correctly

## Acknowledgment

This blog uses [Quartz](https://github.com/jackyzha0/quartz), an amazing static site generator by [jackyzha0](https://github.com/jackyzha0).

## License

MIT
