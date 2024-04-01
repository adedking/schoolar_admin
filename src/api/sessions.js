import { Axios } from './axios.js';

const getSessions = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/school-parents?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getSession = async (payload) => {
  const { data } = await Axios.get(`/school-sessions/${payload}`);
  return data?.data;
};

const addSession = async (payload) => {
const { data } = await Axios.post('/school-sessions', payload,);
return data;
};

const updateSession = async (payload) => {
  const { data } = await Axios.put('/school-sessions/'+payload.id, payload.body);
  return data;
};

const deleteSession = async (payload) => {
  const { data } = await Axios.delete(`/school-sessions/${payload}`);
  return data;
};

const getFeesBySession = async (payload) => {
  let search = payload.search ? '&search=' + payload.search : '';
  const { data } = await Axios.get(`/school-sessions/${payload.id}/fees?limit=${payload.limit}&page=${payload.page}${search}`);
  return data?.data;
};

export const sessions = {
  getSessions,
  getSession,
  addSession,
  updateSession,
  deleteSession,
  getFeesBySession
}