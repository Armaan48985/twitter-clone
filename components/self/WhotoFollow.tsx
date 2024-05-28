import React from 'react'
import Profilebar from './Profilebar'

const WhotoFollow = () => {
  return (
    <div className='w-[340px] h-[300px] bg-gray-900 mt-4 p-4 rounded-lg'>
        <Profilebar name='luffy' userName='@luffy2345' img='/luffy.webp'/>
        <Profilebar name='ace' userName='@ace2345' img='/luffy.webp'/>
        <Profilebar name='sabo' userName='@sabo2345' img='/luffy.webp'/>
    </div>
  )
}

export default WhotoFollow