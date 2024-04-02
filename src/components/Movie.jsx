import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "../utils/axios";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import TopNav from "./templates/TopNav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";


function Movie() {

    const navigate = useNavigate();
    const [category , setCategory] = useState('now_playing');
    const [ movie, setMovie] = useState([])
    const [ page,setPage] = useState(1)
    const [ hasMore ,setHasMore] = useState(true)

    const getMovie = async () =>{
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)
            // setMovie(data.results)
            

            if(data.results.length > 0){
                setMovie((prev)=> [...prev,...data.results])
                setPage((prev)=> prev += 1 )
                console.log(page);
            } else{
                setHasMore(false)

            }
            
        } catch (error) {
            console.log(error);
        }
    }
  document.title = 'Jetflix Movieapp | Movies | ' + category

    
    const refreshHandler =  ()=>{
        if(movie.length === 0){
            getMovie()
        }else{
            setPage(1)
            setMovie([])
            getMovie()
        }
    }
    
    useEffect(()=>{
        refreshHandler()
    },[category])



  return movie.length > 0 ? (
    <div className=" w-screen h-screen   ">
    
      <div className="w-full px-[5%]  flex items-center justify-between">
        <h1 className="w-[15%] text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Movies 
        </h1>

        <div className="flex items-center" >

        <TopNav />
        <Dropdown title="category" options={["popular", "top_rated",'upcoming','now_playing' ]} func={(e)=>setCategory(e.target.value)}/>
        <div className="w-[2%]"></div>
 
        
        </div>


      </div>
      <InfiniteScroll
      next={getMovie}
      hasMore={hasMore}
      dataLength={movie.length}
      loader={ <Loader/>  }
      >

      <Cards data={movie} title={'movie'} />
      </InfiniteScroll>




    </div>
  ): <Loader/>
}

export default Movie