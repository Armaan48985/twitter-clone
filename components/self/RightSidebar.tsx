'use client'
import React, { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import { FaMagnifyingGlass, FaXTwitter } from 'react-icons/fa6'
import SubscribetoPremiumBox from './SubscribetoPremiumBox';
import UserSearch from './UserSearch';
import Whatshappening from './Whatshappening';
import WhotoFollow from './WhotoFollow';


interface Props {
    options: string[];
  }


  const RightSidebar = () => {
   
    return (
      <section className='ml-5 h-auto'>
        {/* <UserSearch options={options}/> */}
        <SubscribetoPremiumBox/>
        <Whatshappening/>
        <WhotoFollow/>
        <WhotoFollow/>

        <WhotoFollow/>

        <WhotoFollow/>

      </section>
    );
  };
  
  export default RightSidebar;