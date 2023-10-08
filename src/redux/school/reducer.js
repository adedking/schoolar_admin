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
  },
});

// Actions
export const { setSchools } = slice.actions;

export default slice.reducer;
