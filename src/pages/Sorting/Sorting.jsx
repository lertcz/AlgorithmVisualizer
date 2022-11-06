import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { IconContext } from 'react-icons'
import "./Sort.css";

import { Slider, Stack } from '@mui/material';

import * as SA from './SortingAlgorithms';
import { Algorithms } from './SortingInfo';

/* shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */

const canvasW = 1000
const canvasH = 600

let elements = null

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

let drawArray = (canvasRef, highlight=null) => {
  let numberOfElements = elements.length
  const context = canvasRef.current.getContext('2d')
  let size = canvasW / (numberOfElements) - 1 //  numberOfElements
  let height = canvasH / (numberOfElements)
  
  context.fillStyle = "#a6a6a6"
  /* Clear canvas */
  context.clearRect(0, 0, canvasW, canvasH);
  for (let i = 0; i < numberOfElements; i++) {
    if (highlight && highlight[0] === "highlight") {
      context.fillStyle = (highlight[1] !== i) ? '#a6a6a6' : 'red'
    }
    else if (highlight && highlight[0] === "wave") {
      context.fillStyle = (![...Array(highlight[2] - highlight[1] + 1).keys()].map(x => x + highlight[1]).includes(i)) ? '#a6a6a6' : 'green'
    }

    context.fillRect(size*(i)+i, canvasH - height * (elements[i]+1), size, height * (elements[i]+1))
  }
}

export default function Sort() {
  const defaultSliderValue = 25
  const [numberOfElements, setNumberOfElements] = useState(defaultSliderValue)
  const [status, setStatus] = useState(false)

  const canvasRef = useRef(null)

  let { algorithm } = useParams();

  const handleSliderChange = (event, value) => {
    setNumberOfElements(value);
  }

  async function Shuffle() {
    if (!status) { // shuffle in progress
      setStatus(true)
      await SA.shuffleArray(canvasRef, elements, drawArray)
      setStatus(false)
    }
  }
  /* const Shuffle = useCallback(async () => {
    if (!status) { // shuffle in progress
      setStatus(true)
      await SA.shuffleArray(canvasRef, elements, drawArray)
      setStatus(false)
    }
  }, [status]) */

  async function Sort() {
    if (status) {
      elements = Array.from(Array(numberOfElements).keys())
      drawArray(canvasRef)
      setStatus(!status)
      return
    }
    setStatus(true)
    await Algorithms[algorithm].sortingFunction(canvasRef, elements, drawArray)
    setStatus(false)
  }
  
  useEffect(() => {
    elements = Array.from(Array(numberOfElements).keys())
    drawArray(canvasRef)
  }, [numberOfElements, algorithm]);

  useEffect(() => {
    const loadShuffle = async () => {
      await sleep(1000)
      Shuffle()
    }
    loadShuffle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm])

  return (
    <div className="pageContent">
      <Stack spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" >
        <div className="controlBarName">
          <h1>{Algorithms[algorithm].name}</h1>
        </div>
        <IconContext.Provider value={{color: "#fff"}}>
          {/* shuffle button */}
          <button className="btn" onClick={Shuffle} disabled={status}><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg></button>
          <button className="btn" onClick={Sort}>
            {/* play / pause button */}
            {status ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path></svg>
            : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>}
          </button>
        </IconContext.Provider>
        
        <h6>{numberOfElements}</h6>
        <div className="controlBarSlider">
          <Slider className="controlBarSlider" disabled={status} min={10} max={100} defaultValue={defaultSliderValue} step={5} size="medium" aria-label="Default" onChange={handleSliderChange} />
        </div>
      </Stack>
        <canvas className="sortContainer" id="canvas" ref={canvasRef} width={canvasW} height={canvasH} />
    </div>
	)
}