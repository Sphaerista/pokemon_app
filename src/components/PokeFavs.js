import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PokeItem from './PokeItem'

const PokeFavs = () => {
    const navigate = useNavigate()
    const [favs,setFavs] = useState([])
    const [isDeleteBtn,setIsDeleteBtn] = useState(true)

    const deleteFromFavsHandler = (name) => {
        console.log(name)
    }

    useEffect(()=>{
        const loadedFavs = JSON.parse(localStorage.getItem("favs"))
        if(loadedFavs){
            setFavs(loadedFavs)
        }
      },[])
      console.log(favs)
  return (
    <>
    <div>PokeFavs</div>
    <button onClick={() => navigate(-1)}>Back</button>
    {favs?.map(data => {
        return <PokeItem self={data} key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats} favHandler={deleteFromFavsHandler} isDeleteBtn={isDeleteBtn}   />;
    })}
    </>
  )
}

export default PokeFavs