import React from 'react'

function Dropdown({title, options,func}) {
  return (
    <div className='select' >
        <select defaultValue='0' onChange={func} name='format' id='format'>
            <option value="0" disabled>
               {title}
            </option>
            {options.map((option,inde)=>(
                <option key={inde} value={option} >
                    {option.toUpperCase()}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Dropdown