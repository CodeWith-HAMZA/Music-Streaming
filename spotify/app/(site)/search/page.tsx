"use client";

import { Button, Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

export default function SearchPage() {
  return (
    <div className="overflow-y-scroll h-[65vh]">
      <div className="mt-4 mx-4">
        <div className="flex gap-3 items-center">
          <Input variant="faded" size="lg" placeholder="Search" type="search" />
          <Button variant="solid" color="success" size="lg">
            <FaSearch />
          </Button>
        </div>
        <div className="mt-8">
          <div dir="ltr" data-orientation="horizontal">
            <div className="flex space-x-4">
              <Button
                variant="flat"
                color="default"
                className="rounded-xl focus:bg-white focus:text-black"
              >
                All
              </Button>
              <Button
                variant="flat"
                color="default"
                className="rounded-xl focus:bg-white focus:text-black"
              >
                Songs
              </Button>
              <Button
                variant="flat"
                color="default"
                className="rounded-xl focus:bg-white focus:text-black"
              >
                Playlists
              </Button>
              <Button
                variant="flat"
                color="default"
                className="rounded-xl focus:bg-white focus:text-black"
              >
                Albums
              </Button>
              <Button
                variant="flat"
                color="default"
                className="rounded-xl focus:bg-white focus:text-black"
              >
                Genres &amp; Moods
              </Button>
              <Button
                variant="flat"
                color="default"
                className="rounded-xl focus:bg-white focus:text-black"
              >
                Artists
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Top result</h2>
            <div
              className="text-card-foreground mt-4 rounded-lg border border-[#575757] bg-[#181818] shadow-sm"
              data-v0-t="card"
            >
              <div className="flex items-center space-x-4 p-6">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Gasolina"
                    src="/placeholder.svg?height=72&amp;width=72"
                  />
                </span>
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-xl font-bold">Gasolina</h3>
                    <p className="text-sm text-[#b3b3b3]">
                      Song · Daddy Yankee
                    </p>
                  </div>
                  <Button color={"success"}>Play</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mx-4">
        <h2 className="mb-4 text-xl font-bold">Songs</h2>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"></span>
              <div>
                <h3 className="text-lg font-bold">Gasolina</h3>
                <p className="text-sm text-gray-400">Daddy Yankee</p>
              </div>
            </div>
            <span className="text-sm">3:12</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"></span>
              <div>
                <h3 className="text-lg font-bold">Gangsta's Paradise</h3>
                <p className="text-sm text-gray-400">Coolio, L.V.</p>
              </div>
            </div>
            <span className="text-sm">4:00</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Artists</h2>
          <div className="flex space-x-6">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt="Guru Randhawa"
                src="/placeholder.svg?height=64&amp;width=64"
              />
            </span>
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt="(G)I-DLE"
                src="/placeholder.svg?height=64&amp;width=64"
              />
            </span>
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt="Guns N' Roses"
                src="/placeholder.svg?height=64&amp;width=64"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
