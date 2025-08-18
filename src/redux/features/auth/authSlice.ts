import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      // console.log("user and token", user, token);
      state.user = user;
      state.token = token;
      // console.log("Action from Auth Slice:", action);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    getUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, logout, getUser } = authSlice.actions;
export default authSlice.reducer;

export const userCurrentToken = (state: RootState) => state.auth.token;
export const userCurrentUser = (state: RootState) => state.auth.user;
