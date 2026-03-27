import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ProfileImage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "profile-image")}>
      <a href={baseDir}>
        <img src="https://github.com/Calebe94.png" alt="Calebe94" />
      </a>
    </div>
  )
}

ProfileImage.css = `
.profile-image {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.profile-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--secondary);
  transition: border-color 0.2s ease;
}

.profile-image img:hover {
  border-color: var(--tertiary);
}
`

export default (() => ProfileImage) satisfies QuartzComponentConstructor
