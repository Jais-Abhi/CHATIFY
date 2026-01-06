import React, { useEffect, useRef } from 'react'

const Sender = ({message}) => {
  const scroll = useRef()
  useEffect(()=>{
      scroll.current.scrollIntoView({behaviour:"smooth"})
  })
    return (
    <div className='w-full h-fit flex justify-end' >
      <div ref={scroll} className=' h-fit break-words w-fit max-w-60 p-4 mr-8 m-4 rounded-b-[30px] rounded-tr-[30px] bg-gradient-to-r from-purple-400 to-pink-300 text-gray-800 font-semibold shadow-md'>
        {message}
      </div>
    </div>
    
  )
}

export default Sender
