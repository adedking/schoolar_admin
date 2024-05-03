import { store } from '../..';
import { setAlert, setIsLoading } from '../../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../..';
import { sessions } from '../../../api/sessions';

export function useGetSessions( limit, page, statusFilter, search ) {
  return useQuery(
    ['sessions', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return sessions.getSessions({ limit, page, statusFilter, search });
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

export function useGetSession(id) {
  return useQuery(
    ['session', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return sessions.getSession(id);
    },
    {
      isEnabled: id !== null,
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

export function useAddSession() {
  return useMutation(
    (payload) => {
      return sessions.addSession(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('sessions');
        queryClient.invalidateQueries('session');
        store.dispatch(setAlert(true, 'Add Parent Successful', 'success', 'You have successfully created a session'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useUpdateSession() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return sessions.updateSession(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('sessions');
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('sessions-list');
        store.dispatch(setAlert(true, 'success', 'Session updated successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteSession() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return sessions.deleteSession(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('sessions');
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('sessions-list');
        store.dispatch(setAlert(true, 'success', 'Session deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetSessionsList(limit, page, search) {
  return useQuery(
    ['sessions-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return sessions.getParents({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ id: null, text: 'Select a session', value: null });
        data?.data.forEach((item) => {
          newData.push({ uuid: item.uuid, id: item.id, text: item.name + ' | (' + item.start_date + ' ' + item.end_date + ')' });
        });
        return newData;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
    },
  );
}