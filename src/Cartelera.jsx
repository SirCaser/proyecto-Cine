import React from 'react';
import { useState } from 'react'
import './App.css'
import TmdbSearch from './components/TmdbSearch.jsx';

function Cartelera() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="mt-20">
        <TmdbSearch />
      </div>
    </>
  )
}

export default Cartelera
