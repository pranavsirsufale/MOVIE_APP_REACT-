import React from 'react'
import { useState } from 'react'
import { Link, useAsyncError } from 'react-router-dom'
import axios from '../../utils/axios'
import { useEffect } from 'react';
import noimage from '../../img/noimage.jpeg'


function TopNav() {

    const [query, setQuery ] = useState('');
    const [ searches , setSearaches ] = useState([])

    const GetSearches = async () =>{
        try {
            const {data} = await axios.get(`/search/multi?query=${query}`)
            setSearaches(data.results)

            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        GetSearches()
    },[query])



  return (
    <div className='max-w-full h-[10vh] relative flex m-auto  justify-start items-center ml-[15%]'>
            <i className="ri-search-line text-3xl text-zinc-400" ></i>
        <input onChange={(e)=>setQuery(e.target.value)} 
        value={query}
        className='w-[50%] mx-10 p-3 text-xl outline-none border-none bg-transparent text-zinc-200'  type="text" placeholder='Search' />

        {query.length > 0 &&  <i onClick={(e)=>setQuery('')} className="ri-close-fill text-3xl text-zinc-400" ></i> }

        

        <div className='z-[100] w-[100%] ml-[5%]  max-h-[50vh] bg-zinc-200 absolute top-[90%] overflow-auto rounded'>

            {searches.map((search,i)=>(
            <Link to={`/${search.media_type}/details/${search.id}`}  key={i}  className='p-10 w-[100%] flex justify-start items-center border-b-2 broder-zinc-100 text-zinc-600 font-semibold hover:text-zinc-900 hover:bg-zinc-300 duration-300'>
            
            <img className='w-[10vh] mr-10 h-[10vh] object-cover shadow-lg roundedx' src={ search.backdrop_path || search.profile_path  ? `https://image.tmdb.org/t/p/original${search.backdrop_path || search.profile_path}`:noimage  } alt="" />

            <span className='bg-transparent'> {search.original_title || search.name || search.title } </span>
            </Link>
            ))}
            
        </div>
    </div>
  )
}

export default TopNav