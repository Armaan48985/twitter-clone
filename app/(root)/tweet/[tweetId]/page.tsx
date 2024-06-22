'use client'
import { RootState } from '@/app/GlobalRedux/store'
import { getTweetUser, postComment, setUserDataa } from '@/app/supabaseFunc'
import PostButton from '@/components/buttons/PostButton'
import RightSidebar from '@/components/self/RightSidebar'
import Sidebar from '@/components/self/Sidebar'
import TweetBox from '@/components/self/TweetBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiBarChart, BiMessageRounded } from 'react-icons/bi'
import { CiBookmark, CiHeart } from 'react-icons/ci'
import { FaArrowLeftLong, FaRegUser } from 'react-icons/fa6'
import { FiDownload } from 'react-icons/fi'
import { GoArrowLeft } from 'react-icons/go'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../../home/page'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice'


type Tweet = {
  id: string;
  tweet: string;
  created_by: string;
  created_at: Date;
  likes: number;
  comments: number;
};

type Comment = {
  id: string;
  comment: string;
  created_by: string;
  created_at: Date;
  likes: number;
  comments: number;
};


const Page = () => {
  const [loading, setLoading] = useState(true);
  const [tweetData, setTweetData] = useState<Tweet>({
    id: "",
    tweet: "",
    created_by: "",
    created_at: new Date(),
    likes: 0,
    comments: 0,
  });
  const [tweetUser, setTweetUser] = useState<any>({});
  const [comments, setComments] = useState<Comment[]>([])
  const [Comment, setComment] = useState('')
  const [currUserData, setCurrUserData] = useState<User | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTweetAndUser = async () => {
      if (pathname) {
        const pathParts = pathname.split('/');
        const tweetId = pathParts[pathParts.length - 1];

        const { data: tweetDataa, error: tweetError } = await supabase
          .from('tweets')
          .select('*')
          .eq('id', tweetId);

        if (tweetDataa && tweetDataa.length > 0) {
          setTweetData(tweetDataa[0]);

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', tweetDataa[0].created_by);

          if (userData && userData.length > 0) {
            setTweetUser(userData[0]);
          } else {
            console.error('Error fetching user:', userError);
          }

          setLoading(false);
        } else {
          console.error('Error fetching tweet:', tweetError);
        }

        const { data: commentData, error: commentsError } = await supabase
              .from('comments')
              .select('*')
              .eq('comment_on', tweetId);

              if(commentData && commentData.length > 0){
                setComments(commentData)
              }
      }
    };

    const fetchData = async () => {
      await setUserDataa(setCurrUserData);
    };
    fetchData();

    fetchTweetAndUser();
  }, [pathname]); 

  if(currUserData){
    dispatch(setUserData({
      avatar: currUserData?.avatar,
      Name: currUserData?.name,
      username: currUserData?.username,
      userId: currUserData?.id
    }))
  }


  const {name, username} = tweetUser;
  const currUser = useSelector((state:RootState) => ({
    avatar: state.counter.avatar,
    Name: state.counter.Name,
    username: state.counter.username,
    userId: state.counter.userId
  }));

  const postCommentt = async () => {
    if(Comment){
      await postComment({currUser, tweet: tweetData, content: Comment})
      setComment('')
      router.refresh()
    }
  }
  
  console.log(tweetUser)

  return (
    <div>
     
      {loading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900'></div>
          </div>
      ) : (
        <div className="flex relative">
              <Sidebar />
              <main className="main-section">
                  <>
                    <div className="bg-black z-10 flex items-center gap-6 border-b-2 border-[var(--primary-gray)] p-2 pl-6 h-[60px] sticky top-0 left-0 bg-opacity-65">
                        <div className='flex items-center gap-4'>
                          <Link href='/' className='text-xl'><GoArrowLeft /></Link>
                          <h1 className='text-xl font-bold'>Post</h1>
                        </div>
                    </div>


                    <div className="flex p-2 w-full py-3 hover:bg-[#070707] duration-500">
                      <div className="p-2">
                        <Image
                          src={tweetUser.avatar}
                          alt="profile-picc"
                          width={50}
                          height={50}
                          className="rounded-full cursor-pointer"
                        />
                      </div>

                      <div className="ml-3 w-full pr-2">
                        <div className="flex-between py-1">
                          <div className="flex-center gap-3">
                            <Link href={`/`}>
                              <h3 className="text-md font-bold cursor-pointer hover:underline">
                                {name}
                              </h3>
                              <p className='text-gray-400 text-sm'>
                                {username}
                              </p>
                            </Link>
                            {/* <p className="text-[12px] text-gray-300">• {hrs}d</p> */}
                          </div>

                          <span className="text-md cursor-pointer">
                            <HiOutlineDotsHorizontal />
                          </span>
                        </div>

                        <div className="mt-4">
                          <p className="">
                            <span>{tweetData.tweet}</span>
                          </p>
                        </div>

                        <div className='w-[550px] h-[1px] bg-slate-400 mt-8'></div>

                        <div className="flex-between mt-4 mb-1">
                          <div>
                            <span
                              className="flex-center gap-1 text-md text-gray-400 cursor-pointer hover:text-blue-500"
                              // onClick={postCommment}
                            >
                              <BiMessageRounded />
                              <p className="text-sm">{tweetData.comments}</p>
                            </span>
                          </div>
                          <div>
                            <span className="text-xl text-gray-400 cursor-pointer">
                              <AiOutlineRetweet />
                            </span>
                          </div>
                          <div className="flex-center gap-1">
                            {/* {!liked ? (
                              <span
                                className="text-xl text-gray-400 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setLiked(true);
                                  setNoOfLikes((e) => e + 1);
                                }}
                              >
                                <CiHeart />
                              </span>
                            ) : (
                              <span
                                className="text-md text-red-500 cursor-pointer"
                                onClick={() => {
                                  setLiked(false);
                                  setNoOfLikes((e) => e - 1);
                                }}
                              >
                                <FaHeart />
                              </span>
                            )} */}
                            <p
                              className={`text-[13px] brightness-150 ${
                                "text-red-500"
                              }`}
                            >
                           
                            </p>
                          </div>
                          <div>
                            <span className="text-xl text-gray-400 cursor-pointer">
                              <BiBarChart />
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xl text-gray-400 cursor-pointer">
                              <CiBookmark />
                            </span>
                            <span className="text-xl text-gray-400 cursor-pointer">
                              <FiDownload />
                            </span>
                          </div>

                        </div>
                          <div className='w-[550px] h-[1px] bg-slate-400 mt-4'></div>
                      </div>
                    </div>

                    <div className='p-2 border-b-2 border-[var(--primary-gray)]'>
                      <div className='flex py-3'>
                        <Image
                          src={currUser.avatar}
                          alt="profile-pic"
                          width={45}
                          height={45}
                          className="rounded-full cursor-pointer"
                        />

                        <div className='w-full'>
                          <Input placeholder='Post Your Comment' value={Comment} onChange={(e) => setComment(e.target.value)} className='text-lg placeholder:text-gray-300 bg-transparent outline-none border-none' />
                        </div>

                        <PostButton name='Reply' onClickFunc={postCommentt}></PostButton>
                      </div>
                    </div>

                    <div>
                      {comments.map((comment, i) => (
                        <TweetBox tweet={comment} key={i} content={comment.comment}/>
                      ))}
                    </div>
                  </>
              </main>
              <RightSidebar />
            </div>
              )}
    </div>
  )
}

export default Page;
