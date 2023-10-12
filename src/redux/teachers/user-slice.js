import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    webToken: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setWebToken: (state, { payload }) => {
      state.webToken = payload;
    },
  },
});

// Actions
export const { logoutSuccess, setUser, clearUser, setToken, clearToken, setWebToken } =
  slice.actions;

export default slice.reducer;
