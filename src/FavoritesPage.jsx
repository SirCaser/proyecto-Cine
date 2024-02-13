import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem('favoritos')) || [];

  return (
    <body>
    <h2 className="text-4xl font-bold text-center text-white mt-20 mb-10 m-5">Películas favoritas</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 mb-16">
      {favorites.map((film, index) => (
        <Link to={`/FilmDetails/${film?.id}`} key={film?.id} className="bg-black  rounded-xl shadow-md text-white">
        <div key={index} className="bg-black rounded-xl shadow-md text-white">
          <h2 className="text-lg font-semibold mb-2 text-center p-4">{film.texto}</h2>
          <img
            src={film.img}
            alt={`${film.texto} Poster`}
            className="w-full h-[26rem] object-cover rounded-b-xl rounded-t-none"
          />
        </div>
        </Link>
      ))}
    </div>
    </body>
  );
};

export default FavoritesPage;
