import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PokeList from './components/PokeList';
import PokePage from './components/PokePage';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<PokeList/>}/>
      <Route path="/pokemon/:name" element={<PokePage/>}/>
    </Routes>
    </>
  );
}

export default App;
