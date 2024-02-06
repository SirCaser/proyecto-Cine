import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import Button from './components/Button.jsx';
import ButtonFav from './components/ButtonFav.jsx';

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function FilmBuy() {
  const navigate = useNavigate(); // Importa useNavigate para navegar a otra página
  const { id } = useLoaderData();
  const [detallesPelicula, setDetallesPelicula] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [hora, setHora] = useState('12:00'); // Hora por defecto
  const [fecha, setFecha] = useState("Ejemplo");
  const [total, setTotal] = useState(5);

  useEffect(() => {
    const obtenerDetallesPelicula = async () => {
      try {
        const apiKey = '850e2704d34d71b7a396eaadd700ed03';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`;
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
          setDetallesPelicula({
            titulo: data.title,
            imagen: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          });
        } else {
          console.error('No se encontraron detalles para la película con ID:', id);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    };

    obtenerDetallesPelicula();
  }, [id]);

  const handleChangeCantidad = (event) => {
    setCantidad(parseInt(event.target.value));
    setTotal(calcularPrecioTotal())
  };

  const handleChangeFecha = (event) => {
    setFecha(event.target.value);
  };

  const handleChangeHora = (event) => {
    setHora(event.target.value);
  };

  const calcularPrecioTotal = () => {
    return cantidad * 5;
  };

  const handleSubmitReserva = (event) => {
    event.preventDefault();
    // Realizar acciones relacionadas con la reserva, como enviar datos a otro componente
    navigate('/datosReserva', { state: { detallesPelicula, cantidad, hora, fecha, total } }); // Navegar a la página de datos de reserva con los datos necesarios
  };

  if (!detallesPelicula) {
    return <p>Cargando detalles de la película...</p>;
  }

  return (
    <body className='bg-[#071429] font-poppins'><br />
      <h1 className="text-4xl font-bold text-center text-white mt-20 mb-10">Reservar película</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-5 ml-20">
        <div className="col-span-1">
          <img className='rounded w-64' src={detallesPelicula.imagen} alt={`Imagen de ${detallesPelicula.titulo}`} />
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <form onSubmit={handleSubmitReserva}>
            <p className='text-[#9b9792] text-left'>Nombre: <a className='text-white'>{detallesPelicula.titulo}</a></p><br />
            <p className='text-[#9b9792] '>Fecha: <input type="date"  className='text-black rounded'  onChange={handleChangeFecha}/></p><br />
            <div className="flex items-center mb-4">
              <label htmlFor="hora" className="text-[#9b9792] text-left mr-2">Hora:</label>
              <select id="hora" name="hora" value={hora} onChange={handleChangeHora} className="block w-28 py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                {['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="cantidad" className="text-[#9b9792] text-left mr-2">Cantidad:</label>
              <select id="cantidad" name="cantidad" value={cantidad} onChange={handleChangeCantidad} className="block w-20 py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <p className='text-[#9b9792] text-left mb-2'>Precio total: {calcularPrecioTotal()}€</p>
            <button type="submit" className="w-80 py-2 px-4 border border-transparent text-xl font-medium rounded-2xl text-white bg-[#2F94B6] hover:bg-[#2B87A8]">Realizar reserva</button>
          </form>
        </div>
      </div>
    </body>
  );
}

export default FilmBuy;
