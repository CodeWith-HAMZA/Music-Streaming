"use client";
import Box from "@/components/Box";
import Header from "@/components/Header";
import { Theme } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHome, AiFillPlayCircle, AiOutlineSearch } from "react-icons/ai";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

export default function Home() {
  const router = useRouter();
  let themeColor: Theme = "teal";
  return (
    <Box className="px-3">
      <Header
        className={`flex justify-between bg-gradient-to-b rounded-lg from-${themeColor}-800 p-2 to-neutral-900 h-[4rem]`}
      >
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-5 "
        >
          <div className="group transition cursor-pointer bg-neutral-600/60 hover:bg-neutral-600/80 rounded-md p-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold group-hover:font-bold">
                Liked Musics
              </p>
              <AiFillPlayCircle
                className={`opacity-30 group-hover:opacity-80 hover:scale-125 hover:text-teal-500 text-white transition-all group-hover:animate-pulse`}
                size={28}
              />
            </div>
          </div>
        </div>
      </Header>
    </Box>
  );
}