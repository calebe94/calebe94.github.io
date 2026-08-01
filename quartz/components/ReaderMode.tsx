// @ts-ignore
import readerModeScript from "./scripts/readermode.inline"
import styles from "./styles/readermode.scss"
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const ReaderMode: QuartzComponent = ({
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const t = i18n(cfg.locale).components.readerMode
  const labels = JSON.stringify({
    terminal: t.terminal ?? "Terminal mode",
    focus: t.focus ?? "Focus mode",
    reading: t.reading ?? "Reading mode",
  })
  return (
    <button
      class={classNames(displayClass, "readermode")}
      data-labels={labels}
      aria-label={t.terminal ?? "Terminal mode"}
    >
      <span class="rm-icon" aria-hidden="true">{">_"}</span>
    </button>
  )
}

ReaderMode.beforeDOMLoaded = readerModeScript
ReaderMode.css = styles

export default (() => ReaderMode) satisfies QuartzComponentConstructor