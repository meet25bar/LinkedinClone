import React from 'react'
import Postinput from './Postinput'
import Posts from './Posts'
import { json } from 'stream/consumers'
import { getAllposts } from '@/lib/serveraction'

const Feed = async({user}:{user:any}) => {
  const userData = JSON.parse(JSON.stringify(user))
  const posts = await getAllposts();
  return (
    <div className='flex-1 '>
      <Postinput user={userData}/>
      <Posts posts={posts}/>
    </div>
  )
}

export default Feed
