import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { Album } from "@/utils/types";
import uploadImage from "@/utils/helpers";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { albums } from "@/appwrite/albums.service";
import { MdOutlineAlbum, MdOutlinePhotoAlbum } from "react-icons/md";

interface CreateAlbumFormProps {}

const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const { user, loading, onboardedUser } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [myAlbums, setmyAlbums] = useState<Album[] | []>([]);
  const artistId: string = onboardedUser?.$id ?? "";

  const onSubmit = async (data: any) => {
    const { title } = data;

    console.log(title, imageFile, imageUrl);

    try {
      setIsUploading(true);
      console.log(data);
      const url = await uploadImage(imageFile);
      const res = await albums.createAlbum({
        artist: onboardedUser?.$id as string,
        cover: url,
        releaseDate: new Date(),
        title: data.title,
        songs: [],
      });

      toast.success("Album created successfully");
      setImageUrl("");
      setImageFile(null);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading cover image:", error);
      toast.error("Error uploading cover image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file, "file");
    setImageFile(file);

    // Display the selected image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <form
      className="flex pt-10 flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-bold">Create An Album</h1>
      <div>
        <label htmlFor="title" className="text-gray-500">
          Title:
        </label>
        <Input
          {...register("title", { required: "Title is required" })}
          id="title"
        />
        {errors?.title && <ErrorMessage message={errors?.title.message} />}{" "}
      </div>
      <div>
        <label htmlFor="artist" className="text-gray-500">
          Artist:
        </label>
        <Input
          isDisabled
          value={user?.email + " (You)" ?? "loading..."}
          {...register("artist")}
          id="artist"
        />
        {errors?.artist && <ErrorMessage message={errors?.artist.message} />}{" "}
      </div>

      <div>
        <label htmlFor="coverFile">
          <p className="text-lg text-gray-500 font-semibold mb-2">Cover File</p>
          <Image
            alt="Cover file for your album"
            width={200}
            height={200}
            className="rounded-lg active:scale-95 hover:opacity-95 cursor-pointer"
            src={imageUrl || "/profile-image-placeholder.jpg"}
          />
        </label>
        <Input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="coverFile"
        />
      </div>
      <Button
        color="success"
        className="text-white"
        type="submit"
        isDisabled={isUploading}
      >
        {isUploading ? (
          <Spinner size="sm" />
        ) : (
          <p className="flex gap-2 items-center hover:bg-opacity-70">
            
            <span>Create Album</span> <MdOutlinePhotoAlbum />
          </p>
        )}
      </Button>
    </form>
  );
};

export default CreateAlbumForm;

export function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-600 text-sm px-2">{message}</p>;
}
