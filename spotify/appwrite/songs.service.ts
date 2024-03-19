import { asyncErrorHandler } from "@/utils/helpers";
import { DATABASE_ID, SONGS_ID, databases } from ".";
import { ID, Models } from "appwrite";

class Songs {
  constructor() {}

  async getSongs() {
    const songs = await databases.listDocuments(DATABASE_ID, SONGS_ID);
    return songs;
  }
  async createSong() {
    const songs = await databases.createDocument(
      DATABASE_ID,
      SONGS_ID,
      ID.unique(),
      {}
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
