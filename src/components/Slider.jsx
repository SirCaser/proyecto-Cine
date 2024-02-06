import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const ImageCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '850e2704d34d71b7a396eaadd700ed03'; // Reemplaza con tu clave de API de TMDb
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();

        if (data.results) {
          setMovies(data.results.slice(0, 15));
        }
      } catch (error) {
        console.error('Error al obtener películas:', error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 150,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '0',
    variableWidth: true,
    afterChange: (index) => setCurrentIndex(index),
    customPaging: (i) => (
      <div
        className="dot"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: currentIndex === i ? 1 : 0.7,
          marginTop: '4px',
        }}
      />
    ),
  };
  

  return (
    <div className="max-w-screen-lg mx-auto mt-2">
      <Slider {...settings}>
        {movies.map((movie, index) => (
         
          <div key={index} className="mx-2">
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                transform: currentIndex !== index ? 'scale(0.9)' : 'scale(1)',
                opacity: currentIndex !== index ? 0.7 : 1,
              }}
            ><Link to={`/FilmDetails/${movie.id}`} key={movie.id} className="bg-black  rounded-xl shadow-md text-white">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-[30rem] object-cover rounded-lg shadow-md"
              />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
