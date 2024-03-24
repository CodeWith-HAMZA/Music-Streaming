import { asyncErrorHandler } from "@/utils/helpers";
import { DATABASE_ID, SONGS_ID, databases } from ".";
import { ID, Models } from "appwrite";
import { Song } from "@/utils/types";
import { revalidatePath } from "next/cache";

class Songs {
  constructor() {}

  async getSongs() {
    const { documents }: { documents: Song[] } = await databases.listDocuments(
      DATABASE_ID,
      SONGS_ID
    );
    return documents as Song[];
  }
  async createSong(songData: Song, path: string) {
    const songs = await databases.createDocument(
      DATABASE_ID,
      SONGS_ID,
      ID.unique(),
      songData
    );
    return songs;
  }
  async deleteSong(songId: string) {
    const songs = await databases.deleteDocument(DATABASE_ID, SONGS_ID, songId);
    return songs;
  }
  async getSong(songId: string) {
    const songs = await databases.getDocument(DATABASE_ID, SONGS_ID, songId);
    return songs;
  }
}

export const songs = new Songs();
