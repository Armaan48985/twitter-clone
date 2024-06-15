import React from "react";
import { Button } from "../ui/button";
import { postTweet } from "@/app/supabaseFunc";
import { supabase } from "@/lib/supabase";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

const PostButton = ({classname, name, tweet, setTweet, currUser}:any) => {
  
  const router = useRouter()

  const post = async () => {
    await postTweet({ tweet, currUser });
    router.push('/')
    console.log('working af');
    setTweet('');
  };
  

  return (
    <Button 
        variant="default" 
        onClick={post} 
        className={`bg-[#1B8CD8] rounded-3xl ${classname} hover:bg-[#3598db]`}
      >
      {name}
    </Button>
  );
};

export default PostButton;
