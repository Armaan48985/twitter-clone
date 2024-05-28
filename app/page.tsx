'use client'
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null);
  const logout = async () => {
      await supabase.auth.signOut()

      router.refresh()
  }


  
  const insertUserdata = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          name: 'John',
        });
  
      if (error) {
        console.error('Error inserting user data:', error.message, error.details, error.hint, error.code);
      } else {
        console.log('User data inserted:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const insertTweetdata = async () => {
    try {
      await supabase.auth.getSession().then((session) => {
        if(session) {
          setCurrentUser(session?.data?.session.user.user_metadata.full_name)
        }
      })
      let { data: users } = await supabase
        .from('users')
        .select('*');
      console.log(users);
      
      const { data, error } = await supabase
        .from('tweets')
        .insert([{
          tweet: 'this is tweet',
        }]);
  
      if (error) {
        console.error('Error inserting user data:', error.message, error.details, error.hint, error.code);
      } else {
        console.log('User data inserted:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  console.log(currentUser)
  return (
    <>Lesss goooo
      <button onClick={insertUserdata} className="bg-green-900">add to users</button>
      <button onClick={insertTweetdata} className="bg-blue-900">add a tweet by this user</button>
      <button className="bg-black text-white" onClick={logout}>log out</button>
      <h1>Welcome {currentUser}</h1>
    </>
  );
}

