import  { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./Dropdown";
import axios  from "../utils/axios";
import Cards from "./Cards";
import Loader from "./templates/Loader";
import InfiniteScroll from 'react-infinite-scroll-component'

function Trending() {
    const navigate = useNavigate();
    const [category , setCategory] = useState('all');
    const [duration, setDuration] = useState('day');
    const [ trending, setTrending] = useState([])
    const [ page,setPage] = useState(1)
    const [ hasMore ,setHasMore] = useState(true)

    const getTrending = async () =>{
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`)

            if(data.results.length > 0){
                setTrending((prev)=> [...prev,...data.results])
                setPage((prev)=> prev + 1 )
            } else{
                setHasMore(false)

            }
            
        } catch (error) {
            console.log(error);
        }
    }
    document.title = 'Jetflix Movieapp | Trending | '+ category 

    
    const refreshHandler =  ()=>{
        if(trending.length === 0){
            getTrending()
        }else{
            setPage(1)
            setTrending([])
            getTrending()
        }
    }
    
    useEffect(()=>{
        refreshHandler()
    },[category,duration])



  return trending.length > 0 ? (
    <div className=" w-screen h-screen   ">
    
      <div className="w-full flex items-center justify-between px-[5%]">
        <h1 className="w-[15%] text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Trending
        </h1>

        <div className="flex items-center" >

        <TopNav />
        <Dropdown title="category" options={["movie", "tv", "all"]} func={(e)=>setCategory(e.target.value)}/>
        <div className="w-[2%]"></div>
 
        <Dropdown title="duration" options={["week", "day"]}  func={(e)=>setDuration(e.target.value)} />
        </div>


      </div>
      <InfiniteScroll
      next={getTrending}
      hasMore={hasMore}
      dataLength={trending.length}
      loader={ <Loader/> }
      >

      <Cards data={trending} title={category} />
      </InfiniteScroll>




    </div>
  ): <Loader/>
}

export default Trending;
