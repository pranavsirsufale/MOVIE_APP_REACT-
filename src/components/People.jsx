import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "../utils/axios";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import TopNav from "./templates/TopNav";
import Cards from "./Cards";

function People() {


    const navigate = useNavigate();
    const [category , setCategory] = useState('day');
    const [ people, setPeople] = useState([])
    const [ page,setPage] = useState(1)
    const [ hasMore ,setHasMore] = useState(true)

    const getPeople = async () =>{
        try {
            const { data } = await axios.get(`/trending/person/${category}?page=${page}`)
            setPeople(data.results)

            if(data.results.length > 0){
                setPeople((prev)=> [...prev,...data.results])
                setPage((prev)=> prev + 1 )
            } else{
                setHasMore(false)

            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    
    const refreshHandler =  ()=>{
      if(people.length === 0){
        getPeople()
      }else{
        setPage(1)
            setPeople([])
            getPeople()
        }
    }
    
    useEffect(()=>{
        refreshHandler()
      },[])
      
      document.title = `Jetflix Movieapp | Person  | ` + category


  return people.length > 0 ? (
    <div className=" w-screen h-screen  ">
    
      <div className=" w-full flex items-center justify-between">
        <h1 className="w-[15%] text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          People 
        </h1>
       

        <div className="flex items-center" >

        <TopNav />

     
        
        </div>


      </div>
      <InfiniteScroll
      next={getPeople}
      hasMore={hasMore}
      dataLength={people.length}
      loader={ <Loader/>  }
      >

      <Cards data={people} title={'people'} />
      </InfiniteScroll>




    </div>
  ): <Loader/>
}

export default People