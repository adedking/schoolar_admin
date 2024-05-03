import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'parents',
  initialState: {
    parent: null,
  },
  reducers: {
    setParent: (state, { payload }) => {
      state.parent = payload;
    },
    clearParent: (state) => {
      state.parent = null;
    },
  },
});

// Actions
export const { setParent, clearParent } =
  slice.actions;

export default slice.reducer;

