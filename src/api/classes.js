import { Axios } from './axios.js';

const getClasses = async (payload) => {
    const { data } = await Axios.get(`/classes`,
    {
      timeout: 0
    });
    return data?.data;
};

const getClass = async (payload) => {
    const { data } = await Axios.get(`/classes/${payload}`,
    {
      timeout: 0
    });
    return data?.data;
};

const addClass = async (payload) => {
  const { data } = await Axios.post('/classes', payload,
  {
    timeout: 0
  });
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

export const classes = {
    getClasses,
    getClass,
    addClass,
    getSubClasses,
    getSubClass,
    assignTeacherToClass
}