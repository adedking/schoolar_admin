import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'timeTable',
  initialState: {
    timeTable: null,
  },
  reducers: {
    setTimeTable: (state, { payload }) => {
      state.students = payload;
    },
    clearTimeTable: (state) => {
      state.students = null;
    },
  },
});

// Actions
export const { setTimeTable, clearTimeTable } =
  slice.actions;

export default slice.reducer;

