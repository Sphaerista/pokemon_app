import React from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./PokeItem.module.css"


const PokeItem = (props) => {
  const navigate = useNavigate()

  let pokStats = props.stats.map((stat)=>{
    // console.log(stat)
    // console.log(stat.base_stat, stat.effort, stat.stat.name)
  })
  let showStat = props.stats.map((stat)=>{
    return <div className={styles.stat}>
      <div>{stat.stat.name} :</div>
      <div className={styles.statPoint}>{stat.base_stat}</div>
      </div>
  })
  
  return (
    <>
    <div className={styles.pokeItem}>
    <div className={styles.imgContainer}><img src={props.img}/></div>
    <h1>{props.name}</h1>
    <div>{props.generation}</div>
    {props.isFavPage && <>
    <div className={styles.stats}>
    <div className={styles.stat}>
    <div>weight :</div>
    <div className={styles.statPoint}>{props.weight}</div>
    </div>
    <div className={styles.stat}>
    <div>height :</div>
    <div className={styles.statPoint}>{props.height}</div>
    </div>
    <div>{showStat}</div>
    </div>
    </>}
    <div className={styles.btnContainer}>
    <button className={`${styles.btn} ${styles.infoBtn}`} onClick={()=>{navigate(`/pokemon/${props.name}`)}}>More info</button>
    <button className={`${styles.btn} ${styles.favsBtn}`} onClick={()=>props.favHandler(props.self)}>{props.isFavPage ? 'Delete from favs' : 'Add to favs'}</button>
    </div>
    </div>
    </>
  )
}

export default PokeItem