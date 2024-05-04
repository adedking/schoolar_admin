import { store } from '../..';
import { setAlert, setIsLoading } from '../../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../..';
import { transportRoutes } from '../../../api/transport-routes';

export function useGetTransportationRoutes( limit, page, statusFilter, search ) {
  return useQuery(
    ['transportation-routes', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return transportRoutes.getTransportRoutes({ limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetTransportationRouteStudents( id, limit, page, statusFilter, search ) {
  return useQuery(
    ['transportation-routes', { id, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return transportRoutes.getStudentsByTransportRoute({ id, limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetTransportationRoute(id) {
  return useQuery(
    ['transportation-route', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return transportRoutes.getTransportRoute(id);
    },
    {
      enabled: id !== null,
      select: (data) => {
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
    },
  );
}

export function useAddTransportationRoute() {
  return useMutation(
    (payload) => {
      return transportRoutes.addTransportRoute(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('transportation-routes');
        queryClient.invalidateQueries('transportation-route');
        store.dispatch(setAlert(true, 'Add Route Successful', 'success', 'You have successfully created a transport route'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useUpdateTransportationRoute() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return transportRoutes.updateTransportRoute(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('transportation-routes');
        queryClient.invalidateQueries('transportation-route');
        store.dispatch(setAlert(true, 'success', 'Transport route updated successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteTransportationRoute() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return transportRoutes.deleteTransportRoute(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('transportation-routes');
        queryClient.invalidateQueries('transportation-route');
        store.dispatch(setAlert(true, 'success', 'Transport route deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useRemoveDriverFromRoute() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return transportRoutes.removeDriverFromRoute(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('transportation-routes');
        queryClient.invalidateQueries('transportation-route');
        store.dispatch(setAlert(true, 'success', 'Class deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAssignDriverToRoute() {
  return useMutation(
    (payload) => {
      return transportRoutes.assignDriverToRoute(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('transportation-routes');
        queryClient.invalidateQueries('transportation-route');
        store.dispatch(setAlert(true, 'Driver assigned successful', 'success', 'You have successfully assigned a driver to this route'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}


