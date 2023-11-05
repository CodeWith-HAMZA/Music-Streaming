"use client";
import { MusicPlayerActions, MusicPlayerState } from "@/utils/types";
import { create } from "zustand";

const initialState: MusicPlayerState = {
  isPlaying: false,
  currentSong: null,
  playlist: [],
  progress: 0,
  currentTime: 0,
  volume: 0.3,
};
export type MusicPlayerStore = MusicPlayerState & MusicPlayerActions;

const useMusicPlayerStore = create<MusicPlayerStore>((set) => ({
  ...initialState,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setProgress: (progress) => set({ progress }),
  setCurrentSong: (givenSong) => set({ currentSong: givenSong }),
  setVolume: (volume) => set({ volume }), // Set the volume level

  addToPlaylist: (givenSong) =>
    set((state) => ({ playlist: [...state.playlist, givenSong] })),
  clearPlaylist: () => set({ playlist: [] }),

  setCurrentTime: (currentTime) => set({ currentTime }),
  forward: () =>
    set((state: MusicPlayerState & MusicPlayerActions) => {
      const currentIndex = state.playlist.findIndex(
        (song) => song === state.currentSong
      );
      const nextIndex = currentIndex + 1;
      const nextSong = state.playlist[nextIndex] ?? null;
      return {
        currentSong: nextSong,
        isPlaying: true,
      };
    }),
  backward: () =>
    set((state: MusicPlayerState & MusicPlayerActions) => {
      const currentIndex = state.playlist.findIndex(
        (song) => song === state.currentSong
      );
      const previousIndex = currentIndex - 1;
      const previousSong = state.playlist[previousIndex] ?? null;
      return {
        currentSong: previousSong,
        isPlaying: true,
      };
    }),
  setPlaylist: (givenPlaylist) => set({ playlist: givenPlaylist }),
}));
export default useMusicPlayerStore;
