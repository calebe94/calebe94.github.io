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
      const slug = file.data.slug!
      const simpleSlug = simplifySlug(slug)
      // Only redirect pt-BR content (files under /pt/)
      if (!simpleSlug || !simpleSlug.startsWith("pt/")) continue

      // Compute the old slug by stripping the /pt prefix from the original slug,
      // then simplifying. This preserves folder indices: pt/uses/index → uses/
      const oldSimpleSlug = simplifySlug(slug.slice(3) as FullSlug)
      if (!oldSimpleSlug || oldSimpleSlug === "/") continue

      // For folder redirects, use the FullSlug form (e.g. "uses/index") so write()
      // emits public/uses/index.html. That makes both /uses and /uses/ resolve.
      const oldSlug = oldSimpleSlug.endsWith("/")
        ? ((oldSimpleSlug.slice(0, -1) + "/index") as FullSlug)
        : (oldSimpleSlug as unknown as FullSlug)

      const targetUrl = resolveRelative(oldSlug, slug)
      yield write({
        ctx,
        content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<title>${simpleSlug}</title>
<link rel="canonical" href="${targetUrl}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${targetUrl}">
</head>
</html>`,
        slug: oldSlug,
        ext: ".html",
      })
    }
  },
  async *partialEmit() {},
})
