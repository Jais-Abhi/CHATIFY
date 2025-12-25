import React, { useEffect, useRef } from 'react'

const Receiver = ({message}) => {
    const scroll = useRef()
    useEffect(()=>{
        scroll.current.scrollIntoView({behaviour:"smooth"})
    })
  return (
    <div className='w-full flex justify-start ' >
      <div ref={scroll} className=' h-fit break-words w-fit max-w-60 p-4 ml-8 m-4 rounded-b-[30px] rounded-tl-[30px] bg-purple-400'>
        {message}
    </div>
    </div>
      )
}

export default Receiver