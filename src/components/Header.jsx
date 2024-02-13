import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 p-4 text-white transition-all duration-300 ${
        scrolling ? 'bg-opacity-80 bg-[#2F94B6] shadow-lg' : 'bg-opacity-90 bg-[#2F94B6]'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <img src="./media/logocine.png" alt="Logo" className="h-12 w-auto" />
        <h1 className="text-2xl font-bold">Nexo Films</h1>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-[#071429]"><p>Inicio</p></Link>
          <Link to="/cartelera" className="hover:text-[#071429]">Cartelera</Link>
          <Link to="/FavoritesPage" className="hover:text-[#071429]">Favoritos</Link>
          <Link to="/Reservas" className="hover:text-[#071429]">Reservas</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
