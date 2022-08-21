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
    return <div>{stat.stat.name} : {stat.base_stat}</div>
  })
  
  return (
    <>
    <div className={styles.borderCanva}>
    <h1>{props.name}</h1>
    <div>id: {props.id}</div>
    <div>generation: {props.generation}</div>
    <div>weight: {props.weight}</div>
    <div>height: {props.height}</div>
    <h3>stats: {showStat}</h3>
    <button className={styles.btn} onClick={()=>{navigate(`/pokemon/${props.name}`)}}>More info</button>
    <button onClick={()=>props.favHandler(props.self)}>{props.isDeleteBtn ? 'Delete from favs' : 'Add to favs'}</button>
    </div>
    </>
  )
}

export default PokeItem