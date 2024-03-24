"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdMusicNote } from "react-icons/md";
import { TbMusicHeart, TbPlaylist } from "react-icons/tb";

export default function SideBarArtist() {
  const pathname = usePathname();
  const links = [
    {
      label: "Songs",
      icon: <MdMusicNote className="h-4 w-4" />,
      href: "/artist/songs",
    },
    {
      label: "Playlists",
      icon: <TbPlaylist className="h-4 w-4" />,
      href: "/artist/playlists",
    },
    {
      label: "Albums",
      icon: <TbMusicHeart className="h-4 w-4" />,
      href: "/artist/albums",
    },
  ];
  return (
    <div className="hidden border-r border-gray-200 bg-gray-100/40 lg:block dark:border-gray-800 dark:bg-gray-800/40 w-[270px]">
      <div className="flex h-full flex-col">
        <div className="flex h-[60px] items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <span className="">Acme Inc</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map((link, index) => (
              <Link
                key={index}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all  dark:text-gray-400 dark:hover:text-gray-50 ${
                  pathname.includes(link.href) &&
                  "text-gray-900 bg-neutral-100 "
                } `}
                href={link.href}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </nav>
      </div>
    </div>
  );
}
