import { Axios } from './axios';

const login = async (payload) => {
  const { data } = await Axios.post('/login', payload);
  return data;
};

const profile = async () => {
  const { data } = await Axios.get('/me');
  return data;
};

const register = async (payload) => {
  const { data } = await Axios.post('/signup', payload,
  {
    timeout: 0
  });
  return data;
};

const verify_otp = async (payload) => {
  const { data } = await Axios.get(`/verify-email/${payload}`);
  return data;
};

export const user = {
    login,
    register,
    verify_otp,
    profile
}