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
const resend_verification_otp = async (payload) => {
  const { data } = await Axios.get(`/resend-verification-pin`);
  return data;
};

const forgotPassword = async (payload) => {
  const { data } = await Axios.post(`/forgot-password`, payload);
  return data;
};

const resetPassword = async (payload) => {
  const { data } = await Axios.post(`/reset-password`, payload);
  return data;
};

export const user = {
    login,
    register,
    verify_otp,
    resend_verification_otp,
    profile,
    forgotPassword,
    resetPassword
}