import React, { useEffect, useRef } from 'react'

const Sender = ({message}) => {
  const scroll = useRef()
  useEffect(()=>{
      scroll.current.scrollIntoView({behaviour:"smooth"})
  })
    return (
    <div className='w-full h-fit flex justify-end' >
      <div ref={scroll} className=' h-fit break-words w-fit md:max-w-[15rem] max-w-[15rem] p-4 mr-4 md:m-4 rounded-b-[30px] rounded-tr-[30px] bg-gradient-to-r from-purple-400 to-pink-300 text-gray-800 font-semibold shadow-md'>
        {message}
      </div>
    </div>
    
  )
}

export default Sender
