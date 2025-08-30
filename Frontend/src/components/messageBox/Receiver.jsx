import React from 'react'

const Receiver = ({message}) => {
  return (
    <div className='w-full flex justify-start ' >
      <div className=' h-fit break-words w-fit max-w-72 p-4 ml-8 m-4 rounded-b-[30px] rounded-tl-[30px] bg-purple-400'>
        {message}
    </div>
    </div>
      )
}

export default Receiver