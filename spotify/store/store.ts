import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSlice from "./features/musicPlayer";

const store = configureStore({
  reducer: {
    [musicPlayerSlice.name]: musicPlayerSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
