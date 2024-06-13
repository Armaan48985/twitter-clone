'use client'
import { insertUserdata } from '@/app/GlobalFunctions'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const username = () => {

    const[usernamee, setUsername] = useState('')
    const[message, setMessage] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()

    const submitUsername = async () => {
      if (usernamee === '') {
        setMessage('Username cannot be empty');
        return;
      }
  
      if (usernamee.length < 3) {
        setMessage('Username must be at least 3 characters');
        return;
      }
  
      if (usernamee.length > 10) {
        setMessage('Username must be at most 10 characters');
        return;
      }
  
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        console.log('User data:', userData);

          const { error: insertError, data: insertData } = await supabase
          .from('users')
          .insert([{
            id: userData.user.id,
            name: userData.user.user_metadata.full_name,
            username: usernamee
          }])
      
        dispatch(setUserData({
          userId: userData.user.id,
          Name: userData.user.user_metadata.full_name,
          username: usernamee
        }));
      
        router.push('/');
      } catch (error) {
        console.error('Unexpected error occurred:', error);
        setMessage('An unexpected error occurred. Please try again.'+ error);
        
      }
    };

  return (
    <div className='w-full min-h-screen flex-center'>
      <div className='bg-gray-900 p-10 rounded-lg'>

          <div className='bg-blue-900 p-5 rounded-md text-white'>
              <h1 className='py-4 text-xl font-bold pr-10'>Choose a username for you !</h1>
              <Input
                type='text'
                placeholder="Enter username"
                value={usernamee}
                onChange={(e) => setUsername(e.target.value)}
                className='border-gray-900 bg-transparent'
                />

                {message != '' && <p className='py-4 text-red-500 text-sm'>{message}</p>}
          </div>

          <Button variant='outline' onClick={submitUsername} className='rounded-md w-full mt-6 hover:bg-gray-800 border-gray-700'>Submit</Button>
      </div>
    </div>
  )
}

export default username