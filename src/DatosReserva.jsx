import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function DatosReserva() {
  const location = useLocation();
  const { id, titulo, imagen, cantidad, hora, fecha, total } = location.state;
  return (
    <body className='bg-[#071429] font-poppins'>
        <h1 className='mt-24 text-2xl text-center'>Datos de la reserva</h1>
        <div className='mt-10 text-center m-5 bg-gray-800 rounded-lg p-4'>
            <p className='text-[#9b9792] '>Nombre de la película: <span className='text-white'>{titulo}</span></p><br />
            <p className='text-[#9b9792] '>Cantidad de entradas: <span className='text-white'>{cantidad}</span></p><br />
            <p className='text-[#9b9792] '>Hora: <span className='text-white'>{hora}</span></p><br />
            <p className='text-[#9b9792] '>Fecha: <span className='text-white'>{fecha}</span></p><br />
            <p className='text-[#9b9792] '>Total: <span className='text-white'>{total}</span></p><br />
        </div>
    </body>
  );
}

export default DatosReserva;
