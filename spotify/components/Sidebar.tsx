"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import SongLibrary from "./SongLibrary";
const Sidebar = ({ children }) => {
  const pathname = usePathname();
  const routes = [
    {
      icon: <AiFillHome />,
      label: "Home",
      url: "/",
    },
    {
      icon: <AiOutlineSearch />,
      label: "Search",
      url: "/search",
    },
  ];
  return (
    <div className="p-3">
      <div className="flex">
        <div className="hidden md:flex md:gap-2 md:flex-col w-[300px] bg-neutral-900 h-screen">
          <Box className="bg-slate-800">
            {routes.map((item, idx) => (
              <SideBarItem key={idx} {...item} />
            ))}
          </Box>
          <Box className="bg-slate-800 h-full">
            <SongLibrary />
          </Box>
        </div>

        <div className="overflow-y-auto w-full bg-gray-900">
          <main>{children}</main>
          {/* <div className="max-w-lg mx-auto py-4 overflow-scroll h-screen">
            <div className="bg-neutral-600 mb-4 p-4 h-[40rem]">
              Song Library
            </div>
          </div> */}
        </div>

        {/* {children} */}
      </div>
    </div>
  );
};

export default Sidebar;
