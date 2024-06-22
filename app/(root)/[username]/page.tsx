"use client";
import { setUserData } from "@/app/GlobalRedux/Feature/counter/counterSlice";
import { RootState } from "@/app/GlobalRedux/store";
import EditProfile from "@/components/self/EditProfile";
import RightSidebar from "@/components/self/RightSidebar";
import Sidebar from "@/components/self/Sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowLeftLong, FaRegUser } from "react-icons/fa6";
import { IoLink } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../home/page";
import { setUserDataa } from "@/app/supabaseFunc";

const Profile = () => {
  const [id, setId] = useState("");
  const [Name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [openEditBox, setOpenEditBox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Bio, setBio] = useState("Bio");
  const [Location, setLocation] = useState("");
  const [Website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [editable, setEditable] = useState(false);
  const [currUserData, setCurrUserData] = useState<User | null>(null);
  const [following, setFollowing] = useState(false)
  const [followingCount, setFollowingCount] = useState(0)
  const [followersCount, setFollowersCount] = useState(0)
  const pathname = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: id } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", pathname.username);

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const user = data[0];
        setName(user?.name);
        setUsername(user?.username);
        setLoading(false);
        setBio(user?.bio);
        setAvatar(user?.avatar);
        setLocation(user?.location);
        setWebsite(user?.website);
        setId(user?.id);
        if (id.user?.id == data[0]?.id) setEditable(true);
      }
    };

    const fetchData = async () => {
      await setUserDataa(setCurrUserData);
    };

    const checkFollow = async () => {
      const { data, error } = await supabase
        .from("followers")
        .select("*")
        .eq("user", currUser.userId)
        .eq("following", id);

      if (data && data.length > 0) {
        setFollowing(true);
        router.refresh();
      }
    
    }

    const getFollowingCount = async () => {
      const { data:followingData } = await supabase
        .from("followers")
        .select("*")
        .eq("user", id);

      const { data:followerData } = await supabase
        .from("followers")
        .select("*")
        .eq("following", id);

      if (followerData) {
        setFollowersCount(followerData.length);
      }
      if(followingData){
        setFollowingCount(followingData.length)
      }
    }

    getFollowingCount()
    checkFollow(); 
    fetchData();
    getUser();
  }, [pathname, openEditBox]);

  if(currUserData){
    dispatch(setUserData({
      avatar: currUserData?.avatar,
      Name: currUserData?.name,
      username: currUserData?.username,
      userId: currUserData?.id
    }))
  }

  const currUser = useSelector((state:RootState) => ({
    avatar: state.counter.avatar,
    Name: state.counter.Name,
    username: state.counter.username,
    userId: state.counter.userId
  }));


  const followUser = async () => {
    const {data, error} = await supabase.from("followers").insert([{user: currUser.userId, following: id}]).select("*");

    if(data){
      setFollowing(true)
      router.refresh()
    }
    if(error){
      console.log('not working')
    }
  }

  const unfollowUser = async () => {
    const {data, error} = await supabase.from("followers").delete().eq("user", currUser.userId).eq("following", id);;

    if(data){
      setFollowing(false)
      router.refresh()
    }
    if(error){
      console.log('not working')
    }
  }

  return (
    <div className="flex relative">
      {openEditBox && (
        <EditProfile
          openEditBox={openEditBox}
          setOpenEditBox={setOpenEditBox}
        />
      )}
      <Sidebar />
      <main className="main-section">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="bg-black z-10 flex items-center gap-6 border-b-2 border-[var(--primary-gray)] p-2 pl-6 h-[60px] sticky top-0 left-0 bg-opacity-65">
              <Link href="/">
                <span className="text-lg">
                  <FaArrowLeftLong />
                </span>
              </Link>
              <div>
                <h1 className="font-bold text-lg">{Name}</h1>
                <p className="text-sm text-gray">0 posts</p>
              </div>
            </div>

            <div className="h-[160px] bg-slate-800">{/* image */}</div>

            <div className="border-b-2 border-[var(--primary-gray)] pb-4 pl-5">
              <div className="p-3">
                <div
                  className={`flex justify-end py-6 relative ${
                    !editable && "mb-10"
                  }`}
                >
                  {editable ? (
                    <Button
                      variant="outline"
                      className="border-[var(--primary-gray)] rounded-3xl"
                      onClick={() => setOpenEditBox(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-[var(--primary-gray)] rounded-3xl"
                      onClick={following ? unfollowUser : followUser}
                    >
                     {following ? 'following' : 'Follow'}
                    </Button>
                  )}
                  <div className="absolute top-[-4rem] left-3 border-black border-4 shadow-xl text-xl bg-yellow-800 rounded-full">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt="avatar"
                        width={350}
                        height={350}
                        className="w-28 h-28 rounded-full"
                      />
                    ) : (
                      <FaRegUser className="w-28 h-28 rounded-full" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="py-2 mt-2">
                    <h1 className="text-2xl font-bold">{Name}</h1>
                    <h3 className="text-gray-300">@{username}</h3>
                  </div>

                  <div className="py-4">
                    <p>{Bio}</p>
                  </div>

                  <div className="py-2 flex gap-4">
                    {Location && (
                      <div className="flex-center gap-1 text-gray-300">
                        <span>
                          <CiLocationOn />
                        </span>
                        <p>{Location}</p>
                      </div>
                    )}
                    {Website && (
                      <div className="flex-center gap-1 text-gray-300">
                        <span>
                          <IoLink />
                        </span>
                        <a href={`http://${Website}`} className="text-blue-500">
                          {Website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-6 mt-3">
                    <p>{followersCount} Followers</p>
                    <p>{followingCount} Following</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <RightSidebar />
    </div>
  );
};

export default Profile;
