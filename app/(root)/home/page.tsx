'use client'
import React, { useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { IoSettingsOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Postmaker from '@/components/self/Postmaker'
import { supabase } from '@/lib/supabase'
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice'
import { RootState } from '@/app/GlobalRedux/store'
import TweetBox from '@/components/self/TweetBox'
import { Input } from '@/components/ui/input'


type Tweet = {
  tweet: string;
  created_by: string;
  created_at: Date;
};


const   Homee = () => {

  const router = useRouter()
  const currUser = useSelector((state: RootState) => state.counter.username)
  const dispatch = useDispatch()
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const[tweet, setTweet] = useState<string>("");



  const logOut = async () => {
    await supabase.auth.signOut()
    router.refresh();
  }


  useEffect(() => {
      const getTweets = async () => {
        const { data, error } = await supabase.from('tweets').select('tweet, created_by, created_at');
          if (error) {
            console.error('Error fetching tweets:', error);
          } else {
            setTweets(data);
          }
      }

      const setUserDataa = async () => {

        const {data: user} = await supabase.auth.getUser()

        const { data, error } = await supabase.from('users').select('*').eq('id', user?.user?.id);
        if (error) {
          console.error('Error fetching user:', error.message);
          return;
        }
        
        if(data && data.length > 0) {
          const user = data[0];
          dispatch(setUserData({
            userId: user.id,
            Name: user.name,
            username: user.username
          }))
        }
      }

      setUserDataa()
      getTweets()
  }, [])


  console.log(currUser)

  

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
                <Postmaker  tweet={tweet} setTweet={setTweet} currUser={currUser}/>
                  {tweets.map((tweet, i) => (
                      <TweetBox tweet={tweet} key={i}/>
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