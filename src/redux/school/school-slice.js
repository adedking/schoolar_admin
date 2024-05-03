import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'schools',
  initialState: {
    school: {},
    schoolLocation: {},
    currentSession: {},
    currentTerm: {},
    schools: [],
  },
  reducers: {
    setSchool: (state, { payload }) => {
      state.school = payload;
    },

    clearSchool: (state, { payload }) => {
      state.school = null;
    },

    setSchoolLocation: (state, { payload }) => {
      state.schoolLocation = payload;
    },

    clearSchoolLocation: (state, { payload }) => {
      state.schoolLocation = null;
    },

    setCurrentSession: (state, { payload }) => {
      state.currentSession = payload;
    },

    clearCurrentSession: (state, { payload }) => {
      state.currentSession = null;
    },

    setCurrentTerm: (state, { payload }) => {
      state.currentTerm = payload;
    },

    clearCurrentTerm: (state, { payload }) => {
      state.currentTerm = null;
    },

    setSchools: (state, { payload }) => {
      state.schools = payload;
    },

    clearSchools: (state, { payload }) => {
      state.schools = [];
    },
  },
});

// Actions
export const { 
  setSchools, 
  clearSchools, 
  setSchool, 
  clearSchool, 
  setSchoolLocation, 
  clearSchoolLocation,
  setCurrentSession,
  clearCurrentSession,
  setCurrentTerm,
  clearCurrentTerm

} = slice.actions;

export default slice.reducer;
