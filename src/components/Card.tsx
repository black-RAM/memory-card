import React from "react"
import { GifData } from "./interfaces"

const Card: React.FC<{data: GifData, handler: React.MouseEventHandler<HTMLElement>}> = ({data, handler}) => {
  const {embed_url, title, id} = data

  return (
    <figure id={id} onClick={handler} className="overlay card">
      <iframe src={embed_url} title={title} sandbox="allow-scripts"></iframe>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

export default Card