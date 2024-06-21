import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import PostButton from "../buttons/PostButton";
import { RiGalleryLine } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { TfiList } from "react-icons/tfi";
import { PiSmileyLight } from "react-icons/pi";
import { LuCalendarClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { supabase } from "@/lib/supabase";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useRouter } from "next/navigation";
import { postComment } from "@/app/supabaseFunc";

const PostComment = ({
  commentBox,
  setCommentBox,
  tweetUser,
  tweet,
  hrs,
}: any) => {

    const currUser = useSelector((state:RootState) => ({
        avatar: state.counter.avatar,
        Name: state.counter.Name,
        username: state.counter.username,
        userId: state.counter.userId
      }));

      const [Comment, setComment] = useState('')
      const router = useRouter()

      const postCommentt = () => {
        if(Comment != ''){
          postComment({currUser, tweet, content: Comment})
          setCommentBox(false)
          setComment('')
        }
      }




  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-gray-400 bg-opacity-[.1] backdrop-blur-[1px]"></div>
      <div className="bg-black rounded-xl shadow-lg relative z-10 w-[600px]">
        <div className="flex-between">
          <div className="flex-center p-3 ml-1 mt-1">
            <span
              className="text-xl cursor-pointer rounded-full hover:bg-[var(--primary-light-gray)] p-2"
              onClick={() => setCommentBox(false)}
            >
              <RxCross2 />
            </span>
          </div>
        </div>

        <div className="ml-3 pl-3 relative">
            <div className="w-[2px] h-14 bg-[var(--primary-light-gray)] absolute left-[1.8rem] top-[3.2rem]"></div>
          <div className="flex">
            <div className="pb-4">
              <Image
                src={tweetUser.avatar}
                alt="profile-pic"
                width={40}
                height={40}
                className="rounded-full cursor-pointer mt-2"
              />
            </div>

            <div className="ml-5 w-full pr-2">
              <div className="flex-between py-1">
                <div className="flex-center gap-3">
                  <Link href={`/`}>
                    <h3 className="text-md font-bold cursor-pointer hover:underline">
                      {tweetUser.username}
                    </h3>
                  </Link>
                  <p className="text-[12px] text-gray-300">• {hrs}d</p>
                </div>
              </div>

              <div className="">
                <p>{tweet.tweet}</p>
              </div>

              <p className="mt-4 text-gray-300 text-sm">
                replying to{" "}
                <span className="text-blue-500">@{tweetUser.username}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8 text-xl">
            <Image
              src={currUser.avatar}
              alt="profile-pic"
              width={100}
              height={100}
              className="rounded-full h-11 w-11 cursor-pointer mt-1"
            />
            <textarea
              rows={4}
              className="bg-black text-white border-none w-full my-2 text-xl pl-0 outline-none"
              placeholder="Post your reply"
              value={Comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="w-full flex-between mb-4">
            <ul className="flex gap-3 text-xl text-blue-500">
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

            <PostButton onClickFunc={postCommentt} name="Reply" classname="mr-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
