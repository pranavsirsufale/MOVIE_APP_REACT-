import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from './NotFound'

function Trailer() {
    const {pathname } = useLocation()
    const navigate = useNavigate()
    const category = pathname.includes("movie") ? "movie" : "tv";
   
    const yvideo = useSelector(state => state[category].info.video);
   
  return  (
    <div className='bg-[rgba(0,0,0,0.9)] absolute text-green-500 w-screen h-screen flex items-center justify-center top-[0] right-1'>
        <Link title='close' onClick={()=>navigate(-1)} className='hover:text-[#6556CD] ri-close-fill absolute left-8 top-9 text-3xl text-white '>
        
        </Link>

{
    yvideo ?
<ReactPlayer
width={1080}
height={480}
controls='true'
url={`https://www.youtube.com/watch?v=${yvideo.key}`} /> 
: <NotFound/>
}




    </div>
) 
}

export default Trailer