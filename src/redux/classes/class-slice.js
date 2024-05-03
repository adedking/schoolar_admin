import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'classes',
  initialState: {
    sub_class: null,
  },
  reducers: {
    setClasses: (state, { payload }) => {
      state.sub_class = payload;
    },
    clearClasses: (state) => {
      state.sub_class = null;
    },
  },
});

// Actions
export const { setClass, clearClass } =
  slice.actions;

export default slice.reducer;