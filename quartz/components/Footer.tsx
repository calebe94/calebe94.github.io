import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface SocialLink {
  href: string
  iconClass: string
  label: string
}

interface Options {
  links: Record<string, string>
  socialLinks?: SocialLink[]
}

const defaultSocialLinks: SocialLink[] = [
  { href: "mailto:contato@calebe.dev.br", iconClass: "icon-envelop", label: "Email" },
  { href: "https://github.com/Calebe94", iconClass: "icon-github", label: "GitHub" },
  { href: "https://gitlab.com/Calebe94", iconClass: "icon-gitlab", label: "GitLab" },
  { href: "https://instagram.com/ocalebe94", iconClass: "icon-instagram1", label: "Instagram" },
]

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const socialLinks = opts?.socialLinks ?? defaultSocialLinks
    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="social-icons">
          {socialLinks.map(({ href, iconClass, label }) => (
            <a href={href} aria-label={label} target="_blank" rel="noreferrer">
              <i class={iconClass}></i>
            </a>
          ))}
        </div>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
