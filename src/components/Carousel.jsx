import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Avanza al siguiente slide cada 15 segundos
      sliderRef.current.slickNext();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: false,
    appendDots: (dots) => (
      <div
        style={{
          position: 'relative',
          top: '-10px',
          textAlign: 'center',
        }}
      >
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="my-8 w-90 mx-auto overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        <div className="px-2">
          <img src="./media/restaurant6.jpg" alt="Imagen 1" className="w-full max-h-[550px] object-cover rounded-lg" />
        </div>
        <div className="px-2">
          <img src="./media/restaurant7.jpg" alt="Imagen 2" className="w-full max-h-[550px] object-cover rounded-lg" />
        </div>
        <div className="px-2">
          <img src="./media/restaurant5.jpg" alt="Imagen 3" className="w-full max-h-[550px] object-cover rounded-lg" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
