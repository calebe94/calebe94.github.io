// Unified reading mode toggle — 3 states: terminal -> focus -> reading -> terminal
// Replaces the old Darkmode + ReaderMode pair. Retro terminal theme is dark-only,
// so saved-theme is hard-pinned to "dark" (no light mode).
const STORAGE_KEY = "reading-mode"
type Mode = "terminal" | "focus" | "reading"
const CYCLE: Mode[] = ["terminal", "focus", "reading"]

function nextMode(current: Mode): Mode {
  const idx = CYCLE.indexOf(current)
  return CYCLE[(idx + 1) % CYCLE.length]
}

function applyMode(mode: Mode) {
  document.documentElement.setAttribute("data-reading-mode", mode)
  // Pin dark theme — retro terminal has no light variant
  document.documentElement.setAttribute("saved-theme", "dark")
}

function storedMode(): Mode {
  const v = localStorage.getItem(STORAGE_KEY)
  if (v === "focus" || v === "reading") return v
  return "terminal"
}

function ariaLabel(mode: Mode): string {
  const el = document.querySelector(".readermode")
  const labels = el?.getAttribute("data-labels")
  if (labels) {
    try {
      const map = JSON.parse(labels) as Record<Mode, string>
      if (map[mode]) return map[mode]
    } catch {
      /* fall through */
    }
  }
  // fallback
  return mode === "terminal"
    ? "Terminal mode"
    : mode === "focus"
      ? "Focus mode"
      : "Reading mode"
}

function updateButton(button: HTMLElement, mode: Mode) {
  const icon = button.querySelector(".rm-icon")
  if (icon) {
    icon.textContent =
      mode === "terminal" ? ">_" : mode === "focus" ? "L" : "Aa"
  }
  button.setAttribute("aria-label", ariaLabel(mode))
  button.setAttribute("data-mode", mode)
}

const emitReaderModeChangeEvent = (mode: Mode) => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent(
    "readermodechange",
    { detail: { mode } },
  )
  document.dispatchEvent(event)
}

// Apply immediately (before first paint) — pin dark + restore saved mode
applyMode(storedMode())

document.addEventListener("nav", () => {
  let currentMode = storedMode()
  applyMode(currentMode)

  const switchMode = () => {
    currentMode = nextMode(currentMode)
    localStorage.setItem(STORAGE_KEY, currentMode)
    applyMode(currentMode)
    for (const btn of document.getElementsByClassName(
      "readermode",
    ) as HTMLCollectionOf<HTMLElement>) {
      updateButton(btn, currentMode)
    }
    emitReaderModeChangeEvent(currentMode)
  }

  for (const button of document.getElementsByClassName(
    "readermode",
  ) as HTMLCollectionOf<HTMLElement>) {
    updateButton(button, currentMode)
    button.addEventListener("click", switchMode)
    window.addCleanup(() => button.removeEventListener("click", switchMode))
  }
})