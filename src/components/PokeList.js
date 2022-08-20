import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingData } from '../features/data-fetch/data-slice'
import PokeItem from './PokeItem'

const PokeList = () => {
  const [poks, setPoks]=useState([])
    const dispatch = useDispatch()
    const list = useSelector(state=>state.fetchData.booksList)
    const requestStatus = useSelector((state)=> state.fetchData.status)

    const fetchHandler = (e) => {
        e.preventDefault()
        dispatch(fetchingData())
      }


    console.log(list)
          // checking list existence
  const validdd = list?.length > 0 && requestStatus==='success'
  const notValiddd = list?.length < 1 && requestStatus==='success'
  const notFinished = list?.length < 1 && requestStatus==='pending'
  const notYetFinished = list?.length > 0 && requestStatus==='pending'


  return (
      <>
      <div>PokeList</div>
      <button onClick={fetchHandler}>fetch Me!</button>
      {validdd && 
      <>
      {list?.map((data)=>{
        return <PokeItem key={data?.name} id={data?.id} name={data?.name} generation={data?.generation} height={data?.height} weight={data?.weight} stats={data?.stats}   />;
    })}
    </>
      }
      </>
  )
}

export default PokeList