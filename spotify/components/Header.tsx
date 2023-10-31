"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

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
        <div className="flex justify-between gap-8">
          {/* home-search  */}
          <div className="md:hidden  flex gap-2">
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

          {/* Sign-up/in  */}
          <div className="flex items-center gap-5">
            <button className="text-sm text-neutral-300 hover:text-neutral-100 transition-all">
              Sign Up
            </button>
            <button className="px-4 py-2 font-bold hover:opacity-75 transition-all text-sm bg-white rounded-full text-black">
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-xl p-4 font-bold">Let's Start Vibrating!</p>
      </div>
    </>
  );
};

export default Header;
