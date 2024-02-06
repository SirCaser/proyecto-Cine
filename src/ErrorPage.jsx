import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Button from './components/Button';
import Header from './components/Header';

function ErrorPage() {

  return (
    <>
      <Header />
      <div className="mt-16"> {/* Añade una separación inicial */}
        {/* <Carousel /> */}
        <div className="container mx-auto custom-container p-56 bg1">
            <div className="flex justify-center">
                <div className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12">
                    <div className="custom-div text-center bg2">
                        <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-rico-green">
                            ERROR
                        </h2>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ErrorPage;
