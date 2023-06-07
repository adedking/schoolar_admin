import { Axios } from './axios';

const login = async (payload) => {
  const { data } = await Axios.post('/login', payload);
  return data;
};

const register = async (payload) => {
    const { data } = await Axios.post('/register', payload,
    {
      timeout: 0
    });
    return data;
  };

export const user = {
    login,
    register,
}