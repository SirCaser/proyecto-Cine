import React, { useEffect, useState } from 'react';
import {useLoaderData } from "react-router-dom";
import Button from './components/Button.jsx';
import ButtonFav from './components/ButtonFav.jsx';
import { Link } from 'react-router-dom';


export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function FilmDetails() {
  const { id } = useLoaderData();
  const [detallesPelicula, setDetallesPelicula] = useState(null);

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
    const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return `${trailer.key}`;
  };

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
            fechaEstreno: formatearFechaCompleta(data.release_date),
            descripcion: data.overview,
            imagen: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            valoracion: data.vote_average.toFixed(1),
            generos: data.genres.map(genre => genre.name).join(', '),
            actores: data.credits.cast.slice(0, 5).map(actor => actor.name).join(', '),
            duracion: convertirDuracion(data.runtime),
            trailer: obtenerTrailer(data.videos.results),
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

  if (!detallesPelicula) {
    return <p>Cargando detalles de la película...</p>;
  }

  return (
    <body className='bg-[#071429] font-poppins'><br />
      <h2 className="text-4xl font-bold text-center text-white mt-20 mb-10 m-5">{detallesPelicula.titulo}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-5 ml-20">
        <div className="col-span-1">
          <div className="flex justify-center">
            <Link to={`/FilmBuy/${id}`} key={id} className="  rounded-xl shadow-md text-white">
              <Button />
            </Link>
            <ButtonFav texto={detallesPelicula.titulo}/>
          </div>
          <img className='rounded w-82' src={detallesPelicula.imagen} alt={`Imagen de ${detallesPelicula.titulo}`} />
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <div><br /><br /><br />
            <p className='text-[#9b9792] text-left'>FECHA DE ESTRENO</p>
            <p className='text-white text-left mb-10'>{detallesPelicula.fechaEstreno} </p>
            <p className='text-[#9b9792] text-left'>DURACION</p>
            <p className='text-white text-left mb-10'>{detallesPelicula.duracion}</p>
            <p className='text-[#9b9792] text-left'>VALORACIÓN</p>
            <p className='text-white text-left mb-10'>{detallesPelicula.valoracion}</p>
            <p className='text-[#9b9792] text-left'>GÉNEROS</p>
            <p className='text-white text-left mb-10'>{detallesPelicula.generos}</p>
            <p className='text-[#9b9792] text-left'>ACTORES</p>
            <p className='text-white text-left mb-10'>{detallesPelicula.actores}</p>
            <p className='text-[#9b9792] text-left'>SINOPSIS</p>
            <p className='text-white text-left mb-10'>{detallesPelicula.descripcion}</p>
          </div>
          <div className='flex justify-center mb-16'>
            {detallesPelicula.trailer && (
              <div>
                <p className='text-[#9b9792] text-left mb-2'>TRÁILER</p>
                <div className="iframe-container">
                  <iframe
                    title="Tráiler"
                    width="700"
                    height="455"
                    src={`https://www.youtube.com/embed/${detallesPelicula.trailer}`}
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