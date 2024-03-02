import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'classes',
  initialState: {
    classes: null,
  },
  reducers: {
    setClasses: (state, { payload }) => {
      state.classes = payload;
    },
    clearClasses: (state) => {
      state.classes = null;
    },
  },
});

// Actions
export const { setClasses, clearClasses } =
  slice.actions;

export default slice.reducer;