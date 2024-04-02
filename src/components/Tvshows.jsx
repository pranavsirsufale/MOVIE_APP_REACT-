import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "../utils/axios";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import TopNav from "./templates/TopNav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";

function Tvshows() {

    const navigate = useNavigate();
    const [category , setCategory] = useState('airing_today');
    const [ tv, setTV] = useState([])
    const [ page,setPage] = useState(1)
    const [ hasMore ,setHasMore] = useState(true)

    const getTV = async () =>{
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`)
            // setTV(data.results)

            if(data.results.length > 0){
                setTV((prev)=> [...prev,...data.results])
                setPage((prev)=> prev + 1 )
                console.log(page);
            } else{
                setHasMore(false)

            }
            
        } catch (error) {
            console.log(error);
        }
    }
  document.title = 'Jetflix Movieapp | TV shows | ' + category

    
    const refreshHandler =  ()=>{
        if(tv.length === 0){
            getTV()
        }else{
            setPage(1)
            setTV([])
            getTV()
        }
    }
    
    useEffect(()=>{
        refreshHandler()
    },[category])


  return  tv.length > 0 ? (
    <div className=" w-screen h-screen  ">
    
      <div className="w-full px-[5%]  flex items-center justify-between">
        <h1 className="w-[15%] text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Tv shows 
        </h1>
       

        <div className="flex items-center" >

        <TopNav />

        <Dropdown title="category" options={["on_the_air","popular", "top_rated",'airing_today' ]} func={(e)=>setCategory(e.target.value)}/>
        <div className="w-[2%]"></div>
 
        
        </div>


      </div>
      <InfiniteScroll
      next={getTV}
      hasMore={hasMore}
      dataLength={tv.length}
      loader={ <Loader/>  }
      >

      <Cards data={tv} title={'tv'} />
      </InfiniteScroll>




    </div>
  ): <Loader/>
}

export default Tvshows