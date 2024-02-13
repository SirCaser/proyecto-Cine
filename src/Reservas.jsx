import React from 'react';
import { Link } from 'react-router-dom';

const Reservas = () => {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

  return (
    <body>
      <h2 className="text-4xl font-bold text-center text-white mt-20 mb-10 m-5">Reservas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 mb-16">
        {reservas.map((film, index) => (
          <div key={index} className="bg-black rounded-xl shadow-md text-white" title={`Cantidad: ${film.cantidad}, Hora: ${film.hora}, Fecha: ${film.fecha}`}>
            <h2 className="text-lg font-semibold mb-2 text-center p-4">{film.titulo}</h2>
            <img
              src={film.imagen}
              alt={`${film.texto} Poster`}
              className="w-full h-[26rem] object-cover rounded-b-xl rounded-t-none"
            />
          </div>
        ))}
      </div>
    </body>
  );
};

export default Reservas;
