// Language toggle: swaps between pt-BR (/pt/) and EN-US (/en/)
// Mirrors the darkmode.inline.ts pattern — attaches on "nav" event
function getLangFromPath(pathname: string): "pt" | "en" {
  return pathname.startsWith("/en/") || pathname === "/en" ? "en" : "pt"
}

function computeTargetURL(pathname: string): string {
  const isEnglish = pathname.startsWith("/en/") || pathname === "/en"
  if (isEnglish) {
    // /en/posts/foo → /pt/posts/foo, /en → /pt/
    let target = pathname.replace(/^\/en/, "/pt")
    if (target === "/pt") target = "/pt/"
    return target
  } else if (pathname.startsWith("/pt/") || pathname === "/pt") {
    // /pt/posts/foo → /en/posts/foo, /pt/ → /en/
    let target = pathname.replace(/^\/pt/, "/en")
    if (target === "/en") target = "/en/"
    return target
  } else {
    // Root or unknown — default to /pt/
    return "/pt/"
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
