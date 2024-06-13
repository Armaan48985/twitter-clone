'use client'
import { RootState } from '@/app/GlobalRedux/store';
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const { userId, Name } = useSelector((state: RootState) => ({
    userId: state.counter.userId,
    Name: state.counter.Name,
  }));

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId);
    }

    getUser()
  }, [])

  return (
    <div className='flex-center w-full min-h-screen'>
      <h1>This is {Name}'s Profile</h1>
    </div>
  )
}

export default Profile