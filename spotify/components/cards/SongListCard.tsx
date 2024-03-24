"use client";
import { convertSecondsToMinutes } from "@/utils/helpers";
import { Song } from "@/utils/types";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function SongListCard({ song }: { song: Song }) {
  const [duration, setDuration] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAudioDuration = async () => {
      try {
        const audio = new Audio();
        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });
        audio.src = song.track;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAudioDuration();
  }, [song.track]);

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden">
            <audio ref={audioRef} src={song.track as string} />

            <img
              className="h-full w-full object-cover"
              src={song?.cover ?? ""}
              alt="Song cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium text-gray-900">
           {song.title}
            </div>
            <div className="text-sm font-light text-gray-500">Genre: ({song.genre})</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {typeof song.artist !== "string" ? song.artist.name : ""}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">Album 1</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {convertSecondsToMinutes(duration ?? 0)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-4">
          <Button
            color="success"
            onClick={() => (isPlaying ? handlePause() : handlePlay())}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button>Add To Playlist</Button>
          <Button variant="bordered">More</Button>
        </div>
      </td>
    </>
  );
}
