import { Axios } from './axios.js';

const getTransportRoutes = async (payload) => {
    let search = payload.search ? '&search=' + payload.search : '';
    let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
    const { data } = await Axios.get(`/transport-routes?limit=${payload.limit}&page=${payload.page}${search}${filter}`);
    return data?.data;
};

const getStudentsByTransportRoute = async (payload) => {
  let search = payload.search ? '&search=' + payload.search : '';
  let filter = payload.statusFilter && payload.statusFilter !== -1 ? '&filter=' + payload.statusFilter : '';
  const { data } = await Axios.get(`/transport-routes/${payload.id}/students?limit=${payload.limit}&page=${payload.page}${filter}${search}`);
  return data?.data;
};

const getTransportRoute = async (payload) => {
  const { data } = await Axios.get(`/transport-routes/${payload}`);
  return data?.data;
};

const addTransportRoute = async (payload) => {
const { data } = await Axios.post('/transport-routes', payload);
return data;
};

const updateTransportRoute = async (payload) => {
  const { data } = await Axios.put('/transport-routes/'+payload.id, payload.body);
  return data;
};

const deleteTransportRoute = async (payload) => {
  const { data } = await Axios.delete(`/transport-routes/${payload}`);
  return data;
};


const assignDriverToRoute = async (payload) => {
  const { data } = await Axios.post(`/transport-routes/${payload.id}/assign-driver`, payload.data);
  return data?.data;
};

const removeDriverFromRoute = async (payload) => {
  const { data } = await Axios.get(`/transport-routes/${payload}/remove-driver`);
  return data;
};

const removeCoordinator = async (payload) => {
  const { data } = await Axios.get(`/transport-routes/${payload}/remove-driver`);
  return data;
};

const assignCoordinatorToRoute = async (payload) => {
  const { data } = await Axios.post(`/transport-routes/${payload.id}/assign-driver`, payload.data);
  return data?.data;
};

export const transportRoutes = {
  getTransportRoutes,
  getStudentsByTransportRoute,
  getTransportRoute,
  addTransportRoute,
  updateTransportRoute,
  deleteTransportRoute,
  assignDriverToRoute,
  removeDriverFromRoute,
  assignCoordinatorToRoute,
  removeCoordinator
}