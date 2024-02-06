import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute bg-white p-4 rounded-lg shadow-lg text-[#071429]">
            {children}
            <center><button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button></center>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
