import axios from 'axios';
import { store } from '../redux';
import { setAlert } from '../redux/components/components-slice';
import { logout } from '../redux/user/hook';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, //10s api call before ending
  headers: { 'content-type': 'application/json' },
});

Axios.interceptors.request.use(function (config) {
  // console.log('Axios api just called ---', config.url);
  const token = store.getState().userSlice.token;
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      logout();
      return;
    }

    if (error.response && error.response.data && error.response.data.message) {
      //error message
      store.dispatch(setAlert(true, 'error', typeof error.response.data.message === 'string'? error.response.data.message: JSON.stringify(error.response.data.message)));
    }

    return Promise.reject(error.response.data);
  },
);

const { get, post, put, delete: destroy } = Axios;
export { get, post, put, destroy };
