import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isCollapsed:true
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    
    setIsCollapsed(state, value){
      state.isCollapsed = value.payload
    }
  },
});

export const { setIsCollapsed } = sidebarSlice.actions;

export default sidebarSlice.reducer;