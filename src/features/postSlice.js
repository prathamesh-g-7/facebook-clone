import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postInfo: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { postInfo } = userSlice.actions;

export const selectPosts = (state) => state.post.posts;

export default userSlice.reducer;
