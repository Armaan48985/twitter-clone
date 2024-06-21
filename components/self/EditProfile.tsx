import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FaRegUser } from "react-icons/fa6";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const EditProfile = ({ openEditBox, setOpenEditBox }: any) => {
  const [Name, setName] = useState("");
  const [Bio, setBio] = useState("");
  const [Location, setLocation] = useState("");
  const [Website, setWebsite] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const getUserData = async () => {
      const { data: userr } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userr?.user?.id);
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const user = data[0];
        setBio(user?.bio);
        setLocation(user?.location);
        setWebsite(user?.website);
        setBirthDate(user?.birth_date);
        setAvatar(user?.avatar);
        setName(user?.name);
        console.log("getting the fcking data");
      }
    };

    getUserData();
  }, []);

  const updateUser = async () => {
    const { data: userr } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("users")
      .update({
        bio: Bio,
        location: Location,
        website: Website,
      })
      .eq("id", userr.user?.id);

    if (error) {
      console.error("Error updating user:", error.message);
      return;
    }

    setOpenEditBox(false);
    console.log("User updated successfully");
  };

  console.log(Location);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-gray-400 bg-opacity-[.1] backdrop-blur-[1px]"></div>
      <div className="bg-black rounded-xl shadow-lg relative z-10 w-[600px]">
        <div className="flex-between p-2">
          <div className="flex-center gap-5 p-3">
            <span
              className="text-xl cursor-pointer rounded-full hover:bg-[var(--primary-gray)] p-1"
              onClick={() => setOpenEditBox(false)}
            >
              <RxCross2 />
            </span>

            <h1 className="text-xl">Edit Profile</h1>
          </div>

          <Button
            variant="outline"
            className="bg-white rounded-3xl w-16 h-8 mr-4 text-black"
            onClick={updateUser}
          >
            Save
          </Button>
        </div>
        <div className="h-[120px] bg-slate-800">{/* image */}</div>

        <div className="border-[var(--primary-gray)] pb-4 pl-2">
          <div className="p-3">
            <div className="flex justify-end py-6 relative">
              <Image
                src={avatar}
                alt="avatar"
                width={100}
                height={100}
                className="absolute top-[-4rem] left-5 border-black border-4 shadow-xl rounded-full"
              />
            </div>

            <div className="py-2 mt-2">
              <div className="border-slate-600 border-[1px] rounded-md px-4 py-[.4rem] outline-blue-500">
                <p className="text-[13px] text-gray-400">Name</p>
                <Input
                  type="text"
                  className="border-none w-full h-[18px] my-2 text-[1rem] pl-0"
                  placeholder={Name}
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="py-2 mt-2">
              <div className="border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]">
                <p className="text-[13px] text-gray-400">Bio</p>
                <textarea
                  rows={3}
                  className="bg-black text-white border-none w-full my-2 text-[1rem] pl-0 outline-none"
                  placeholder={Bio}
                  value={Bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <div className="py-2 mt-2">
              <div className="border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]">
                <p className="text-[13px] text-gray-400">Location</p>
                <Input
                  type="text"
                  className="border-none w-full h-[18px] my-2 text-[1rem] pl-0"
                  placeholder={Location}
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="py-2 mt-2">
              <div className="border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]">
                <p className="text-[13px] text-gray-400">Website</p>
                <Input
                  type="text"
                  className="border-none w-full h-[18px] my-2 text-[1rem] pl-0"
                  placeholder={Website}
                  value={Website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="py-2 mt-2">
              <div className="border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]">
                <p className="text-[13px] text-gray-400">Birth Date</p>
                <Input
                  type="date"
                  className="border-none w-full h-[20px] my-2 text-[1rem] pl-0"
                  placeholder={BirthDate}
                  value={BirthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
