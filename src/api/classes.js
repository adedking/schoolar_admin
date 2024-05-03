import { Axios } from './axios.js';

const getClasses = async (payload) => {
    const { data } = await Axios.get(`/classes`,);
    return data?.data;
};

const getClass = async (payload) => {
    const { data } = await Axios.get(`/classes/${payload}`);
    return data?.data;
};

const addClass = async (payload) => {
  const { data } = await Axios.post('/classes', payload,
  {
    timeout: 0
  });
  return data;
};

const addSubClass = async (payload) => {
  const { data } = await Axios.post(`/classes/${payload.id}/sub-classes`, payload.data);
  return data;
};

const updateSubClass = async (payload) => {
  const { data } = await Axios.post(`/classes/${payload.id}/sub-classes`, payload.data);
  return data;
};

const getSubClasses = async (payload) => {
  const { data } = await Axios.get(`/sub-classes`);
  return data?.data;
};

const getSubClass = async (payload) => {
  const { data } = await Axios.get(`/sub-classes/${payload}`);
  return data?.data;
};

const assignTeacherToClass = async (payload) => {
  const { data } = await Axios.post(`/classes/sub-classes/${payload.id}/assign-teacher`, payload.data);
  return data?.data;
};

const getSubjectsBySubClasses = async (payload) => {
  let search = payload.search ? '&search=' + payload.search : '';
  const { data } = await Axios.get(`/classes/sub-classes/${payload.id}/subjects?limit=${payload.limit}&page=${payload.page}${search}`);
  return data?.data;
};

const getStudentsBySubClasses = async (payload) => {
  let search = payload.search ? '&search=' + payload.search : '';
  let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
  const { data } = await Axios.get(`/classes/sub-classes/${payload.id}/students?limit=${payload.limit}&page=${payload.page}${filter}${search}`);
  return data?.data;
};

const deleteSubClass = async (payload) => {
  const { data } = await Axios.delete(`/classes/sub-classes/${payload}`);
  return data;
};

const removeTeacherFromClass = async (payload) => {
  const { data } = await Axios.get(`/classes/sub-classes/${payload}/remove-teacher`);
  return data;
};

const getAtteandanceBySubClass = async (payload) => {
  const { data } = await Axios.get(`/class-attendance/${payload.id}?limit=${payload.limit}&page=${payload.page}`);
  return data?.data;
};

const markClassAttendance = async (payload) => {
  const { data } = await Axios.post(`/class-attendance`, payload);
  return data;
};

export const classes = {
    getClasses,
    getClass,
    addClass,
    addSubClass,
    updateSubClass,
    getSubClasses,
    getSubClass,
    assignTeacherToClass,
    getSubjectsBySubClasses,
    getAtteandanceBySubClass,
    getStudentsBySubClasses,
    deleteSubClass,
    removeTeacherFromClass,

    markClassAttendance
}