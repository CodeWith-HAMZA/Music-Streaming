"use client";

import supabaseClient from "@/supabase";
import React, { useState, useRef, useEffect } from "react";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState("/12.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [Duration, setDuration] = useState(0);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const backward = () => {
    // Move to the previous track or adjust current time
    // Example: Get the index of the current track and subtract 1
    // from the index to get the index of the previous track
    // Set the new current track and reset the current time
    // Example:
    // const currentIndex = tracks.indexOf(currentTrack);
    // const previousTrack = tracks[currentIndex - 1];
    // setCurrentTrack(previousTrack);
    // setCurrentTime(0);
  };

  const forward = () => {
    // Move to the next track or adjust current time
    // Example: Get the index of the current track and add 1
    // to the index to get the index of the next track
    // Set the new current track and reset the current time
    // Example:
    // const currentIndex = tracks.indexOf(currentTrack);
    // const nextTrack = tracks[currentIndex + 1];
    // setCurrentTrack(nextTrack);
    // setCurrentTime(0);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    console.log(time, "time e.target.value");
    console.log(audioRef.current.currentTime, "audio ref");

    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    audioRef.current.volume = volumeValue;
  };

  async function getWah() {
    const { data } = await await supabaseClient.from("Wah").select("*");
    console.log(data);
  }
  useEffect(() => {
    getWah().then((res) => res);
    setDuration(audioRef.current?.duration);
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <audio
        ref={audioRef}
        src={currentTrack}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onEnded={forward}
      >
        Your browser does not support the audio element.
      </audio>
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={backward}
        >
          Backward
        </button>
        {isPlaying ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            onClick={pause}
          >
            Pause
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={play}
          >
            Play
          </button>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={forward}
        >
          Forward
        </button>
      </div>
      <div className="relative mt-4">
        <div className="h-1 hover:h-2 transition-all bg-gray-300 group rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{
              width: `${(currentTime / audioRef.current?.duration) * 100}%`,
            }}
          />
          <input
            type="range"
            min={0}
            max={audioRef.current ? audioRef.current?.duration : 0}
            value={currentTime}
            onChange={handleSeek}
            className="absolute bg-red-500 top-0 left-0 w-full h-full opacity-60 cursor-pointer"
          />
        </div>
      </div>
      <div className="text-black">
        {parseInt(currentTime)},{Duration}{" "}
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        className="w-full mt-4"
      />
    </div>
  );
};

export default MusicPlayer;
