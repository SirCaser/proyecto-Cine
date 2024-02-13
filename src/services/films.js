
const apiKey = '850e2704d34d71b7a396eaadd700ed03';
export const getMoviesBy = (keyword) => {
    try {
        if(keyword == null){
          return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
        } else{
          return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`);
        }
    } catch (error) {
      console.error('Error al buscar películas en la API de TMDb:', error);
    }
}
export const getMoviesByID = (id) => {
  try {
      return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`);
  } catch (error) {
    console.error('Error al buscar películas en la API de TMDb:', error);
  }
}