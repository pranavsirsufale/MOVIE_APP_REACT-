import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "../utils/axios";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import TopNav from "./templates/TopNav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";


function Popular() {

    const navigate = useNavigate();
    const [category , setCategory] = useState('movie');
    const [ popular, setPopular] = useState([])
    const [ page,setPage] = useState(1)
    const [ hasMore ,setHasMore] = useState(true)

    const getPopular = async () =>{
        try {
            const { data } = await axios.get(`/${category}/popular?page=${page}`)
            // setPopular(data.results)

            if(data.results.length > 0){
                setPopular((prev)=> [...prev,...data.results])
                setPage((prev)=> prev + 1 )
            } else{
                setHasMore(false)

            }
            
        } catch (error) {
            console.log(error);
        }
    }
  document.title = 'Jetflix Movieapp | Popular | '+ category 

    
    const refreshHandler =  ()=>{
        if(popular.length === 0){
            getPopular()
        }else{
            setPage(1)
            setPopular([])
            getPopular()
        }
    }
    
    useEffect(()=>{
        refreshHandler()
    },[category])




    
  return  popular.length > 0 ? (
    <div className=" w-screen h-screen   ">
    
      <div className="w-full flex items-center justify-between px-[5%]">
        <h1 className="w-[15%] text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Popular
        </h1>

        <div className="flex items-center" >

        <TopNav />
        <Dropdown title="category" options={["movie", "tv", ]} func={(e)=>setCategory(e.target.value)}/>
        <div className="w-[2%]"></div>
 
        
        </div>


      </div>
      <InfiniteScroll
      next={getPopular}
      hasMore={hasMore}
      dataLength={popular.length}
      loader={ <Loader/>  }
      >

      <Cards data={popular} title={category} />
      </InfiniteScroll>




    </div>
  ): <Loader/>
}

export default Popular