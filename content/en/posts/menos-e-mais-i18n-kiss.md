---
title: "Less is more: refactoring the blog's i18n with KISS and Unix philosophy"
description: "I swapped flag emojis for a globe icon, moved 28 files around, and generated automatic redirects — all without a framework, without an i18n library, and without unnecessary JavaScript."
date: "2026-08-01 00:00:00"
tags:
  - EN_US
  - blog
  - suckless
  - i18n
---

# Less is more: refactoring the blog's i18n with KISS and Unix philosophy

If you've ever tried to maintain a site in two languages, you know the annoying part isn't translating the content — it's the infrastructure. Where do the files go? How do you build the toggle? What do you do with old links when you move everything around?

I'd been kicking these problems down the road ever since I migrated the blog from Astro Cactus to Quartz 4. It worked, but it was ugly. And I'm the kind of person who gets bothered by ugly things.

Anyway... let's get to it.

> **📋 Visual summary of what changed:**
>
> | Before | After |
> |--------|-------|
> | 🇧🇷 Português (flag + text) | 🌐 Globe icon (SVG 20×20px) |
> | pt-BR at root, EN under `/en/` | `pt/` and `en/` as symmetric siblings |
> | `/posts/foo` (pt-BR) | `/pt/posts/foo` + automatic redirect |
> | ReaderMode only on posts | ReaderMode on every page |
> | `glossario.md` ≠ `glossary.md` | `glossary.md` in both languages |
> | `/` = Home in Portuguese | `/` → redirect to `/pt/` |

## The mess I had

The blog had Portuguese at the root and English under `/en/`. Asymmetric. Quartz's Explorer showed "Home" floating by itself, posts and notes folders with no language context, and an `/en/` that looked like an afterthought instead of an equivalent version of the site.

The language toggle was a little flag with text: `🇧🇷 Português` or `🇬🇧 English`. Did it work? Sure. But "Português" is a long word. On smaller screens, the text pushed the ReaderMode button right off the toolbar. And flags represent countries, not languages — I write in Portuguese, I'm not an embassy.

Then there was the glossary: `glossario.md` in Portuguese, `glossary.md` in English. Inconsistent. Every time I linked to the glossary in a new post, I had to remember which name was correct.

None of this was a bug. But it was noise. And noise piles up.

## The philosophy

I'm not a framework person. Honestly, I have a specific grudge against things that do magic without me understanding what's going on. If I can't open `view-source:` and read the HTML, something's wrong.

Three principles guide everything I do on this site:

**KISS (Keep It Simple, Stupid).** If a static file solves it, I don't need a library. If a component is 30 lines, it doesn't need 60.

**Suckless.** The site should be fast, self-contained, and not depend on anything I don't fully understand. No frameworks doing magic. No 200KB of JavaScript to swap an icon.

**Unix philosophy.** Each component does one thing well. The language toggle doesn't know the redirect emitter exists. The folder structure is predictable: `pt/` and `en/` are siblings, not special cases.

And there's a fourth influence worth mentioning: the trilogy of [motherfuckingwebsite.com](https://motherfuckingwebsite.com/), [securemotherfuckingwebsite.com](https://securemotherfuckingwebsite.com/), and the [Have a Fucking Website](https://www.otherstrangeness.com/2026/03/14/have-a-fucking-website/) manifesto. If you haven't read them, they're three pages. The first is an ugly, lightweight, perfectly functional website — 5KB, no CSS, no JS, and you can read the whole thing in 30 seconds. The second adds HTTPS and a touch of responsive CSS. The third is a reminder that having your own site, under your own domain, with your own content, is still the freest way to exist on the internet. No Medium, no Substack, no platform that could disappear tomorrow. **Your domain, your HTML, your rules.**

With that in mind, I got to work.

## Globe icon instead of flag + text

The old `LangToggle` was a `<button>` with two `<span>`s inside: one for the flag, one for the text. The SCSS had `gap: 4px`, `font-size: 0.8rem`, `white-space: nowrap` — hacks stacked on hacks to make it fit in the toolbar.

I deleted all of it. The new component is an inline SVG globe, 20×20px, same visual scheme as Darkmode and ReaderMode:

```tsx
<button class="langtoggle" aria-label="English">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 ..." />
  </svg>
</button>
```

The SCSS is now identical to `darkmode.scss` and `readermode.scss`:

```scss
.langtoggle {
  width: 20px;
  height: 32px;
  flex-shrink: 0;

  & svg {
    position: absolute;
    width: 20px;
    height: 20px;
    top: calc(50% - 10px);
    stroke: var(--darkgray);
  }
}
```

The "Português" / "English" label still exists — but only in the `aria-label` and SVG `<title>`, for screen readers. Visual users just see the icon. One button, one SVG, zero visible text, zero layout breakage. KISS.

## Symmetric folder structure

I moved all Portuguese content into `content/pt/`. 28 files renamed. Git detected it as a rename, not a delete+create — so the history wasn't lost.

