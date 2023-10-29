"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Box from "./Box";
import { twMerge } from "tailwind-merge";

const SideBarItem = ({ label, url, icon: Icon }) => {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      className={twMerge(
        `flex gap-2 rounded-lg items-center p-3 hover:text-white transition-all text-md`,
        url === pathname ? "" : "text-neutral-400"
      )}
    >
      <span>{Icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default SideBarItem;
