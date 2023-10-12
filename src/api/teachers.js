import { Axios } from './axios';

const getTeachers = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/school-teachers?limit=${payload.limit}&page=${payload.page}${search}${filter}`,
    {
      timeout: 0
    });
    return data?.data;
};


export const teachers = {
    getTeachers,
}