import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'attendance_registers',
  initialState: {
    class_register: null,
  },
  reducers: {
    setClassRegister: (state, { payload }) => {
      state.class_register = payload;
    },
    clearClassRegister: (state) => {
      state.class_register = null;
    },
  },
});

// Actions
export const { setClassRegister, clearClassRegister } =
  slice.actions;

export default slice.reducer;

