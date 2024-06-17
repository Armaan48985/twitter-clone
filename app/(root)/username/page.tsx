'use client'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Username = () => {

    const[usernamee, setUsername] = useState('')
    const[message, setMessage] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()
    const [userExist, setUserExist] = useState(false);
    const [avatar, setAvatar] = useState<string>('') 

    useEffect(() => {
      const checkUser = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        const {data: checkId} = await supabase.from('users').select('id').eq('id', userData?.user?.id);

        setAvatar(userData?.user?.user_metadata.avatar_url)

        if(checkId && checkId?.length > 0){
          setMessage('user already exist... Wait a moment...')
          router.push('/')
          setUserExist(true)
        }
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

      setMessage('Wait a moment...')
  
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
      
          await supabase
          .from('users')
          .insert([{
            id: userData.user.id,
            name: userData.user.user_metadata.full_name,
            username: usernamee,
            avatar: userData.user.user_metadata.avatar_url
          }])
      
  
          dispatch(setUserData({
            userId: userData.user.id,
            Name: userData.user.user_metadata.full_name,
            username: usernamee,
            avatar: userData.user.user_metadata.avatar_url
          }));
      
        router.push('/')
      } catch (error) {
        console.error('Unexpected error occurred:', error);
        setMessage('An unexpected error occurred. Please try again.'+ error);
        
      }
    };


  return (
    <div className='w-full min-h-screen flex-center'>
      <div className='bg-[#1a1a1a] p-10 rounded-xl py-14'>
          <div className='p-5 rounded-t-xl text-white bg-[#282828] my-3 py-10 px-6 relative'>
            <Image src={avatar} alt='avatar' width={80} height={80} className='rounded-full absolute top-[-2.5rem] left-[8rem] bg-red-500 ' />
              <h1 className='py-4 text-xl font-bold pr-10 mt-5'>Choose a username for you !</h1>
              <Input
                type='text'
                placeholder="Enter username"
                value={usernamee}
                onChange={(e) => setUsername(e.target.value)}
                className='border-gray-500 bg-[#282828] text-whit mt-2'
                />

                {message != '' && <p className='py-4 text-red-500 text-sm'>{message}</p>}
          </div>

          <Button variant='default' onClick={submitUsername} className='rounded-b-xl py-6 bg-[#282828] border-gray-300 w-full mt-4 hover:bg-[#3b3b3b] duration-500'>Submit</Button>
      </div>
    </div>
  )
}

export default Username