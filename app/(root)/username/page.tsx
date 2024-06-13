'use client'
import { setUserData } from '@/app/GlobalRedux/Feature/counter/counterSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const username = () => {

    const[username, setUsername] = useState('')
    const[message, setMessage] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()

    const submitUsername = async () => {
        if(username === ''){
            setMessage('username cannot be empty')
            return
        } 

        if(username.length < 3){
            setMessage('username must be atleast 3 characters')
            return
        }

        if(username.length > 10){
            setMessage('username must be atmost 10 characters')
            return
        }

        const {data, error} = await supabase.auth.getUser();
        const {data:userdata} = await supabase
                  .from('users')
                  .insert({id: data?.user?.id,name: data.user?.user_metadata.full_name , username: 'lskd'})

        if(error){
          console.log(error)
        }
        else{
          dispatch(setUserData({
            userId: data?.user?.id,
            Name: data?.user?.user_metadata.full_name,
            username: username
          }))

          router.push('/')
        }

    }


  return (
    <div className='w-full min-h-screen flex-center'>
      <div className='bg-gray-900 p-10 rounded-lg'>

          <div className='bg-blue-900 p-5 rounded-md text-white'>
              <h1 className='py-4 text-xl font-bold pr-10'>Choose a username for you !</h1>
              <Input
                placeholder="Username"
                value={username}
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