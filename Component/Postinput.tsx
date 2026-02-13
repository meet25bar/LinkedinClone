'use client';
import React, { useState } from 'react'
import ProfilePhoto from './Shared/ProfilePhoto'
import { Input } from '@/components/ui/input'
import { DialogDemo } from './Postdialogue'


const Postinput = ({ user }: { user: any }) => {
    const [open,setOpen] = useState<boolean>(false)
    const imageUrl = user?.imageUrl?.trim() || "/Banner.webp"

    const inputHandler = () =>{
            setOpen(true);
    }

    return (
        <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
            <div className='flex items-center gap-3'>
                <ProfilePhoto src={imageUrl} />
                <Input type='text' placeholder='Start a Post' className='rounded-full hover:bg-gray-100 h-12 cursor-pointer' onClick={inputHandler} />
                <DialogDemo setOpen={setOpen} open={open} src={user?.imageUrl}/>

            </div>
        </div>
    )
}

export default Postinput
