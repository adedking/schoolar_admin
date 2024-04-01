import { Axios } from './axios.js';

const getFees = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/school-fees?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getFee = async (payload) => {
  const { data } = await Axios.get(`/school-fees/${payload}`);
  return data?.data;
};

const addFee = async (payload) => {
const { data } = await Axios.post('/school-fees', payload,);
return data;
};

const updateFee = async (payload) => {
  const { data } = await Axios.put('/school-fees/'+payload.id, payload.body);
  return data;
};

const deleteFee = async (payload) => {
    const { data } = await Axios.delete(`/school-fees/${payload}`);
    return data;
};

export const feeManagement = {
    getFees,
    getFee,
    addFee,
    updateFee,
    deleteFee
}