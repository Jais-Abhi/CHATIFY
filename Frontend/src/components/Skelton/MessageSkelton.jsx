import React from 'react'
import Skeleton from 'react-loading-skeleton'

const MessageSkelton = ({side}) => {
    console.log(side)
  return (
    <div className={`${side == "left" ? "justify-start" : "justify-end"} w-full bg-blue-500  `}>
        <Skeleton height="20px" width="30%" 
        className={` p-4 m-4 `} />
    </div>
  )
}

export default MessageSkelton