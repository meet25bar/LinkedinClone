import { IPostDocument } from '@/models/post.model'
import React from 'react'
import Image from 'next/image'

const PostContent = ({post}:{post:IPostDocument}) => {
  return (
    <div className='my-3'>
      <p className='my-3 px-4'>{post?.description}</p>
    {
      post?.imageUrl && (
        <Image
  src={post?.imageUrl}
  width={600}
  height={400}
  alt="post-image"
  className="w-full max-h-80 object-contain mt-3 rounded-md"
/>

      )
    }
      
    </div>
  )
}

export default PostContent
