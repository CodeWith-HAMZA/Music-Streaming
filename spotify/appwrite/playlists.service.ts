import { asyncErrorHandler } from "@/utils/helpers";
import { DATABASE_ID, PLAYLISTS_ID, SONGS_ID, databases } from ".";
import { ID, Models, Query } from "appwrite";

function catchError<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  const methodName = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = target.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  }

  return replacementMethod;
}

class Playlists {
  constructor() {}

  @catchError
  async createPlaylist(params: object) {
    const response = await databases.createDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      ID.unique(),
      {}
    );
    return response;
  }

  @catchError
  async getPlaylists() {
    const response = await databases.listDocuments(DATABASE_ID, PLAYLISTS_ID);
    return response;
  }
  @catchError
  async deletePlaylist(playlistId: string) {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId
    );
    return response;
  }
  @catchError
  async addSongToPlaylist(playlistId: string, songId: string) {
    // get single Playlist
    const playlist = await databases.getDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId
    );

    const response = await databases.createDocument(
      DATABASE_ID,
      SONGS_ID,
      ID.unique(),
      {
        playlistId,
        songs: [...playlist?.songs, songId],
      }
    );
    return response;
  }

  @catchError
  async removeSongFromPlaylist(playlistId: string, songId: string) {
    const playlist = await databases.getDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId
    );
    const songs = playlist?.songs.filter((song: string) => song !== songId);
    const response = await databases.updateDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId,
      { songs }
    );
    return response;
  }

  @catchError
  async getPlaylist(playlistId: string) {
    const response = await databases.getDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId
    );
    return response;
  }

  // change playlist name

  @catchError
  async changePlaylistName(
    playlistId: string,
    title: string,
    description: string
  ) {
    if (typeof title !== "string" || typeof description !== "string")
      throw new Error("Invalid data type");

    if (title.length === 0 && description.length === 0)
      throw new Error("Title and description cannot be empty");

    if (title.length > 25)
      throw new Error("Title cannot be longer than 25 characters");

    const response = await databases.updateDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId,
      {
        ...(title.length !== 0 && { title }),
        ...(description.length !== 0 && { description }),
      }
    );
    return response;
  }

  @catchError
  async changePlaylistCover(playlistId: string, cover: string) {
    const response = await databases.updateDocument(
      DATABASE_ID,
      PLAYLISTS_ID,
      playlistId,
      { cover }
    );
    return response;
  }
}

export const playlists = new Playlists();

 