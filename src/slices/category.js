import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  category: [],
  loading: false,
}

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setCategory(state, value) {
      state.category = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setCategory, setLoading } = categorySlice.actions;

export default categorySlice.reducer;
