import { Account, Client, Databases, ID, Models, Storage } from "appwrite";
import { toast } from "sonner";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65eb2b872d801d660e60");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
export { account, databases, storage, ID };

// auth user in appwrite
export async function logoutUser() {
  await account.deleteSession("current");
  toast.success("Logout Successfully");
}
export async function getUser() {
  const user = await account.get();
  // const userSession = await account.getSession(user.$id);
  return { user };
}
export async function loginUser(
  email: string,
  password: string
): Promise<Models.Session> {
  const ses = await account.createEmailSession(email, password);
  return ses;
}
export async function registerUser(email: string, password: string) {
  await account.create(ID.unique(), email, password, email);
  return await loginUser(email, password);
}

// * app-write required ids
export const BUCKET_ID = "65edadcd999415a83476";
export const SONGS_ID = "65eb36d94a3584eac3f3";
export const USERS_ID = "65eb36a509f06d1784c7";
export const DATABASE_ID = "65eb368805097fdd4540";
export const PLAYLISTS_ID = "65eb36e3519440ec648b";
export const ALBUMS_ID = "65eb36e6f3f45884fbf2";
