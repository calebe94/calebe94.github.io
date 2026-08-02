import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title-container")}>
      <button
        type="button"
        class="explorer-toggle mobile-explorer hide-until-loaded"
        data-mobile={true}
        aria-controls="explorer-content"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide-menu"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
      <div class="profile-image-container">
        <a href={baseDir}>
          <img src="https://github.com/Calebe94.png" alt="Calebe94" />
        </a>
      </div>
      <h2 class="page-title">
        <a href={baseDir}>{title}</a>
      </h2>
    </div>
  )
}

PageTitle.css = `
.page-title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 100%; /* Prevent container from expanding past sidebar width */
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
  white-space: nowrap; /* Prevent title from wrapping and squishing the image */
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1; /* Allow the text to shrink and trigger the ellipsis if there's no space */
  min-width: 0; /* Important for ellipsis to work in a flex container */
}

/* Base style (desktop and default) hides the explorer toggle button */
.page-title-container .mobile-explorer {
  display: none;
}

.profile-image-container {
  display: flex;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
}

.profile-image-container a {
  display: block;
  line-height: 0;
  border-radius: 50%;
  overflow: hidden; /* Forces any contained elements (like the image) to be clipped to the 50% border radius */
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  flex-shrink: 0; /* Prevents the container from shrinking when text is too long */
  -webkit-mask-image: -webkit-radial-gradient(white, black); /* Safari fix for border-radius on images */
}

.profile-image-container img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--secondary);
  transition: border-color 0.2s ease;
  display: block;
  box-sizing: border-box; /* Ensure border size doesn't change the size of the element */
  margin: 0;
  padding: 0;
}

.profile-image-container img:hover {
  border-color: var(--tertiary);
}

@media all and (min-width: 768px) {
  .page-title-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-title {
    white-space: normal; /* Allow wrapping on desktop */
  }

  .profile-image-container a {
    width: 80px;
    height: 80px;
    min-width: 80px;
    min-height: 80px;
  }

  .profile-image-container img {
    border-width: 3px;
  }
}

@media all and (max-width: 800px) {
  /* On mobile, lay out as a horizontal row and show the explorer toggle button */
  .page-title-container {
    flex-direction: row;
  }

  .page-title-container .mobile-explorer {
    display: flex;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
