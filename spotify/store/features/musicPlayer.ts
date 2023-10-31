import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface MusicPlayerState {
  isPlaying: boolean;
  currentSong: string | null;
  playlist: string[];
  progress: number;
}
const initialState: MusicPlayerState = {
  isPlaying: false,
  currentSong: null,
  playlist: [],
  progress: 0,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setCurrentSong: (state, action: PayloadAction<string>) => {
      state.currentSong = action.payload;
    },
    addToPlaylist: (state, action: PayloadAction<string>) => {
      state.playlist.push(action.payload);
    },
    clearPlaylist: (state) => {
      state.playlist = [];
    },
  },
});
export const {
  play,
  pause,
  setCurrentSong,
  addToPlaylist,
  clearPlaylist,
  setProgress,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
