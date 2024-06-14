'use client'
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Homee from "./(root)/home/page";
import Sidebar from "@/components/self/Sidebar";
import RightSidebar from "@/components/self/RightSidebar";


export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState("");
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
          setCurrentUser(session?.data?.session?.user.user_metadata.full_name || "")
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
    } 
    catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  
  return (
    <div className="bg-black flex gap-2">
      <Sidebar/>
      <Homee/>
      <RightSidebar/>
    </div>
  );
}