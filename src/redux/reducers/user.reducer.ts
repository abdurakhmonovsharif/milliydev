import { createSlice } from "@reduxjs/toolkit";

const initialState: { auth: boolean; user: User | null } = {
  auth: true,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.auth = action.payload.auth;
      state.user = action.payload.user
    },
    clearUser: () => {
      return { user: null, auth: false };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
