import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./Dropdown";
import Loader from "./templates/Loader";


function Home() {
  document.title = "Jetflix Movieapp";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category , setCategory ] = useState('all');

  const getHeaderWallPaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallPaper();
  }, [category]);



  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] min-h-[100vh] overflow-x-hidden ">
        <TopNav />
        <Header data={wallpaper} />

        <div className="flex justify-between p-5">
        <h1 className="mb-5 tex-3xl font-semibold text-zinc-400 ">Trending</h1>

        <Dropdown title="Filter" options={["tv", "movie", "all"]}  func={(e)=>setCategory(e.target.value)}/>
      </div>


        <HorizontalCards data={trending}  />
      </div>
    </>
  ) : (
    <Loader/>
  );
}

export default Home;
