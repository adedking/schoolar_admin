import { Axios } from './axios';

const getStudents = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/school-students?limit=${payload.limit}&page=${payload.page}${search}${filter}`,
    {
      timeout: 0
    });
    return data?.data;
};


const getStudent = async (payload) => {
  const { data } = await Axios.get(`/school-students/${payload}`,
  {
    timeout: 0
  });
  return data?.data;
};

const addStudent = async (payload) => {
const { data } = await Axios.post('/school-students', payload,
{
  timeout: 0
});
return data;
};

export const students = {
  getStudents,
  getStudent,
  addStudent
}