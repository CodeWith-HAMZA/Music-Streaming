"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@nextui-org/react";
import { RxReload } from "react-icons/rx";
import { albums as albumsService } from "@/appwrite/albums.service";
import AlbumListCard from "@/components/cards/AlbumListCard";
import { Album } from "@/utils/types";
import { useAuth } from "@/app/context/AuthContext";

export default function Albums() {
  const dummyAlbums: Album[] = [
    {
      $id: "1",
      title: "Album 1",
      releaseDate: new Date("2022-01-01"),
      artist: "Artist 1",
      cover: "album1.jpg",
      songs: [],
    },
    {
      $id: "2",
      title: "Album 2",
      releaseDate: new Date("2022-02-01"),
      artist: "Artist 2",
      cover: "album2.jpg",
      songs: [],
    },
    {
      $id: "3",
      title: "Album 3",
      releaseDate: new Date("2022-03-01"),
      artist: "Artist 3",
      cover: "album3.jpg",
      songs: [],
    },
  ];
  const [albums, setAlbums] = useState<Album[]>([...dummyAlbums]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, onboardedUser, loading } = useAuth();
  const router = useRouter();
  const artistId = onboardedUser?.$id;
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // setIsLoading(true);
        const albumsData = await albumsService.getAlbumsForUser(artistId);
        console.log(albumsData);
        setIsLoading(false);
        setAlbums(albumsData);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, [artistId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Artist
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Release Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
            <th className="px-6 py-3 tracking-wider">
              <Button
                radius="full"
                isIconOnly
                onClick={() => router.reload()}
                className="px-0"
              >
                <RxReload />
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 w-full">
          {isLoading ? (
            <>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap w-full">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden animate-pulse bg-gray-200"></div>
                    <div className="ml-4 space-y-2">
                      <div className="text-lg font-medium text-gray-900 animate-pulse bg-gray-200 w-36 h-6"></div>
                      <div className="text-sm font-light space-y-2 text-gray-500">
                        <p className="animate-pulse bg-gray-200 w-24 h-4"></p>
                        <p className="animate-pulse bg-gray-200 w-16 h-4"></p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="animate-pulse bg-gray-200 w-24 h-4"></p>
                </td>
                <td className="px-6 flex items-center  gap-5 space-x-2 py-4 whitespace-nowrap">
                  <div className="w-20 h-10 rounded-md animate-pulse bg-gray-200"></div>
                  <div className="w-20 h-10 rounded-md animate-pulse bg-gray-200"></div>
                  <div className="w-20 h-10 rounded-md animate-pulse bg-gray-200"></div>
                </td>
              </tr>
            </>
          ) : (
            <>
              {albums &&
                albums?.map((album, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 transition-colors w  ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <AlbumListCard key={index} album={album} />
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