```
Before:                   After:
  content/                  content/
    index.md  (pt-BR)         index.md    (redirect)
    posts/    (pt-BR)         pt/
    notes/    (pt-BR)           index.md  (Português)
    uses/     (pt-BR)           posts/    (pt-BR)
    en/                         notes/    (pt-BR)
      index.md  (EN)            uses/     (pt-BR)
      posts/    (EN)          en/
      notes/    (EN)            index.md  (English)
      uses/     (EN)            posts/    (EN)
                                notes/    (EN)
                                uses/     (EN)
```

The Explorer now shows `pt/` and `en/` as siblings, each with their own subfolders. No exceptions, no special cases. Unix: everything in its place.

## Automatic redirects so the internet doesn't break

Moving 28 files breaks every link that already exists out there. `/posts/zuko-pedal-marshall-diy` is now `/pt/posts/zuko-pedal-marshall-diy`. I didn't want to leave anyone with a 404 — and I also didn't want to configure redirects in Cloudflare or nginx. That's the build's responsibility, not the server's.

I wrote a custom Quartz emitter. 40 lines. It takes every file under `content/pt/`, figures out what the old slug was (without the `/pt` prefix), and generates a static HTML page with `<meta http-equiv="refresh">`:

```typescript
// quartz/plugins/emitters/legacyRedirects.ts
export const LegacyRedirects: QuartzEmitterPlugin = () => ({
  name: "LegacyRedirects",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      const slug = simplifySlug(file.data.slug!)
      if (!slug || !slug.startsWith("pt/")) continue

      const oldSlug = slug.slice(3) // "pt/posts/foo" → "posts/foo"
      const redirUrl = resolveRelative(oldSlug, slug)

      yield write({
        ctx,
        content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<link rel="canonical" href="${redirUrl}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${redirUrl}">
</head>
</html>`,
        slug: oldSlug,
        ext: ".html",
      })
    }
  },
})
```

24 redirect files generated on every build. Zero client-side JavaScript. Zero external dependencies. A static file with a meta tag solves it. That's Unix: a tool that does one thing — generate redirects — and doesn't know the LangToggle exists.

## ReaderMode where it was missing

`defaultListPageLayout` didn't have `ReaderMode` — only `defaultContentPageLayout` did. Result: `/pt/`, `/en/`, `/pt/posts/` didn't show the reader mode button. One line fixed it:

```typescript
// quartz.layout.ts — defaultListPageLayout
{ Component: Component.Darkmode() },
{ Component: Component.ReaderMode() },  // ← added
{ Component: Component.LangToggle() },
```

Literally copy-pasted the line that already existed in the other layout. 5 seconds.

## Root redirects to Portuguese

I'm Brazilian, my main content is in Portuguese. The root (`/`) is now an automatic redirect to `/pt/`. Same scheme as the post redirects: meta tag, zero JavaScript:

```html
<meta http-equiv="refresh" content="0; url=/pt/">
<link rel="canonical" href="/pt/">
```

If the browser has JavaScript disabled, you see the link "Redirecting to Portuguese...". If it's enabled, the redirect is instant.

## `glossario.md` → `glossary.md`

Renamed the Portuguese file to match the English one. Updated the 6 cross-references in the post template, `welcome.md`, and the Zuko post. Now it's `glossary.md` in both languages, no exceptions.

## What I didn't use

And this is what I want to get at. None of this needed:

- **An i18n library.** The toggle is a 30-line vanilla script that swaps `/pt/` ↔ `/en/` in the pathname.
- **A routing framework.** The redirects are pure HTML with `<meta http-equiv="refresh">`.
- **A CSS framework.** The LangToggle SCSS is 30 lines and copies the pattern Darkmode already used.
- **JavaScript for the root redirect.** It's a meta tag. The browser does the work.

Every dependency you add is a decision you'll have to maintain for years. I don't want to maintain `react-i18next` on my static blog. I don't want to debug why `next-intl` broke on version 4. I don't want 200KB of JavaScript to swap "Português" for "English".

What I want: a site I understand completely. One where I can open `view-source:` and read the HTML. One that compiles in 600ms. One that doesn't depend on anything I can't fix with `git revert`.

And since we're talking about independence: I run this site on my own VPS, with Nginx, no platform in the middle. If you want to do the same, [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) is the starting point — a curated list of software you can host yourself. [selfh.st](https://selfh.st/) and [selfh.st/apps](https://selfh.st/apps/) complement it with weekly newsletters and guides on the self-hosted ecosystem. It's not just about "not depending on third parties" — it's about understanding the entire stack, from DNS to HTML. And that, to me, is the whole point.

This site has 139 static files, 52 Markdown files, and zero runtime dependencies beyond the preact that Quartz bundles. The language toggle is a `<button>` with an SVG inside. The redirects are HTML. The folder structure is `pt/` and `en/`.

**Less is more. Always has been.**

---

This post is part of the blog's behind-the-scenes series. If you're into this philosophy, check out the [source code](https://github.com/Calebe94/blog) and the [glossary](/en/notes/glossary) — it's updated with every post.
