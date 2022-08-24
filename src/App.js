import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PokeList from './router/MainPage';
import PokePage from './router/PokePage';
import PokeFavs from './components/PokeFavs';


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<PokeList/>}/>
      <Route path="/pokemon/:name" element={<PokePage/>}/>
      <Route path="/myfavs/" element={<PokeFavs/>}/>
    </Routes>
    </>
  );
}

export default App;
