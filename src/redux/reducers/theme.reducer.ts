import { createSlice } from "@reduxjs/toolkit";

const initialState: { dark:boolean } = {
    dark:false
};

const themeSlice = createSlice({ 
  name: "theme",
  initialState,
  reducers: {
    setDark: (state, action) => {
      state.dark = action.payload;
    },
  },
});

export const { setDark } = themeSlice.actions;
export default themeSlice.reducer;
