import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchingData } from '../features/data-fetch/data-slice'
import PokeItem from '../components/PokeItem'
import styles from "./MainPage.module.css"

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
    const data = useSelector(state=>state.fetchData.booksList)
    const requestStatus = useSelector((state)=> state.fetchData.status)
    
    const loadMoreHandler = (e) => {
      e.preventDefault()
      console.log(list,data,permData,pokemosRef.current)
      setList(permData.slice(0,numberToAdd+3))
      setNumberToAdd(prev=>prev+3)
      }
    
      const inputHandler = (e) => {
        setSearchInput(e.target.value);
      }
      const searchHandler = (e) => {
        e.preventDefault()
        setDefaultCatValue('SELECT')
        const foundedpokemon = pokemosRef.current.filter(find =>  find.name === searchInput );
        console.log(foundedpokemon)
        setList(() => foundedpokemon);
      }

      const generationByHandler = (e) => {
        setDefaultCatValue(e.target.value)
        setNumberToAdd(3)
        if( !!e.target.value) {
          const foundgeneration = pokemosRef.current.filter(poke=> poke.generation === e.target.value )
          setPermData(foundgeneration)
          console.log(foundgeneration,pokemosRef.current,permData)
          setList(() => foundgeneration.slice(0,3));
        } else {
          setNumberToAdd(3)
          setPermData(pokemosRef.current)
          setList(() => pokemosRef.current.slice(0,3))
        }
      }

      const saveToFavsHandler = (poke) => {
        setNotFirstRun(true)
        console.log(myFavs,poke)
        if (myFavs.length>0){
          return myFavs.filter(e=>e.name === poke.name).length>0 ? false : setMyFavs(prevArr=>[...prevArr,poke])
        } else {setMyFavs([poke])}
      }

      // callback fn
      const testfn = (arr) => {
        setList(arr.slice(0,3));
        setPermData(arr)
        pokemosRef.current=arr;
      }
      useEffect(()=>{
        dispatch(fetchingData(testfn))
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
        const notValiddd = list?.length < 1 && requestStatus==='success'
        const notFinished = list?.length < 1 && requestStatus==='pending'
        const notYetFinished = list?.length > 0 && requestStatus==='pending'
        
  return (
      <>
      <div className={styles.header}>
      <button className={styles.btn} onClick={()=>{navigate("/myfavs")}}>My Favs</button>
      <div className={styles.bookList}>
      <form className={styles.searchForm} onSubmit={searchHandler}>
      <input
            type="search"
            onChange={inputHandler}
            placeholder="Search a poke..."
            maxLength="50"
          />
          <button type='submit' disabled={searchInput.length<1}>Search</button>
      </form>

      <div className={styles.byGeneration}>Generations
            <select
              onChange={generationByHandler}
              id="generation"
              name="generation"
              value={defaultCatValue}
            >
              <option value="SELECT" defaultValue disabled hidden>SELECT GEN</option>
              <option value="">all</option>
              <option value="no gen">nogen</option>
              <option value="generation-i">1</option>
              <option value="generation-ii">2</option>
              <option value="generation-iii">3</option>
              <option value="generation-iv">4</option>
              <option value="generation-v">5</option>
              <option value="generation-vi">6</option>
              <option value="generation-vii">7</option>
              <option value="generation-viii">8</option>
            </select>
    </div>
    </div>
    </div>
      {validdd && 
      <>
      {list?.map(data => {
        return <PokeItem self={data} key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats} img={data?.img} favHandler={saveToFavsHandler}   />;
    })}
    {list.length>1 && <button onClick={loadMoreHandler}>Load more!</button>}
    </>
      }
      </>
  )
}

export default PokeList