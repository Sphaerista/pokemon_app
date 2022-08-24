import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchingData } from '../features/data-fetch/data-slice'
import PokeItem from '../components/PokeItem'
import styles from "./MainPage.module.css"
import LoadingSpinner from '../UI/LoadingSpinner'

const PokeList = () => {
  const navigate = useNavigate()
  const pokemosRef = useRef([])
  const [list,setList] = useState([])
  const [permData, setPermData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [myFavs, setMyFavs] = useState([]);
  const [notFirstRun,setNotFirstRun] = useState(false)
  const [defaultCatValue,setDefaultCatValue] = useState('SELECT')
  const [numberToAdd,setNumberToAdd]= useState(3)
  const dispatch = useDispatch()
  const data = useSelector(state=>state.fetchData.pokeList)
  const requestStatus = useSelector((state)=> state.fetchData.status)
  const numz = 4
    
  const loadMoreHandler = (e) => {
    e.preventDefault()
    setList(permData.slice(0,numberToAdd+numz))
    setNumberToAdd(prev=>prev+numz)
    }
  
  const inputHandler = (e) => {
    setSearchInput(e.target.value);
  }
  const searchHandler = (e) => {
    setNotFirstRun(true)
    e.preventDefault()
    pokemosRef.current = data
    setDefaultCatValue('SELECT')
    const foundedpokemon = pokemosRef.current.filter(find =>  find.name === searchInput );
    setList(() => foundedpokemon);
  }

  const generationByHandler = (e) => {
    setDefaultCatValue(e.target.value)
    setNumberToAdd(numz)
    if( !!e.target.value) {
      const foundgeneration = data.filter(poke=> poke.generation === e.target.value )
      setPermData(foundgeneration)
      setList(() => foundgeneration.slice(0,numz));
    } else {
      setNumberToAdd(numz)
      setPermData(data)
      setList(() => data.slice(0,numz))
    }
  }

  const saveToFavsHandler = (poke) => {
    setNotFirstRun(true)
    if (myFavs.length>0){
      return myFavs.filter(e=>e.name === poke.name).length>0 ? false : setMyFavs(prevArr=>[...prevArr,poke])
    } else {setMyFavs([poke])}
  }

  // callback fn
  const testfn = (arr) => {
    setList(arr.slice(0,numz));
    setPermData(arr)
    pokemosRef.current=arr;
  }

  useEffect(()=>{
    setPermData(data)
    setList(data.slice(0,numz))
    if(data.length<1) {
      dispatch(fetchingData(testfn,490))
    }
    const loadedFavs = JSON.parse(localStorage.getItem("favs"))
    if (loadedFavs) {
    setMyFavs(loadedFavs)}
  },[])

  

  useEffect(()=>{
    if(notFirstRun===true){
      localStorage.setItem("favs", JSON.stringify(myFavs))}
    },[myFavs])
      
  // checking list existence
    const validdd = list?.length > 0 && requestStatus==='success'
    const notFinished = list?.length < 1 && requestStatus==='pending'
    const notValiddd = list?.length < 1 && requestStatus==='success' && notFirstRun
        
  return (
      <>
      <div className={styles.header}>
      <div className={styles.options}>
      <form className={styles.searchForm} onSubmit={searchHandler}>
        <input
          type="search"
          onChange={inputHandler}
          placeholder="Search a poke..."
          maxLength="50"
        />
        <button type='submit' disabled={searchInput.length<1}>Search</button>
      </form>

      <div className={styles.byGeneration}>Generations: 
        <select
          onChange={generationByHandler}
          id="generation"
          name="generation"
          value={defaultCatValue}
        >
          <option value="SELECT" defaultValue disabled hidden>filter by Gen</option>
          <option value="">all</option>
          <option value="no gen">no Generation</option>
          <option value="generation-i">1</option>
          <option value="generation-ii">2</option>
          <option value="generation-iii">3</option>
          <option value="generation-iv">4</option>
        </select>
      </div>
      </div>
      <button className={styles.btn} onClick={()=>{navigate("/myfavs")}}>My Favs</button>
      </div>
      {validdd && 
      <>
        <div className={styles.pokeList}>
        {list?.map(data => {
          return <PokeItem self={data} key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats} img={data?.img} favHandler={saveToFavsHandler}   />;
          })}
        </div>
        <div className={styles.moreBtnContainer}>
        {permData.length>numz && <button onClick={loadMoreHandler}>Load more</button>}
        </div>
      </>
      }
      {notValiddd &&
        <div className={styles.loading}><h1> No pokemon found!</h1></div>}
      {notFinished && 
        <div className={styles.loading}>
          <LoadingSpinner/>
        </div>}
      </>
  )
}

export default PokeList