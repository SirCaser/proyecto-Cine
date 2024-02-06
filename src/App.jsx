import React from 'react';
import { useState } from 'react';
import './App.css';
import Slider from './components/Slider.jsx';
import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="mt-20 mb-10">
        <br />
        <h1 className='text-center text-white text-2xl font-bold'>Ultimos estrenos</h1>
        <Slider />
      </div>
      <div className="mt-8 mx-auto max-w-screen-lg text-center text-white bg-gray-800 rounded-xl p-5">
      <h1 className='text-2xl m-5'>¡Bienvenido a nuestra pantalla principal!</h1>
      <p className='mb-2'>En este espacio, queremos destacar todas las ventajas y ofertas que nuestro cine tiene para ofrecerte. ¿Por qué elegirnos? Porque aquí no solo te ofrecemos películas, te brindamos una experiencia inolvidable. Desde los últimos estrenos hasta los clásicos más queridos, tenemos una amplia selección para todos los gustos.</p>
      <p className='mb-2'>¿Qué nos diferencia? Nuestras ofertas imbatibles. Con precios accesibles y promociones irresistibles, estamos comprometidos a hacer que cada visita al cine sea especial. ¡No te pierdas nuestras increíbles promociones y descubre todo lo que tenemos preparado para ti!</p>
      <p className='mb-5'>Ven y únete a nosotros en esta emocionante aventura cinematográfica. ¡Te esperamos en nuestro cine, donde la magia del cine cobra vida!</p>
      <Link to="/cartelera">
        <button className="py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Ver películas</button>
      </Link>
      </div><br /><br /><br />
    </>
  );
}

export default App;
