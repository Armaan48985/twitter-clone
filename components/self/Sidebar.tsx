"use client";
import React from "react";
import { BsThreeDots, BsTwitter } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { data } from "@/constants/SidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import PostButton from "../buttons/PostButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOut } from "@/app/supabaseFunc";


const Sidebar = () => {
  const path = usePathname();

  const logout = async () => {
    await logOut(); 
    window.location.reload();
  }

  const currUser = useSelector((state:RootState) => ({
    avatar: state.counter.avatar,
    Name: state.counter.Name,
    username: state.counter.username,
    userId: state.counter.userId
  }));

  return (
    <main className="w-[270px] h-screen text-left text-white pt-3 flex flex-col items-start justify-between pl-6 sticky top-0 luffy">
      <div>
        <span className="text-3xl pl-4 flex">
          <FaXTwitter />
        </span>

        <ul className="flex flex-col gap-[1px] mt-4">
        {data.map((e, i) => {
              const link = e.name === 'Profile' ? `/${currUser.username}` : e.link || '/';
              return (
                <Link href={link} key={i}>
                  <li className="flex items-center gap-2">
                    <Button variant="ghost" className="flex-inline gap-4 py-6 pr-8 hover:bg-[var(--primary-dark-gray)] rounded-3xl">
                      <span className="text-3xl">
                        {path === e.link ? e.activeIcon : e.icon}
                      </span>
                      <h2 className="text-xl">{e.name}</h2>
                    </Button>
                  </li>
                </Link>
              );
            })}
        </ul>

        <div className="mt-4 ml-3">
          <PostButton classname="px-[5.7rem] py-[1.6rem] text-lg font-normal" name="Post" />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-0 border-none outline-none">
            <div className="w-[250px] flex-between rounded-3xl hover:bg-[var(--primary-dark-gray)] px-3 py-2 mb-3">
                <div className="flex">
                  <Image
                    src={currUser.avatar}
                    alt="profile-pic"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />

                  <div className="ml-3 flex text-left flex-col gap-0">
                    <h3 className="font-bold text-md">{currUser.Name}</h3>
                    <p className="text-gray-300 text-sm">{currUser.username}</p>
                  </div>
                </div>
                <span className="text-lg"><BsThreeDots /></span>
           </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black w-[300px] border-[1px] shadow-sm shadow-white border-gray-600 rounded-xl p-3">
          <DropdownMenuItem className="text-md font-bold hover:opacity-100 opacity-90 cursor-pointer">Add an existing account</DropdownMenuItem>
          <DropdownMenuItem className="text-md font-bold hover:opacity-100 opacity-90 cursor-pointer mt-2" onClick={logout}>LogOut @{currUser.username}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      
    </main>
  );
};

export default Sidebar;
