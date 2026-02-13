import React from 'react'
import Image from 'next/image'
import ProfilePhoto from './Shared/ProfilePhoto'
import { getAllposts } from '@/lib/serveraction'

const Sidebar = async ({ user }: { user: any }) => {
    const post = await getAllposts();
    return (
        <div className='hidden  md:block w-[20%] h-fit border border-gray-300 bg-white rounded' >
            <div className='flex relative flex-col items-center'>
                <div className='w-full h-16 overflow-hidden'>
                    {
                        user && (
                            <Image src="/Banner.webp" alt='Banner' width={200} height={200} className='w-full h-full rounded-t' />

                        )
                    }

                </div>
                <div className='my-1 absolute top-10 left-[40%]'>
                    <ProfilePhoto src={user ? user?.imageUrl : " /Banner.webp"} />
                </div>
                <div className='border-b border-b-gray-300'>
                    <div className='p-2 mt-5 text-center'>
                        <h1 className='font-bold hover:underline cursor-pointer'>{user ? `${user?.firstName} ${user?.lastName} : ` : "Meet Barot"}</h1>
                        <p className='text-xs'>{user?.username || "username"}</p>

                    </div>
                </div>
                <div className='text-xs'>

                </div>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Post Impression</p>
                    <p className='text-blue-500 font-bold'>88</p>
                </div>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Posts</p>
                    <p className='text-blue-500 font-bold'>{post.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
