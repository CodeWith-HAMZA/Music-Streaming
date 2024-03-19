"use client";
import { useAuth } from "@/app/context/AuthContext";
import {
  BUCKET_ID,
  DATABASE_ID,
  USERS_ID,
  databases,
  getUser,
  storage,
} from "@/appwrite";
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
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "sonner";
interface UserOnboarding {
  bio: string;
  country: string;
  day: string;
  displayName: string;
  genre: string;
  userName: string;
}

export default function OnboardingForm({ emails }: { emails: string[] }) {
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [day, setDay] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");
  const uid = useId();
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

  useEffect(() => {
    const isUserAlreadyOnborded = emails.find((email) => email === user?.email);
    console.log(user, emails);

    if (isUserAlreadyOnborded) {
      notFound();
    }
  }, [r, emails, user]);

  // Function to handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event?.target?.files[0];
    setSelectedImage({
      url: URL.createObjectURL(imageFile),
      file: imageFile,
    });
  };

  const onSubmit = async (data: UserOnboarding) => {
    const { bio, country, day, displayName, genre, userName } = data;

    if (!selectedImage?.file || !selectedImage?.url) {
      toast.error("Please select your profile image");
      return;
    }
    // Handle form submission logic here
    console.log(bio, displayName, day, userName, country, genre);
    const formData = {
      displayName,
      userName,
      bio,
      day,
      country,
      genre: genre.split(","),
      day,
    };

    setBusy(true);

    const profileUrl = await uploadImage(selectedImage?.file);
    console.log(profileUrl);
    const createdUser = await asyncErrorHandler(
      () =>
        databases.createDocument(DATABASE_ID, USERS_ID, ID.unique(), {
          userName,
          email: user?.email,
          profile: profileUrl,
          country,
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
    <div className="flex min-h-screen flex-col items-center bg-[#121212] py-12">
      <div className="w-full max-w-2xl rounded-lg bg-[#181818] p-8">
        <h1 className="font-bold text-5xl mb-2">Onboarding</h1>
        <h1 className="mb-1 text-3xl font-bold text-white">
          Complete Your <span className="text-green-500">Spotify</span> Profile
        </h1>
        <p className="mb-8 text-md font-semibold text-neutral-400">
          Hi!{" "}
          <span className="font-bold">
            {`"`}
            {user?.email}
            {`"`}
          </span>
          , kindly Help Us To Complete Your Profile
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid gap-6">
            <input
              className="hidden"
              type="file"
              id="profile"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="profile" className="flex justify-center">
              <img
                src={selectedImage.url || "/profile-image-placeholder.jpg"}
                alt="Selected"
                className="rounded-full w-40 h-40 hover:opacity-70"
              />
            </label>

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
                    value: 10,
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
                htmlFor="country"
              >
                Country or Region
              </label>
              <Select
                id="country"
                {...register("country", { required: "Select The Country" })}
                label="Select Country or Region"
              >
                {countries.map((_) => (
                  <SelectItem key={_}>{_}</SelectItem>
                ))}
              </Select>
              {errors?.country && (
                <ErrorMessage message={errors?.country.message} />
              )}{" "}
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-300"
                htmlFor="favorite-genre"
              >
                Favorite Genre
              </label>
              <Select
                id="country"
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
              className="hover:bg-opacity-70"
            >
              <span>Proceed</span>
              {!Busy && <MdKeyboardArrowRight size={21} />}
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
