/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PokeItem from './PokeItem'
import styles from "./PokeFavs.module.css"

const PokeFavs = () => {
    const navigate = useNavigate()
    const [favs,setFavs] = useState([])
    const [isFavPage,setIsFavPage] = useState(true)

    const deleteFromFavsHandler = (name) => {
        const loadedFavs = JSON.parse(localStorage.getItem("favs"))
        const filtered = loadedFavs.filter(fav => fav.name !== name.name)
        setFavs(filtered)
        localStorage.setItem("favs", JSON.stringify(filtered))
    }

    useEffect(()=>{
        const loadedFavs = JSON.parse(localStorage.getItem("favs"))
        if(loadedFavs){
            setFavs(loadedFavs)
        }
      },[])

  return (
    <>
        <button className={styles.btn} onClick={() => navigate(-1)}>Back</button>
        <div className={styles.favList}>
            {favs?.map(data => {
                return <PokeItem self={data} key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats} img={data?.img} favHandler={deleteFromFavsHandler} isFavPage={isFavPage}   />;
            })}
        </div>
        {favs.length < 1 && 
        <h1 className={styles.noFavs}>You do not have any pokemon!</h1>
        }
    </>
  )
}

export default PokeFavs