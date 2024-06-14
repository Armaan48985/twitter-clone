'use client'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice';
import { RootState } from '@/app/GlobalRedux/store';
import RightSidebar from '@/components/self/RightSidebar';
import Sidebar from '@/components/self/Sidebar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaRegUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();

  const[Name, setName] = useState('');
  const[username, setUsername] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const {data:id} = await supabase.auth.getUser();
      const { data, error } = await supabase.from('users').select('*').eq('id', id.user?.id);

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }    

      if (data && data.length > 0) {
        const user = data[0];
        setName(user?.name);
        setUsername(user?.username);
        dispatch(setUserData({
          userId: user.id,
          Name: user.name,
          username: user.username
        }));
      }
    };

      getUser();

  }, []);

  return (
    <div className='flex'>
      <Sidebar/>
      <main className='main-section'>
        <div className='bg-black z-10 flex items-center gap-6 border-b-2 border-[var(--primary-border)] p-2 pl-6 h-[60px] sticky top-0 left-0 bg-opacity-65'>
          <Link href='/'><span className='text-lg'><FaArrowLeftLong /></span></Link>
          <div>
            <h1 className='font-bold text-lg'>{Name}</h1>
            <p className='text-sm text-gray'>0 posts</p>
          </div>
        </div>

        <div className='h-[160px] bg-slate-800'>
          {/* image */}
        </div>

        <div className='border-b-2 border-[var(--primary-border)] pb-4 pl-2'>
            <div className='p-3'>
                  <div className='flex justify-end py-6 relative'>
                    <Button variant='outline' className='border-[var(--primary-border)] rounded-3xl'>Edit Profile</Button>
                    <div className='absolute top-[-4rem] left-5 p-14 border-black border-4 shadow-xl text-xl bg-yellow-800 rounded-full'><FaRegUser /></div>
                  </div>

                  <div className='py-2 mt-2'>
                    <h1 className='text-2xl font-bold'>{Name}</h1>
                    <h3 className='text-gray-300 mt-1'>@{username}</h3>
                  </div>

                  <div className='py-4'>
                    {/* bio */}
                  </div>

                  <div className='py-2'>
                    {/* other details */}
                  </div>

                  <div className='flex gap-3'>
                    <p>0 Followers</p>
                    <p>0 Following</p>
                  </div>
            </div>
        </div>
      </main>
      <RightSidebar/>
    </div>
  )
}

export default Profile