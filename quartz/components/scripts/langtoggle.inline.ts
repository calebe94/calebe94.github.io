// Language toggle: swaps between pt-BR (root) and EN-US (/en/)
// Mirrors the darkmode.inline.ts pattern — attaches on "nav" event
function getLangFromPath(pathname: string): "pt" | "en" {
  return pathname.startsWith("/en/") || pathname === "/en" ? "en" : "pt"
}

function computeTargetURL(pathname: string): string {
  const isEnglish = pathname.startsWith("/en/") || pathname === "/en"
  if (isEnglish) {
    // /en/posts/foo → /posts/foo, /en → /
    let target = pathname.replace(/^\/en/, "")
    if (target === "") target = "/"
    return target
  } else {
    // /posts/foo → /en/posts/foo, / → /en/
    const target = pathname === "/" ? "/en/" : "/en" + pathname
    return target
  }
}

document.addEventListener("nav", () => {
  const currentLang = getLangFromPath(window.location.pathname)
  localStorage.setItem("lang", currentLang)

  for (const btn of document.getElementsByClassName("langtoggle")) {
    btn.addEventListener("click", () => {
      const targetURL = computeTargetURL(window.location.pathname)
      const newLang = getLangFromPath(targetURL)
      localStorage.setItem("lang", newLang)
      // Full page load — language changes the entire page content
      window.location.assign(targetURL)
    })
  }
})