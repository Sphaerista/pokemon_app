import React from 'react'
import styles from "./PokeItem.module.css"

const PokeItem = (props) => {

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
    <h1 onClick={()=>props.favHandler(props.name)}>{props.name}</h1>
    <div>id: {props.id}</div>
    <div>generation: {props.generation}</div>
    <div>weight: {props.weight}</div>
    <div>height: {props.height}</div>
    <h3>stats: {showStat}</h3>
    </div>
    </>
  )
}

export default PokeItem