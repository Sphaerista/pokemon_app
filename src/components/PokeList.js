import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingData } from '../features/data-fetch/data-slice'
import PokeItem from './PokeItem'
import styles from "./PokeList.module.css"

const PokeList = () => {
    const pokemosRef = useRef([])
    const [list,setList] = useState([])
    const [permData, setPermData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [myFavs, setMyFavs] = useState([]);
    const [checker,setChecker] = useState(true)
    const [numberToAdd,setNumberToAdd]= useState(3)
    const dispatch = useDispatch()
    const data = useSelector(state=>state.fetchData.booksList)
    const requestStatus = useSelector((state)=> state.fetchData.status)
    
    const fetchHandler = (e) => {
      e.preventDefault()
      setChecker(prev=>!prev)
      setList(data.slice(0,numberToAdd+3))
      setNumberToAdd(prev=>prev+3)
      console.log(numberToAdd,list)
      }
    
      const inputHandler = (e) => {
        setSearchInput(e.target.value);
      }
      const searchHandler = (e) => {
        e.preventDefault()
        console.log(searchInput, list)
        const foundedpokemon = pokemosRef.current.filter(find =>  find.name === searchInput );
        console.log(foundedpokemon)
        setList(() => foundedpokemon);
      }

      const generationByHandler = (e) => {
        console.log(e.target.value,list)
        if( !!e.target.value) {
          const foundgeneration = pokemosRef.current.filter(poke=> poke.generation === e.target.value )
          console.log(foundgeneration)
          setList(() => foundgeneration.slice(0,3));
        } else {
          setList(() => pokemosRef.current.slice(0,3))
        }
          }

      const saveToFavsHandler = (name) => {
        list.filter(poke=>{
          if(poke.name === name){
            console.log(poke,myFavs,myFavs.length)
            if (myFavs.length>0){
              if(myFavs.includes(poke)){
                console.log('already exists!!!')
              }
              else{
                console.log('add me::::')
                setMyFavs(prevArr=>[...prevArr,poke])
              }
            }
            else setMyFavs([poke])
          }
        })
      }
      const testfn = (arr) => {
        setList(arr.slice(0,3));
        pokemosRef.current=arr;
      }
      useEffect(()=>{
        dispatch(fetchingData(testfn))
        console.log('first_run!!!',list,data)
      },[])

      useEffect(()=>{
        console.log(':!!UPDATED!!:',permData,list)
      },[checker,list])

      useEffect(()=>{
        // console.log(myFavs)
          localStorage.setItem("favs", JSON.stringify(myFavs))
      },[myFavs])

          // checking list existence
          const validdd = list?.length > 0 && requestStatus==='success'
          const notValiddd = list?.length < 1 && requestStatus==='success'
          const notFinished = list?.length < 1 && requestStatus==='pending'
          const notYetFinished = list?.length > 0 && requestStatus==='pending'


  return (
      <>
      <div>PokeList</div>
      <div>
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
            >
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
      {validdd && 
      <>
      {list?.map(data => {
        return <PokeItem key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats} favHandler={saveToFavsHandler}   />;
    })}
    <button onClick={fetchHandler}>Load more!</button>
    </>
      }
      </>
  )
}

export default PokeList