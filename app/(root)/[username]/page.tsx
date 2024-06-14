'use client'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {

  const { userId, Name, username } = useSelector((state: RootState) => ({
    userId: state.counter.userId,
    Name: state.counter.Name,
    username: state.counter.username
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId);

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      console.log(data)

      if (data && data.length > 0) {
        const user = data[0];
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
    <div className='flex-center w-full min-h-screen'>
      <h1>This is {Name}'s Profile</h1>
    </div>
  )
}

export default Profile