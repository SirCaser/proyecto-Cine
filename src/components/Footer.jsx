// Footer.js
import React from 'react';

const Footer = () => {
  return (
      <footer className="fixed bottom-0 w-full bg-[#2F94B6] text-white p-4">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-sm">
          <span className="font-bold">Nexo Films</span> by {' '}
            <span className="font-bold">Raúl Cañero Sequera</span> is licensed under {' '}
            <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" className="inline-block">
              CC BY 4.0
              <img className="h-6 ml-2 inline" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
              <img className="h-6 ml-2 inline" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
            </a>
          </p>
        </div>
      </footer>
  );
};

export default Footer;
