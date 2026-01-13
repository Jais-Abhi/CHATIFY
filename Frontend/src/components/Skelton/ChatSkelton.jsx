import React from 'react'
import Skelton,{SkeletonTheme} from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"


const ChatSkelton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skelton height="20px" width="200px" className='ml-8' />
    </SkeletonTheme>

  )
}

export default ChatSkelton