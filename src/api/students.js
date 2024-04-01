import { Axios } from './axios.js';

const getStudents = async (payload) => {
  let search = payload.search ? '&search=' + payload.search : '';
  let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
  const { data } = await Axios.get(`/school-students?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
  return data?.data;
};

const getStudent = async (payload) => {
  const { data } = await Axios.get(`/school-students/${payload}`);
  return data?.data;
};

const addStudent = async (payload) => {
  const { data } = await Axios.post('/school-students', payload,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
return data;
};

const addMultipleStudents = async (payload) => {
  const { data } = await Axios.post('/school-students', payload,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const addStudentRecords = async (payload) => {
  const { data } = await Axios.post(`/school-students/${payload.uuid}/health-records`, payload);
  return data;
};

const skipAddStudentRecords = async (payload) => {
  const { data } = await Axios.post(`/school-students/${payload.uuid}/skip-health-records`, payload);
  return data;
};

const addStudentParentsNew = async (payload) => {
  const { data } = await Axios.post(`/school-students/${payload.uuid}/parents/new`, payload.body,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const addStudentParentsExisting = async (payload) => {
  const { data } = await Axios.post(`/school-students/${payload.uuid}/parents/existing`, payload.body);
  return data;
};

const skipAddStudentParents = async (payload) => {
  const { data } = await Axios.post(`/school-students/${payload.uuid}/skip-health-records`, payload);
  return data;
};

const updateStudent = async (payload) => {
  const { data } = await Axios.put('/school-students/'+payload.id, payload.body);
  return data;
};

const deleteStudent = async (payload) => {
  const { data } = await Axios.delete(`/school-students/${payload}`);
  return data;
};


export const students = {
  getStudents,
  getStudent,
  addStudent,
  addMultipleStudents,
  addStudentRecords,
  skipAddStudentRecords,
  updateStudent,
  addStudentParentsNew,
  addStudentParentsExisting,
  skipAddStudentParents,
  deleteStudent
}