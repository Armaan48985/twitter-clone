'use client'
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const router = useRouter()

  const logout = async () => {
      await supabase.auth.signOut()

      router.refresh()
  }

  
  const insertUserdata = async () => {
    try {
      const { data, error } = await supabase
        .from('Likes')
        .insert({
          id: 'hwlloiamid',
          tweet: 'this is the tweet'
        });
  
      if (error) {
        console.error('Error inserting user data:', error.message, error.details, error.hint, error.code);
      } else {
        console.log('User data inserted:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };
  return (
    <>Lesss goooo
      <button onClick={insertUserdata} className="bg-green-900">add to users</button>
      <button className="bg-black text-white" onClick={logout}>log out</button>
    </>
  );
}

