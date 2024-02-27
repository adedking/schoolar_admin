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

// Route::post('/school-students', 'store')->name('schoolStudent.store');
// Route::post('/school-students/{uuid}/health-records', 'store_health_info')->name('schoolStudent.healthInfo.store');
// Route::get('/school-students/{uuid}/skip-health-records', 'skip_health_info')->name('schoolStudent.healthInfo.skip');
// Route::post('/school-students/{uuid}/parents/new', 'store_new_parent')->name('schoolStudent.newParent.add');
// Route::post('/school-students/{uuid}/parents/existing', 'store_existing_parent')->name('schoolStudent.newParent.existing');
// Route::get('/school-students/{uuid}/skip-add-parents', 'skip_add_parent')->name('schoolStudent.newParent.skip');
// Route::get('/school-students', 'index')->name('schoolStudent.index');
// Route::get('/school-students/{uuid}', 'show')->name('schoolStudent.show');
const addStudent = async (payload) => {
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
  addStudentRecords,
  skipAddStudentRecords,
  updateStudent,
  addStudentParentsNew,
  addStudentParentsExisting,
  skipAddStudentParents,
  deleteStudent
}