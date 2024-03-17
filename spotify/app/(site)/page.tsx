"use client";
import { ID, account, databases, getUser } from "@/appwrite";
import Box from "@/components/Box";
import Header from "@/components/Header";
import SongCard from "@/components/cards/SongCard";
import { Theme } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHome, AiFillPlayCircle, AiOutlineSearch } from "react-icons/ai";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
const songCardData = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  title: "Frontend Radio",
  subtitle: "Daily Mix",
  trackCount: 12,
  imageSrc: "/m.jpg",
  imageAlt: "Card background",
  imageWidth: "100%",
}));
export default function Home() {
  const router = useRouter();
  let themeColor: Theme = "teal";
  const likedSongs = false && (
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
  );

  return (
    <>
      <button
        onClick={async () => {
          const songs = await databases.listDocuments(
            "65eb368805097fdd4540",
            "65eb36d94a3584eac3f3"
          );
          console.log(songs);
        }}
      >
        shaddu
      </button>
      <div className="">
        <p className="text-xl p-4 font-bold"> Let`s Start Vibrating!</p>
      </div>
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-5 gap-3 overflow-y-auto"
      >
        {songCardData.map((song) => (
          <SongCard
            key={song.id}
            title={song.title}
            subtitle={song.subtitle}
            trackCount={song.trackCount}
            imageSrc={song.imageSrc}
            imageAlt={song.imageAlt}
            imageWidth={song.imageWidth}
          />
        ))}
      </div>
    </>
  );
}
