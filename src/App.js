import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PokeList from './components/PokeList';
import PokePage from './components/PokePage';
import PokeFavs from './components/PokeFavs';
import { useDispatch } from 'react-redux';
import { fetchingData } from './features/data-fetch/data-slice';


function App() {
    const dispatch = useDispatch()
        useEffect(()=>{
          dispatch(fetchingData())
        },[])

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
