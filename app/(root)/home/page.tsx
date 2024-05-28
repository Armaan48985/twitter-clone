'use client'
import React, { useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLocationOutline, IoSettingsOutline } from 'react-icons/io5'
import { RiEarthFill, RiGalleryLine } from 'react-icons/ri'
import { MdOutlineGifBox } from 'react-icons/md'
import { TfiList } from 'react-icons/tfi'
import { PiSmileyLight } from 'react-icons/pi'
import { LuCalendarClock } from 'react-icons/lu'
import { createClient } from "@supabase/supabase-js";
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import Postmaker from '@/components/self/Postmaker'


const page = () => {

  return (
      <main className='flex'>
        <section className='main-section'>
          <div>
            <Tabs defaultValue="account" className="w-auto h-[1000px] relative">
              <TabsList className="grid w-full grid-cols-2 border-b-2 border-slate-900 luffy pt-0 pb-16">
                <TabsTrigger value="account" className="text-md py-5 hover:bg-[#191919] rounded-none mr-10" >For You</TabsTrigger>
                <TabsTrigger value="password" className="text-md mr-16` py-5 hover:bg-[#191919] rounded-none">Following</TabsTrigger>
                <span className='absolute right-5 text-xl hover:bg-gray-900 p-2 rounded-full'><IoSettingsOutline /></span>
              </TabsList>

              <TabsContent value="account" className='flex-col'>
                <Postmaker/>
                  content
              </TabsContent>
              <TabsContent value="password">
                <div className='w-full h-20 border-b-[1px] border-[#3A4249]'>
                  <div>
                    <span>img</span>
                    <Input placeholder='What is happening?!' value='text' className='bg-transparent'/>
                  </div>
                </div>
                hfgd  
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* <RightSidebar options={UserData}/> */}

        <Button variant="default" className='absolute right-0 top-0' onClick={() => {}}>LogOut</Button>
      </main>
  )
}

export default page