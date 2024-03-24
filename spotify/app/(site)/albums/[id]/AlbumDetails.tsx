import { albums } from "@/appwrite/albums.service";
import { playlists } from "@/appwrite/playlists.service";
import SongDetails from "@/components/SongDetails";
import { Album } from "@/utils/types";
import React, { useEffect } from "react";

interface Props {
  albumId: string;
}
export default async function AlbumDetails({ albumId }: Props) {
  const album: Album = await albums.getAlbumDetails(albumId);

  return <SongDetails album={album as Album} forAlbum={true} />;
}
