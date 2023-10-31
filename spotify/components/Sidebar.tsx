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
  const props = { children };
  return (
    <div className="p-3">
      <div className="flex">
        {/* left side bar  */}
        <div className="hidden sticky top-0 md:flex md:gap-2 md:flex-col w-[300px] bg-neutral-900 h-screen">
          <Box className="bg-neutral-800">
            {routes.map((item, idx) => (
              <SideBarItem key={idx} {...item} />
            ))}
          </Box>
          <Box className="bg-neutral-800 h-full">
            <SongLibrary />
          </Box>
        </div>

        {/* Main-Content  */}
        <div className="overflow-y-auto w-full bg-gray-900" {...props} />
      </div>
    </div>
  );
};

export default Sidebar;
