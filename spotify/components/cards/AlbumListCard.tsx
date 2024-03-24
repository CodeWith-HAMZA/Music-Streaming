import { Album } from "@/utils/types";
import { Button } from "@nextui-org/react";
import React from "react";

export default function AlbumListCard({ album }: { album: Album }) {
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap w-full">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={album.cover}
              alt="Album cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium text-gray-900">
              {album.title}
            </div>
            <div className="text-sm font-light text-gray-500">
              <p>({typeof album.artist !== "string" && album.artist?.email})</p>
              <p>{typeof album.artist !== "string" && album.artist?.name}</p>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {album.releaseDate.toLocaleString()}
      </td>
      <td className="px-6 space-x-2 py-4 whitespace-nowrap">
        <Button>Add Song</Button>
        <Button variant="bordered">Edit</Button>
        <Button variant="flat" color="danger">
          Delete
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap"></td>
      <td className="px-6 py-4 whitespace-nowrap"></td>
    </>
  );
}
