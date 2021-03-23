import React, {useState, useEffect} from 'react';
import axios from './axios'
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

  const handleClick = (movieId) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      setTrailerUrl(movieId)
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => {
            let youtubeId = "";

            async function fetchYoutubeId() {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=39ca45225d9e96cbe5a1dbfe95818617`)
                .catch(error => console.log(`Fetch error: ${error}`))
              const data = await response.json()
              youtubeId = data.results ? (data.results.length > 0 ? data.results[0].key : "") : ""
            }

            fetchYoutubeId()

            return movie.poster_path ? (
              <img
                key={youtubeId ? youtubeId : movie.id}
                onClick={() => handleClick(youtubeId ? youtubeId : movie.id)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
              />) : null
          })}
        </div>
        {trailerUrl && <iframe src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`} width="100%" height="395" frameborder="0" allowfullscreen title={trailerUrl} />}
      </div>
    </React.Fragment>
  )
};

export default Row;
