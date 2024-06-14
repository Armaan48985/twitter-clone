'use client'
import { insertUserdata } from '@/app/GlobalFunctions'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const username = () => {

    const[usernamee, setUsername] = useState('')
    const[message, setMessage] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
      
      const checkUser = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        const {data: checkId} = await supabase.from('users').select('id').eq('id', userData?.user?.id);

        if(checkId?.length > 0){
          setMessage('user already exist')
          router.push('/')
          setUserExist(true)
        }

        console.log(checkId)
      }

      checkUser()
    }, [])

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
      if(userExist){
        setMessage('User already exist')
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
      <div className='bg-[#1a1a1a] p-10 rounded-xl py-14'>

          <div className='p-5 rounded-xl text-white bg-[#282828] my-3 py-10 px-6'>
              <h1 className='py-4 text-xl font-bold pr-10 mb-2'>Choose a username for you !</h1>
              <Input
                type='text'
                placeholder="Enter username"
                value={usernamee}
                onChange={(e) => setUsername(e.target.value)}
                className='border-gray-400 bg-[#282828] text-whit mt-4'
                />

                {message != '' && <p className='py-4 text-red-500 text-sm'>{message}</p>}
          </div>

          <Button variant='default' onClick={submitUsername} className='rounded-lg py-5 bg-[#282828] border-gray-300 w-full mt-6 hover:bg-[#3b3b3b] duration-500'>Submit</Button>
      </div>
    </div>
  )
}

export default username