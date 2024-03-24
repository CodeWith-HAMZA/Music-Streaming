export type Theme = "teal" | "blue" | "red";

export interface MusicPlayerState {
  isPlaying: boolean;
  currentSong: string | null;
  playlist: Playlist[];
  progress: number;
  currentTime: number;
  volume: number;
}
export interface MusicPlayerActions {
  play: () => void;
  pause: () => void;
  setProgress: (progress: number) => void;
  setCurrentSong: (song: string) => void;
  addToPlaylist: (song: string) => void;
  clearPlaylist: () => void;
  setCurrentTime: (currentTime: number) => void;
  forward: () => void;
  backward: () => void;
  setPlaylist: (playlist: string[]) => void;
  setVolume: (volume: number) => void; // Set the volume level
}

// * Entities/Schemas/Models Of The Core Building-Blocks Of The App
export interface User {
  $id: string;
  email: string;
  isArtist: false;
  profile: string;
  dob?: Date;
  genres?: string[];
  userName?: string;
  name?: string;
  country?: string;
  bio?: string;
}
export interface Artist extends Omit<User, "isArtist"> {
  isArtist: true;
}

export interface Song {
  $id?: string;
  title: string;
  genre: string;
  artist: Artist | string; // Assuming there is an Artist interface defined
  playlists: string[] | Playlist[];
  albums: string[] | Album[];
  track: string;
  cover: string;
  isPublished: boolean;
  Song?: number;
}

export interface Playlist {
  $id?: string;
  user: User | string; // Assuming there is a User interface defined
  title: string;
  description: string;
  songs: Song[]; // Assuming there is a Song interface defined
  cover: string;
}

export interface Album {
  readonly $id?: string;
  title: string;
  releaseDate: Date | number;
  artist: Artist | string; // Assuming there is an Artist interface defined
  cover: string;
  songs: Song[]; // Assuming there is a Song interface defined
}
