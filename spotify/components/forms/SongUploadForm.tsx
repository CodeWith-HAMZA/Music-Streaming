"use client";
import { use, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Avatar, Chip } from "@nextui-org/react";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { MdCheck } from "react-icons/md";

import { genres } from "@/utils/constants";
import { Album, Song } from "@/utils/types";
import Image from "next/image";
import uploadImage from "@/utils/helpers";
import { toast } from "sonner";
import { songs } from "@/appwrite/songs.service";
import { useAuth } from "@/app/context/AuthContext";
import { albums as albumsService } from "@/appwrite/albums.service";
import { usePathname, useRouter } from "next/navigation";

interface SongUpload {
  title: string;
  genre: string;
  file?: FileList;
  albums: Album[];
}

export default function UploadSongForm() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const r = useRouter();
  const [isPending, startTransition] = useTransition();

  // Dummy users array
  const users = [
    {
      id: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "avatar1.jpg",
    },
    {
      id: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "avatar2.jpg",
    },
  ];

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user, onboardedUser } = useAuth();
  const [Albums, setAlbums] = useState<Album[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isUploading, setIsUploading] = useState(false);
  const pathname = usePathname();

  const onSubmit = async (data: SongUpload) => {
    // console.log(data.albums?.split(","));
    if (!audioFile || !imageFile) {
      toast.error("Please select both audio and image files");
      return;
    }

    // @ts-ignore
    if (audioFile?.type !== "audio/mpeg" && audioFile?.type !== "audio/mp3") {
      toast.error("Please select a valid audio file (.mp3 or .mpeg)");
      return;
    }

    // @ts-ignore
    if (imageFile?.type !== "image/jpeg" && imageFile?.type !== "image/png") {
      toast.error("Please select a valid image file (.jpeg or .png)");
      return;
    }

    const { title, genre, albums } = data;
    // const myAlbums = albums?.split(",") ?? [];
    console.log(albums);

    console.log(title, genre, audioFile, imageFile);

    setIsUploading(true);
    try {
      const [uploadedAudioUrl, uploadedImageUrl] = await Promise.all([
        uploadImage(audioFile),
        uploadImage(imageFile),
      ]);
      setIsUploading(false);
      // r.refresh();
      const res = await songs.createSong(
        {
          title,
          genre,
          artist: onboardedUser?.$id ?? "",
          cover: uploadedImageUrl ?? ("" as string),
          track: uploadedAudioUrl ?? ("" as string),
          // albums: typeof myAlbums === "string" ? myAlbums?.split(",") : myAlbums,
          albums: [],
          playlists: [],
          isPublished: false,
        },
        pathname
      );
      startTransition(() => {
        r.refresh();
      });

      // myAlbums.map(async (album) => {
      //   console.log(album);
      //   await albumsService.addSongToAlbum(album as string, res.$id);
      // });

      toast.success("Song uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsUploading(false);
      toast.error("Error uploading files");
    }

    // Handle successful upload or navigate to another page
    // console.log("Uploaded song:", uploadedSong);
  };
  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);

    // Display the selected audio file name
    setAudioUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Display the selected image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    albumsService
      .getAlbumsForUser(onboardedUser?.$id ?? "")
      .then((myAlbums) => {
        console.log(myAlbums);
        setAlbums(myAlbums);
      });
  }, [onboardedUser]);

  return (
    <main className="flex flex-col items-center py-12">
      <div className="w-full   max-w-2xl rounded-lg p-8">
        <h1 className="font-bold text-5xl mb-2">Upload Song</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid gap-6">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-500"
              >
                Title
              </label>
              <Input
                variant="faded"
                {...register("title", {
                  required: "Title is required",
                })}
                id="title"
                placeholder="Enter title"
              />
              {errors?.title && (
                <ErrorMessage message={errors?.title.message} />
              )}
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="favorite-genre"
              >
                Favorite Genre
              </label>
              <Select
                variant="faded"
                id="country"
                {...register("genre", {
                  required: "Select Your Favourite genres",
                })}
                label="Select Favourite Genre"
              >
                {genres.map((_) => (
                  <SelectItem key={_}>{_}</SelectItem>
                ))}
              </Select>
              {errors?.genre && (
                <ErrorMessage message={errors?.genre.message} />
              )}{" "}
              <p className="text-xs mt-1 px-2 text-gray-400">
                Select multiple genres if you have more than one.
              </p>{" "}
              <p className="text-xs px-2 text-gray-400">
                Selecting multiple genres will help us to find you the right{" "}
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-400 text-lg">
                Cover Image
              </span>
              <label htmlFor="imageFile">
                <Image
                  src={imageUrl || "/profile-image-placeholder.jpg"}
                  alt="Selected"
                  width={200}
                  height={200}
                  className="w-40 rounded-lg active:scale-95 cursor-pointer transition-all hover:opacity-80 h-40"
                />
              </label>
              <Input
                className="hidden"
                type="file"
                id="imageFile"
                variant="faded"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <span className="font-semibold text-neutral-400 text-lg">
                Your Track
              </span>
              <label htmlFor="audioFile">
                {!audioFile && (
                  <Image
                    src={"/music-placeholder-image.png"}
                    alt="Selected"
                    width={200}
                    height={200}
                    className="w-40 rounded-lg active:scale-95 cursor-pointer transition-all hover:opacity-80 h-40"
                  />
                )}
              </label>
              <Input
                className="hidden"
                type="file"
                id="audioFile"
                variant="faded"
                accept="*"
                onChange={handleAudioFileChange}
              />
              {audioUrl && (
                <div className="w-full">
                  <audio controls className="w-full">
                    <source src={audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
            <Select
              {...register("albums")}
              items={[...Albums]}
              label="Select Albums For The Song"
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Select Albums"
              labelPlacement="inside"
              classNames={{
                base: "max-w-4xl",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(items) => {
                return (
                  <div className="flex  flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip key={item.key} className="border-2 shadow-sm">
                        {item.data?.title}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(alb) => (
                <SelectItem key={alb.$id} textValue={alb.title}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={alb.title}
                      className="flex-shrink-0"
                      size="sm"
                      src={alb.cover}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{alb.title}</span>
                      <span className="text-tiny text-default-400">
                        {alb.releaseDate.toString()}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
            {errors?.albums && (
              <p className="-mt-5">
                {" "}
                <ErrorMessage message={errors?.albums.message} />{" "}
              </p>
            )}{" "}
            <Button
              type="submit"
              color="success"
              size="md"
              className="w-full text-white transition-all hover:bg-opacity-70"
              isDisabled={isUploading}
            >
              Publish Now
              {!isUploading && <MdCheck size={21} />}
              {isUploading && <Spinner size="sm" />}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-600 text-sm px-2">{message}</p>;
}
