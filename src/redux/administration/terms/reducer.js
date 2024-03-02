import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'students',
  initialState: {
    students: null,
  },
  reducers: {
    setStudents: (state, { payload }) => {
      state.students = payload;
    },
    clearStudents: (state) => {
      state.students = null;
    },
  },
});

// Actions
export const { setStudents, clearStudents } =
  slice.actions;

export default slice.reducer;

