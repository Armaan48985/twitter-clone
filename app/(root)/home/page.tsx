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
import { redirect, useRouter } from 'next/navigation'
import Postmaker from '@/components/self/Postmaker'
import { supabase } from '@/lib/supabase'


const   Homee = ({currentUser}:{currentUser: string}) => {

  const router = useRouter()

  const logOut = async () => {
    await supabase.auth.signOut()

    router.refresh();
  }

  const[tweets, setTweets] = useState<any[]>([]);


  useEffect(() => {
      const getSession = async () => {
        const {data, error} = await supabase.auth.getSession();

        // console.log(data)
      }

      const getUser = async () => {
        const {data, error} = await supabase.auth.getUser();

        // console.log(data)
      }

      const getTweets = async () => {
        const {data, error} = await supabase
          .from('tweets')
          .select('tweet');

          console.log('df')

        if (error) {
          console.error('Error fetching tweets:', error.message);
        } else {
          setTweets(data.map(tweet => tweet.tweet))
          // console.log(data)
        }
      }

      getSession()
      getUser() 
      getTweets()
  }, [])

  console.log(tweets)

  return (
      <main className='flex'>
        <section className='main-section'>
          <div>
            <Tabs defaultValue="account" className="w-auto h-[1000px] relative">
            <TabsList className="flex w-full m-0 rounded-none luffy bg-black border-b-2 border-gray-700 pb-10">
              <div className="flex-grow basis-9/10 flex items-center my-6">
                <TabsTrigger value="account" className="w-full text-white text-md mt-7">For You</TabsTrigger>
                <TabsTrigger value="password" className="w-full text-white text-md mt-7">Following</TabsTrigger>
              </div>
              <div className="px-4 flex items-center justify-center m-0">
                <span className="hover:bg-gray-900 p-2 rounded-full mt-8">
                  <IoSettingsOutline className="text-white" />
                </span>
              </div>
            </TabsList>

              <TabsContent value="account" className='flex-col'>
                <Postmaker/>
                  content
                  {tweets.map((tweet) => (
                    <p>{tweet}</p>
                  ))}
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

        <Button variant="default" className='absolute right-0 top-0' onClick={logOut}>LogOut</Button>
      </main>
  )
}

export default Homee