import React from 'react'
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import MessageSkelton from './MessageSkelton'


const ChatSkelton = () => {
  return (
    <SkeletonTheme baseColor="#d1d5db" highlightColor="#e5e7eb" >
      <div className='flex flex-col overflow-hidden w-full md:pr-4 md:pl-4 md:pt-2'>
        <MessageSkelton side="left"/>
        <MessageSkelton side="right"/>
        <MessageSkelton side="left"/>
        <MessageSkelton side="right"/>
        <MessageSkelton side="left"/>
        <MessageSkelton side="right"/>
        <MessageSkelton side="left"/>
        <MessageSkelton side="right"/>
        <MessageSkelton side="left"/>
        <MessageSkelton side="right"/>
        <MessageSkelton side="left"/>
        <MessageSkelton side="right"/>
      </div>
    </SkeletonTheme>

  )
}

export default ChatSkelton