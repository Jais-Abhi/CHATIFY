import React from 'react'
import Skeleton from 'react-loading-skeleton'

const MessageSkelton = ({side}) => {
    console.log(side)
  return (
    <div className={`flex ${side == "left" ? "justify-start" : "justify-end"} w-full m-2 `}>
        <div className=' p-1 mr-4 md:w-[40%] w-[60%]'>

        <Skeleton className={`p-2`} />
        </div>
    </div>
  )
}

export default MessageSkelton