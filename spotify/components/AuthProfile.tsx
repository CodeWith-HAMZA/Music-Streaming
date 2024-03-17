"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
  User,
} from "@nextui-org/react";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { logoutUser } from "@/appwrite";

export default function AuthProfile() {
  const [selectedColor, setSelectedColor] = React.useState("default");

  const { error, loading, user } = useAuth();
  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

  if (loading || user) {
    const DropdownContent = () => (
      <Dropdown>
        <DropdownTrigger>
          {!loading ? (
            <User
              className="cursor-pointer"
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              name={user?.name}
            />
          ) : (
            <div className="bg-gray-200/60 animate-pulse w-11 h-11 rounded-full" />
          )}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown Variants"
          color={"success"}
          variant={"faded"}
        >
          <DropdownItem key="new">
            <Link href={"/user/profile/me"}>Your Profile</Link>
          </DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem
            onClick={async () => await logoutUser()}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    return (
      <div className="flex flex-wrap gap-4">
        <DropdownContent />
      </div>
    );
  }

  return (
    <>
      {/* Sign-up/in  */}
      <div className="flex items-center gap-5">
        <button className="text-sm text-neutral-300 hover:text-neutral-100 transition-all">
          <Link href={"/signup"}>Sign Up</Link>
        </button>
        <button className="px-4 py-2 font-bold hover:opacity-75 transition-all text-sm bg-white rounded-full text-black">
          <Link href={"/login"}>Login</Link>
        </button>
      </div>
    </>
  );
}
