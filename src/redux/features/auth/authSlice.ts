import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Types
interface User {
  id?: string;
  name?: string;
  email?: string;
  // add other user fields here
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// ✅ Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

// ✅ Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      console.log("Action from Auth Slice:", action);
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

// ✅ Exports
export const { setUser, logout, getUser } = authSlice.actions;
export default authSlice.reducer;

// ✅ Selectors
export const userCurrentToken = (state: RootState) => state.auth.token;
export const userCurrentUser = (state: RootState) => state.auth.user;
