import { BUCKET_ID, storage } from "@/appwrite";
import { AppwriteException, ID, Models } from "appwrite";
import { toast } from "sonner";

export function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}

export const isEmailValid = (email: string): boolean => {
  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Test the email against the regex and return true if it matches, false otherwise
  return emailRegex.test(email);
};

type AsyncFunction<T> = () => Promise<T>;

type AsyncErrorHandlerResult<T> = {
  data: T extends () => Promise<infer R> ? R : null;
  error: Error | null;
};

// Async error handler utility function
export const asyncErrorHandler = async <T extends AsyncFunction<any>>(
  asyncFunction: T,
  msg: string = ""
): Promise<AsyncErrorHandlerResult<T>> => {
  try {
    // Await the asynchronous function
    const data = await asyncFunction();
    if (msg) {
      toast.success(msg);
    }

    return { data, error: null }; // Return data with no error if the operation is successful
  } catch (error) {
    const err: AppwriteException = error as AppwriteException;
    console.log(err.message);
    toast.error(err.message);
    // if (error?.message as string) {
    //   toast.error(message || ("" as string));
    // }
    console.error("Error:", error); // Log the error to the console
    return { data: null, error }; // Return null data with the error if an error occurs
  }
};

export const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing data to localStorage:", error);
  }
};

export const getLocalStorageItem = <T>(
  key: string,
  defaultValue?: T
): T | undefined => {
  try {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : defaultValue;
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error);
    return defaultValue;
  }
};

// get current user from localstorage
export const getCurrentUser = (): Models.User<Models.Preferences> | null => {
  const user = getLocalStorageItem("user", null);

  return user || null;
};

export function generateRandomId(
  starterString: string,
  length: number = 12,
  endingString: string
): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    randomId += randomChar;
  }
  return starterString + randomId + endingString;
}

export async function uploadImage(image: any) {
  const {
    data: { $id: profileImageId },
  } = await asyncErrorHandler(async () => {
    // Perform the image upload operation
    const response = await storage.createFile(BUCKET_ID, ID.unique(), image);
    return response; // Return the response for destructuring
  });

  // Get the profile URL from the uploaded image ID
  const profileUrl: string = storage.getFileView(
    BUCKET_ID,
    profileImageId
  ).href;

  return profileUrl; // Return the profile URL
}

export default uploadImage;
