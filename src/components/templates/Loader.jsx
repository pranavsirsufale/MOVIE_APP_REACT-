import React from 'react'
import loader from '../../img/load-1110_256.gif'

function Loader() {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center '  >
        <img style={{height:'100px'}} src={loader}  />
    </div>
  )
}

export default Loader