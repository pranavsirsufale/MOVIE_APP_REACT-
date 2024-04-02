import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'
import People from './components/People'
import Moviedetails from './components/Moviedetails'
import Tvdetails from './components/Tvdetails'
import Persondetails from './components/Persondetails'
import Trailer from './components/templates/Trailer'
import NotFound from './components/templates/NotFound'

function App() {

  return (
   <div className='w-screen bg-[#1F1E24] flex'>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/trending' element={<Trending/>} />
      <Route path='/popular' element={<Popular/>} />
      <Route path='/movie' element={<Movie/>}  />
        
      



      <Route path='/tvshows' element={<Tvshows/>} />
    
      <Route path='/people' element={<People/>} />

        <Route path='/tvshows/details/:id' element={<Tvdetails/>}/>
      <Route path='/movie/details/:id' element={<Moviedetails/>} >
      <Route path='/movie/details/:id/trailer' element={<Trailer/>} />
      </Route>
      <Route path='/tv/details/:id' element={<Tvdetails/>} >

        <Route path='/tv/details/:id/trailer' element={<Trailer/>} />
      </Route>

      <Route path='/person/details/:id' element={<Persondetails/>} />
      <Route path='*' element={<NotFound/>} />
    

  
     
      

    </Routes>


   </div>
  )
}

export default App
