// @ts-ignore
import langToggleScript from "./scripts/langtoggle.inline";
import styles from "./styles/langtoggle.scss";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";

const LangToggle: QuartzComponent = ({
  displayClass,
  fileData,
}: QuartzComponentProps) => {
  // Detect page language from slug: /en/... = English, /pt/... = Portuguese
  const isEnglish = fileData.slug?.startsWith("en/") || fileData.slug === "en";
  const pageLocale = isEnglish ? "en-US" : "pt-BR";
  const switchTo = i18n(pageLocale).components.langToggle?.switchTo ?? "EN";
  const prefix = isEnglish ? "Switch language to" : "Mudar idioma para";
  const switchLabel = `${prefix} ${switchTo}`;

  // Current = page language, Target = the other one
  const currentLang = isEnglish ? "EN" : "PT";
  const targetLang = isEnglish ? "PT" : "EN";

  return (
    <button
      class={classNames(displayClass, "langtoggle")}
      aria-label={switchLabel}
    >
      <span class="lang-current" aria-current="page">{currentLang}</span>
      <span class="lang-sep" aria-hidden="true">|</span>
      <span class="lang-target">{targetLang}</span>
    </button>
  );
};

LangToggle.beforeDOMLoaded = langToggleScript;
LangToggle.css = styles;

export default (() => LangToggle) satisfies QuartzComponentConstructor;