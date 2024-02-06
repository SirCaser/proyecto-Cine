import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TmdbSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const apiKey = '850e2704d34d71b7a396eaadd700ed03'; // Reemplaza con tu propia clave de API de TMDb
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error al buscar películas en la API de TMDb:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 m-5">Buscador de Películas</h1>
      <div className="mb-4 flex m-5 text-black">
        <input
          type="text"
          placeholder="Buscar películas por título"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-full text-center flex-grow"
        />
        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded-full">
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 mb-16">
        {movies.map(movie => (
          <Link to={`/FilmDetails/${movie.id}`} key={movie.id} className="bg-black  rounded-xl shadow-md text-white">
            <h2 className="text-lg font-semibold mb-2 text-center p-4">{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="w-full h-[32rem] object-cover rounded-b-xl rounded-t-none"
              />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TmdbSearch;
