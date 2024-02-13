import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getFilmsID } from './store/slices/filmsThunks.js';

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function FilmBuy() {
  const navigate = useNavigate(); // Importa useNavigate para navegar a otra página
  const { id } = useLoaderData();
  const [cantidad, setCantidad] = useState(1);
  const [hora, setHora] = useState('12:00'); // Hora por defecto
  const [fecha, setFecha] = useState("Ejemplo");
  const [total, setTotal] = useState(5);
  const dispatch = useDispatch();
  const {films} = useSelector( state => state.films)
  useEffect(() => {
    dispatch(getFilmsID(id));
  }, [id]);
  
  const titulo = films?.title
  const imagen = `https://image.tmdb.org/t/p/w500${films?.poster_path}`

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
    const reservasExistentes = JSON.parse(localStorage.getItem('reservas')) || [];
    const updatedReservas = [...reservasExistentes, { id, titulo, imagen, cantidad, hora, fecha, total }];
    localStorage.setItem('reservas', JSON.stringify(updatedReservas));
    // Realizar acciones relacionadas con la reserva, como enviar datos a otro componente
    navigate('/datosReserva', { state: { id, titulo, imagen, cantidad, hora, fecha, total } }); // Navegar a la página de datos de reserva con los datos necesarios
  };

  return (
    <body className='bg-[#071429] font-poppins'><br />
      <h1 className="text-4xl font-bold text-center text-white mt-20 mb-10">Reservar película</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-5 ml-20">
        <div className="col-span-1">
          <img className='rounded w-64' src={imagen} alt={`Imagen de ${titulo}`} />
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <form onSubmit={handleSubmitReserva}>
            <p className='text-[#9b9792] text-left'>Nombre: <a className='text-white'>{titulo}</a></p><br />
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
