import React from 'react';

const Button = ({ texto, funcion }) => {
  return (
    <button class="buttonR">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
      <span class="lableR">Reservar</span>
    </button>
  );
};

export default Button;
