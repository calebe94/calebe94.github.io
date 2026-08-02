const STORAGE_KEY = "reader-mode"

const getSavedReaderMode = (): "on" | "off" => {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === "on" ? "on" : "off"
}

let isReaderMode = getSavedReaderMode() === "on"

const setReaderMode = (mode: "on" | "off") => {
  isReaderMode = mode === "on"
  document.documentElement.setAttribute("reader-mode", mode)
  localStorage.setItem(STORAGE_KEY, mode)
}

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchReaderMode = () => {
    const newMode = isReaderMode ? "off" : "on"
    setReaderMode(newMode)
    emitReaderModeChangeEvent(newMode)
  }

  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.addEventListener("click", switchReaderMode)
    window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode))
  }

  // Restore saved state on every navigation (SPA and full page loads)
  const savedMode = getSavedReaderMode()
  setReaderMode(savedMode)
})
