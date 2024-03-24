import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { TbPlaystationCircle } from "react-icons/tb";
import { AiFillPlayCircle } from "react-icons/ai";
import Link from "next/link";
import { Album, Playlist } from "@/utils/types";

interface SongCardProps {
  title: string;
  subtitle: string;
  trackCount: number;
  imageSrc: string;
  imageAlt: string;
  imageWidth: string;
  isArtist: boolean;
  album?: Album;
  playlist?: Playlist;
}

const SongCard: React.FC<SongCardProps> = ({
  title,
  subtitle,
  trackCount,
  imageSrc,
  imageAlt,
  imageWidth,
  isArtist,
  album,
  playlist,
}) => {
  return (
    <Link
      href={
        album
          ? "/albums/" + album.$id
          : playlist
          ? "/playlists/" + playlist?.$id
          : ""
      }
    >
      <Card className="relative group py-4 cursor-pointer hover:bg-slate-500/30">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{subtitle}</p>
          <small className="text-default-500">{trackCount} Tracks</small>
          <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt={imageAlt}
            className="object-cover rounded-xl"
            src={imageSrc}
            width={imageWidth}
          />
        </CardBody>
        <div className="absolute group-hover:opacity-100 opacity-0 group-hover:bottom-14 z-10 right-6 bottom-12 transition-all group-hover:scale-105 scale-100">
          <button className="">
            <AiFillPlayCircle
              size={80}
              className="text-green-600 hover:scale-125 hover:text-green-700 shadow-lg bg-gray-200 rounded-full transition-all"
            />
          </button>
        </div>
      </Card>
    </Link>
  );
};

export default SongCard;
