import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import styles from "./PokePage.module.css"

const PokePage = () => {
  const [showCompared,setShowCompared] = useState(false)
  const [comparedPoke,setComparedPoke] = useState()
  const [notFirstRun,setNotFirstRun] = useState(false)
  const [myFavs, setMyFavs] = useState([]);
  const data = useSelector(state=>state.fetchData.booksList)
  const params = useParams().name
  const navigate = useNavigate()
  
  const pokeObj = data.filter(poke => poke.name === params) ?? []
  const poke = pokeObj[0] ?? {}

  const comparisonHandler = (e) => {
    const showComparedPoke = data.filter(poke => poke.id === +e.target.value)
    setComparedPoke(...showComparedPoke)
    showComparedPoke.length>0 ? setShowCompared(true) : setShowCompared(false)
  }
  
  const favHandler = (poke) => {
    setNotFirstRun(true)
        console.log(myFavs,poke)
        if (myFavs.length>0){
          return myFavs.filter(e=>e.name === poke.name).length>0 ? false : setMyFavs(prevArr=>[...prevArr,poke])
        } else {setMyFavs([poke])}
  }

  useEffect(()=>{
    const loadedFavs = JSON.parse(localStorage.getItem("favs"))
    if (loadedFavs) {
    setMyFavs(loadedFavs)}
  },[])

  useEffect(()=>{
    if(notFirstRun===true){
      localStorage.setItem("favs", JSON.stringify(myFavs))}
    },[myFavs])

  // show the same generation only
  const pokeList = data.filter(item=> item.generation === poke.generation).map((poke) => {
    return <option value={poke.id}>{poke.name}</option>
  })
  let showStatFirsttest = poke?.stats ?? []
  let showStatFirst = showStatFirsttest.map((stat)=>{
    return <>
    <div className={styles.stat}>
    <div>{stat.stat.name}</div>
    <div>{stat.base_stat}</div>
    </div>
    </>
  })  
  let showStatSecond = comparedPoke?.stats.map((stat)=>{
    return <>
    <div className={styles.stat}>
    <div>{stat.base_stat}</div>
    <div>{stat.stat.name}</div>
    </div>
    </>
  })  
  
  const validdd = data.length>0 && poke
  const notValiddd = !validdd
  return (
    <>
    {validdd &&
    <>   
      <div className={styles.btnsContainer}>
      <button className={`${styles.btn} ${styles.backBtn}`} onClick={() => navigate(-1)}>Back</button>
      <button className={`${styles.btn} ${styles.homeBtn}`} onClick={()=>{navigate("/")}}>Home</button>
      </div>
      <div className={styles.pokes}>
      <div className={styles.leftSide}>
      <div className={styles.poke}>
      <h1>{poke?.name}</h1>
      <div className={styles.imgContainer}><img src={poke?.img}/></div>
      <div className={styles.generation}>{poke?.generation}</div>
      <div className={styles.stats}>
      <div className={styles.stat}>
      <div>weight</div>
      <div>{poke?.weight}</div>
      </div>
      <div className={styles.stat}>
      <div>height</div>
      <div>{poke?.height}</div>
      </div>
      <div>{showStatFirst}</div>
      </div>
      <div className={styles.btnContainer}>
      <button className={`${styles.btn} ${styles.favBtn}`} onClick={()=>favHandler(poke)}>Add to favs</button>
      </div>
      </div>
      </div>
      
      <div className={`${styles.rightSide} ${showCompared && styles.rightSideActive}`}>
      <div className={styles.compareWith}>Compare with
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
      {showCompared && <>
      <div className={styles.poke}>
      <h1>{comparedPoke.name}</h1>
      <div className={styles.imgContainer}><img src={comparedPoke.img}/></div>
      <div className={styles.generation}>{comparedPoke.generation}</div>
      <div className={styles.stats}>
      <div className={styles.stat}>
      <div>{comparedPoke.weight}</div>
      <div>weight</div>
      </div>
      <div className={styles.stat}>
      <div>{comparedPoke.height}</div>
      <div>height</div>
      </div>
      <div>{showStatSecond}</div>
      </div>
      <div className={styles.btnContainer}>
      <button className={`${styles.btn} ${styles.favBtn}`} onClick={()=>favHandler(comparedPoke)}>Add to favs</button>
      </div>
      </div>
      </>}
      </div>
      </div>
      </>}
      {notValiddd &&
      <div>Loading spinner</div>}
      </>
  )
}

export default PokePage