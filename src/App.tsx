import React, { useEffect, useReducer, useRef, useState } from 'react'
import scoreReducer from './reducers/scoreReducer.ts'
import Card from './components/Card.tsx'
import "./styles/App.scss"

const GIF_ENDPOINT = "https://api.giphy.com/v1/gifs/trending?api_key=BBvAVBWsTWm80AeqYJivTY0s4nrR0sY3&limit=20&rating=g"

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

    interface GifData {
      data: {
        id: string,
        embed_url: string,
        title: string
      }[]
    }

    fetch(GIF_ENDPOINT).then((response) => {
      return response.json()
    }).then((data: GifData) => {
      const cards = data["data"].map(gif => 
        <Card 
          url={gif["embed_url"]} 
          cap={gif["title"]} 
          id={gif["id"]}
          handler={updateScore} 
          key={gif["id"]} />
      )
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

  return <>
    <hgroup className="spaced-header">
      <h1 className="title">GIF Memory Card Game</h1>
      <div className="scoreboard">
        <h2>Score: {score.current}</h2>
        <h2>Best: {score.best}</h2>
      </div>
    </hgroup>
    <main className="masonry">
      {gifs}
    </main>
  </>
}

export default App
