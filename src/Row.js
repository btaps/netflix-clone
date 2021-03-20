import React, {useState, useEffect} from 'react';
import axios from './axios'
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"
import './Row.css'

const baseURL = "https://image.tmdb.org/t/p/original"

const Row = ({title, fetchUrl, isLargeRow}) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl])

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }



  const handleClick = (movie) => {
    
    if(trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.name ||  movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'))
          console.log('hit')
        })
        .catch(error => console.log(error))
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => {
            return movie.poster_path ? (
              <img 
                key={movie.id} 
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name} 
              />) : null
          })}
                </div>
                  {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </React.Fragment>
  )
};

export default Row; 
