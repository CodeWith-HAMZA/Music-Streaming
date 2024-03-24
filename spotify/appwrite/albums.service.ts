import { asyncErrorHandler } from "@/utils/helpers";
import { ALBUMS_ID, DATABASE_ID, SONGS_ID, databases } from ".";
import { ID, Models } from "appwrite";
import { Album, Song } from "@/utils/types";

class Albums {
  constructor() {}

  async getAlbumsForUser(userId: string) {
    const albums = await databases.listDocuments(DATABASE_ID, ALBUMS_ID);
    const userAlbums: Album[] = albums.documents.filter((album: Album) => {
      if (typeof album.artist !== "string") return album.artist.$id === userId;
      return false;
    });

    return userAlbums as Album[];
  }
  async editAlbumById(albumId: string, albumData: Album) {
    const albums = await databases.updateDocument(
      DATABASE_ID,
      ALBUMS_ID,
      albumId,
      albumData
    );
    return albums;
  }

  async addSongToAlbum(albumId: string, songId: string) {
    const album = await databases.getDocument(DATABASE_ID, ALBUMS_ID, albumId);
    if (!album) throw new Error("Album not found");
    const songs = album.songs as string[];
    songs.push(songId);

    const updatedAlbum = await this.editAlbumById(albumId, { songs });
    return updatedAlbum;
  }

  async getAlbumsAll() {
    const albums = await databases.listDocuments(DATABASE_ID, ALBUMS_ID);
    return albums.documents;
  }
  async createAlbum(albumData: Album) {
    const albums = await databases.createDocument(
      DATABASE_ID,
      ALBUMS_ID,
      ID.unique(),
      albumData
    );
    return albums;
  }
  async deleteAlbum(albumId: string) {
    const albums = await databases.deleteDocument(
      DATABASE_ID,
      ALBUMS_ID,
      albumId
    );
    return albums;
  }
  async getAlbumDetails(albumId: string) {
    const album = await databases.getDocument(DATABASE_ID, ALBUMS_ID, albumId);
    return album;
  }
}

export const albums = new Albums();
