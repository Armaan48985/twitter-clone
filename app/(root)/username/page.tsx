'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const username = () => {

    const[username, setUsername] = useState('')



  return (
    <>
    <div>Make a  username</div>
    <Input type='text' placeholder='usern@me' value={username} onChange={(e) => setUsername(e.target.value)}/>
    </>
  )
}

export default username