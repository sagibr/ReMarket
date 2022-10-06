import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    email: "",
    accessToken: "",
    roles: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.accessToken = action.payload.accessToken;
      state.user.roles = action.payload.roles;
    },
    logout: (state) => {
      state.user.name = "";
      state.user.email = "";
      state.user.accessToken = "";
      state.user.roles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
