import { Axios } from './axios.js';

const getLessonPlans = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/lession-plans/${payload.type}/${payload.id}?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const geLessonPlan = async (payload) => {
    const { data } = await Axios.get(`/lession-plans/${payload.id}`);
    return data?.data;
};

const addLessonPlan = async (payload) => {
    const { data } = await Axios.post('/lession-plans', payload,);
    return data;
  };

export const lessonPlans = {
    getLessonPlans,
    geLessonPlan,
    addLessonPlan
}