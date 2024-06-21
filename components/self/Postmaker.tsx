import React, { useState } from "react";
import { Input } from "../ui/input";
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
import { RiEarthFill, RiGalleryLine } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { TfiList } from "react-icons/tfi";
import { PiSmileyLight } from "react-icons/pi";
import { LuCalendarClock } from "react-icons/lu";
import { postTweet } from "@/app/supabaseFunc";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PostButton from "../buttons/PostButton";

const Postmaker = ({ tweet, setTweet, currUser }: any) => {

  const router = useRouter();
  
  const PostTweet = async () => {
    try {
      await postTweet({ tweet: tweet, currUser: currUser.userId });
      setTweet(""); // Clear the input field after posting
      router.refresh(); // Refresh the router to update the component
    } catch (error) {
      console.error("Error posting tweet:", error); // Log any errors for debugging
    }
  };


  return (
    <div className="w-full h-auto border-b-[1px] border-[var(--primary-gray)] p-4 flex">
      <div className="h-full">
        <Image src={currUser.avatar} alt="avatar" width={50} height={50} className="rounded-full mt-2" />
      </div>
      <div className="flex items-start flex-col gap-2 ml-4">
        <Input
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="What is happening?!"
          className="bg-transparent border-none text-white text-lg pl-1"
        />
        <span className="text-[#1D9BF0] flex items-center gap-2 py-2">
          {" "}
          <RiEarthFill />
          Everyone can reply
        </span>

        <span className="block w-[500px] h-[1px] bg-[#32393e]"></span>

        <div className="w-full flex-between mt-2">
          <ul className="flex gap-3 text-xl text-blue-400 font-bold">
            <li className="cursor-pointer">
              <RiGalleryLine />
            </li>
            <li className="cursor-pointer">
              <MdOutlineGifBox />
            </li>
            <li className="cursor-pointer">
              <TfiList />
            </li>
            <li className="cursor-pointer">
              <PiSmileyLight />
            </li>
            <li className="cursor-pointer">
              <LuCalendarClock />
            </li>
            <li className="cursor-pointer">
              <IoLocationOutline />
            </li>
          </ul>

          <PostButton
            name="Post"
            onClickFunc={PostTweet}
            classname=''
          />
        </div>
      </div>
    </div>
  );
};

export default Postmaker;
