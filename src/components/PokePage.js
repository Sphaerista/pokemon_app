import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const PokePage = () => {
  const [showCompared,setShowCompared] = useState(false)
  const [comparedPoke,setComparedPoke] = useState()
  const data = useSelector(state=>state.fetchData.booksList)
  const params = useParams().name
  const navigate = useNavigate()
  console.log(params,data,data.length>0)
  
  const pokeObj = data.filter(poke => poke.name === params) ?? []
  const poke = pokeObj[0] ?? {}

  const comparisonHandler = (e) => {
    const showComparedPoke = data.filter(poke => poke.id === +e.target.value)
    setComparedPoke(...showComparedPoke)
    showComparedPoke.length>0 ? setShowCompared(true) : setShowCompared(false)
  }

  // show the same generation only
  const pokeList = data.filter(item=> item.generation === poke.generation).map((poke) => {
    return <option value={poke.id}>{poke.name}</option>
  })
  let showStatFirsttest = poke?.stats ?? []
  let showStatFirst = showStatFirsttest.map((stat)=>{
    return <div>{stat.stat.name} : {stat.base_stat}</div>
  })  
  let showStatSecond = comparedPoke?.stats.map((stat)=>{
    return <div>{stat.stat.name} : {stat.base_stat}</div>
  })  
  
  const validdd = data.length>0 && poke
  const notValiddd = !validdd
  return (
    <>
    {validdd &&
    <>
      <div>PokePage</div>
      <h1>{params}</h1>
      <div>id: {poke?.id}</div>
      <div>generation: {poke?.generation}</div>
      <div>weight: {poke?.weight}</div>
      <div>height: {poke?.height}</div>
      <h3>stats: {showStatFirst}</h3>
      <div>Select poke
              <select
                onChange={comparisonHandler}
                id="pokelist"
                name="pokelist"
                // value={defaultCatValue}
              >
                <option value="SELECT" defaultValue hidden>SELECT poke</option>
                <option value="none">no comparison</option>
                {pokeList}
              </select>
      </div>
      <div>Poke 2</div>
    </>}
      {showCompared && <>
        <h1>{comparedPoke.name}</h1>
      <div>id: {comparedPoke.id}</div>
      <div>generation: {comparedPoke.generation}</div>
      <div>weight: {comparedPoke.weight}</div>
      <div>height: {comparedPoke.height}</div>
      <h3>stats: {showStatSecond}</h3>
      </>}
      {validdd &&
      <button onClick={() => navigate(-1)}>Back</button>
      }
      {notValiddd &&
      <div>Loading spinner</div>}
      </>
  )
}

export default PokePage