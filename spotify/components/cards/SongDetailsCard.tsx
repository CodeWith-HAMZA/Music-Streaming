"use client";
import useMusicPlayerStore from "@/store/useMusicPlayerStore";
import { convertSecondsToMinutes } from "@/utils/helpers";
import { Song } from "@/utils/types";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

interface SongDetailsCardProps {
  song: Song;
  index: number;
  handleToggle: (index: number) => void;
  Playing: boolean;
}

const SongDetailsCard: React.FC<SongDetailsCardProps> = ({
  song,
  index,
  Playing,
  handleToggle,
}) => {
  const { play, pause, setCurrentSong, isPlaying } = useMusicPlayerStore();
  const [Duration, setDuration] = useState(0);
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
    <tr
      key={index}
      className="hover:bg-neutral-600 cursor-pointer bg-[state=selected] border-b transition-colors"
    >
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle font-medium">
        {index + 1}
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
        {song.title}
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
        {song.genre}
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
        {new Date().toLocaleDateString()}
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
        {convertSecondsToMinutes(Duration)}
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
        <Button
          onClick={async () => {
            // * toggling the local-state of Song-Details (Album-Details/Playlist-Details/ list of songs)
            await setCurrentSong(song.track);
            await handleToggle(index);
            if (isPlaying) {
              play();
            } else {
              pause();
            }
          }}
          isIconOnly
          className="p-0"
          radius="full"
          color="success"
        >
          {Playing ? <FaPauseCircle size={32} /> : <FaPlayCircle size={32} />}
        </Button>
      </td>
    </tr>
  );
};

export default SongDetailsCard;
