import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import './App.css';

function App() {
  const [trendingGifs, setTrendingGifs] = useState([])
  const [searchGif, setSearchGif] = useState('')

  const getTrendingGifs = useCallback(() => {
    let url = `https://api.giphy.com/v1/gifs/trending?&api_key=b9OZogVAx36AFrLmk9oFszATP4jvrwTQ`
    axios
      .get(url)
      .then((response) => setTrendingGifs(response.data.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    getTrendingGifs()
  }, [getTrendingGifs])

  const getSearchGifs = useCallback(() => {
    let url = `https://api.giphy.com/v1/gifs/search?q=${searchGif.replace(/\s/g, '+')}&api_key=b9OZogVAx36AFrLmk9oFszATP4jvrwTQ`
    axios
      .get(url)
      .then((response) => setTrendingGifs(response.data.data))
      .catch((error) => console.log(error))
  }, [searchGif])

  useEffect(() => {
    searchGif && getSearchGifs()
  }, [getSearchGifs, searchGif])

  let gifSearchTimeout;

  const doGifSearch = (gifSearchString) => {
    clearTimeout(gifSearchTimeout)

    gifSearchTimeout = setTimeout(() => {
      setSearchGif(gifSearchString)
    }, 500)
  }

  return (
    <div className="container">
      <div className='input'>
        <input
          type='text'
          placeholder='Search Gifs...'
          onChange={(event) => doGifSearch(event.target.value)}
        >
        </input>
      </div>
      {
        trendingGifs?.map((trendingGif) => {
          return (
            <div className='wrapper'>
              <div key={trendingGif.id}>
                <img src={trendingGif.images.downsized.url} alt={trendingGif.type} />
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
