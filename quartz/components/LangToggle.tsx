// @ts-ignore
import langToggleScript from "./scripts/langtoggle.inline"
import styles from "./styles/langtoggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const LangToggle: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  // Detect page language from slug: /en/... = English, everything else = Portuguese
  const isEnglish = fileData.slug?.startsWith("en/") || fileData.slug === "en"
  // Label comes from the CURRENT page's locale perspective:
  // PT page → pt-BR locale → switchTo = "English" (where you'll go)
  // EN page → en-US locale → switchTo = "Português" (where you'll go)
  const pageLocale = isEnglish ? "en-US" : "pt-BR"
  const label = i18n(pageLocale).components.langToggle?.switchTo ?? "EN"
  // Flag shows the language you'd switch TO
  // PT page → 🇬🇧 (switch to English), EN page → 🇧🇷 (switch to Portuguese)
  const flag = isEnglish ? "🇧🇷" : "🇬🇧"

  return (
    <button class={classNames(displayClass, "langtoggle")} aria-label={label}>
      <span class="langtoggle-flag" aria-hidden="true">{flag}</span>
      <span class="langtoggle-label">{label}</span>
    </button>
  )
}

LangToggle.beforeDOMLoaded = langToggleScript
LangToggle.css = styles

export default (() => LangToggle) satisfies QuartzComponentConstructor