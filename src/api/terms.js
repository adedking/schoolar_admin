import { Axios } from './axios.js';

const getTerms = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/school-parents?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getTerm = async (payload) => {
  const { data } = await Axios.get(`/school-sessions/${payload}`);
  return data?.data;
};

const addTerm = async (payload) => {
const { data } = await Axios.post('/school-sessions', payload,);
return data;
};

const updateTerm = async (payload) => {
  const { data } = await Axios.put('/school-sessions/'+payload.id, payload.body);
  return data;
};

const deleteTerm = async (payload) => {
  const { data } = await Axios.delete(`/school-sessions/${payload}`);
  return data;
};

export const terms = {
    getTerms,
    getTerm,
    addTerm,
    updateTerm,
    deleteTerm
}