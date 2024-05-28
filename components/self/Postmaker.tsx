import React from 'react'
import { Input } from '../ui/input'
import { FaXTwitter } from 'react-icons/fa6'
import RightSidebar from './RightSidebar'
import { IoLocationOutline, IoSettingsOutline } from 'react-icons/io5'
import { RiEarthFill, RiGalleryLine } from 'react-icons/ri'
import PostButton from '../buttons/PostButton'
import { MdOutlineGifBox } from 'react-icons/md'
import { TfiList } from 'react-icons/tfi'
import { PiSmileyLight } from 'react-icons/pi'
import { LuCalendarClock } from 'react-icons/lu'
import { createClient } from "@supabase/supabase-js";

const Postmaker = () => {
  return (
    <div className='w-full h-auto border-b-[1px] border-[#3A4249] p-4 flex'>
    <div className='w-[50px] h-full'>
      <span className='bg-gray-700 text-[10px] p-3 rounded-full'>img</span>
    </div>
    <div className='flex items-start flex-col gap-2'>
        <Input placeholder='What is happening?!' className='bg-transparent border-none text-gray-400 text-lg'/>
        <span className='text-[#1D9BF0] flex items-center gap-2 py-2'> <RiEarthFill />Everyone can reply</span>

        <span className='block w-[450px] h-[1px] bg-[#32393e]'></span>

        <div className='w-full flex-between'>                   
                <ul className='flex gap-3 text-xl text-primary-blue'>
                  <li className='cursor-pointer'><RiGalleryLine /></li>
                  <li className='cursor-pointer'><MdOutlineGifBox /></li>
                  <li className='cursor-pointer'><TfiList /></li>
                  <li className='cursor-pointer'><PiSmileyLight /></li>
                  <li className='cursor-pointer'><LuCalendarClock /></li>
                  <li className='cursor-pointer'><IoLocationOutline /></li>
                </ul>                

            <PostButton name="Post"/>
        </div>

        </div> 
      </div>
  )
}

export default Postmaker