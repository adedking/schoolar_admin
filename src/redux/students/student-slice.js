import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'students',
  initialState: {
    student: null,
  },
  reducers: {
    setStudent: (state, { payload }) => {
      state.student = payload;
    },
    clearStudent: (state) => {
      state.student = null;
    },
  },
});

// Actions
export const { setStudent, clearStudent } =
  slice.actions;

export default slice.reducer;

