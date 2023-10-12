import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'components',
  initialState: {
    isLoading: false,
    alert: {
      show: false,
      title: '',
      type: '',
      message: '',
      close: true,
    },
    isSidebarOpen: true,
    isRightPanelOpen: false,
  },
  reducers: {
    IsShowingAlert: (state, { payload }) => {
      state.alert = {
        show: payload.show,
        title: payload.title,
        type: payload.type,
        message: payload.message,
        close: true,
      };
    },
    IsTogglingSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    IsTogglingRightPanel: (state) => {
      state.isRightPanelOpen = !state.isRightPanelOpen;
    },
    IsTurnRightPanelOn: (state) => {
      state.isRightPanelOpen = true;
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
  IsTurnRightPanelOn,
  IsTogglingRightPanel,
  setIsLoading,
} = slice.actions;

export const isLoading = (state) => state.componentsSlice.isLoading;

export const setAlert = (show, title, type, message) => (dispatch) => {
  dispatch(
    IsShowingAlert({
      show,
      title,
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

export const toggleRightPanel = () => (dispatch) => {
  dispatch(IsTogglingRightPanel());
};
export const turnRightPanelOn = () => (dispatch) => {
  dispatch(IsTurnRightPanelOn());
};

export default slice.reducer;
