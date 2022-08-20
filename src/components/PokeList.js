import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingData } from '../features/data-fetch/data-slice'
import PokeItem from './PokeItem'
import styles from "./PokeList.module.css"

const PokeList = () => {
    const [permData, setPermData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [myFavs, setMyFavs] = useState([]);
    const [checker,setChecker] = useState(true)
    const dispatch = useDispatch()
    const data = useSelector(state=>state.fetchData.booksList)
    let list = data.slice(0,3)
    const requestStatus = useSelector((state)=> state.fetchData.status)
    
    const fetchHandler = (e) => {
      e.preventDefault()
      }
    
      const inputHandler = (e) => {
        setSearchInput(e.target.value);
      }
      const searchHandler = (e) => {
        e.preventDefault()
        console.log(searchInput, list)
        list.filter((find)=>{
          if(find.name === searchInput){
            console.log('FOUND!',find.name)
            setChecker(prev=>!prev)
            list = find
            // console.log(list,find)
            setPermData(list)
          }
        })
      }

      const generationByHandler = (e) => {
        console.log(e.target.value,list)
        let genArray = []
        list.filter((poke)=>{
          console.log(poke.generation)
          if(poke.generation === e.target.value){
            // console.log('FOUND!',poke)
            setChecker(prev=>!prev)
            genArray.push(poke)
            setPermData(genArray)
          }
        })
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

      useEffect(()=>{
        dispatch(fetchingData())
        list = data
      },[])

      useEffect(()=>{
        console.log(':!!UPDATED!!:',permData)
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
              <option value="">nogen</option>
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
      {list?.map((data)=>{
        return <PokeItem key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats} favHandler={saveToFavsHandler}   />;
    })}
    </>
      }
      </>
  )
}

export default PokeList