import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'subject',
  initialState: {
    subject: null,
  },
  reducers: {
    setSubject: (state, { payload }) => {
      state.subject = payload;
    },
    clearSubject: (state) => {
      state.subject = null;
    },
  },
});

// Actions
export const { setSubject, clearSubject } =
  slice.actions;

export default slice.reducer;