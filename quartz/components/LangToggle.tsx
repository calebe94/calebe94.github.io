// @ts-ignore
import langToggleScript from "./scripts/langtoggle.inline"
import styles from "./styles/langtoggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const LangToggle: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  // Detect page language from slug: /en/... = English, /pt/... = Portuguese
  const isEnglish = fileData.slug?.startsWith("en/") || fileData.slug === "en"
  const pageLocale = isEnglish ? "en-US" : "pt-BR"
  const label = i18n(pageLocale).components.langToggle?.switchTo ?? "EN"

  return (
    <button class={classNames(displayClass, "langtoggle")} aria-label={label}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        class="langIcon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-label={label}
      >
        <title>{label}</title>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </button>
  )
}

LangToggle.beforeDOMLoaded = langToggleScript
LangToggle.css = styles

export default (() => LangToggle) satisfies QuartzComponentConstructor
