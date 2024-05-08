import { Axios } from './axios.js';

const getParents = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/school-parents?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getParent = async (payload) => {
  const { data } = await Axios.get(`/school-parents/${payload}`);
  return data?.data;
};

const addParent = async (payload) => {
  const { data } = await Axios.post('/school-parents', payload,);
  return data;
};

const getStudentsByParent = async (payload) => {
  let search = payload.search ? '&search=' + payload.search : '';
  let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
  const { data } = await Axios.get(`/school-parents/${payload.id}/students?limit=${payload.limit}&page=${payload.page}${filter}${search}`);
  return data?.data;
};

const deleteParent = async (payload) => {
  const { data } = await Axios.delete(`/school-parents/${payload}`);
  return data;
};

export const parents = {
  getParents,
  getParent,
  addParent,
  getStudentsByParent,
  deleteParent
}