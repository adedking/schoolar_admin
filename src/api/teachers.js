import { Axios } from './axios';

const getTeachers = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    let limit = payload.limit ? 'limit=' + payload.limit : 'limit=10';
    let page = payload.page ? '&page=' + payload.page : '&page=1';
    const { data } = await Axios.get(`/school-teachers?${limit}${page}${search}${filter}`,
    {
      timeout: 0
    });
    return data?.data;
};

const getTeacher = async (payload) => {
  const { data } = await Axios.get(`/school-teachers/${payload}`,
  {
    timeout: 0
  });
  return data?.data;
};

const addTeacher = async (payload) => {
  const { data } = await Axios.post('/school-teachers', payload,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 0
  });
  return data;
};

const updateTeacher = async (payload) => {
  const { data } = await Axios.post(`/school-teachers/${payload.id}`, payload.data,
  {
    timeout: 0
  });
  return data;
};

const deleteTeacher = async (payload) => {
  const { data } = await Axios.delete(`/school-teachers/${payload}`,
  {
    timeout: 0
  });
  return data;
};

const addTeacherCertification = async (payload) => {
  const { data } = await Axios.post('/teacher-certifications', payload,
  {
    timeout: 0
  });
  return data;
};

const updateTeacherCertification = async (payload) => {
  const { data } = await Axios.post(`/teacher-certifications/${payload.id}`, payload.data,
  {
    timeout: 0
  });
  return data;
};

const deleteTeacherCertification = async (payload) => {
  const { data } = await Axios.delete(`/teacher-certifications/${payload}`,
  {
    timeout: 0
  });
  return data;
};

export const teachers = {
    //Teacher APIs
    getTeachers,
    getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,

    //Teacher Certification APIs
    addTeacherCertification,
    updateTeacherCertification,
    deleteTeacherCertification

}