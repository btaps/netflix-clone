import React, {useState, useEffect} from 'react';
import axios from './axios'
import './Row.css'

const baseURL = "https://image.tmdb.org/t/p/original"

const Row = ({title, fetchUrl}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl])

  console.log(movies);

  return (
    <React.Fragment>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => {
            return movie.poster_path ? (<img key={movie.id} className="row__poster" src={`${baseURL}${movie.poster_path}`} alt={movie.name} />) : null
          })}
        </div>
      </div>
    </React.Fragment>
  )
};

export default Row; 
