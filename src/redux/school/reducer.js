import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'schools',
  initialState: {
    schools: null,
  },
  reducers: {
    setSchools: (state, { payload }) => {
      state.schools = payload;
    },

    clearSchools: (state, { payload }) => {
      state.schools = null;
    },
  },
});

// Actions
export const { setSchools, clearSchools } = slice.actions;

export default slice.reducer;
