import { Axios } from './axios.js';

const getSubjects = async (payload) => {
    const { data } = await Axios.get(`/classes`,);
    return data?.data;
};

const getSubject = async (payload) => {
    const { data } = await Axios.get(`/subjects/${payload}`);
    return data?.data;
};

const addSubject = async (payload) => {
  const { data } = await Axios.post('/subjects', payload,
  {
    timeout: 0
  });
  return data;
};

const assignTeacherToSubject = async (payload) => {
  const { data } = await Axios.post(`/classes/sub-classes/${payload.id}/assign-teacher`, payload.data);
  return data?.data;
};

const deleteSubject = async (payload) => {
  const { data } = await Axios.delete(`/classes/sub-classes/${payload}`);
  return data;
};

const removeTeacherFromSubject = async (payload) => {
  const { data } = await Axios.get(`/classes/sub-classes/${payload}/remove-teacher`);
  return data;
};

export const subjects = {
    getSubjects,
    getSubject,
    addSubject,
    assignTeacherToSubject,
    deleteSubject,
    removeTeacherFromSubject
}