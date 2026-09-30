import fs from "fs"
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { QuartzEmitterPlugin } from "./quartz/plugins/types"
import { write } from "./quartz/plugins/emitters/helpers"
import { FilePath, FullSlug, joinSegments } from "./quartz/util/path"

/**
 * Emits `/.well-known/security.txt` (RFC 9116) at the site root.
 *
 * Source of truth is `content/.well-known/security.txt`. The Assets emitter cannot
 * copy it: it globs the content folder with `dot: false`, so dotted directories are
 * skipped, and Static only maps `quartz/static/**` to `/static/**`.
 */
const SecurityTxt: QuartzEmitterPlugin = () => ({
  name: "SecurityTxt",
  async emit(ctx) {
    const src = joinSegments(ctx.argv.directory, ".well-known/security.txt") as FilePath
    if (!fs.existsSync(src)) {
      console.warn("SecurityTxt emitter: content/.well-known/security.txt not found, skipping")
      return []
    }
    return [
      await write({
        ctx,
        content: await fs.promises.readFile(src, "utf-8"),
        slug: ".well-known/security.txt" as FullSlug,
        ext: "",
      }),
    ]
  },
  async *partialEmit() {},
})

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Calebe94",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "blog.calebe.dev.br",
    ignorePatterns: ["private", "**/templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Courier Prime",
        body: "Courier Prime",
        code: "Courier Prime",
      },
      colors: {
        lightMode: {
          light: "#f5f5f5",
          lightgray: "#d4d4d4",
          gray: "#888888",
          darkgray: "#1a3a1a",
          dark: "#003300",
          secondary: "#008800",
          tertiary: "#00cc00",
          highlight: "rgba(0, 255, 0, 0.08)",
          textHighlight: "#00ff0033",
        },
        darkMode: {
          light: "#151515",
          lightgray: "#2a2a2a",
          gray: "#555555",
          darkgray: "#c8c8c8",
          dark: "#fafafa",
          secondary: "#01ff70",
          tertiary: "#2ecc40",
          highlight: "rgba(46, 204, 64, 0.10)",
          textHighlight: "#2ecc4033",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      SecurityTxt(),
      Plugin.Favicon(),
      Plugin.CNAME(),
      Plugin.LegacyRedirects()
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
