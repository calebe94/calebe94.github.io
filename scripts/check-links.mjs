import { readFileSync, readdirSync, existsSync, statSync } from "fs"
import { join, dirname, resolve, relative } from "path"

// Usage: node scripts/check-links.mjs [public] [--strict]
// Default: warn on broken links (exit 0), report count
// --strict: fail (exit 1) if any broken links found
const args = process.argv.slice(2)
const strict = args.includes("--strict")
const pubdir = args.find(a => !a.startsWith("-")) || "public"
let broken = 0
let checked = 0

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith(".html")) checkFile(full)
  }
}

function checkFile(file) {
  const html = readFileSync(file, "utf8")
  const dir = dirname(file)
  for (const match of html.matchAll(/href="([^"]*)"/g)) {
    let href = match[1]
    // Skip external, mailto, tel, anchors, empty, JS, data
    if (/^(https?:|mailto:|tel:|javascript:|data:|#)/.test(href) || !href) continue
    // Strip fragment
    href = href.split("#")[0]
    if (!href) continue
    // Skip root-relative links (start with /) — Quartz serves them at runtime
    if (href.startsWith("/")) {
      checked++
      continue
    }
    // Skip links that look like external domains without protocol (e.g. ../../yunohost.org, www.easyeda.com)
    const segments = href.replace(/\/+$/, "").split("/")
    const looksExternal = segments.some(s => /^w{0,3}\.?\w+\.\w{2,}$/.test(s) && !s.endsWith(".html"))
    if (looksExternal) {
      checked++
      continue
    }
    // Resolve relative to file dir
    const target = resolve(dir, href)
    // Check: exact file, file.html, or dir/index.html
    if (existsSync(target) && statSync(target).isFile()) {
      checked++
    } else if (existsSync(target + ".html")) {
      checked++
    } else if (existsSync(target) && statSync(target).isDirectory() && existsSync(join(target, "index.html"))) {
      checked++
    } else {
      console.log(`BROKEN: ${href} (from ${relative(pubdir, file)})`)
      broken++
    }
  }
}

walk(pubdir)
console.log("---")
console.log(`Checked: ${checked}, Broken: ${broken}`)
process.exit(strict && broken > 0 ? 1 : 0)