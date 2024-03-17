"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { PauseCircleIcon } from "./PauseCircleIcon";
import { NextIcon } from "./NextIcon";
import { PreviousIcon } from "./PreviousIcon";
import { RepeatOneIcon } from "./RepeatOneIcon";
import { ShuffleIcon } from "./ShuffleIcon";
import useMusicPlayerStore from "@/store/useMusicPlayerStore";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { convertSecondsToMinutes } from "@/utils/helpers";
import { TbMusic } from "react-icons/tb";

export default function MusicPlayer() {
  const {
    isPlaying,
    currentSong,
    currentTime,
    playlist,
    volume,
    setVolume,
    play,
    pause,
    forward,
    backward,
    setCurrentSong,
    setCurrentTime,
  } = useMusicPlayerStore();
  const [liked, setLiked] = React.useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handlePlay = () => {
    if (isPlaying) {
      pause();
      audioRef.current?.pause();
    } else {
      play();
      audioRef.current?.play();
    }
    console.log(currentSong);
  };
  const handleForward = () => {
    forward();
  };
  const handleBackward = () => {
    backward();
  };
  const handleShuffle = () => {
    backward();
  };
  const handleRepeat = () => {
    backward();
  };

  function handleTimeUpdate(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
    setCurrentTime(e.currentTarget.currentTime);
  }
  const handleVolumeChange = (e) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    audioRef.current.volume = volumeValue;
  };

  useEffect(() => {
    setCurrentSong("u.mp3");
  }, []);

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    console.log(time);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  let progressBarPercentage =
      audioRef.current && (currentTime / audioRef.current?.duration) * 100,
    volumePercentage = Math.round(volume * 100);

  return (
    <div className="">
      <Card
        isBlurred
        className="fixed z-30 left-0 w-full bottom-0 "
        shadow="sm"
      >
        <audio
          id="musicPlayer"
          ref={audioRef}
          src={"/12.mp3"}
          className="border-2"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleForward}
        />
        <CardBody className="bg-neutral-900">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative hidden min-h-[23vh] md:block col-span-6 md:col-span-4 hover:opacity-80 cursor-pointer transition-all">
              <Image
                alt="Album cover"
                className={`object-cover w-32 ${isPlaying && "animate-pulse"}`}
                shadow="md"
                src="/m.jpg"
              />
              <TbMusic
                size={45}
                className={`bg-green-500 transition-all opacity-0 rounded-full p-2.5 ${
                  isPlaying && "animate-bounce opacity-0"
                }`}
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    Daily Mix
                  </h3>
                  <p className="text-small text-foreground/80">12 Tracks</p>
                  <h1 className="text-large font-medium mt-2">
                    Frontend Radio
                  </h1>
                </div>
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                  />
                </Button>
              </div>

              <div className="flex flex-col">
                <Progress
                  aria-label="Music progress"
                  classNames={{
                    indicator: "bg-blue-800 dark:bg-white ",
                    track: "bg-default-500/40",
                  }}
                  size="sm"
                  value={progressBarPercentage}
                />
                <input
                  type="range"
                  name="seekAudio"
                  className="relative -top-2.5 opacity-0 cursor-pointer"
                  id="seekAudioInput"
                  max={audioRef.current ? audioRef.current?.duration : 0}
                  value={currentTime}
                  onChange={handleSeek}
                />
                <div className="flex justify-between">
                  <p className="text-medium">
                    {convertSecondsToMinutes(currentTime)}
                  </p>
                  <p className="text-medium text-foreground/70">
                    {convertSecondsToMinutes(
                      Number(audioRef.current?.duration)
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <input
                  className="cursor-pointer"
                  type="range"
                  name="audioVolume"
                  id="seekVolumeInput"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                />
                <span className="text-xs ml-1">{volumePercentage}%</span>
              </div>

              <div className="flex w-full h-0 items-center justify-center">
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handleRepeat}
                >
                  <RepeatOneIcon className="text-foreground/80" />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handleBackward}
                >
                  <PreviousIcon />
                </Button>
                <Button
                  isIconOnly
                  className="w-auto h-auto data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handlePlay}
                >
                  {isPlaying ? (
                    <AiFillPauseCircle size={60} />
                  ) : (
                    <AiFillPlayCircle size={60} />
                  )}
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handleForward}
                >
                  <NextIcon />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handleShuffle}
                >
                  <ShuffleIcon className="text-foreground/80" />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
