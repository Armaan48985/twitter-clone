import React from 'react'
import PostButton from '../buttons/PostButton'

const SubscribetoPremiumBox = () => {
  return (
    <div className='w-[340px] border-[1px] border-[var(--primary-gray)] p-4 mt-6 rounded-xl'>
        <h1 className='text-xl font-bold'>Subscribe to Premium</h1>
        <p className='text-sm mt-3'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <PostButton name='Subscribe' classname="mt-4 mb-2"/>
    </div>
  )
}

export default SubscribetoPremiumBox