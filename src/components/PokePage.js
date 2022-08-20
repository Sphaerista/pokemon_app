import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const PokePage = () => {

  const data = useSelector(state=>state.fetchData.booksList)
  const params = useParams().name
  const navigate = useNavigate()

  const pokeObj = data.filter(poke => poke.name === params)
  const poke = pokeObj[0]
  
  let showStat = poke.stats.map((stat)=>{
    return <div>{stat.stat.name} : {stat.base_stat}</div>
  })
  return (
    <>
    <div>PokePage</div>
    <h1>{params}</h1>
    <div>id: {poke.id}</div>
    <div>generation: {poke.generation}</div>
    <div>weight: {poke.weight}</div>
    <div>height: {poke.height}</div>
    <h3>stats: {showStat}</h3>
    <button onClick={() => navigate(-1)}>Back</button>
    </>
  )
}

export default PokePage