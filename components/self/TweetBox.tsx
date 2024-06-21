import { RootState } from "@/app/GlobalRedux/store";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { BiBarChart, BiMessageRounded } from "react-icons/bi";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import PostComment from "./PostComment";
import { useRouter } from "next/navigation";
import CustomLink from "./LinkWrapper";
import { getTweetUser } from "@/app/supabaseFunc";


type Tweet = {
  id: string;
  tweet: string;
  created_by: string;
  created_at: Date;
  likes: number;
  comments: number;
};

const TweetBox = ({ tweet, content }: any) => {
  const createdAt = new Date(tweet.created_at);
  const currDate = new Date();
  const router = useRouter();
  const [hrs, setHrs] = useState(currDate.getDate() - createdAt.getDate());
  const [liked, setLiked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(tweet.likes);
  const [tweetUser, setTweetUser] = useState<any>({});
  const [commentBox, setCommentBox] = useState(false);

  useEffect(() => {
    const setNoOfLikes = async () => {
      try {
        const { data, error } = await supabase
          .from("tweets")
          .update({ likes: noOfLikes })
          .eq("id", tweet.id)
          .select("*");

        if (error) {
          console.error("Error updating likes:", error.message);
        } else {
          console.log("Likes updated successfully:", data);
        }
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    };


    if (tweet && tweet.created_by) {
      getTweetUser({ tweetUserId: tweet.created_by, setTweetUser });
    }

    if(liked){
      setNoOfLikes();
    }

    }, []);

    const handleClick = (event:any) => {
      const clickedClickableElement = event.target.closest('.flex-center.gap-1.text-md.text-gray-400.cursor-pointer'); // Adjust selector as needed
    
      if (clickedClickableElement) {
        // Clicked on a prioritized element - prevent parent link navigation
        event.stopPropagation();
        // Handle specific logic for the clicked element (e.g., postCommment, like/unlike)
      } else {
        // Clicked on an empty space or other elements - navigate with the parent Link
        router.push(`/tweet/${tweet.id}`);
      }
    };

  const postCommment = (e:any) => {
    e.stopPropagation();
    e.preventDefault();
    setCommentBox(true)
  }

  return (
    <div>
      {commentBox && (
        <PostComment
          commentBox={commentBox}
          setCommentBox={setCommentBox}
          tweetUser={tweetUser}
          tweet={tweet}
          hrs={hrs}
        />
      )}
        <Link href={`/tweet/${tweet.id}`}  onClick={handleClick}>
       <div className="border-b-2 border-[var(--primary-gray)] flex p-2 w-full py-3 hover:bg-[#070707] duration-500">
          <div className="p-2">
            <Image
              src={tweetUser?.avatar}
              alt="profile-pic"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
          </div>

          <div className="ml-3 w-full pr-2">
            <div className="flex-between py-1">
              <div className="flex-center gap-3">
                <Link href={`/`}>
                  <h3 className="text-md font-bold cursor-pointer hover:underline">
                    {tweetUser?.username}
                  </h3>
                </Link>
                <p className="text-[12px] text-gray-300">• {hrs}d</p>
              </div>

              <span className="text-md cursor-pointer">
                <HiOutlineDotsHorizontal />
              </span>
            </div>

            <div className="">
              <p className="">
                <span>{content}</span>
              </p>
            </div>

            <div className="flex-between mt-5 mb-1">
              <div>
                <span
                  className="flex-center gap-1 text-md text-gray-400 cursor-pointer hover:text-blue-500"
                  onClick={postCommment}
                >
                  <BiMessageRounded />
                  <p className="text-sm">{tweet.comments}</p>
                </span>
              </div>
              <div>
                <span className="text-xl text-gray-400 cursor-pointer">
                  <AiOutlineRetweet />
                </span>
              </div>
              <div className="flex-center gap-1">
                {!liked ? (
                  <span
                    className="text-xl text-gray-400 cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      setLiked(true);
                      setNoOfLikes((e:any) => e + 1);
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <CiHeart />
                  </span>
                ) : (
                  <span
                    className="text-md text-red-500 cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      setLiked(false);
                      setNoOfLikes((e:any) => e - 1);
                      e.stopPropagation();
    e.preventDefault();
                    }}
                  >
                    <FaHeart />
                  </span>
                )}
                <p
                  className={`text-[13px] brightness-150 ${
                    liked && "text-red-500"
                  }`}
                >
                  {noOfLikes == 0 ? "" : noOfLikes}
                </p>
              </div>
              <div>
                <span className="text-xl text-gray-400 cursor-pointer">
                  <BiBarChart />
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-xl text-gray-400 cursor-pointer">
                  <CiBookmark />
                </span>
                <span className="text-xl text-gray-400 cursor-pointer">
                  <FiDownload />
                </span>
              </div>
            </div>
          </div>
        </div>
    </Link>
    </div>
  );
};

export default TweetBox;
