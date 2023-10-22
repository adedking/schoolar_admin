import { Axios } from './axios';

const getClasses = async (payload) => {
    const { data } = await Axios.get(`/classes`,
    {
      timeout: 0
    });
    return data?.data;
};

const getClass = async (payload) => {
    const { data } = await Axios.get(`/classes/${payload}`,
    {
      timeout: 0
    });
    return data?.data;
};

const addClass = async (payload) => {
  const { data } = await Axios.post('/classes', payload,
  {
    timeout: 0
  });
  return data;
};

export const classes = {
    getClasses,
    getClass,
    addClass
}