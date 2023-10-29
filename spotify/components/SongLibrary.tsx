"use client";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { TbPlaylist } from "react-icons/tb";
const SongLibrary = () => {
  function handleAdd() {}

  return (
    <div className="flex flex-col p-3">
      <div className="flex justify-between items-center">
        {/* <div> */}
        <div className="flex gap-3 ">
          <TbPlaylist
            size={20}
            className="text-neutral-400 hover:text-white transition-all"
          />
          <span className="text-sm text-neutral-300">Your Library</span>
        </div>
        <span>
          <AiOutlinePlus
            size={20}
            className="text-neutral-400 hover:text-white cursor-pointer transition-all"
          />
        </span>
      </div>
    </div>
  );
};

export default SongLibrary;
