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
// Route::post('load-default-classes', 'load_default_classes')->name('classes.loadDefault');
// Route::get('classes/{class}', 'show')->name('classes.show');
// Route::get('other-locations', 'other_locations')->name('other_locations');
// Route::post('import-classes', 'import_class')->name('classes.import');
// Route::put('classes/{class}', 'update')->name('classes.update');
// Route::post('/classes/sort-class/by-level', 'sort_class_level')->name('classes.sortClassLevel');
// Route::post('/classes/{class}/sub-classes', 'add_subclass')->name('classes.subClass.store');
// Route::get('/sub-classes', 'all_sub_classes')->name('subClass.index');
// Route::get('/sub-classes/{subclass}', 'show_subclass')->name('subClass.show');
// Route::put('classes/sub-classes/{sub_class}', 'update_subClass')->name('classes.subClass.update');
// Route::post('/classes/sub-classes/{subclass}/assign-teacher', 'assign_teacher')->name('classes.subClass.assignTeacher');
// Route::delete('classes/{class}', 'destroy')->name('classes.delete');
// Route::delete('classes/sub-classes/{class}', 'destroy_subClass')->name('classes.subClass.delete');


// Route::get('/classes/sub-classes/{class}/load-default-subjects', 'load_default_subjects')->name('classes.subClass.loadSubject');
//         Route::post('/classes/sub-classes/{subclass}/subjects', 'store')->name('classes.subClass.addSubject');
//         Route::post('/classes/sub-classes/{subclass}/subjects/multiple', 'store_multiple')->name('classes.subClass.addMultipleSubject');
//         Route::get('/classes/sub-classes/{subclass}/subjects', 'index')->name('classes.subClass.fetchSubjects');
//         Route::get('/subjects/{subject}', 'show')->name('subject.show');
//         Route::put('/subjects/{subject}', 'update')->name('subjects.update');
//         Route::post('/subjects/{subject}/assign-primary-teacher', 'assign_primary_teacher')->name('subject.assignPrimaryTeacher');
//         Route::post('/subjects/{subject}/assign-support-teacher', 'assign_secondary_teacher')->name('subject.assignSecondaryTeacher');


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

export const classes = {
    getClasses,
    getClass,
    addClass,
    addSubClass,
    getSubClasses,
    getSubClass,
    assignTeacherToClass,
    getSubjectsBySubClasses,
    getStudentsBySubClasses,
    deleteSubClass,
    removeTeacherFromClass
}