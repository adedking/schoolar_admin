import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'teachers',
  initialState: {
    teacher: null,
  },
  reducers: {
    setTeacher: (state, { payload }) => {
      state.teacher = payload;
    },
    clearTeacher: (state) => {
      state.teacher = null;
    },
  },
});

// Actions
export const { setTeacher, clearTeacher } =
  slice.actions;

export default slice.reducer;
