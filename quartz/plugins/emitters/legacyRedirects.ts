import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { FullSlug, resolveRelative, simplifySlug } from "../../util/path"

/**
 * LegacyRedirects: generates HTML redirect pages for old pt-BR slugs
 * that moved from /posts/foo → /pt/posts/foo, /notes/bar → /pt/notes/bar, etc.
 *
 * This emitter runs once per build and creates redirect pages for every
 * file under content/pt/ so old URLs don't 404.
 */
export const LegacyRedirects: QuartzEmitterPlugin = () => ({
  name: "LegacyRedirects",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      const slug = simplifySlug(file.data.slug!)
      // Only redirect pt-BR content (files under /pt/)
      if (!slug || !slug.startsWith("pt/")) continue

      // Compute the old slug by stripping the /pt prefix
      const oldSlug = slug.slice(3) as FullSlug // "pt/posts/foo" → "posts/foo"
      if (!oldSlug || oldSlug === "") continue

      const redirUrl = resolveRelative(oldSlug, slug)
      yield write({
        ctx,
        content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<title>${slug}</title>
<link rel="canonical" href="${redirUrl}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${redirUrl}">
</head>
</html>`,
        slug: oldSlug,
        ext: ".html",
      })
    }
  },
  async *partialEmit() {},
})
