import React from "react";
import { Button } from "../ui/button";
import { postTweet } from "@/app/supabaseFunc";
import { supabase } from "@/lib/supabase";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

const PostButton = ({classname, name, tweet, setTweet}:any) => {

  const router = useRouter()
  return (
    <Button 
        variant="default" 
        onClick={() => {
          postTweet(tweet) 
          router.refresh()
          setTweet('')
        }} 
        className={`bg-[#1B8CD8] rounded-3xl ${classname} hover:bg-[#3598db]`}
      >
      {name}
    </Button>
  );
};

export default PostButton;
