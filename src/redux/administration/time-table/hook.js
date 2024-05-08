import { store } from '../..';
import { setAlert, setIsLoading } from '../../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../..';
import { timeTable } from '../../../api/time-table';

export function useGetTimeTableConfiguration() {
  return useQuery(
    ['time-table-configuration'],
    () => {
      store.dispatch(setIsLoading(true));
      return timeTable.getTimeTableConfiguration();
    },
    {
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

export function useAddTimeTableConfiguration() {
  return useMutation(
    (payload) => {
      return timeTable.addConfiguration(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('time-table-configuration');
        store.dispatch(setAlert(true, 'Time-table configuration operation successful', 'success', 'You have successfully updated your time-table configuration'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetTimeTableBySubClass( id ) {
  return useQuery(
    ['time-table-by-sub_class', id],
    () => {
      // store.dispatch(setIsLoading(true));
      return timeTable.getTimeTableBySubClass(id);
    },
    {
      enabled: id !== null,
      select: (data) => {
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddTimeTable() {
  return useMutation(
    (payload) => {
      return timeTable.addTimeTable(payload);
    },
    {
      
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('time-table-by-sub_class');
        store.dispatch(setAlert(true, 'Add Time-table successful', 'success', 'You have successfully created a class time-table'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}