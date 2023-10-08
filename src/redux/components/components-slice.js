import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'components',
  initialState: {
    isLoading: false,
    alert: {},
    isSidebarOpen: true,
  },
  reducers: {
    IsShowingAlert: (state, { payload }) => {
      state.alert = {
        show: payload.show,
        type: payload.type,
        message: payload.message,
        close: true,
      };
    },
    IsTogglingSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

// Actions
export const {
  IsShowingAlert,
  IsTogglingSidebar,
  setIsLoading,
} = slice.actions;

export const isLoading = (state) => state.componentsSlice.isLoading;

export const setAlert = (show, type, message) => (dispatch) => {
  dispatch(
    IsShowingAlert({
      show,
      type,
      message,
    }),
  );
};

export const closeAlert = () => (dispatch) => {
  dispatch(IsShowingAlert({}));
};

export const toggleSidebar = () => (dispatch) => {
  dispatch(IsTogglingSidebar());
};

export default slice.reducer;
