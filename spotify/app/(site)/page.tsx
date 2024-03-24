"use client";
import { ID, account, databases, getUser } from "@/appwrite";
import { albums } from "@/appwrite/albums.service";
import SongCard from "@/components/cards/SongCard";
import { Album, Theme } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
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
  const [Albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    albums.getAlbumsAll().then((albums) => {
      setAlbums(albums as Album[]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col h-[65vh]">
      <p className="text-xl p-4 font-bold"> Let`s Start Vibrating!</p>
      <div className="songs space-y-3">
        <div className="h-[1px]  rounded-full w-full bg-neutral-600" />
        <h2 className="font-bold text-2xl px-3">Popular Albums</h2>

        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3  
          xl:grid-cols-4 
          2xl:grid-cols-5 

          gap-3 overflow-y-auto"
        >
          {isLoading && (
            <>
              {[0, 0, 0, 0].map((_) => (
                <div key={_} className="relative mx-2 group py-4">
                  <div className="pb-0 pt-2  flex flex-col items-start">
                    <div className="text-tiny uppercase font-bold animate-pulse w-40 h-5 bg-neutral-700/70 rounded-md"></div>
                    <div className="text-tiny uppercase font-bold animate-pulse w-24 mt-1 h-4 bg-neutral-700/70 rounded-md"></div>
                    <div className="text-tiny uppercase font-bold animate-pulse w-32 mt-1 h-4 bg-neutral-700/70 rounded-md"></div>
                    <div className="text-tiny uppercase font-bold animate-pulse w-24 mt-1 h-4 bg-neutral-700/70 rounded-md"></div>
                  </div>
                  <div className="overflow-visible py-2">
                    <div className="object-cover rounded-xl w-full h-[240px] animate-pulse bg-neutral-700/70"></div>
                  </div>
                </div>
              ))}
            </>
          )}
          {Albums &&
            Albums?.map((album) => (
              <SongCard
                key={"song.id"}
                subtitle={
                  typeof album.artist !== "string" ? album.artist?.name : ""
                }
                album={album}
                title={album.title}
                trackCount={album.songs.length}
                imageSrc={album.cover}
                imageAlt={"No Cover For The Album"}
                imageWidth={"100%"}
              />
            ))}
        </div>
      </div>
      <div className="songs space-y-3 mt-12">
        <div className="h-[1px]  rounded-full w-full bg-neutral-600" />
        <h2 className="font-bold text-2xl px-3">Trending Playlists</h2>

        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3  
          xl:grid-cols-4 
          2xl:grid-cols-5 

          gap-3 overflow-y-auto"
        >
          {isLoading && (
            <>
              {[0, 0, 0, 0].map((_) => (
                <div key={_} className="relative mx-2 group py-4">
                  <div className="pb-0 pt-2  flex flex-col items-start">
                    <div className="text-tiny uppercase font-bold animate-pulse w-40 h-5 bg-neutral-700/70 rounded-md"></div>
                    <div className="text-tiny uppercase font-bold animate-pulse w-24 mt-1 h-4 bg-neutral-700/70 rounded-md"></div>
                    <div className="text-tiny uppercase font-bold animate-pulse w-32 mt-1 h-4 bg-neutral-700/70 rounded-md"></div>
                    <div className="text-tiny uppercase font-bold animate-pulse w-24 mt-1 h-4 bg-neutral-700/70 rounded-md"></div>
                  </div>
                  <div className="overflow-visible py-2">
                    <div className="object-cover rounded-xl w-full h-[240px] animate-pulse bg-neutral-700/70"></div>
                  </div>
                </div>
              ))}
            </>
          )}
          {Albums &&
            Albums?.map((album) => (
              <SongCard
                key={"song.id"}
                subtitle={
                  typeof album.artist !== "string" ? album.artist?.name : ""
                }
                title={album.title}
                trackCount={album.songs.length}
                imageSrc={album.cover}
                imageAlt={"No Cover For The Album"}
                imageWidth={"100%"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
