import { RootState } from '@/app/GlobalRedux/store'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiBarChart, BiMessageRounded } from 'react-icons/bi'
import { CiBookmark, CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa6'
import { FiDownload } from 'react-icons/fi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { LuUser2 } from 'react-icons/lu'
import { useSelector } from 'react-redux'


type Tweet = {
    id: string;
    tweet: string;
    created_by: string;
    created_at: Date;
    likes: number;
    comments: number;
  };

const TweetBox = ({tweet}:{tweet: Tweet}) => {

    const createdAt = new Date(tweet.created_at);
    const currDate = new Date();

    const [hrs, setHrs] = useState(currDate.getDate() - createdAt.getDate());
    const [liked, setLiked] = useState(false);
    const [noOfLikes, setNoOfLikes] = useState(tweet.likes);

    if(hrs < 1){
        setHrs(currDate.getHours() - createdAt.getHours());
    }

    useEffect(() => {
        const setNoOfLikes = async () => {
            try {
                const { data, error } = await supabase
                    .from('tweets')
                    .update({ likes: noOfLikes })
                    .eq('id', tweet.id)
                    .select('*');
    
                if (error) {
                    console.error('Error updating likes:', error.message);
                } else {
                    console.log('Likes updated successfully:', data);
                }
            } catch (error) {
                console.error('Error updating likes:', error);
            }
        };

        if (tweet && (noOfLikes !== tweet.likes || liked)) {
            setNoOfLikes();
        }

    }, [noOfLikes, liked, tweet]);
    


  return (
    <div className='border-b-2 border-[var(--primary-border)] flex p-2 w-full py-3'>
        <div className='p-2'>
            <span className='bg-gray-500 p-3 rounded-full inline-block cursor-pointer text-xl'><LuUser2 /></span>
        </div>

        <div className='ml-3 w-full pr-2'>

            <div className='flex-between py-1'>
               <div className='flex-center gap-3'>
                    <Link href={`/${tweet.created_by}`}><h3 className='text-md font-bold cursor-pointer hover:underline'>{tweet.created_by}</h3></Link>
                    <p className='text-[12px] text-gray-300'>• {hrs}d</p>
               </div>

               <span className='text-md cursor-pointer'>
                    <HiOutlineDotsHorizontal />
               </span>
            </div>

            <div className=''>
                <p>{tweet.tweet}</p>
            </div>

            <div className='flex-between mt-5 mb-1'>
                <div>
                    <span className='text-xl text-gray-400 cursor-pointer'><BiMessageRounded />{tweet.comments}</span>
                </div>
                <div>
                    <span className='text-xl text-gray-400 cursor-pointer'><AiOutlineRetweet /></span>
                </div>
                <div className='flex-center gap-1'>
                {!liked ? 
                    <span className='text-xl text-gray-400 cursor-pointer' onClick={() => {setLiked(true); setNoOfLikes(e => e+1)}}>
                       <CiHeart />
                    </span>
                    :
                    <span className='text-md text-red-500 cursor-pointer' onClick={() => {setLiked(false); setNoOfLikes(e => e-1)}}>
                        <FaHeart /> 
                    </span>
                }    
                    <p className={`text-[13px] brightness-150 ${liked && 'text-red-500'}`}>{noOfLikes == 0 ? '' : noOfLikes}</p>
                </div>
                <div>
                    <span className='text-xl text-gray-400 cursor-pointer'><BiBarChart /></span>
                </div>
                <div className='flex gap-2'>
                    <span className='text-xl text-gray-400 cursor-pointer'><CiBookmark /></span>
                    <span className='text-xl text-gray-400 cursor-pointer'><FiDownload /></span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TweetBox