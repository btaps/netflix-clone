const API_KEY = "39ca45225d9e96cbe5a1dbfe95818617";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&append_to_response=videos`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&append_to_response=videos`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&append_to_response=videos`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&append_to_response=videos`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&append_to_response=videos`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&append_to_response=videos`,
}

export default requests
