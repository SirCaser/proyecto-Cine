import React, { useEffect, useState } from 'react';
import {useLoaderData } from "react-router-dom";
import Button from './components/Button.jsx';
import ButtonFav from './components/ButtonFav.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmsID } from './store/slices/filmsThunks.js';


export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function FilmDetails() {
  const { id } = useLoaderData();
  const dispatch = useDispatch();
  const {films} = useSelector( state => state.films)

  function convertirDuracion(duracionEnMinutos) {
    const horas = Math.floor(duracionEnMinutos / 60);
    const minutos = duracionEnMinutos % 60;

    const horasTexto = horas > 0 ? `${horas} hora${horas !== 1 ? 's' : ''}` : '';
    const minutosTexto = minutos > 0 ? `${minutos} minuto${minutos !== 1 ? 's' : ''}` : '';

    return `${horasTexto}${horasTexto && minutosTexto ? ' y ' : ''}${minutosTexto}`;
  }
  function formatearFechaCompleta(fecha) {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = meses[fechaObj.getMonth()];
    const año = fechaObj.getFullYear();
  
    return `${dia} de ${mes} de ${año}`;
  }
  

  const obtenerTrailer = (videos) => {
    const trailer = videos?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return `${trailer?.key}`;
  };

  useEffect(() => {
    dispatch(getFilmsID(id));
  }, [id]);
    const titulo = films?.title
    const fechaEstreno = formatearFechaCompleta(films?.release_date)
    const descripcion = films?.overview
    const imagen = `https://image.tmdb.org/t/p/w500${films?.poster_path}`
    const valoracion = films?.vote_average?.toFixed(1)
    const generos = films?.genres?.map(genre => genre.name).join(', ')
    const actores = films?.credits?.cast.slice(0, 5).map(actor => actor.name).join(', ')
    const duracion = convertirDuracion(films?.runtime)
    const trailer = obtenerTrailer(films?.videos?.results)


  return (
    <body className='bg-[#071429] font-poppins'><br />
      <h2 className="text-4xl font-bold text-center text-white mt-20 mb-10 m-5">{titulo}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-5 ml-20">
        <div className="col-span-1">
          <div className="flex justify-center">
            <Link to={`/FilmBuy/${id}`} key={id} className="  rounded-xl shadow-md text-white">
              <Button />
            </Link>
            <ButtonFav texto={titulo} img={imagen} id={id}/>
          </div>
          <img className='rounded w-82' src={imagen} alt={`Imagen de ${titulo}`} />
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <div><br /><br /><br />
            <p className='text-[#9b9792] text-left'>FECHA DE ESTRENO</p>
            <p className='text-white text-left mb-10'>{fechaEstreno} </p>
            <p className='text-[#9b9792] text-left'>DURACION</p>
            <p className='text-white text-left mb-10'>{duracion}</p>
            <p className='text-[#9b9792] text-left'>VALORACIÓN</p>
            <p className='text-white text-left mb-10'>{valoracion}</p>
            <p className='text-[#9b9792] text-left'>GÉNEROS</p>
            <p className='text-white text-left mb-10'>{generos}</p>
            <p className='text-[#9b9792] text-left'>ACTORES</p>
            <p className='text-white text-left mb-10'>{actores}</p>
            <p className='text-[#9b9792] text-left'>SINOPSIS</p>
            <p className='text-white text-left mb-10'>{descripcion}</p>
          </div>
          <div className='flex justify-center mb-16'>
            {trailer && (
              <div>
                <p className='text-[#9b9792] text-left mb-2'>TRÁILER</p>
                <div className="iframe-container">
                  <iframe
                    title="Tráiler"
                    width="700"
                    height="455"
                    src={`https://www.youtube.com/embed/${trailer}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
}

export default FilmDetails;