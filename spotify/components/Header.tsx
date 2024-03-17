"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import AuthProfile from "./AuthProfile";

interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className, children }) => {
  const router = useRouter();
  function handleLogout() {}
  return (
    <>
      <div className={twMerge(``, className)}>
        {" "}
        {/* left-right  */}
        <div className="hidden md:flex gap-3 ">
          <button onClick={() => router.back()}>
            <RxCaretLeft
              size={35}
              className="bg-neutral-900 rounded-full opacity-80 transition-all hover:opacity-50"
            />
          </button>
          <button onClick={() => router.forward()}>
            <RxCaretRight
              size={35}
              className="bg-neutral-900 rounded-full opacity-80 transition-all hover:opacity-50"
            />
          </button>
        </div>
        <div className="flex w-full sm:w-auto justify-between gap-8">
          {/* home-search  */}
          <div className="md:hidden flex gap-2">
            <button>
              <AiFillHome
                className="text-black bg-white p-1 rounded-full hover:opacity-80 transition-all"
                size={23}
              />
            </button>
            <button>
              <AiOutlineSearch
                className="text-black bg-white p-1 rounded-full hover:opacity-80 transition-all"
                size={23}
              />
            </button>
          </div>
          <AuthProfile />
        </div>
      </div>
    </>
  );
};

export default Header;
