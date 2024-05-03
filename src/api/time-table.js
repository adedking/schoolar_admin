import { Axios } from './axios.js';

const getTimeTableConfiguration = async (payload) => {
    const { data } = await Axios.get(`/time-table-configuration`);
    return data?.data;
};

const addConfiguration = async (payload) => {
  const { data } = await Axios.post('/time-table-configuration', payload);
  return data;
};

const getTimeTableBySubClass = async (payload) => {
    const { data } = await Axios.get(`/time-table/${payload}`,);
    return data?.data;
};

const addTimeTable = async (payload) => {
    const { data } = await Axios.post('/time-table', payload);
    return data;
};

export const timeTable = {
    getTimeTableConfiguration,
    addConfiguration,
    getTimeTableBySubClass,
    addTimeTable
}