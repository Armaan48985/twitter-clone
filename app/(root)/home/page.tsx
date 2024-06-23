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
import { getTweetUser, getTweets, setUserDataa } from '@/app/supabaseFunc'


export type Tweet = {
  id: string;
  tweet: string;
  created_by: string;
  created_at: Date;
  likes: number;
  comments: number;
};

export type User = {
  id: string;
  username: string;
  avatar: string;
  name: string;
  bio: string;
}


const Homee = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const[tweet, setTweet] = useState<string>("");
  const [loading, setLoading] = useState(true)
  const [currUserData, setCurrUserData] = useState<User | null>(null);


  const currUser = useSelector((state:RootState) => ({
    avatar: state.counter.avatar,
    Name: state.counter.Name,
    username: state.counter.username,
    userId: state.counter.userId
  }));

 
    useEffect(() => {
      const fetchData = async () => {
        await setUserDataa(setCurrUserData);
      };
       

        fetchData();
        getTweets({setTweets, setLoading})
    }, [])

    if(currUserData){
      dispatch(setUserData({
        avatar: currUserData?.avatar,
        Name: currUserData?.name,
        username: currUserData?.username,
        userId: currUserData?.id
      }))
    }

  return (
      <main className='flex'>
        <section className='main-section'>
          <div>
            <Tabs defaultValue="account" className="w-auto h-[1000px] relative">
            <TabsList className="flex w-full m-0 rounded-none luffy bg-black border-b-[1px] border-[var(--primary-gray)] pb-11">
              <div className="flex-grow basis-9/10 flex items-center my-7">
                <TabsTrigger value="account" className="w-full text-white text-md mt-8">For You</TabsTrigger>
                <TabsTrigger value="password" className="w-full text-white text-md mt-8">Following</TabsTrigger>
              </div>
              <div className="px-4 flex items-center justify-center m-0">
                <span className="hover:bg-gray-900 p-2 rounded-full mt-8">
                  <IoSettingsOutline className="text-white" />
                </span>
              </div>
            </TabsList>


            {loading ? (
                  <div className='flex justify-center items-center h-screen'>
                    <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900'></div>
                  </div>
                ) : (
                  <>
                    <TabsContent value="account" className='flex-col'>
                      <Postmaker tweet={tweet} setTweet={setTweet} currUser={currUser} />
                      {tweets.map((tweet, i) => (
                        <TweetBox tweet={tweet} key={i} content={tweet.tweet} />
                      ))}
                    </TabsContent>
                    <TabsContent value="password">
                      <div className='w-full h-20 border-b-[1px] border-[#3A4249]'>
                        <div>
                          <span>img</span>
                          <Input placeholder='What is happening?!' value='text' className='bg-transparent' />
                        </div>
                      </div>
                      hfgd
                    </TabsContent>
                  </>
                )}
            </Tabs>
          </div>
        </section>
      </main>
  )
}

export default Homee