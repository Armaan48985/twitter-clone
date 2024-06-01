"use client";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { data } from "@/constants/SidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import PostButton from "../buttons/PostButton";

const Sidebar = () => {
  const path = usePathname();

  return (
    <main className="w-[300px] h-screen text-left text-white pt-6 flex flex-col items-start justify-between pl-6 sticky top-0 luffy">
      <div>
        <span className="text-3xl pl-4 flex">
          <FaXTwitter />
        </span>

        <ul className="flex flex-col gap-3 mt-6">
          {data.map((e, i): any => {
            return (
              <Link href={e.link || "/"} key={i}>
                <li className="flex items-center gap-10">
                  <Button variant="ghost" className="flex-inline gap-4 py-5 pr-8 hover:bg-gray-800 rounded-3xl">
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

        <div className="mt-5 ml-3">
          <PostButton classname="px-[6rem] py-2 text-lg font-normal" name="Post" />
        </div>
      </div>

      <Button variant="ghost">ID</Button>
    </main>
  );
};

export default Sidebar;
