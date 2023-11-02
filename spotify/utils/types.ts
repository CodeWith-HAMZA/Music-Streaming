export type Theme = "teal" | "blue" | "red";

export interface MusicPlayerState {
  isPlaying: boolean;
  currentSong: string | object | null;
  playlist: string[] | object[];
  progress: number;
  currentTime: number;
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
}
export interface Song {
  author: string | null;
  created_at: string;
  id: number;
  image_path: string | null;
  song_path: string | null;
  title: string | null;
  user_id: string | null;
}

export interface LikedSongs {
  created_at: string;
  id: number;
  song_id: number | null;
  user_id: string | null;
}

interface User {
  Row: {
    avatar_url: string | null;
    billing_address: object | null;
    full_name: string | null;
    id: string;
    payment_method: object | null;
  };
}
