import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'transport-routes',
  initialState: {
    transportRoutes: null,
  },
  reducers: {
    setTransportRoutes: (state, { payload }) => {
      state.transportRoutes = payload;
    },
    clearTransportRoutes: (state) => {
      state.transportRoutes = null;
    },
  },
});

// Actions
export const { setTransportRoutes, clearTransportRoutes } =
  slice.actions;

export default slice.reducer;

