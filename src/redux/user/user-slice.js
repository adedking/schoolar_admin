import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: {
      "first_name": "Omotolani",
      "last_name": "Olurotimi",
      "email": "omotolaniolurotimi@gmail.com",
      "updated_at": "2023-06-02T21:26:08.000000Z",
      "created_at": "2023-06-02T21:26:08.000000Z",
      "id": 1,
      "school_id": 1,
      "onboardingStatus": 3,
      "school_location_id": 1,
      "name": "Omotolani Olurotimi",
      "schools": [
          {
              "id": 1,
              "name": "LightSoft Schools",
              "type": "independent",
              "country": "Nigeria",
              "logo_url": null,
              "logo_path": null,
              "created_at": "2023-06-02T21:26:08.000000Z",
              "updated_at": "2023-06-02T21:26:08.000000Z",
              "locations": [
                  {
                      "id": 1,
                      "school_id": 1,
                      "address": "",
                      "town": null,
                      "lga": null,
                      "state": "Ogun",
                      "country": "Nigeria",
                      "created_at": "2023-06-02T21:26:08.000000Z",
                      "updated_at": "2023-06-02T21:26:08.000000Z"
                  }
              ]
          }
      ],
      "authorization": {
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3NpZ251cCIsImlhdCI6MTY4NTc0MTE3MiwiZXhwIjoxNjg1ODI3NTcyLCJuYmYiOjE2ODU3NDExNzIsImp0aSI6Ims5ZlFTRlhxSURhUU1EQ0IiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.BXpZi-4hMG2Ux3u1dVyTP5tccNHJ2TCuphU9M7UAHjs",
          "type": "Bearer",
          "duration": 86400
      }
    },
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3NpZ251cCIsImlhdCI6MTY4NTc0MTE3MiwiZXhwIjoxNjg1ODI3NTcyLCJuYmYiOjE2ODU3NDExNzIsImp0aSI6Ims5ZlFTRlhxSURhUU1EQ0IiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.BXpZi-4hMG2Ux3u1dVyTP5tccNHJ2TCuphU9M7UAHjs",
    webToken: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setWebToken: (state, { payload }) => {
      state.webToken = payload;
    },
  },
});

// Actions
export const { logoutSuccess, setUser, clearUser, setToken, clearToken, setWebToken } =
  slice.actions;

export default slice.reducer;
