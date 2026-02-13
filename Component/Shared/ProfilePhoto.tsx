import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ProfilePhoto = ({ src }: { src: string }) => {
  return (
    <div className='cursor-pointer'>
      <Avatar>
        <AvatarImage src={src} alt='Banner' />
        <AvatarFallback>MB</AvatarFallback>
      </Avatar>
    </div>

  )
}

export default ProfilePhoto
