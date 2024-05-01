import React, { useEffect, useReducer, useRef, useState } from 'react'
import "./App.scss"

interface GifData {
  id: string,
  embed_url: string,
  title: string
}

const Card: React.FC<{data: GifData, handler: React.MouseEventHandler<HTMLElement>}> = ({data, handler}) => {
  const {embed_url, title, id} = data

  return (
    <figure id={id} onClick={handler} className="overlay">
      <iframe src={embed_url} title={title} sandbox="allow-scripts"></iframe>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

interface State {
  current: number,
  best: number
}

type Action = {type: "INCREMENT"} | {type: "RESET"}

const scoreReducer: React.Reducer<State, Action> = (state, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {...state, current: state.current + 1}
    case 'RESET': {
      let record = state.best
      if(state.current > record) record = state.current
      return {current: 0, best: record}
    }
  }
}

const initialScore = {
  current: 0,
  best: 0
}

const App = () => {
  const [gifs, setGifs] = useState<React.JSX.Element[]>([])
  const [score, scoreDispatch] = useReducer(scoreReducer, initialScore)
  const clickedGifs = useRef([""])

  const createCards = () => {
    const updateScore = (e: React.MouseEvent) => {
      const currentCard = e.currentTarget.id
      if(clickedGifs.current.includes(currentCard)) {
        scoreDispatch({type: "RESET"})
      } else {
        scoreDispatch({type: "INCREMENT"})
      }
      clickedGifs.current = [...clickedGifs.current, currentCard]
    }

    fetch("https://api.giphy.com/v1/gifs/trending?api_key=BBvAVBWsTWm80AeqYJivTY0s4nrR0sY3&limit=20").then((response) => {
      return response.json()
    }).then((data: {data: GifData[]}) => {
      const cards = data["data"].map(gif => <Card data={gif} handler={updateScore} key={gif["id"]} />)
      setGifs(cards)
    })
  }

  const shuffle = () => {
    setGifs(array => {
      const shuffled = [...array]
      for(let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled
    })
  }

  useEffect(createCards, [])
  useEffect(shuffle, [score])

  return (
    <div>
      <h1>GIF Memory Card Game</h1>
      <p>Score: {score.current}</p>
      <p>Best Score: {score.best}</p>
      <div className="masonry">{gifs}</div>
    </div>
  )
}

export default App
