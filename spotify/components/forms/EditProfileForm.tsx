"use client";
import { useAuth } from "@/app/context/AuthContext";
import { DATABASE_ID, USERS_ID, databases } from "@/appwrite";
import { countries, genres } from "@/utils/constants";
import uploadImage, { asyncErrorHandler } from "@/utils/helpers";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { ID, Models } from "appwrite";
import { File } from "buffer";
import { redirect } from "next/dist/server/api-utils";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useId, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillProfile } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdCheck, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "sonner";
interface UserOnboarding {
  bio: string;
  day: string;
  displayName: string;
  genre: string;
  userName: string;
}

export default function EditProfileForm({ emails }: { emails: string[] }) {
  const r = useRouter();
  const { user, error, loading } = useAuth();
  const [selectedImage, setSelectedImage] = useState({
    url: "",
    file: FileList,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [Busy, setBusy] = useState(false);

  const onSubmit = async (data: UserOnboarding) => {
    const { bio, day, displayName, genre, userName } = data;

    // Handle form submission logic here
    console.log(bio, displayName, day, userName, genre);

    setBusy(true);
    const profileUrl = await uploadImage(selectedImage?.file);
    console.log(profileUrl);
    const createdUser = await asyncErrorHandler(
      () =>
        databases.createDocument(DATABASE_ID, USERS_ID, ID.unique(), {
          userName: userName,
          email: user?.email,
          profile: profileUrl,

          bio: bio,
          genres: genre.split(","),
          dob: day,
          name: displayName,
        }),
      "Successfully Completed The Profile!"
    );
    setBusy(false);
    console.log(createdUser);

    location.href = "/";
  };

  return (
    <div className="flex flex-col items-center  py-12">
      <div className="w-full max-w-2xl h-[44vh] rounded-lg bg-[#181818] p-8">
        <h1 className="font-bold text-5xl mb-2">Edit Info</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid gap-6">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="display-name"
              >
                Display Name
              </label>
              <Input
                {...register("displayName", {
                  required: "Your name is Required",
                  minLength: {
                    value: 3,
                    message: "Display Name must be at least 3 characters long",
                  },
                })}
                id="display-name"
                placeholder="Display Name"
              />

              {errors?.displayName && (
                <ErrorMessage message={errors?.displayName.message} />
              )}
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="username"
              >
                User Name (Your Handle)
              </label>
              <Input
                id="username"
                placeholder="User Name"
                {...register("userName", {
                  required: "Your user name handle is required",
                  minLength: {
                    value: 3,
                    message: "User Name must be at least 3 characters long",
                  },
                })}
              />
              {errors?.userName && (
                <ErrorMessage message={errors?.userName?.message} />
              )}
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                // contentEditable={false}
                disabled={true}
                variant="flat"
                id="email"
                placeholder={loading ? "loading..." : ""}
                value={loading ? "" : user?.email}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="bio"
              >
                Bio
              </label>
              <Textarea
                id="bio"
                {...register("bio", {
                  required: "Your Bio is required",
                  minLength: {
                    value: 6,
                    message: "First Name must be at least 6 characters long",
                  },

                  maxLength: {
                    value: 20,
                    message: "First Name must be at most 10 characters long",
                  },
                })}
                placeholder="Provide brief info. about yourself..."
              ></Textarea>
              {errors?.bio && <ErrorMessage message={errors?.bio.message} />}
            </div>
            <div>
              <label htmlFor="DOB" className="text-xs">
                Date of Birth
              </label>
              <Input
                {...register("day", { required: "Enter Date of birth" })}
                id="DOB"
                placeholder="Enter DOB"
                type="date"
              />

              {errors?.day && <ErrorMessage message={errors?.day.message} />}
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="favorite-genre"
              >
                Favorite Genre
              </label>
              <Select
                id="genres"
                {...register("genre", {
                  required: "Select Your Favourite genres",
                })}
                label="Select Favourite Genre"
                selectionMode="multiple"
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
            <Button
              type="submit"
              color="success"
              size={"lg"}
              className="w-1/3 transition-all hover:bg-opacity-70"
            >
              <span>Edit</span>
              {!Busy && <MdCheck size={21} />}
              {Busy && <Spinner size={"sm"} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-600 text-sm px-2">{message}</p>;
}
