import { Axios } from './axios.js';

const getAttendances = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/attendance/${payload.type}?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getAttendancesBySubject = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/attendance/${payload.type}?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getAttendance = async (payload) => {
    const { data } = await Axios.get(`/attendance/show/${payload.uuid}/${payload.type}`);
    return data?.data;
};

// Route::get('/student-attendance/{student_id}/{type}', 'attendance_by_student')->name('student_attendance.attendance_by_student');

export const attendances = {
    getAttendances,
    getAttendancesBySubject,
    getAttendance
}