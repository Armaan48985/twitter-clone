import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

interface A {
    img: string,
    name: string,
    userName: string
}

const Profilebar = ({img, name, userName}:A) => {
  return (
    <div className='flex items-center gap-3 mb-5'>
        <Image src={img} alt='ppf' width={30} height={30} className='w-10 h-10 rounded-full bg-cover'/>

        <div className='w-32 mr-6 ml-2'>
            <h4 className='font-bold'>{name}</h4>
            <p className='text-gray-500'>{userName}</p>
        </div>

        <Button variant="default" className="border-none rounded-2xl px-6 h-8 bg-white text-black">
            Follow
        </Button>
    </div>
  )
}

export default Profilebar