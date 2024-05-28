"use client";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { data } from "@/constants/SidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import PostButton from "../buttons/PostButton";
// import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const path = usePathname();

  return (
    <main className="w-[300px] min-h-[90vh] text-left text-white pt-6 flex flex-col gap-20 items-start pl-6 sticky top-0 luffy">
      <div>
        <span className="text-3xl pl-4 flex">
          <FaXTwitter />
        </span>

        <ul className="flex flex-col gap-4 mt-6">
          {data.map((e, i): any => {
            return (
              <Link href={e.link || "/"} key={i}>
                <li className="flex items-center gap-3">
                  <Button variant="ghost" className="flex gap-6 py-6 pr-14">
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
          <PostButton classname="w-[260px] h-[50px] text-lg font-normal" name="Post" />
        </div>
      </div>

      <Button variant="ghost">ID</Button>
    </main>
  );
};

export default Sidebar;
