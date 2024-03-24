import React from "react";
import AlbumDetails from "./AlbumDetails";
import { PageProps } from "@/.next/types/app/(site)/albums/[id]/page";

export default function AlbumDetailsPage({ searchParams, params }: PageProps) {
  const albumId = params?.id;

  return <AlbumDetails albumId={albumId} />;
}
