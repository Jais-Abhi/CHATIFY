import React from 'react'

const Sender = ({message}) => {
    return (
    <div className='w-full h-fit flex justify-end' >
      <div className=' h-fit break-words w-fit max-w-72 p-4 mr-8 m-4 rounded-b-[30px] rounded-tr-[30px] bg-purple-400'>
        {message}
      </div>
    </div>
    
  )
}

export default Sender