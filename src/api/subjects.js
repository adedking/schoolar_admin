import { Axios } from './axios.js';

const getSubjects = async (payload) => {
  const { data } = await Axios.get(`/classes/sub-classes/${payload.sub_class_id}/subjects??limit=${payload.limit}&page=${payload.page}`,);
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
  const { data } = await Axios.post(`/subjects/${payload.id}/${payload.type}`, payload.data);
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

const addSubjectBook = async (payload) => {
  const { data } = await Axios.post(`/subjects/books/${payload.id}`, payload.data,
  {
    timeout: 0,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const getAttendanceBySubject = async (payload) => {
  const { data } = await Axios.get(`/subject-attendance/${payload.id}?limit=${payload.limit}&page=${payload.page}`);
  return data?.data;
};

const markSubjectAttendance = async (payload) => {
  const { data } = await Axios.post(`/subject-attendance`, payload);
  return data;
};

export const subjects = {
    getSubjects,
    getSubject,
    addSubject,
    assignTeacherToSubject,
    deleteSubject,
    removeTeacherFromSubject,
    addSubjectBook,

    getAttendanceBySubject,
    markSubjectAttendance
}