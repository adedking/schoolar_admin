import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: null,
  },
  reducers: {
    setSubjects: (state, { payload }) => {
      state.subjects = payload;
    },
    clearSubjects: (state) => {
      state.subjects = null;
    },
  },
});

// Actions
export const { setSubjects, clearSubjects } =
  slice.actions;

export default slice.reducer;