"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authTypes";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    // update user, reset user, delete user
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, updateUser, resetUser, initUser } = authSlice.actions;
export default authSlice.reducer;
