"use client";
import { songs as songsService } from "@/appwrite/songs.service";
import SongListCard from "@/components/cards/SongListCard";
import { Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { RxReload } from "react-icons/rx";

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const songsData = await songsService.getSongs();
        console.log("songsData", songsData);
        setSongs(songsData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          {/* {<SongListCard />} */}
          <tr>
            <th
              scope="col"
              className="px-6 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"
            >
              Artist
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"
            >
              Album
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"
            >
              Duration
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>
            <th scope="col" className="px-6 py-3 tracking-wider">
              <Button
                radius="full"
                isIconOnly
                onClick={() => {
                  startTransition(() => {
                    router.refresh();
                  });
                }}
                className="px-0"
              >
                <RxReload />
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {songs &&
            songs?.map((song, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition-colors ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <SongListCard song={song} key={index} />
              </tr>
            ))}

          {isLoading && (
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
          )}
        </tbody>
      </table>
    </div>
  );
}
