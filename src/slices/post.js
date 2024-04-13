import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPost:null,
  post: [],
  loading: false,
  thumbnail:null
}

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setCurrentPost(state, value) {
      state.currentPost = value.payload
    },
    setPost(state, value) {
      state.post = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
    setThumbnail(state, value) {
      state.thumbnail = value.payload
    },
  },
})

export const { setPost, setLoading, setCurrentPost, setThumbnail } = postSlice.actions;

export default postSlice.reducer;
