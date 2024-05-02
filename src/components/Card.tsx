import React, { useState } from "react"
import gihpy from "../assets/gihpy.png"
import "../styles/Card.scss"

interface props {
  url: string, 
  cap: string, 
  id: string, 
  handler: React.MouseEventHandler<HTMLElement>
}

const Card: React.FC<props> = ({url, cap, id, handler}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`three-dimensional ${isLoaded ? "loaded": ""}`}>
    <figure className="flip">
      <div className="front">
        <img src={gihpy} alt="giphy logo" />
      </div>
      <div className="back overlay card" onClick={handler} id={id}>
        <iframe src={url} title={cap} sandbox="allow-scripts" onLoad={() => setIsLoaded(true)}></iframe>
        <figcaption>{cap}</figcaption>
      </div>
    </figure>
    </div>
  )
}

export default Card